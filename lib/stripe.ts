// Mock Stripe implementation for deployment without environment variables
export const stripe = null

// Mock payment intent creation for donations
export const createDonationPaymentIntent = async (amount: number, metadata: any) => {
  // Return mock data for deployment
  return {
    id: 'mock_payment_intent_' + Date.now(),
    amount: Math.round(amount * 100),
    currency: 'usd',
    metadata,
    status: 'requires_payment_method'
  }
}

// Mock payment intent creation for course enrollment
export const createCoursePaymentIntent = async (amount: number, courseId: string, userId: string) => {
  // Return mock data for deployment
  return {
    id: 'mock_course_payment_' + Date.now(),
    amount: Math.round(amount * 100),
    currency: 'usd',
    metadata: {
      course_id: courseId,
      user_id: userId,
      type: 'course_enrollment',
    },
    status: 'requires_payment_method'
  }
}

// Mock subscription creation for recurring donations
export const createDonationSubscription = async (amount: number, donorEmail: string, metadata: any) => {
  // Return mock data for deployment
  const mockSubscription = {
    id: 'mock_subscription_' + Date.now(),
    status: 'active',
    metadata
  }
  
  const mockCustomer = {
    id: 'mock_customer_' + Date.now(),
    email: donorEmail,
    metadata
  }

  return { subscription: mockSubscription, customer: mockCustomer }
}

// Mock payment intent retrieval
export const retrievePaymentIntent = async (paymentIntentId: string) => {
  // Return mock data for deployment
  return {
    id: paymentIntentId,
    amount: 2500,
    currency: 'usd',
    status: 'succeeded',
    metadata: {}
  }
}

// Mock subscription cancellation
export const cancelSubscription = async (subscriptionId: string) => {
  // Return mock data for deployment
  return {
    id: subscriptionId,
    status: 'canceled'
  }
}

// Mock customer subscriptions retrieval
export const getCustomerSubscriptions = async (customerId: string) => {
  // Return mock data for deployment
  return {
    data: [
      {
        id: 'mock_subscription_1',
        status: 'active',
        customer: customerId
      }
    ]
  }
}
