'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MapPin, Check } from 'lucide-react'
import { cities, cityNames } from '@/lib/cities'
import { useLocation } from '@/contexts/LocationContext'

interface LocationModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LocationModal({ isOpen, onClose }: LocationModalProps) {
  const { setManualLocation } = useLocation()
  const [selectedCity, setSelectedCity] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCities = cityNames.filter(city => 
    city.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCitySelect = (cityName: string) => {
    const city = Object.values(cities).find(c => c.name === cityName)
    if (city) {
      setManualLocation(city.name, city.region, city.state, city.country)
      onClose()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedCity) {
      handleCitySelect(selectedCity)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-primary-600" />
                <h2 className="text-xl font-bold text-gray-900">
                  Where are you located?
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-gray-600 mb-6">
                Help us show you relevant local opportunities and partnerships in your area.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Search Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search for your city
                  </label>
                  <input
                    type="text"
                    placeholder="Start typing..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                {/* City List */}
                <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg">
                  {filteredCities.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      No cities found matching "{searchTerm}"
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-200">
                      {filteredCities.map((cityName) => {
                        const city = Object.values(cities).find(c => c.name === cityName)
                        const isSelected = selectedCity === cityName
                        
                        return (
                          <button
                            key={cityName}
                            type="button"
                            onClick={() => setSelectedCity(cityName)}
                            className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                              isSelected ? 'bg-primary-50 border-r-2 border-primary-600' : ''
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium text-gray-900">{cityName}</div>
                                {city && (
                                  <div className="text-sm text-gray-500">
                                    {city.state}, {city.country}
                                  </div>
                                )}
                              </div>
                              {isSelected && (
                                <Check className="w-5 h-5 text-primary-600" />
                              )}
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!selectedCity}
                  className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Set Location
                </button>
              </form>

              {/* Current Supported Cities */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Currently Supported Cities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cityNames.map(cityName => (
                    <span
                      key={cityName}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {cityName}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
