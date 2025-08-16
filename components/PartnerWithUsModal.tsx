'use client'

import { motion } from 'framer-motion'
import { Users2, Building, Users, Globe, Award, Target } from 'lucide-react'

const partnershipTypes = [
  {
    icon: Building,
    title: 'Educational Institutions',
    description: 'Partner with schools, colleges, and universities to expand program reach',
    benefits: ['Shared resources', 'Joint curriculum development', 'Student exchange programs', 'Research collaboration']
  },
  {
    icon: Users,
    title: 'Community Organizations',
    description: 'Work with nonprofits and community groups to address local needs',
    benefits: ['Local program delivery', 'Community engagement', 'Resource sharing', 'Impact measurement']
  },
  {
    icon: Globe,
    title: 'Corporate Partners',
    description: 'Collaborate with businesses for workforce development and CSR initiatives',
    benefits: ['Workforce training', 'Internship programs', 'Funding opportunities', 'Industry expertise']
  },
  {
    icon: Target,
    title: 'Government Agencies',
    description: 'Partner with local and state agencies for public education initiatives',
    benefits: ['Policy alignment', 'Public funding', 'Regulatory support', 'Scale opportunities']
  }
]

const partnershipProcess = [
  { step: 1, title: 'Initial Discussion', description: 'Schedule a meeting to explore partnership opportunities' },
  { step: 2, title: 'Needs Assessment', description: 'Identify mutual goals and program alignment' },
  { step: 3, title: 'Partnership Design', description: 'Develop a customized collaboration framework' },
  { step: 4, title: 'Implementation', description: 'Launch programs and monitor progress together' }
]

const successMetrics = [
  { metric: 'Partnerships Formed', value: '89+', icon: Users2 },
  { metric: 'Programs Delivered', value: '156+', icon: Target },
  { metric: 'Communities Served', value: '23+', icon: Users },
  { metric: 'Impact Score', value: '94%', icon: Award }
]

export default function PartnerWithUsModal() {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-secondary-100 rounded-full flex items-center justify-center">
          <Users2 className="w-8 h-8 text-secondary-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Build Something Amazing Together
        </h3>
        <p className="text-gray-600">
          Join forces with BEAM Education to create lasting impact in communities nationwide
        </p>
      </div>

      {/* Partnership Types */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Partnership Opportunities</h4>
        <div className="grid gap-4">
          {partnershipTypes.map((type, index) => (
            <motion.div
              key={type.title}
              className="bg-gray-50 rounded-lg p-4 border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <type.icon className="w-5 h-5 text-secondary-600" />
                </div>
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-900 mb-1">{type.title}</h5>
                  <p className="text-sm text-gray-600 mb-2">{type.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {type.benefits.map((benefit) => (
                      <span
                        key={benefit}
                        className="text-xs bg-white px-2 py-1 rounded-full border border-gray-200 text-gray-700"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Partnership Process */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Partnership Process</h4>
        <div className="grid gap-4">
          {partnershipProcess.map((step, index) => (
            <motion.div
              key={step.step}
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="w-8 h-8 bg-secondary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
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

      {/* Success Metrics */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Our Partnership Success</h4>
        <div className="grid grid-cols-2 gap-4">
          {successMetrics.map((metric, index) => (
            <motion.div
              key={metric.metric}
              className="text-center bg-white rounded-lg p-4 border border-gray-200"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="w-12 h-12 mx-auto mb-2 bg-secondary-100 rounded-lg flex items-center justify-center">
                <metric.icon className="w-6 h-6 text-secondary-600" />
              </div>
              <div className="text-2xl font-bold text-secondary-600 mb-1">{metric.value}</div>
              <div className="text-sm text-gray-600">{metric.metric}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-4">
        <button className="btn-secondary w-full text-lg py-3">
          Schedule Partnership Discussion
        </button>
        <p className="text-sm text-gray-500 mt-2">
          Let's explore how we can work together to create impact
        </p>
      </div>
    </div>
  )
}
