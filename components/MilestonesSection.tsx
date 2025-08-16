'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Users, MapPin, Award, Target, Heart } from 'lucide-react'
import Modal from './Modal'
import JoinProgramsModal from './JoinProgramsModal'
import PartnerWithUsModal from './PartnerWithUsModal'
import DonationModal from './DonationModal'

const milestones = [
  {
    year: '2018',
    title: 'BEAM Education Founded',
    description: 'Started with a vision to bridge educational gaps in underserved communities',
    achievement: '1 city, 3 programs, 50 students',
    icon: Heart,
    color: 'text-primary-600',
    bgColor: 'bg-primary-100'
  },
  {
    year: '2019',
    title: 'First Expansion',
    description: 'Expanded to 3 cities and launched our first social work programs',
    achievement: '3 cities, 8 programs, 200+ students',
    icon: MapPin,
    color: 'text-secondary-600',
    bgColor: 'bg-secondary-100'
  },
  {
    year: '2020',
    title: 'Digital Transformation',
    description: 'Launched online learning platforms and virtual community programs',
    achievement: '5 cities, 15 programs, 500+ students',
    icon: Target,
    color: 'text-accent-600',
    bgColor: 'bg-accent-100'
  },
  {
    year: '2021',
    title: 'Community Impact Recognition',
    description: 'Received national recognition for community development programs',
    achievement: '8 cities, 25 programs, 1,000+ students',
    icon: Award,
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  {
    year: '2022',
    title: 'Instructor Excellence Program',
    description: 'Launched comprehensive training program for educators and social workers',
    achievement: '12 cities, 40 programs, 1,500+ students',
    icon: Users,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  },
  {
    year: '2023',
    title: 'National Scale Achievement',
    description: 'Reached 20+ cities and established partnerships with major institutions',
    achievement: '20+ cities, 60+ programs, 2,500+ students',
    icon: Trophy,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100'
  }
]

const currentStats = [
  { label: 'Cities Served', value: '23', icon: MapPin, color: 'text-primary-600', bgColor: 'bg-primary-100' },
  { label: 'Active Programs', value: '78', icon: Target, color: 'text-secondary-600', bgColor: 'bg-secondary-100' },
  { label: 'Students Enrolled', value: '2,847', icon: Users, color: 'text-accent-600', bgColor: 'bg-accent-100' },
  { label: 'Expert Instructors', value: '156', icon: Award, color: 'text-green-600', bgColor: 'bg-green-100' },
  { label: 'Community Partners', value: '89', icon: Heart, color: 'text-purple-600', bgColor: 'bg-purple-100' },
  { label: 'Success Rate', value: '94%', icon: Trophy, color: 'text-orange-600', bgColor: 'bg-orange-100' }
]

export default function MilestonesSection() {
  const [activeModal, setActiveModal] = useState<'join' | 'partner' | 'donation' | null>(null)

  const openModal = (modalType: 'join' | 'partner' | 'donation') => {
    setActiveModal(modalType)
  }

  const closeModal = () => {
    setActiveModal(null)
  }

  const getModalContent = () => {
    switch (activeModal) {
      case 'join':
        return <JoinProgramsModal />
      case 'partner':
        return <PartnerWithUsModal />
      case 'donation':
        return <DonationModal />
      default:
        return null
    }
  }

  const getModalTitle = () => {
    switch (activeModal) {
      case 'join':
        return 'Join Our Programs'
      case 'partner':
        return 'Partner With Us'
      case 'donation':
        return 'Make a Donation'
      default:
        return ''
    }
  }

  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our Journey & Achievements
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            From a small community initiative to a nationwide education and social work platform, 
            BEAM Education has been transforming lives and communities since 2018.
          </motion.p>
        </div>

        {/* Current Statistics */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {currentStats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-px w-0.5 h-full bg-gradient-to-b from-primary-200 via-secondary-200 to-accent-200"></div>

          {/* Milestones */}
          <div className="space-y-16">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-4 border-primary-500 rounded-full shadow-lg z-10"></div>

                {/* Content */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-12 h-12 rounded-full ${milestone.bgColor} flex items-center justify-center`}>
                        <milestone.icon className={`w-6 h-6 ${milestone.color}`} />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary-600">{milestone.year}</div>
                        <h3 className="text-lg font-semibold text-gray-900">{milestone.title}</h3>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3">{milestone.description}</p>
                    <div className="text-sm font-medium text-primary-700 bg-primary-50 px-3 py-1 rounded-full inline-block">
                      {milestone.achievement}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Future Vision */}
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 border border-primary-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Our Vision for the Future
            </h3>
            <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
              By 2025, we aim to expand to 50+ cities, serve 10,000+ students annually, and 
              establish BEAM Education as the leading platform for community-driven education 
              and social work programs nationwide.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">50+</div>
                <div className="text-gray-600">Cities by 2025</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary-600 mb-2">10,000+</div>
                <div className="text-gray-600">Annual Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-600 mb-2">200+</div>
                <div className="text-gray-600">Program Partners</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Be Part of Our Story
          </h3>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Join us in our mission to transform education and strengthen communities across the nation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="btn-primary text-lg px-8 py-3"
              onClick={() => openModal('join')}
            >
              Join Our Programs
            </button>
            <button 
              className="btn-outline text-lg px-8 py-3"
              onClick={() => openModal('partner')}
            >
              Partner With Us
            </button>
            <button 
              className="btn-secondary text-lg px-8 py-3"
              onClick={() => openModal('donation')}
            >
              Make a Donation
            </button>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={activeModal !== null}
        onClose={closeModal}
        title={getModalTitle()}
      >
        {getModalContent()}
      </Modal>
    </section>
  )
}
