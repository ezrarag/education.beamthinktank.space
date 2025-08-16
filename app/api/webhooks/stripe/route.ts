import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  // For deployment without Stripe, return mock success response
  return NextResponse.json({ 
    received: true,
    message: 'Mock webhook response for deployment'
  })
}
