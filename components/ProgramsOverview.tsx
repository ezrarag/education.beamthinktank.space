'use client'

import { motion } from 'framer-motion'
import { BookOpen, Users, Heart, Target, Award, Globe } from 'lucide-react'

const academicPrograms = [
  {
    icon: BookOpen,
    title: 'STEM Education',
    description: 'Comprehensive science, technology, engineering, and mathematics programs for all ages.',
    features: ['Hands-on experiments', 'Project-based learning', 'Industry partnerships'],
    duration: '8-12 weeks',
    level: 'Beginner to Advanced'
  },
  {
    icon: Target,
    title: 'Language Arts',
    description: 'Develop strong reading, writing, and communication skills through engaging literature.',
    features: ['Creative writing workshops', 'Reading comprehension', 'Public speaking'],
    duration: '6-10 weeks',
    level: 'All Levels'
  },
  {
    icon: Award,
    title: 'Advanced Placement',
    description: 'College-level courses designed to prepare students for higher education success.',
    features: ['College credit eligible', 'Rigorous curriculum', 'Expert instructors'],
    duration: '16-20 weeks',
    level: 'Advanced'
  }
]

const socialWorkPrograms = [
  {
    icon: Users,
    title: 'Community Outreach',
    description: 'Programs focused on building stronger, more connected communities.',
    features: ['Neighborhood initiatives', 'Volunteer coordination', 'Event planning'],
    duration: '4-8 weeks',
    level: 'All Levels'
  },
  {
    icon: Heart,
    title: 'Mental Health Support',
    description: 'Training and support for mental health awareness and intervention.',
    features: ['Crisis intervention', 'Peer support training', 'Wellness workshops'],
    duration: '6-12 weeks',
    level: 'Intermediate'
  },
  {
    icon: Globe,
    title: 'Youth Development',
    description: 'Programs designed to empower young people and build leadership skills.',
    features: ['Leadership training', 'Mentorship programs', 'Life skills development'],
    duration: '8-16 weeks',
    level: 'Teen to Young Adult'
  }
]

export default function ProgramsOverview() {
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
            Our Programs
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            BEAM Education offers a comprehensive range of academic and social work programs 
            designed to empower individuals and strengthen communities.
          </motion.p>
        </div>

        {/* Academic Programs */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-primary-700 mb-4">
              Academic Excellence Programs
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Rigorous, engaging academic programs designed to challenge and inspire learners of all ages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {academicPrograms.map((program, index) => (
              <motion.div
                key={program.title}
                className="card hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <program.icon className="w-8 h-8 text-primary-600" />
                </div>
                
                <h4 className="text-xl font-semibold text-gray-900 mb-3">{program.title}</h4>
                <p className="text-gray-600 mb-4">{program.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {program.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>Duration: {program.duration}</span>
                  <span>Level: {program.level}</span>
                </div>
                
                <button className="w-full btn-primary">
                  Learn More
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Social Work Programs */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-secondary-700 mb-4">
              Social Work & Community Impact
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Transformative programs that build stronger communities and empower individuals to make a difference.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {socialWorkPrograms.map((program, index) => (
              <motion.div
                key={program.title}
                className="card hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="bg-secondary-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <program.icon className="w-8 h-8 text-secondary-600" />
                </div>
                
                <h4 className="text-xl font-semibold text-gray-900 mb-3">{program.title}</h4>
                <p className="text-gray-600 mb-4">{program.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {program.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>Duration: {program.duration}</span>
                  <span>Level: {program.level}</span>
                </div>
                
                <button className="w-full btn-secondary">
                  Learn More
                </button>
              </motion.div>
            ))}
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
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 border border-primary-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of learners and community members who have transformed their lives 
              through BEAM Education programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary text-lg px-8 py-3">
                Browse All Programs
              </button>
              <button className="btn-outline text-lg px-8 py-3">
                Contact Our Team
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
