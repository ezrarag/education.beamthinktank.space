'use client'

import { motion } from 'framer-motion'
import { Heart, DollarSign, Users, Target, Gift, Star } from 'lucide-react'

const donationTiers = [
  {
    id: 1,
    name: 'Community Supporter',
    amount: 25,
    description: 'Help provide educational materials for one student',
    impact: '1 student supported',
    features: ['Thank you email', 'Impact report', 'Newsletter subscription']
  },
  {
    id: 2,
    name: 'Education Champion',
    amount: 50,
    description: 'Support a week of programming for community outreach',
    impact: '1 week of community programs',
    features: ['Personal thank you note', 'Quarterly impact updates', 'Invitation to events']
  },
  {
    id: 3,
    name: 'Program Partner',
    amount: 100,
    description: 'Fund a month of specialized training for instructors',
    impact: '1 month of instructor training',
    features: ['Recognition on website', 'Annual report', 'VIP event access']
  },
  {
    id: 4,
    name: 'Transformational Leader',
    amount: 250,
    description: 'Sponsor a complete program for underserved youth',
    impact: '1 complete youth program',
    features: ['Named scholarship opportunity', 'Personal consultation', 'Legacy recognition']
  }
]

const impactAreas = [
  {
    icon: Users,
    title: 'Student Support',
    description: 'Provide scholarships, materials, and resources for learners',
    color: 'text-primary-600',
    bgColor: 'bg-primary-100'
  },
  {
    icon: Target,
    title: 'Program Development',
    description: 'Fund new initiatives and expand existing programs',
    color: 'text-secondary-600',
    bgColor: 'bg-secondary-100'
  },
  {
    icon: Heart,
    title: 'Community Outreach',
    description: 'Support local community engagement and development',
    color: 'text-accent-600',
    bgColor: 'bg-accent-100'
  },
  {
    icon: Gift,
    title: 'Instructor Training',
    description: 'Invest in professional development for educators',
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  }
]

export default function DonationModal() {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-accent-100 rounded-full flex items-center justify-center">
          <Heart className="w-8 h-8 text-accent-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Your Support Makes a Real Difference
        </h3>
        <p className="text-gray-600">
          Every donation helps us provide quality education and social work programs to communities that need them most
        </p>
      </div>

      {/* Impact Areas */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Where Your Donation Goes</h4>
        <div className="grid grid-cols-2 gap-4">
          {impactAreas.map((area, index) => (
            <motion.div
              key={area.title}
              className="text-center bg-white rounded-lg p-4 border border-gray-200"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`w-12 h-12 mx-auto mb-3 ${area.bgColor} rounded-lg flex items-center justify-center`}>
                <area.icon className={`w-6 h-6 ${area.color}`} />
              </div>
              <h5 className="font-semibold text-gray-900 mb-1">{area.title}</h5>
              <p className="text-xs text-gray-600">{area.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Donation Tiers */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Choose Your Impact Level</h4>
        <div className="grid gap-4">
          {donationTiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-accent-300 transition-colors cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h5 className="font-semibold text-gray-900">{tier.name}</h5>
                  <p className="text-sm text-gray-600">{tier.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-accent-600">${tier.amount}</div>
                  <div className="text-xs text-accent-600 font-medium">{tier.impact}</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {tier.features.map((feature) => (
                  <span
                    key={feature}
                    className="text-xs bg-white px-2 py-1 rounded-full border border-gray-200 text-gray-700"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Custom Amount */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-3">Or Choose Your Own Amount</h4>
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Enter amount"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent"
            min="1"
          />
          <button className="btn-accent px-6 py-2">
            Donate
          </button>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-4">
        <button className="btn-accent w-full text-lg py-3">
          Make a Secure Donation
        </button>
        <p className="text-sm text-gray-500 mt-2">
          All donations are tax-deductible and secure
        </p>
      </div>
    </div>
  )
}
