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

    // Verify course exists and has available spots
    const { data: course, error: courseError } = await supabase
      .from('classes')
      .select('*')
      .eq('id', courseId)
      .single()

    if (courseError || !course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      )
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
