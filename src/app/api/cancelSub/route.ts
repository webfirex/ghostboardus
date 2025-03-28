import { NextResponse } from "next/server";
import Stripe from "stripe";
import db from "@/lib/db";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { email, reason } = await req.json();

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
    }

    if (!reason || reason.trim() === "") {
      return NextResponse.json({ success: false, message: "Reason is required" }, { status: 400 });
    }

    const insertQuery = `
      INSERT INTO cancelfeedback (email, reason)
      VALUES ($1, $2);
    `;

    await db.query(insertQuery, [email, reason]);

    // Step 1: Retrieve the customer by email
    const customers = await stripe.customers.list({ email, limit: 1 });

    if (!customers.data.length) {
      return NextResponse.json({ success: false, message: `No customer found with email: ${email}` }, { status: 404 });
    }

    const customer = customers.data[0];

    // Retrieve all subscriptions for the customer
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: "all", // Fetch all statuses to filter manually
      limit: 5, // Fetch more than 1 in case multiple subscriptions exist
    });

    // Find a subscription that is either active or trialing
    const validSubscription = subscriptions.data.find(
      (sub) => sub.status === "active" || sub.status === "trialing"
    );

    if (!validSubscription) {
      return NextResponse.json({
        success: false,
        message: `No active or trialing subscriptions found for customer with email: ${email}`,
      }, { status: 404 });
    }

    // Check if the subscription is already set to cancel
    if (validSubscription.cancel_at_period_end) {
      return NextResponse.json({
        success: false,
        message: `Future billing is already canceled for this subscription.`,
      });
    }

    // Cancel the subscription at the end of the billing period
    await stripe.subscriptions.update(validSubscription.id, {
      cancel_at_period_end: true,
    });

    return NextResponse.json({
      success: true,
      message: `Billing canceled successfully 🤧`,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
