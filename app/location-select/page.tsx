'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { MapPin, Globe, Users, Building2 } from 'lucide-react'
import { useLocation } from '@/contexts/LocationContext'
import { cities, cityNames } from '@/lib/cities'
import LocationModal from '@/components/LocationModal'

export default function LocationSelectPage() {
  const router = useRouter()
  const { userLocation, isLoading, error } = useLocation()
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)
  const [selectedCity, setSelectedCity] = useState<string>('')

  // Redirect if location is already detected
  useEffect(() => {
    if (userLocation && !isLoading) {
      const citySlug = Object.values(cities).find(
        city => city.name === userLocation.city
      )?.slug
      
      if (citySlug) {
        router.push(`/${citySlug}`)
      }
    }
  }, [userLocation, isLoading, router])

  const handleCitySelect = (cityName: string) => {
    const city = Object.values(cities).find(c => c.name === cityName)
    if (city) {
      router.push(`/${city.slug}`)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Detecting your location...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-primary-600 to-accent-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-8">
              <div className="bg-white/20 p-6 rounded-full backdrop-blur-sm">
                <Globe className="w-16 h-16" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Where are you located?
            </h1>
            
            <p className="text-xl text-primary-100 max-w-3xl mx-auto mb-8">
              Help us show you relevant local opportunities, partnerships, and progress in your area.
            </p>

            {error && (
              <div className="bg-red-500/20 border border-red-400 rounded-lg p-4 max-w-md mx-auto mb-8">
                <p className="text-red-200">
                  Location detection failed: {error}. Please select your location manually.
                </p>
              </div>
            )}
          </motion.div>

          {/* City Selection Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {Object.values(cities).map((city, index) => (
              <motion.button
                key={city.slug}
                onClick={() => handleCitySelect(city.name)}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <div className="text-center">
                  <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors">
                    <MapPin className="w-8 h-8" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{city.name}</h3>
                  <p className="text-primary-100 text-sm mb-4">{city.state}, {city.country}</p>
                  
                  <div className="space-y-2 text-xs text-primary-100">
                    <div className="flex items-center justify-between">
                      <span>Student Orgs:</span>
                      <span className="font-semibold">{city.studentOrgs.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Partnerships:</span>
                      <span className="font-semibold">{city.progress.activePartnerships}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Progress:</span>
                      <span className="font-semibold">
                        {((city.progress.fundsRaised / city.progress.targetGoal) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Manual Selection */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <p className="text-primary-100 mb-6">
              Don't see your city? We're expanding to new locations.
            </p>
            
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl text-lg"
            >
              Select Different Location
            </button>
          </motion.div>
        </div>
      </div>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Location Matters
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get personalized access to local opportunities and community impact
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <div className="bg-primary-100 p-6 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-10 h-10 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Local Partnerships</h3>
              <p className="text-gray-600">
                Connect with institutions and organizations in your area for meaningful collaborations.
              </p>
            </motion.div>

            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <div className="bg-green-100 p-6 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Student Organizations</h3>
              <p className="text-gray-600">
                Join or form BEAM student groups at your local universities and colleges.
              </p>
            </motion.div>

            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <div className="bg-purple-100 p-6 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community Impact</h3>
              <p className="text-gray-600">
                See how your involvement contributes to local education transformation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location Modal */}
      <LocationModal 
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />
    </>
  )
}
