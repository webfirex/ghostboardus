import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import Stripe from 'stripe';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const MONTHLY_PRICE = 49;  // Monthly Plan Price
const YEARLY_PRICE = 545;  // Yearly Plan Price

// Stripe webhook handler
export async function POST(req: NextRequest) {
  const payload = await req.text();
  const sig = req.headers.get('stripe-signature');

  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    // Log the entire event for debugging
    console.log("Received Stripe Event:", JSON.stringify(event, null, 2));

    const eventType = event.type;

    if (
      eventType === 'customer.subscription.created' ||
      eventType === 'customer.subscription.updated'
    ) {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;

      // Fetch customer details from Stripe
      const customer = await stripe.customers.retrieve(customerId);
      if (!customer || !('email' in customer) || !customer.email) {
        console.error("Customer email not found for customerId:", customerId);
        return NextResponse.json({ error: 'Customer email not found' }, { status: 400 });
      }

      const email = customer.email;
      const premium =
        subscription.status === 'active' || subscription.status === 'trialing';
      const subStartDate = new Date(subscription.current_period_start * 1000);
      const subEndDate = new Date(subscription.current_period_end * 1000);
      const trialStartDate = subscription.trial_start
        ? new Date(subscription.trial_start * 1000)
        : null;
      const trialEndDate = subscription.trial_end
        ? new Date(subscription.trial_end * 1000)
        : null;

      const planId = subscription.items.data[0]?.plan.id || '';
      const planAmount = subscription.items.data[0]?.plan.amount || 0;
      const isYearly = planAmount === YEARLY_PRICE * 100;
      const price = isYearly ? YEARLY_PRICE : MONTHLY_PRICE;

      console.log(
        `Processing Subscription: email=${email}, premium=${premium}, plan=${planId}, price=${price}`
      );

      let isNewSubscriber = false;
      let isRecurringSubscriber = false;

      const client = await pool.connect();
      try {
        // Query for the user's existing subscription details, including the first paid subscription date.
        const { rows } = await client.query(
          `SELECT expdate, first_paid_subscription, trialexpdate, reffcode FROM users WHERE email = $1`,
          [email]
        );

        if (rows.length > 0) {
          const { expdate, first_paid_subscription, trialexpdate, reffcode } = rows[0];
          const expDateObj = expdate ? new Date(expdate) : null;
          const firstPaidSubObj = first_paid_subscription ? new Date(first_paid_subscription) : null;
          const trialExpDateObj = trialexpdate ? new Date(trialexpdate) : null;

          console.log(`Existing expdate:`, expDateObj);
          console.log(`Existing first_paid_subscription:`, firstPaidSubObj);

          const now = new Date();

          // A user is new if they have never had a paid subscription.
          if (!firstPaidSubObj) {
            isNewSubscriber = true;
          } else if (expDateObj && expDateObj <= now) {
            isRecurringSubscriber = true;
          }

          // Apply affiliate commission if a referral code exists.
          if (reffcode) {
            const { rows: adminRows } = await client.query(
              `SELECT commission1, commission2 FROM admins WHERE reffcode = $1`,
              [reffcode]
            );
            // Only apply commission if the subscription is active.
            if (adminRows.length > 0 && subscription.status === 'active') {
              const { commission1, commission2 } = adminRows[0];
              let commission = 0;
              // Apply first-month commission if it's a new paid subscription and the trial has ended.
              if (
                isNewSubscriber &&
                trialEndDate &&
                subStartDate > trialEndDate
              ) {
                commission = (commission1 / 100) * price;
                console.log("New subscriber detected after trial. Applying first month commission.");
              } else if (isRecurringSubscriber) {
                // Apply recurring commission.
                commission = (commission2 / 100) * price;
                console.log("Recurring subscription detected. Applying recurring commission.");
              }
              console.log(`Calculated commission: ${commission} for reffcode=${reffcode}`);
              if (commission > 0) {
                await client.query(
                  `UPDATE admins SET balance = (COALESCE(NULLIF(balance, ''), '0')::NUMERIC + $1)::TEXT WHERE reffcode = $2`,
                  [commission, reffcode]
                );
                console.log(`Updated balance for reffcode=${reffcode}`);
              }
            }
          }
        }

        // Update the user's subscription details.
        // Also update first_paid_subscription if the trial has ended and this is the first paid conversion.
        await client.query(
          `UPDATE users 
           SET premium = $1, 
               subdate = $2, 
               expdate = $3, 
               trialdate = $4, 
               trialexpdate = $5,
               first_paid_subscription = CASE 
                 WHEN trialexpdate IS NOT NULL AND $2 > trialexpdate AND first_paid_subscription IS NULL THEN $2 
                 WHEN trialexpdate IS NULL AND first_paid_subscription IS NULL THEN $2
                 ELSE first_paid_subscription 
               END
           WHERE email = $6`,
          [premium, subStartDate, subEndDate, trialStartDate, trialEndDate, email]
        );

        console.log(`Updated user subscription: email=${email}, premium=${premium}`);
        return NextResponse.json({ message: 'Subscription updated successfully' });
      } catch (error) {
        console.error("Database error:", error);
      } finally {
        client.release();
      }
    }

    if (eventType === 'customer.subscription.deleted') {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;

      const customer = await stripe.customers.retrieve(customerId);
      if (!customer || !('email' in customer) || !customer.email) {
        console.error("Customer email not found for deletion:", customerId);
        return NextResponse.json({ error: 'Customer email not found' }, { status: 400 });
      }

      const email = customer.email;
      console.log(`Canceling subscription for email=${email}`);

      const client = await pool.connect();
      try {
        await client.query(`UPDATE users SET premium = false WHERE email = $1`, [email]);
        console.log(`User downgraded: email=${email}`);
        return NextResponse.json({ message: 'Subscription canceled, user downgraded' });
      } catch (error) {
        console.error("Database error on cancellation:", error);
      } finally {
        client.release();
      }
    }

    console.log("Unhandled event type:", eventType);
    return NextResponse.json({ message: 'Event received' });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: `Webhook error: ${error.message}` }, { status: 400 });
  }
}
