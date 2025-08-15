'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, ChevronDown, Search } from 'lucide-react'

const cities = [
  { id: 'nyc', name: 'New York City', state: 'NY', programs: 24, classes: 156 },
  { id: 'la', name: 'Los Angeles', state: 'CA', programs: 18, classes: 128 },
  { id: 'chicago', name: 'Chicago', state: 'IL', programs: 15, classes: 98 },
  { id: 'miami', name: 'Miami', state: 'FL', programs: 12, classes: 76 },
  { id: 'seattle', name: 'Seattle', state: 'WA', programs: 10, classes: 64 },
  { id: 'austin', name: 'Austin', state: 'TX', programs: 8, classes: 52 },
  { id: 'denver', name: 'Denver', state: 'CO', programs: 7, classes: 45 },
  { id: 'atlanta', name: 'Atlanta', state: 'GA', programs: 9, classes: 58 },
]

export default function CitySelector() {
  const [selectedCity, setSelectedCity] = useState(cities[0])
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.state.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <section className="section-padding bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Choose Your City
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find BEAM Education programs and classes in your area. Each city offers unique 
            academic and social work opportunities tailored to local community needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* City Selection */}
          <div className="space-y-6">
            <div className="relative">
              <div className="relative">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="w-full flex items-center justify-between p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-primary-500 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary-600" />
                    <span className="text-lg font-medium">
                      {selectedCity.name}, {selectedCity.state}
                    </span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-80 overflow-y-auto"
                >
                  <div className="p-3 border-b border-gray-200">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search cities..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                  
                  <div className="p-2">
                    {filteredCities.map((city) => (
                      <button
                        key={city.id}
                        onClick={() => {
                          setSelectedCity(city)
                          setIsOpen(false)
                          setSearchTerm('')
                        }}
                        className={`w-full text-left p-3 rounded-md hover:bg-gray-50 transition-colors ${
                          selectedCity.id === city.id ? 'bg-primary-50 text-primary-700' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{city.name}, {city.state}</div>
                            <div className="text-sm text-gray-500">
                              {city.programs} programs • {city.classes} classes
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold mb-4">City Overview</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-primary-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary-600">{selectedCity.programs}</div>
                  <div className="text-sm text-gray-600">Active Programs</div>
                </div>
                <div className="text-center p-4 bg-secondary-50 rounded-lg">
                  <div className="text-2xl font-bold text-secondary-600">{selectedCity.classes}</div>
                  <div className="text-sm text-gray-600">Available Classes</div>
                </div>
              </div>
            </div>
          </div>

          {/* City Details */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-semibold mb-4">
              Programs in {selectedCity.name}
            </h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg border-l-4 border-primary-500">
                <h4 className="font-semibold text-primary-800 mb-2">Academic Programs</h4>
                <p className="text-primary-700 text-sm">
                  STEM education, language arts, mathematics, and advanced placement courses
                </p>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-secondary-50 to-secondary-100 rounded-lg border-l-4 border-secondary-500">
                <h4 className="font-semibold text-secondary-800 mb-2">Social Work Programs</h4>
                <p className="text-secondary-700 text-sm">
                  Community outreach, mental health support, youth development, and family services
                </p>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-accent-50 to-accent-100 rounded-lg border-l-4 border-accent-500">
                <h4 className="font-semibold text-accent-800 mb-2">Specialized Training</h4>
                <p className="text-accent-700 text-sm">
                  Professional development, certification programs, and skill-building workshops
                </p>
              </div>
            </div>
            
            <button className="w-full mt-6 btn-primary">
              View All Programs in {selectedCity.name}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
