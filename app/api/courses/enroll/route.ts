import { NextRequest, NextResponse } from 'next/server'
import { createCoursePaymentIntent } from '@/lib/stripe'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { courseId, userId, amount } = body

    if (!courseId || !userId || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // For deployment without database, return mock course data
    const course = {
      id: courseId,
      title: 'Mock Course',
      description: 'This is a mock course for deployment purposes',
      max_students: 25,
      enrolled_students: 15,
      price: amount
    }

    if (course.enrolled_students >= course.max_students) {
      return NextResponse.json(
        { error: 'Course is full' },
        { status: 400 }
      )
    }

    // Create payment intent
    const paymentIntent = await createCoursePaymentIntent(amount, courseId, userId)

    return NextResponse.json({
      success: true,
      paymentIntent: paymentIntent,
      course: course,
    })
  } catch (error) {
    console.error('Error processing course enrollment:', error)
    return NextResponse.json(
      { error: 'Failed to process enrollment' },
      { status: 500 }
    )
  }
}
