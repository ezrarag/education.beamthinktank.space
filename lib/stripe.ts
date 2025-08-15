import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export { stripe }

// Payment intent creation for donations
export const createDonationPaymentIntent = async (amount: number, metadata: any) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      metadata,
      automatic_payment_methods: {
        enabled: true,
      },
    })
    
    return paymentIntent
  } catch (error) {
    console.error('Error creating payment intent:', error)
    throw error
  }
}

// Payment intent creation for course enrollment
export const createCoursePaymentIntent = async (amount: number, courseId: string, userId: string) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        course_id: courseId,
        user_id: userId,
        type: 'course_enrollment',
      },
      automatic_payment_methods: {
        enabled: true,
      },
    })
    
    return paymentIntent
  } catch (error) {
    console.error('Error creating course payment intent:', error)
    throw error
  }
}

// Create a subscription for recurring donations
export const createDonationSubscription = async (amount: number, donorEmail: string, metadata: any) => {
  try {
    // Create a product for recurring donations
    const product = await stripe.products.create({
      name: 'BEAM Education Monthly Donation',
      description: 'Monthly recurring donation to support BEAM Education programs',
    })

    // Create a price for the subscription
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: Math.round(amount * 100),
      currency: 'usd',
      recurring: {
        interval: 'month',
      },
    })

    // Create a customer
    const customer = await stripe.customers.create({
      email: donorEmail,
      metadata,
    })

    // Create the subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: price.id }],
      metadata,
    })

    return { subscription, customer }
  } catch (error) {
    console.error('Error creating donation subscription:', error)
    throw error
  }
}

// Retrieve payment intent
export const retrievePaymentIntent = async (paymentIntentId: string) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
    return paymentIntent
  } catch (error) {
    console.error('Error retrieving payment intent:', error)
    throw error
  }
}

// Cancel subscription
export const cancelSubscription = async (subscriptionId: string) => {
  try {
    const subscription = await stripe.subscriptions.cancel(subscriptionId)
    return subscription
  } catch (error) {
    console.error('Error canceling subscription:', error)
    throw error
  }
}

// Get customer subscriptions
export const getCustomerSubscriptions = async (customerId: string) => {
  try {
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: 'all',
    })
    return subscriptions
  } catch (error) {
    console.error('Error getting customer subscriptions:', error)
    throw error
  }
}
