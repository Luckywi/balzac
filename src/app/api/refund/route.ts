import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    // Version API par défaut
  });

export async function POST(req: Request) {
  const { paymentIntentId } = await req.json()

  try {
    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId
    })

    return NextResponse.json({ success: true, refund })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, error })
  }
}
