'use client'

import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import { MapPin, Users, DollarSign, Target, TrendingUp, Building2 } from 'lucide-react'
import { getCityBySlug, type CityData } from '@/lib/cities'
import { fundingOpportunities } from '@/lib/fundingData'
import { useLocation } from '@/contexts/LocationContext'
import FundingModal from '@/components/FundingModal'
import LocationModal from '@/components/LocationModal'

interface CityPageProps {
  params: Promise<{
    city: string
  }>
}

export default function CityPage({ params }: CityPageProps) {
  const [city, setCity] = useState<string>('')
  const { userLocation, cityData, isLoading, setManualLocation } = useLocation()
  const [cityInfo, setCityInfo] = useState<CityData | null>(null)
  const [isFundingModalOpen, setIsFundingModalOpen] = useState(false)
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)
  const [localOpportunities, setLocalOpportunities] = useState<any[]>([])

  // Handle async params for Next.js 15
  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params
      setCity(resolvedParams.city)
    }
    getParams()
  }, [params])

  useEffect(() => {
    if (!city) return
    
    const cityData = getCityBySlug(city)
    if (!cityData) {
      notFound()
    }
    setCityInfo(cityData)
    
    // Filter funding opportunities for this city
    const local = fundingOpportunities.filter(opp => 
      cityData.fundingOpportunities.includes(opp.id)
    )
    setLocalOpportunities(local)
  }, [city])

  if (!cityInfo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading city information...</p>
        </div>
      </div>
    )
  }

  const progressPercentage = (cityInfo.progress.fundsRaised / cityInfo.progress.targetGoal) * 100

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-600 to-accent-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <MapPin className="w-8 h-8" />
                <h1 className="text-4xl md:text-5xl font-bold">
                  Beam {cityInfo.name}
                </h1>
              </div>
              <p className="text-xl text-primary-100 max-w-3xl mx-auto">
                {cityInfo.description}
              </p>
              
              {/* Location Status */}
              <div className="mt-8 p-4 bg-white/20 backdrop-blur-sm rounded-lg inline-block">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{cityInfo.name}</div>
                    <div className="text-sm text-primary-100">{cityInfo.state}, {cityInfo.country}</div>
                  </div>
                  <div className="h-8 w-px bg-white/30"></div>
                  <div className="text-center">
                    <div className="text-sm text-primary-100">Your Location</div>
                    <div className="text-lg font-semibold">
                      {userLocation?.city === cityInfo.name ? '✓ Local' : 'Not Local'}
                    </div>
                  </div>
                  <button
                    onClick={() => setIsLocationModalOpen(true)}
                    className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm"
                  >
                    Change Location
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Progress Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {cityInfo.name} Progress
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Track our progress in transforming education in {cityInfo.name}
              </p>
            </motion.div>

            {/* Progress Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="bg-primary-100 p-6 rounded-2xl">
                  <DollarSign className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-primary-600">
                    ${(cityInfo.progress.fundsRaised / 1000).toFixed(0)}K
                  </div>
                  <div className="text-sm text-gray-600">Funds Raised</div>
                </div>
              </motion.div>

              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="bg-green-100 p-6 rounded-2xl">
                  <Target className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-green-600">
                    ${(cityInfo.progress.targetGoal / 1000).toFixed(0)}K
                  </div>
                  <div className="text-sm text-gray-600">Target Goal</div>
                </div>
              </motion.div>

              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="bg-purple-100 p-6 rounded-2xl">
                  <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-purple-600">
                    {cityInfo.progress.activePartnerships}
                  </div>
                  <div className="text-sm text-gray-600">Active Partnerships</div>
                </div>
              </motion.div>

              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="bg-orange-100 p-6 rounded-2xl">
                  <TrendingUp className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-orange-600">
                    ${(cityInfo.progress.commitments / 1000).toFixed(0)}K
                  </div>
                  <div className="text-sm text-gray-600">Commitments</div>
                </div>
              </motion.div>
            </div>

            {/* Progress Bar */}
            <motion.div 
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-primary-500 to-accent-500 h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1, delay: 0.8 }}
                />
              </div>
              <div className="text-center mt-2 text-sm text-gray-600">
                {progressPercentage.toFixed(1)}% of goal reached
              </div>
            </motion.div>
          </div>
        </section>

        {/* Student Organizations */}
        {cityInfo.studentOrgs.length > 0 && (
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div 
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Student Organizations in {cityInfo.name}
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Meet the student groups driving change in {cityInfo.name}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cityInfo.studentOrgs.map((org, index) => (
                  <motion.div
                    key={org.name}
                    className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="text-center mb-4">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        org.status === 'active' ? 'bg-green-100 text-green-800' :
                        org.status === 'forming' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {org.status.charAt(0).toUpperCase() + org.status.slice(1)}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                      {org.name}
                    </h3>
                    
                    <p className="text-gray-600 text-center mb-4">
                      {org.institution}
                    </p>
                    
                    <div className="text-center mb-4">
                      <div className="text-2xl font-bold text-primary-600">{org.members}</div>
                      <div className="text-sm text-gray-500">Members</div>
                    </div>
                    
                    <p className="text-gray-600 text-center text-sm leading-relaxed">
                      {org.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Local Funding Opportunities */}
        {localOpportunities.length > 0 && (
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div 
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Local Funding Opportunities
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Discover partnership opportunities available in {cityInfo.name}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {localOpportunities.map((opportunity, index) => (
                  <motion.div
                    key={opportunity.id}
                    className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">{opportunity.name}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        opportunity.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {opportunity.status}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">
                      {opportunity.details || 'No details available'}
                    </p>
                    
                    <div className="text-sm text-gray-500">
                      Category: {opportunity.category}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <button
                  onClick={() => setIsFundingModalOpen(true)}
                  className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl text-lg"
                >
                  Partner With Us in {cityInfo.name}
                </button>
              </motion.div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary-600 to-accent-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Education in {cityInfo.name}?
              </h2>
              <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
                Join us in creating community-owned education hubs that benefit {cityInfo.name} and surrounding areas.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setIsFundingModalOpen(true)}
                  className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
                >
                  Partner With Us
                </button>
                <button
                  onClick={() => setIsLocationModalOpen(true)}
                  className="bg-white/20 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/30 transition-colors border border-white/30"
                >
                  Change Location
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Funding Modal */}
      <FundingModal 
        isOpen={isFundingModalOpen}
        onClose={() => setIsFundingModalOpen(false)}
      />

      {/* Location Modal */}
      <LocationModal 
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />
    </>
  )
}
