import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  // Check if required environment variables are set
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: 'Stripe webhook secret missing' },
      { status: 500 }
    )
  }

  if (!stripe) {
    return NextResponse.json(
      { error: 'Stripe client not initialized' },
      { status: 500 }
    )
  }

  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe signature' },
      { status: 400 }
    )
  }

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object)
        break
      
      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object)
        break
      
      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(event.data.object)
        break
      
      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event.data.object)
        break
      
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object)
        break
      
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

async function handlePaymentIntentSucceeded(paymentIntent: any) {
  if (!supabase) {
    console.error('Supabase client not initialized')
    return
  }

  const { metadata } = paymentIntent
  
  if (metadata.type === 'donation') {
    // Update donation status to completed
    await supabase
      .from('donations')
      .update({ status: 'completed' })
      .eq('stripe_payment_intent_id', paymentIntent.id)
  } else if (metadata.type === 'course_enrollment') {
    // Update course enrollment
    await supabase
      .from('classes')
      .update({ 
        enrolled_students: supabase.rpc('increment', { 
          table_name: 'classes', 
          column_name: 'enrolled_students', 
          row_id: metadata.course_id 
        })
      })
      .eq('id', metadata.course_id)
  }
}

async function handlePaymentIntentFailed(paymentIntent: any) {
  if (!supabase) {
    console.error('Supabase client not initialized')
    return
  }

  const { metadata } = paymentIntent
  
  if (metadata.type === 'donation') {
    // Update donation status to failed
    await supabase
      .from('donations')
      .update({ status: 'failed' })
      .eq('stripe_payment_intent_id', paymentIntent.id)
  }
}

async function handleInvoicePaymentSucceeded(invoice: any) {
  if (!supabase || !stripe) {
    console.error('Supabase or Stripe client not initialized')
    return
  }

  // Handle successful recurring donation payment
  if (invoice.subscription) {
    const subscription = await stripe.subscriptions.retrieve(invoice.subscription)
    const { metadata } = subscription
    
    // Create new donation record for recurring payment
    await supabase
      .from('donations')
      .insert([{
        donor_name: metadata.donor_name,
        donor_email: metadata.donor_email,
        amount: invoice.amount_paid / 100, // Convert from cents
        type: 'monthly',
        message: metadata.message || '',
        stripe_payment_intent_id: invoice.payment_intent,
        status: 'completed',
      }])
  }
}

async function handleInvoicePaymentFailed(invoice: any) {
  if (!supabase || !stripe) {
    console.error('Supabase or Stripe client not initialized')
    return
  }

  // Handle failed recurring donation payment
  if (invoice.subscription) {
    const subscription = await stripe.subscriptions.retrieve(invoice.subscription)
    const { metadata } = subscription
    
    // Create failed donation record
    await supabase
      .from('donations')
      .insert([{
        donor_name: metadata.donor_name,
        donor_email: metadata.donor_email,
        amount: invoice.amount_due / 100, // Convert from cents
        type: 'monthly',
        message: metadata.message || '',
        stripe_payment_intent_id: invoice.payment_intent,
        status: 'failed',
      }])
  }
}

async function handleSubscriptionDeleted(subscription: any) {
  if (!supabase) {
    console.error('Supabase client not initialized')
    return
  }

  // Handle cancelled recurring donation subscription
  const { metadata } = subscription
  
  // Update any pending donations to cancelled
  await supabase
    .from('donations')
    .update({ status: 'cancelled' })
    .eq('stripe_payment_intent_id', subscription.id)
}
