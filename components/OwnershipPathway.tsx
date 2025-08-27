'use client'

import { motion } from 'framer-motion'

// Simple SVG icons to avoid lucide-react import issues
const HandshakeIcon = () => (
  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
  </svg>
)

const TrendingUpIcon = () => (
  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
)

const TargetIcon = () => (
  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
)

const CheckCircleIcon = () => (
  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

export default function OwnershipPathway() {
  const phases = [
    {
      phase: "Phase 1",
      title: "Partnership",
      years: "Years 1–2",
      description: "Establish collaborative programs, begin revenue sharing, and build community engagement",
      color: "bg-blue-500",
      progress: 33
    },
    {
      phase: "Phase 2",
      title: "Revenue Sharing",
      years: "Years 3–5",
      description: "Scale successful programs, increase revenue streams, and prepare for ownership transition",
      color: "bg-green-500",
      progress: 66
    },
    {
      phase: "Phase 3",
      title: "Buyout",
      years: "Years 5–7",
      description: "NGO acquires property equity, completes community ownership transfer",
      color: "bg-purple-500",
      progress: 100
    }
  ]

  const renderIcon = (index: number) => {
    switch (index) {
      case 0:
        return <HandshakeIcon />
      case 1:
        return <TrendingUpIcon />
      case 2:
        return <TargetIcon />
      default:
        return <HandshakeIcon />
    }
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ownership & Transfer Pathway
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A structured approach to transitioning property ownership from individuals to community organizations
          </p>
        </motion.div>

        {/* Timeline Progress Bar */}
        <motion.div 
          className="relative mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex justify-between items-center">
            {phases.map((phase, index) => (
              <div key={phase.phase} className="flex flex-col items-center relative">
                <div className={`${phase.color} w-16 h-16 rounded-full flex items-center justify-center mb-4 relative z-10`}>
                  {renderIcon(index)}
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-bold text-gray-900">{phase.phase}</h3>
                  <p className="text-sm text-gray-600">{phase.years}</p>
                </div>
                
                {/* Progress line */}
                {index < phases.length - 1 && (
                  <div className="absolute top-8 left-1/2 w-full h-1 bg-gray-200 transform -translate-y-1/2">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Phase Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.phase}
              className="bg-white rounded-2xl shadow-lg p-8 relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              <div className="text-center mb-6">
                <div className={`${phase.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  {renderIcon(index)}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{phase.title}</h3>
                <p className="text-lg text-gray-600 font-medium">{phase.years}</p>
              </div>
              
              <p className="text-gray-700 text-center mb-6 leading-relaxed">
                {phase.description}
              </p>
              
              {/* Progress indicator */}
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`${phase.color} h-3 rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: `${phase.progress}%` }}
                ></div>
              </div>
              
              <div className="text-center mt-3">
                <span className="text-sm font-medium text-gray-600">
                  {phase.progress}% Complete
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* End Result */}
        <motion.div 
          className="mt-16 text-center p-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl border-2 border-purple-200"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex justify-center mb-4">
            <div className="bg-purple-500 p-4 rounded-full">
              <CheckCircleIcon />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            End Result: Community-Owned Education Hub
          </h3>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            A sustainable, multi-revenue facility that serves community needs while providing 
            long-term financial stability through diverse programming and community ownership.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
