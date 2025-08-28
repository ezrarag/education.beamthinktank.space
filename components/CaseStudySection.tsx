'use client'

import { motion } from 'framer-motion'
import { Building2, MapPin, DollarSign, Users, Target, TrendingUp } from 'lucide-react'

export default function CaseStudySection() {
  return (
    <section id="demo-case" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Demo Case: South Florida Child Care School (Dr. Moseley's Pilot)
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how Beam transforms a traditional childcare facility into a community-owned education hub
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Property Profile Card */}
          <motion.div 
            className="bg-white rounded-2xl shadow-lg p-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary-100 p-3 rounded-full">
                <Building2 className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Property Profile</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">Fort Lauderdale, FL</span>
              </div>
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">8,500 sq ft • 12 classrooms</span>
              </div>
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">Current Value: $2.1M</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">Current Capacity: 120 children</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Owner Goal</h4>
              <p className="text-blue-800">
                "I want to maintain my childcare business while creating additional revenue streams 
                and eventually transitioning ownership to benefit the community."
              </p>
            </div>
          </motion.div>

          {/* Beam Proposal Card */}
          <motion.div 
            className="bg-white rounded-2xl shadow-lg p-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-accent-100 p-3 rounded-full">
                <Target className="w-6 h-6 text-accent-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Beam Proposal</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-full mt-1">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Childcare Continues</h4>
                  <p className="text-gray-600 text-sm">Maintain existing 120-child capacity with enhanced facilities</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 p-2 rounded-full mt-1">
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Skills Courses Added</h4>
                  <p className="text-gray-600 text-sm">Evening/weekend programs for adults and teens</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-purple-100 p-2 rounded-full mt-1">
                  <Building2 className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Student-Run Units</h4>
                  <p className="text-gray-600 text-sm">Tutoring, after-school programs, summer camps</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-orange-100 p-2 rounded-full mt-1">
                  <Target className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Ownership Pathway</h4>
                  <p className="text-gray-600 text-sm">NGO buyout over 5-7 years with revenue sharing</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-accent-50 rounded-lg">
              <h4 className="font-semibold text-accent-900 mb-2">Projected Impact</h4>
              <p className="text-accent-800">
                Transform from single-use childcare to multi-revenue education hub serving 300+ people daily
              </p>
            </div>
          </motion.div>
        </div>

        {/* Revenue Projections */}
        <motion.div 
          className="mt-16 bg-white rounded-2xl shadow-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Revenue Projections Based on Dr. Moseley's Current Numbers</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">$180K</div>
              <div className="text-blue-800 font-medium">Current Childcare Revenue</div>
              <div className="text-sm text-blue-600 mt-1">120 children @ $1,500/month</div>
            </div>
            
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <div className="text-3xl font-bold text-green-600 mb-2">$45K</div>
              <div className="text-green-800 font-medium">Skills Courses</div>
              <div className="text-sm text-green-600 mt-1">Evening/weekend programs</div>
            </div>
            
            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <div className="text-3xl font-bold text-purple-600 mb-2">$28K</div>
              <div className="text-purple-800 font-medium">Student-Run Units</div>
              <div className="text-sm text-purple-600 mt-1">Tutoring & after-school</div>
            </div>
            
            <div className="text-center p-6 bg-orange-50 rounded-xl">
              <div className="text-3xl font-bold text-orange-600 mb-2">$25K</div>
              <div className="text-orange-800 font-medium">Community Rentals</div>
              <div className="text-sm text-orange-600 mt-1">Events & coworking</div>
            </div>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl">
            <div className="text-4xl font-bold text-gray-900 mb-2">Total: $278K/year</div>
            <div className="text-xl text-gray-700">54% increase from current $180K</div>
            <div className="text-sm text-gray-600 mt-2">Conservative projections based on verified case data</div>
          </div>
        </motion.div>

        {/* Note about projections */}
        <motion.div 
          className="mt-8 text-center p-6 bg-blue-50 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-blue-800 font-medium">
            All projections are conservative and based on verified case data from Dr. Moseley's pilot program.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
