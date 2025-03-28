// app/api/update-subscription/route.ts
import pool from '@/lib/db';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json(
      { error: 'Email is required' },
      { status: 400 }
    );
  }

  try {
    // Find customer in Stripe
    const customers = await stripe.customers.list({ email });
    const customer = customers.data[0];

    // Initialize values for the user record
    let premium = false; // Default to false
    let subStartDate = null;
    let subEndDate = null;
    let trialStartDate = null;
    let trialEndDate = null;

    if (customer) {
      // Get the subscription associated with the customer
      const subscriptions = await stripe.subscriptions.list({
        customer: customer.id,
      });
      const subscription = subscriptions.data[0];

      if (subscription) {
        premium = subscription.status === 'active' || subscription.status === 'trialing';
        subStartDate = new Date(subscription.current_period_start * 1000); // Convert Unix timestamp to JS Date
        subEndDate = new Date(subscription.current_period_end * 1000);
        trialStartDate = subscription.trial_start ? new Date(subscription.trial_start * 1000) : null;
        trialEndDate = subscription.trial_end ? new Date(subscription.trial_end * 1000) : null;
      }
    }

    // Update the PostgreSQL database
    const query = `
      UPDATE users
      SET 
        premium = $1,
        subdate = $2,
        expdate = $3,
        trialdate = $4,
        trialexpdate = $5
      WHERE email = $6
      RETURNING *;
    `;

    const values = [
      premium,
      subStartDate,
      subEndDate,
      trialStartDate,
      trialEndDate,
      email,
    ];

    const client = await pool.connect();
    try {
      const result = await client.query(query, values);

      if (result.rowCount === 0) {
        return NextResponse.json(
          { error: 'No user found with this email in the database' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        message: 'Subscription details updated successfully',
        data: result.rows[0],
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error updating subscription details:', error);
    return NextResponse.json(
      { error: 'Failed to update subscription details' },
      { status: 500 }
    );
  }
}
