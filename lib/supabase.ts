import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database schema types
export interface City {
  id: string
  name: string
  state: string
  programs_count: number
  classes_count: number
  created_at: string
}

export interface Program {
  id: string
  title: string
  description: string
  category: 'Academic' | 'Social Work'
  level: string
  duration: string
  city_id: string
  instructor_id: string
  max_students: number
  price: number
  created_at: string
}

export interface Class {
  id: string
  title: string
  description: string
  program_id: string
  instructor_id: string
  city_id: string
  schedule: string
  time: string
  start_date: string
  end_date: string
  max_students: number
  enrolled_students: number
  price: number
  status: 'active' | 'full' | 'completed' | 'cancelled'
  created_at: string
}

export interface Instructor {
  id: string
  name: string
  title: string
  bio: string
  expertise: string[]
  education: string
  experience: string
  city_id: string
  rating: number
  total_students: number
  total_classes: number
  specializations: string[]
  languages: string[]
  created_at: string
}

export interface Donation {
  id: string
  donor_name: string
  donor_email: string
  amount: number
  type: 'one-time' | 'monthly'
  message?: string
  stripe_payment_intent_id: string
  status: 'pending' | 'completed' | 'failed'
  created_at: string
}

export interface Milestone {
  id: string
  year: string
  title: string
  description: string
  achievement: string
  icon: string
  created_at: string
}

// Database queries
export const getCities = async (): Promise<City[]> => {
  const { data, error } = await supabase
    .from('cities')
    .select('*')
    .order('name')
  
  if (error) throw error
  return data || []
}

export const getProgramsByCity = async (cityId: string): Promise<Program[]> => {
  const { data, error } = await supabase
    .from('programs')
    .select('*')
    .eq('city_id', cityId)
    .order('title')
  
  if (error) throw error
  return data || []
}

export const getClassesByCity = async (cityId: string): Promise<Class[]> => {
  const { data, error } = await supabase
    .from('classes')
    .select(`
      *,
      programs(title, category),
      instructors(name, title)
    `)
    .eq('city_id', cityId)
    .eq('status', 'active')
    .order('start_date')
  
  if (error) throw error
  return data || []
}

export const getInstructorsByCity = async (cityId: string): Promise<Instructor[]> => {
  const { data, error } = await supabase
    .from('instructors')
    .select('*')
    .eq('city_id', cityId)
    .order('name')
  
  if (error) throw error
  return data || []
}

export const createDonation = async (donation: Omit<Donation, 'id' | 'created_at'>): Promise<Donation> => {
  const { data, error } = await supabase
    .from('donations')
    .insert([donation])
    .select()
    .single()
  
  if (error) throw error
  return data
}

export const getMilestones = async (): Promise<Milestone[]> => {
  const { data, error } = await supabase
    .from('milestones')
    .select('*')
    .order('year', { ascending: false })
  
  if (error) throw error
  return data || []
}
