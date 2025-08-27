'use client'

import { motion } from 'framer-motion'
import { Building2, Heart, ArrowRight, Users, Target } from 'lucide-react'
import { useState } from 'react'

export default function UpdatedCTASection() {
  const [activeTab, setActiveTab] = useState<'owners' | 'donors'>('owners')

  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 to-accent-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Property?
          </h2>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            Join us in creating community-owned education hubs that benefit everyone
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-1">
            <button
              onClick={() => setActiveTab('owners')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === 'owners'
                  ? 'bg-white text-primary-600 shadow-lg'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <Building2 className="w-5 h-5 inline mr-2" />
              Property Owners
            </button>
            <button
              onClick={() => setActiveTab('donors')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === 'donors'
                  ? 'bg-white text-primary-600 shadow-lg'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <Heart className="w-5 h-5 inline mr-2" />
              Donors & Supporters
            </button>
          </div>
        </motion.div>

        {/* Content Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div 
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {activeTab === 'owners' ? (
              <div>
                <div className="flex justify-center lg:justify-start mb-6">
                  <div className="bg-white/20 p-4 rounded-full">
                    <Building2 className="w-12 h-12 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  Partner with us: Keep revenue, build legacy, and transition your building into community hands.
                </h3>
                <p className="text-primary-100 mb-6 text-lg leading-relaxed">
                  Transform your property from a single-use facility into a multi-revenue education hub. 
                  Maintain your income while creating lasting community impact and a smooth transition to community ownership.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent-300 rounded-full"></div>
                    <span className="text-primary-100">Maintain current revenue streams</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent-300 rounded-full"></div>
                    <span className="text-primary-100">Add new revenue opportunities</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent-300 rounded-full"></div>
                    <span className="text-primary-100">Build community legacy</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent-300 rounded-full"></div>
                    <span className="text-primary-100">Smooth ownership transition</span>
                  </div>
                </div>

                <button className="btn-secondary text-lg px-8 py-4 flex items-center gap-2 mx-auto lg:mx-0">
                  Partner With Us
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div>
                <div className="flex justify-center lg:justify-start mb-6">
                  <div className="bg-white/20 p-4 rounded-full">
                    <Heart className="w-12 h-12 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  Support equipment, renovations, and buyouts that turn schools into community-owned hubs.
                </h3>
                <p className="text-primary-100 mb-6 text-lg leading-relaxed">
                  Your donations directly fund the transformation of educational spaces, providing 
                  equipment, renovations, and supporting the community buyout process.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent-300 rounded-full"></div>
                    <span className="text-primary-100">Fund essential equipment and renovations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent-300 rounded-full"></div>
                    <span className="text-primary-100">Support community buyout initiatives</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent-300 rounded-full"></div>
                    <span className="text-primary-100">Create lasting community impact</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent-300 rounded-full"></div>
                    <span className="text-primary-100">Transform educational spaces</span>
                  </div>
                </div>

                <button className="btn-secondary text-lg px-8 py-4 flex items-center gap-2 mx-auto lg:mx-0">
                  Make a Donation
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </motion.div>

          {/* Right Content - Visual/Stats */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {activeTab === 'owners' ? (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h4 className="text-xl font-bold mb-6">Property Owner Benefits</h4>
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white/20 rounded-lg p-4">
                    <div className="text-2xl font-bold text-accent-300">72%</div>
                    <div className="text-sm text-primary-100">Revenue Increase</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4">
                    <div className="text-2xl font-bold text-accent-300">5-7 Years</div>
                    <div className="text-sm text-primary-100">Transition Timeline</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4">
                    <div className="text-2xl font-bold text-accent-300">$310K</div>
                    <div className="text-sm text-primary-100">Annual Revenue Potential</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h4 className="text-xl font-bold mb-6">Donation Impact</h4>
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white/20 rounded-lg p-4">
                    <div className="text-2xl font-bold text-accent-300">$310K</div>
                    <div className="text-sm text-primary-100">Total Equipment Needs</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4">
                    <div className="text-2xl font-bold text-accent-300">16</div>
                    <div className="text-sm text-primary-100">Equipment Categories</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4">
                    <div className="text-2xl font-bold text-accent-300">300+</div>
                    <div className="text-sm text-primary-100">People Served Daily</div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
