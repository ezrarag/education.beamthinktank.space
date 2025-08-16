'use client'

import { motion } from 'framer-motion'
import { BookOpen, Users, Target, Calendar, MapPin, Star } from 'lucide-react'

const programCategories = [
  {
    icon: BookOpen,
    title: 'Academic Programs',
    description: 'STEM, Language Arts, Advanced Placement, and more',
    programs: ['STEM Education', 'Creative Writing', 'College Prep', 'Test Preparation']
  },
  {
    icon: Users,
    title: 'Social Work Programs',
    description: 'Community outreach, mental health support, and youth development',
    programs: ['Community Outreach', 'Mental Health Support', 'Youth Development', 'Leadership Training']
  },
  {
    icon: Target,
    title: 'Specialized Training',
    description: 'Professional development and skill-building programs',
    programs: ['Instructor Training', 'Community Leadership', 'Digital Skills', 'Wellness Programs']
  }
]

const enrollmentSteps = [
  { step: 1, title: 'Choose Your Program', description: 'Browse our catalog and select the program that fits your goals' },
  { step: 2, title: 'Complete Application', description: 'Fill out our simple online application form' },
  { step: 3, title: 'Schedule Consultation', description: 'Meet with our team to discuss your learning path' },
  { step: 4, title: 'Begin Your Journey', description: 'Start learning with expert instructors and supportive peers' }
]

export default function JoinProgramsModal() {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
          <BookOpen className="w-8 h-8 text-primary-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Transform Your Future with BEAM Education
        </h3>
        <p className="text-gray-600">
          Join thousands of learners who have discovered their potential through our innovative programs
        </p>
      </div>

      {/* Program Categories */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Available Programs</h4>
        <div className="grid gap-4">
          {programCategories.map((category, index) => (
            <motion.div
              key={category.title}
              className="bg-gray-50 rounded-lg p-4 border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <category.icon className="w-5 h-5 text-primary-600" />
                </div>
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-900 mb-1">{category.title}</h5>
                  <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {category.programs.map((program) => (
                      <span
                        key={program}
                        className="text-xs bg-white px-2 py-1 rounded-full border border-gray-200 text-gray-700"
                      >
                        {program}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Enrollment Steps */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">How to Get Started</h4>
        <div className="grid gap-4">
          {enrollmentSteps.map((step, index) => (
            <motion.div
              key={step.step}
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                {step.step}
              </div>
              <div>
                <h5 className="font-medium text-gray-900">{step.title}</h5>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-4">
        <button className="btn-primary w-full text-lg py-3">
          Start Your Application
        </button>
        <p className="text-sm text-gray-500 mt-2">
          Have questions? Contact our enrollment team
        </p>
      </div>
    </div>
  )
}
