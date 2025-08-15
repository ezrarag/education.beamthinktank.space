'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Target, Users, DollarSign, Gift, Star } from 'lucide-react'

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

const impactMetrics = [
  { metric: 'Students Supported', value: '2,847', icon: Users, color: 'text-primary-600' },
  { metric: 'Programs Funded', value: '156', icon: Target, color: 'text-secondary-600' },
  { metric: 'Communities Impacted', value: '23', icon: Heart, color: 'text-accent-600' },
  { metric: 'Total Donations', value: '$847,392', icon: DollarSign, color: 'text-green-600' }
]

export default function DonationSection() {
  const [selectedTier, setSelectedTier] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState('')
  const [donationType, setDonationType] = useState<'one-time' | 'monthly'>('one-time')

  const handleDonate = (amount: number) => {
    // This would integrate with Stripe
    console.log(`Donating $${amount} as ${donationType}`)
  }

  return (
    <section className="section-padding bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Support Our Mission
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Your donation helps us provide quality education and social work programs to communities 
            that need them most. Every contribution makes a real difference.
          </motion.p>
        </div>

        {/* Impact Metrics */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {impactMetrics.map((item, index) => (
            <div key={item.metric} className="text-center">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-white shadow-lg flex items-center justify-center`}>
                <item.icon className={`w-8 h-8 ${item.color}`} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{item.value}</div>
              <div className="text-gray-600">{item.metric}</div>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Donation Options */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Choose Your Impact Level
            </h3>

            {/* Donation Type Toggle */}
            <div className="flex bg-white rounded-lg p-1 mb-6 shadow-sm">
              <button
                onClick={() => setDonationType('one-time')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  donationType === 'one-time'
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                One-Time Donation
              </button>
              <button
                onClick={() => setDonationType('monthly')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  donationType === 'monthly'
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Monthly Recurring
              </button>
            </div>

            {/* Donation Tiers */}
            <div className="space-y-4">
              {donationTiers.map((tier) => (
                <div
                  key={tier.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    selectedTier === tier.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 bg-white hover:border-primary-300'
                  }`}
                  onClick={() => setSelectedTier(tier.id)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">{tier.name}</h4>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary-600">${tier.amount}</div>
                      <div className="text-sm text-gray-500">
                        {donationType === 'monthly' ? 'per month' : 'one-time'}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3">{tier.description}</p>
                  <div className="text-sm text-primary-700 font-medium mb-3">
                    Impact: {tier.impact}
                  </div>
                  <ul className="space-y-1">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <Gift className="w-4 h-4 text-primary-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Or enter a custom amount:
              </label>
              <div className="flex gap-3">
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="flex-1 input-field"
                  min="1"
                />
                <button 
                  onClick={() => handleDonate(Number(customAmount))}
                  disabled={!customAmount || Number(customAmount) < 1}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Donate
                </button>
              </div>
            </div>
          </motion.div>

          {/* Donation Benefits & Stories */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Why Your Donation Matters
            </h3>

            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-primary-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Transparency & Accountability</h4>
                </div>
                <p className="text-gray-600">
                  We provide detailed reports on how your donations are used, ensuring you can see 
                  the direct impact of your contribution.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-secondary-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Community-Driven Impact</h4>
                </div>
                <p className="text-gray-600">
                  Your donations support programs that are designed and implemented based on 
                  community needs and feedback.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center">
                    <Target className="w-5 h-5 text-accent-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Measurable Results</h4>
                </div>
                <p className="text-gray-600">
                  We track and report on key metrics including student success rates, community 
                  engagement, and long-term impact indicators.
                </p>
              </div>
            </div>

            {/* Success Story */}
            <div className="mt-8 bg-white rounded-lg p-6 shadow-sm border-l-4 border-primary-500">
              <h4 className="font-semibold text-gray-900 mb-3">Success Story</h4>
              <p className="text-gray-600 mb-3">
                "Thanks to donor support, we were able to launch our Youth Leadership Program 
                in three new cities, reaching 150 additional students who otherwise wouldn't 
                have had access to these opportunities."
              </p>
              <div className="text-sm text-primary-600 font-medium">
                — Maria Santos, Program Director
              </div>
            </div>
          </motion.div>
        </div>

        {/* Donate Now CTA */}
        {selectedTier && (
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-primary-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Make a Difference?
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Your donation of ${donationTiers.find(t => t.id === selectedTier)?.amount} will 
                {donationType === 'monthly' ? ' monthly ' : ' '}
                support: {donationTiers.find(t => t.id === selectedTier)?.impact}
              </p>
              <button 
                onClick={() => handleDonate(donationTiers.find(t => t.id === selectedTier)?.amount || 0)}
                className="btn-primary text-lg px-8 py-3"
              >
                Complete Donation
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
