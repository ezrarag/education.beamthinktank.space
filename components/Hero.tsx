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

const WrenchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

interface HeroProps {
  cityName?: string
}

export default function Hero({ cityName }: HeroProps) {
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
        className="relative bg-gradient-primary text-white overflow-hidden min-h-screen flex items-center pt-16"
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
            {cityName && (
              <motion.div 
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-white border border-white/30">
                  🎯 Serving {cityName} and surrounding areas
                </span>
              </motion.div>
            )}
            
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              style={{ opacity: titleOpacity }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Equity Collaboration:
              <span className="block text-accent-300">Transforming Properties into Education Hubs</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto text-primary-100"
              style={{ opacity: titleOpacity }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Transform single-use properties into multi-revenue education hubs serving diverse community needs.
              {cityName && ` Join us in building a stronger educational foundation in ${cityName}.`}
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
        </div>
      </section>

      <EquipmentNeedsModal 
        isOpen={isEquipmentModalOpen} 
        onClose={() => setIsEquipmentModalOpen(false)} 
      />
    </>
  )
}
