'use client'

import { motion } from 'framer-motion'

// Simple SVG icons to avoid lucide-react import issues
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

const BabyIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
)

const BriefcaseIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

const Building2Icon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
)

export default function CollaborativeUseModel() {
  const useCases = [
    {
      title: "University Wing",
      description: "Practice teaching, tuition partnerships with local universities",
      revenue: "$45K/year",
      color: "bg-blue-100",
      iconColor: "text-blue-600",
      iconIndex: 0
    },
    {
      title: "Skills NGO Evening Courses",
      description: "Coding, arts, entrepreneurship programs for adults",
      revenue: "$32K/year",
      color: "bg-green-100",
      iconColor: "text-green-600",
      iconIndex: 1
    },
    {
      title: "Childcare Continuation",
      description: "Anchor revenue stream with enhanced facilities",
      revenue: "$180K/year",
      color: "bg-purple-100",
      iconColor: "text-purple-600",
      iconIndex: 2
    },
    {
      title: "Student-Run Business Units",
      description: "Tutoring, after-school, summer camps",
      revenue: "$28K/year",
      color: "bg-orange-100",
      iconColor: "text-orange-600",
      iconIndex: 3
    },
    {
      title: "Community Rentals",
      description: "Events, coworking, meetings, workshops",
      revenue: "$25K/year",
      color: "bg-red-100",
      iconColor: "text-red-600",
      iconIndex: 4
    }
  ]

  const renderIcon = (iconIndex: number) => {
    switch (iconIndex) {
      case 0:
        return <GraduationCapIcon />
      case 1:
        return <UsersIcon />
      case 2:
        return <BabyIcon />
      case 3:
        return <BriefcaseIcon />
      case 4:
        return <Building2Icon />
      default:
        return <GraduationCapIcon />
    }
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Collaborative Use Model
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform single-use properties into multi-revenue education hubs serving diverse community needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className={`${useCase.color} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
                <div className={useCase.iconColor}>
                  {renderIcon(useCase.iconIndex)}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 text-center mb-3">
                {useCase.title}
              </h3>
              
              <p className="text-gray-600 text-center mb-4 text-sm leading-relaxed">
                {useCase.description}
              </p>
              
              <div className="text-center">
                <div className="inline-block bg-gray-100 px-4 py-2 rounded-full">
                  <span className="text-lg font-semibold text-gray-900">
                    {useCase.revenue}
                  </span>
                </div>
              </div>
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
            Total Projected Revenue: $310K/year
          </h3>
          <p className="text-gray-700 text-lg">
            From single-use childcare ($180K) to multi-revenue hub ($310K) - a 72% increase in property value
          </p>
        </motion.div>
      </div>
    </section>
  )
}
