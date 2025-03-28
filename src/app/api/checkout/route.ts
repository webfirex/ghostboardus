import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { prodId, email } = await req.json();

    if (!prodId || !email) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const customers = await stripe.customers.list({ email });
    let customer = customers.data.length > 0 ? customers.data[0] : null;

    // 🔹 Step 2: If no customer exists, create a new one
    if (!customer) {
      customer = await stripe.customers.create({ email });
    }

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price: prodId,
          quantity: 1,
        },
      ],
      customer: customer.id,
      // customer_email: email,
      allow_promotion_codes: true,
      phone_number_collection: {
        enabled: true,
      },
      subscription_data: {
        trial_period_days: 7,
      },
      success_url: `https://ghostboard.net/dashboard?success=true`,
      cancel_url: `https://ghostbaord.net/pricing?canceled=true`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error: any) {
    console.error("Error creating checkout session:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
