'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { MapPin, Globe, Users, Building2, ArrowRight, Check } from 'lucide-react'
import { useLocation } from '@/contexts/LocationContext'
import { cities, cityNames } from '@/lib/cities'
import FundingModal from '@/components/FundingModal'
import LocationModal from '@/components/LocationModal'

export default function LocationDemoPage() {
  const router = useRouter()
  const { userLocation, cityData, isLoading, error, refreshLocation, setManualLocation, clearLocation } = useLocation()
  const [isFundingModalOpen, setIsFundingModalOpen] = useState(false)
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)

  const handleCitySelect = (cityName: string) => {
    const city = Object.values(cities).find(c => c.name === cityName)
    if (city) {
      router.push(`/${city.slug}`)
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Location System Demo
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Test the location-based routing, city pages, and funding modal integration
            </p>
          </div>

          {/* Current Location Status */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Current Location Status</h2>
            
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Detecting location...</p>
              </div>
            ) : userLocation ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary-600" />
                    <span className="font-medium">City:</span>
                    <span className="text-gray-700">{userLocation.city}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-medium">Region:</span>
                    <span className="text-gray-700">{userLocation.region}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-medium">State:</span>
                    <span className="text-gray-700">{userLocation.state}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-medium">Method:</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      userLocation.method === 'browser' ? 'bg-green-100 text-green-800' :
                      userLocation.method === 'ip' ? 'bg-blue-100 text-blue-800' :
                      userLocation.method === 'manual' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {userLocation.method}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="font-medium">Detected:</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      userLocation.detected ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {userLocation.detected ? 'Yes' : 'No'}
                    </span>
                  </div>
                  {userLocation.coordinates && (
                    <>
                      <div className="flex items-center gap-3">
                        <span className="font-medium">Latitude:</span>
                        <span className="text-gray-700">{userLocation.coordinates.lat.toFixed(4)}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-medium">Longitude:</span>
                        <span className="text-gray-700">{userLocation.coordinates.lng.toFixed(4)}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">No location detected</p>
                <button
                  onClick={refreshLocation}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">
                  <strong>Error:</strong> {error}
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Location Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={refreshLocation}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Refresh Location
                </button>
                <button
                  onClick={() => setIsLocationModalOpen(true)}
                  className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                >
                  Change Location
                </button>
                <button
                  onClick={clearLocation}
                  className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  Clear Location
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Features</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setIsFundingModalOpen(true)}
                  className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm"
                >
                  Open Funding Modal
                </button>
                <button
                  onClick={() => router.push('/location-select')}
                  className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm"
                >
                  Location Select Page
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">City Pages</h3>
              <div className="space-y-3">
                {Object.values(cities).slice(0, 3).map(city => (
                  <button
                    key={city.slug}
                    onClick={() => handleCitySelect(city.name)}
                    className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
                  >
                    Visit {city.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* City Information */}
          {cityData && (
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Current City Data</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">City Details</h3>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Name:</span> {cityData.name}</div>
                    <div><span className="font-medium">Region:</span> {cityData.region}</div>
                    <div><span className="font-medium">State:</span> {cityData.state}</div>
                    <div><span className="font-medium">Country:</span> {cityData.country}</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Progress</h3>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Funds Raised:</span> ${(cityData.progress.fundsRaised / 1000).toFixed(0)}K</div>
                    <div><span className="font-medium">Target Goal:</span> ${(cityData.progress.targetGoal / 1000).toFixed(0)}K</div>
                    <div><span className="font-medium">Active Partnerships:</span> {cityData.progress.activePartnerships}</div>
                    <div><span className="font-medium">Student Orgs:</span> {cityData.studentOrgs.length}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Available Cities */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Available Cities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.values(cities).map(city => (
                <div
                  key={city.slug}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleCitySelect(city.name)}
                >
                  <div className="text-center">
                    <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                      <MapPin className="w-6 h-6 text-primary-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{city.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{city.state}</p>
                    <div className="text-xs text-gray-500 space-y-1">
                      <div>Orgs: {city.studentOrgs.length}</div>
                      <div>Partnerships: {city.progress.activePartnerships}</div>
                      <div>Progress: {((city.progress.fundsRaised / city.progress.targetGoal) * 100).toFixed(0)}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
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
