'use client'

import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Users, Heart } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative bg-gradient-primary text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative max-w-7xl mx-auto section-padding">
        <div className="text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Empowering Communities Through
            <span className="block text-accent-300">Education & Social Work</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            BEAM Education connects learners with expert instructors across multiple cities, 
            offering both academic excellence and community impact through our innovative programs.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button className="btn-secondary text-lg px-8 py-3 flex items-center gap-2">
              Explore Programs
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="btn-outline text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-primary-600">
              Become an Instructor
            </button>
          </motion.div>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center">
            <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-accent-300" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Academic Excellence</h3>
            <p className="text-gray-200">Rigorous curriculum designed for success</p>
          </div>
          
          <div className="text-center">
            <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-accent-300" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Community Impact</h3>
            <p className="text-gray-200">Social work programs that make a difference</p>
          </div>
          
          <div className="text-center">
            <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-accent-300" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Personal Growth</h3>
            <p className="text-gray-200">Transformative learning experiences</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
