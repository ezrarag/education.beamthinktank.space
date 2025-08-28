'use client'

import { motion } from 'framer-motion'

// Simple SVG icons to avoid any import issues
const BuildingIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
)

const TrendingUpIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
)

const GraduationCapIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
  </svg>
)

const UsersIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
  </svg>
)

const HandshakeIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
  </svg>
)

const TargetIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
)

export default function EquityCollaborationModel() {
  const partnershipSteps = [
    {
      title: "Property Assessment",
      description: "Beam evaluates your property's potential for multi-use education programming",
      icon: BuildingIcon,
      color: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      title: "Revenue Planning",
      description: "Design additional revenue streams while maintaining your current business",
      icon: TrendingUpIcon,
      color: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      title: "Student Integration",
      description: "Students from our programs help operate and manage new services",
      icon: GraduationCapIcon,
      color: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      title: "Community Partnership",
      description: "Build relationships with local organizations and community members",
      icon: UsersIcon,
      color: "bg-orange-100",
      iconColor: "text-orange-600"
    },
    {
      title: "Equity Transfer",
      description: "Gradual transition of ownership to community through revenue sharing",
      icon: HandshakeIcon,
      color: "bg-red-100",
      iconColor: "text-red-600"
    },
    {
      title: "Legacy Building",
      description: "Create lasting impact while maintaining financial security",
      icon: TargetIcon,
      color: "bg-indigo-100",
      iconColor: "text-indigo-600"
    }
  ]

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How Beam Partners with Property Owners & Students
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our collaborative approach creates win-win partnerships that benefit property owners, students, and communities
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partnershipSteps.map((step, index) => (
            <motion.div
              key={step.title}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className={`${step.color} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
                <div className={step.iconColor}>
                  <step.icon />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 text-center mb-3">
                {step.title}
              </h3>
              
              <p className="text-gray-600 text-center text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-16 text-center p-8 bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Partnership Benefits
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">Property Owners</div>
              <p className="text-gray-700">Maintain revenue, build legacy, smooth transition</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-600 mb-2">Students</div>
              <p className="text-gray-700">Real-world experience, skill development, community impact</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">Communities</div>
              <p className="text-gray-700">Access to education, services, and ownership</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
