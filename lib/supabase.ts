// Mock Supabase implementation for deployment without environment variables
export const supabase = null

// Mock user authentication functions
export const signInWithEmail = async (email: string, password: string) => {
  // Return mock data for deployment
  return {
    user: {
      id: 'mock_user_' + Date.now(),
      email,
      created_at: new Date().toISOString()
    },
    session: {
      access_token: 'mock_token_' + Date.now(),
      refresh_token: 'mock_refresh_' + Date.now()
    },
    error: null
  }
}

export const signUpWithEmail = async (email: string, password: string) => {
  // Return mock data for deployment
  return {
    user: {
      id: 'mock_user_' + Date.now(),
      email,
      created_at: new Date().toISOString()
    },
    session: null,
    error: null
  }
}

export const signOut = async () => {
  // Mock sign out
  return { error: null }
}

// Mock data functions
export const getCourses = async () => {
  // Return mock course data
  return {
    data: [
      {
        id: 'course_1',
        title: 'Introduction to STEM',
        description: 'Learn the fundamentals of Science, Technology, Engineering, and Mathematics',
        price: 99.99,
        duration: '8 weeks',
        category: 'STEM'
      },
      {
        id: 'course_2',
        title: 'Creative Writing Workshop',
        description: 'Develop your creative writing skills through interactive workshops',
        price: 79.99,
        duration: '6 weeks',
        category: 'Language Arts'
      }
    ],
    error: null
  }
}

export const enrollInCourse = async (courseId: string, userId: string) => {
  // Mock enrollment
  return {
    data: {
      id: 'enrollment_' + Date.now(),
      course_id: courseId,
      user_id: userId,
      enrolled_at: new Date().toISOString()
    },
    error: null
  }
}

export const createDonation = async (donation: any) => {
  // Mock donation creation
  return {
    id: 'mock_donation_' + Date.now(),
    ...donation,
    created_at: new Date().toISOString()
  }
}
