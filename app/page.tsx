'use client'

import { Suspense, useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useScroll, useTransform } from 'framer-motion'
import { MapPin, ChevronDown, Globe, ArrowRight, Users, Building2, CheckCircle } from 'lucide-react'
import { useLocation } from '@/contexts/LocationContext'
import { cities, cityNames } from '@/lib/cities'

export default function HomePage() {
  const router = useRouter()
  const { userLocation, cityData, isLoading, error, refreshLocation, setManualLocation } = useLocation()
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false)
  const [selectedCity, setSelectedCity] = useState<string>('')
  const [currentSection, setCurrentSection] = useState(0)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Set selected city when location is detected
  useEffect(() => {
    if (userLocation && cityData) {
      setSelectedCity(cityData.name)
    }
  }, [userLocation, cityData])

  // Handle click outside dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCityDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Auto-scroll sections
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSection((prev) => (prev + 1) % 4)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleCitySelect = (cityName: string) => {
    setSelectedCity(cityName)
    setIsCityDropdownOpen(false)
    
    const city = Object.values(cities).find(c => c.name === cityName)
    if (city) {
      setManualLocation(city.name, city.region, city.state, city.country)
    }
  }

  const handleVisitCityPage = () => {
    if (selectedCity) {
      const city = Object.values(cities).find(c => c.name === selectedCity)
      if (city) {
        router.push(`/${city.slug}`)
      }
    }
  }

  // Show loading while detecting location
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div 
            className="w-16 h-16 border-4 border-white border-t-transparent rounded-full mx-auto mb-8"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.p 
            className="text-white text-xl font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Detecting your location...
          </motion.p>
        </motion.div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white overflow-hidden">
      {/* City Location Banner */}
      {selectedCity && (
        <motion.div 
          className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 py-3 px-4">
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-white" />
              <span className="text-sm text-white/90">
                Serving <strong className="text-white">{selectedCity}</strong> and surrounding areas
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-colors text-xs border border-white/20"
                >
                  <Globe className="w-3 h-3" />
                  Change City
                  <ChevronDown className={`w-3 h-3 transition-transform ${isCityDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isCityDropdownOpen && (
                  <motion.div 
                    className="absolute top-full right-0 mt-2 w-48 bg-black/90 backdrop-blur-md rounded-lg border border-white/20 z-50"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="p-2 max-h-48 overflow-y-auto">
                      {Object.values(cities).map(city => (
                        <button
                          key={city.slug}
                          onClick={() => handleCitySelect(city.name)}
                          className={`w-full text-left px-3 py-2 rounded-md text-xs transition-colors ${
                            city.name === selectedCity 
                              ? 'bg-white/20 text-white' 
                              : 'text-white/70 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{city.name}</span>
                            <span className="text-white/50">{city.state}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
              
              <button
                onClick={handleVisitCityPage}
                className="bg-white text-black px-4 py-1.5 rounded-full font-medium hover:bg-gray-100 transition-colors text-xs"
              >
                Visit {selectedCity}
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Error State */}
      {error && (
        <motion.div 
          className="fixed top-0 left-0 right-0 z-50 bg-red-500/20 backdrop-blur-md border-b border-red-500/30"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4">
            <span className="text-red-200 text-sm">
              Location detection failed: {error}
            </span>
            <button
              onClick={refreshLocation}
              className="bg-red-600 text-white px-3 py-1 rounded-full text-xs hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
        
        <motion.div 
          className="relative max-w-7xl mx-auto px-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-8 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="block">Equity</span>
            <span className="block text-blue-400">Collaboration</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-white/80 font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Transform single-use properties into multi-revenue education hubs serving diverse community needs.
            {selectedCity && ` Join us in building a stronger educational foundation in ${selectedCity}.`}
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <button className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 flex items-center gap-2">
              See How It Works
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-black transition-all duration-300 hover:scale-105">
              Partner With Us
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Impact</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Our numbers speak better than words
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: "2000+", label: "Students Served", description: "Across multiple cities" },
              { number: "100+", label: "Projects Launched", description: "Education hubs created" },
              { number: "50+", label: "Partners", description: "Institutions and organizations" },
              { number: "1", label: "Mission", description: "Transform education access" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="text-4xl md:text-5xl font-bold text-blue-400 mb-4"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  {stat.number}
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">{stat.label}</h3>
                <p className="text-white/60">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">How We Do It</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Our work involves many intricate steps and stages
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                number: "01",
                title: "Assessment",
                description: "Evaluate property potential and community needs for education transformation."
              },
              {
                number: "02", 
                title: "Design",
                description: "Create comprehensive plans for multi-use educational spaces and partnerships."
              },
              {
                number: "03",
                title: "Implementation", 
                description: "Execute the transformation with community engagement and sustainable practices."
              }
            ].map((step, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-6xl font-bold text-blue-400 mb-6">{step.number}</div>
                <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
                <p className="text-white/70 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Who Works For You</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              The team which changes the world of education
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Education Specialists", role: "Curriculum Design", icon: Users },
              { name: "Property Experts", role: "Space Transformation", icon: Building2 },
              { name: "Community Leaders", role: "Partnership Development", icon: CheckCircle }
            ].map((member, index) => (
              <motion.div 
                key={index}
                className="text-center p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-20 h-20 bg-blue-400/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <member.icon className="w-10 h-10 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-white/60">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform?</h2>
            <p className="text-xl text-white/70 mb-12 max-w-3xl mx-auto">
              Join us in creating educational spaces that inspire and empower communities
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="bg-blue-400 text-black px-8 py-4 rounded-full font-semibold hover:bg-blue-300 transition-all duration-300 hover:scale-105">
                Start Your Project
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-black transition-all duration-300 hover:scale-105">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
