import { NextRequest, NextResponse } from 'next/server'
import { createDonationPaymentIntent, createDonationSubscription } from '@/lib/stripe'
import { createDonation } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    // Check if required environment variables are set
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Stripe configuration missing' },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { amount, type, donorName, donorEmail, message } = body

    if (!amount || !type || !donorName || !donorEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const metadata = {
      donor_name: donorName,
      donor_email: donorEmail,
      message: message || '',
      type: type,
    }

    let paymentIntent
    let donation

    if (type === 'monthly') {
      // Create recurring subscription
      const subscription = await createDonationSubscription(amount, donorEmail, metadata)
      paymentIntent = subscription.subscription
      
      // Store donation record
      donation = await createDonation({
        donor_name: donorName,
        donor_email: donorEmail,
        amount,
        type,
        message,
        stripe_payment_intent_id: subscription.subscription.id,
        status: 'completed',
      })
    } else {
      // Create one-time payment intent
      paymentIntent = await createDonationPaymentIntent(amount, metadata)
      
      // Store donation record
      donation = await createDonation({
        donor_name: donorName,
        donor_email: donorEmail,
        amount,
        type,
        message,
        stripe_payment_intent_id: paymentIntent.id,
        status: 'pending',
      })
    }

    return NextResponse.json({
      success: true,
      paymentIntent: paymentIntent,
      donation: donation,
    })
  } catch (error) {
    console.error('Error processing donation:', error)
    return NextResponse.json(
      { error: 'Failed to process donation' },
      { status: 500 }
    )
  }
}
