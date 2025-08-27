'use client'

import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import EquipmentNeedsModal from './EquipmentNeedsModal'

// Simple SVG icons to avoid lucide-react import issues
const ArrowRightIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
)

const Building2Icon = () => (
  <svg className="w-8 h-8 text-accent-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
)

const UsersIcon = () => (
  <svg className="w-8 h-8 text-accent-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
  </svg>
)

const HeartIcon = () => (
  <svg className="w-8 h-8 text-accent-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
)

const WrenchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

export default function Hero() {
  const [isEquipmentModalOpen, setIsEquipmentModalOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  
  // Motion values for smooth transitions
  const opacity = useMotionValue(1)
  const scale = useMotionValue(1)
  const y = useMotionValue(0)

  // Transform values for hover effects
  const titleOpacity = useTransform(opacity, [0, 1], [0.3, 1])
  const buttonOpacity = useTransform(opacity, [0, 1], [0.5, 1])
  const iconScale = useTransform(scale, [0.8, 1], [0.8, 1])

  useEffect(() => {
    if (isHovered) {
      opacity.set(1)
      scale.set(1)
      y.set(0)
    } else {
      opacity.set(0.3)
      scale.set(0.95)
      y.set(10)
    }
  }, [isHovered, opacity, scale, y])

  return (
    <>
      <section 
        ref={sectionRef}
        className="relative bg-gradient-primary text-white overflow-hidden min-h-screen flex items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://liclwdxursggsdzfrfnd.supabase.co/storage/v1/object/public/home/11025489-hd_4096_2160_25fps.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/80 to-accent-600/80"></div>
        <div className="absolute inset-0 bg-black/30"></div>
        
        <div className="relative max-w-7xl mx-auto section-padding w-full">
          <div className="text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              style={{ opacity: titleOpacity }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Turning Schools into
              <span className="block text-accent-300">Community-Owned Education Hubs</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto text-primary-100"
              style={{ opacity: titleOpacity }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Beam's Education NGO transforms existing properties into collaborative spaces where students practice trades, 
              communities access courses, and owners gain new revenue pathways while transferring equity to the people.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              style={{ opacity: buttonOpacity, y }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <button className="btn-secondary text-lg px-8 py-3 flex items-center gap-2 hover:scale-105 transition-transform">
                See How It Works
                <ArrowRightIcon />
              </button>
              <button className="btn-outline text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-primary-600 hover:scale-105 transition-transform">
                Partner With Us
              </button>
              <button 
                onClick={() => setIsEquipmentModalOpen(true)}
                className="btn-outline text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-primary-600 flex items-center gap-2 hover:scale-105 transition-transform"
              >
                <WrenchIcon />
                Equipment Needs
              </button>
            </motion.div>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
            style={{ scale: iconScale }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="text-center group">
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors">
                <Building2Icon />
              </div>
              <h3 className="text-xl font-semibold mb-2">Property Transformation</h3>
              <p className="text-gray-200">Convert existing buildings into multi-use education hubs</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors">
                <UsersIcon />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Ownership</h3>
              <p className="text-gray-200">Equity transfer from property owners to communities</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors">
                <HeartIcon />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sustainable Impact</h3>
              <p className="text-gray-200">Revenue-generating programs that serve local needs</p>
            </div>
          </motion.div>
        </div>
      </section>

      <EquipmentNeedsModal 
        isOpen={isEquipmentModalOpen} 
        onClose={() => setIsEquipmentModalOpen(false)} 
      />
    </>
  )
}
