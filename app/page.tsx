'use client';

import HeroSmallsloganFramerComponent from '../framer/hero-smallslogan';
import HeroItemsFramerComponent from '../framer/hero-items';
import AllMainMenuFramerComponent from '../framer/all-main-menu';
import ButtonFramerComponent from '../framer/button';
import AdvlogoFramerComponent from '../framer/advlogo';
import OtherFramerComponent from '../framer/other';
import CustomHamburgerMenu from '@/components/CustomHamburgerMenu';
import DropdownMenu from '@/components/DropdownMenu';
import VideoLightbox from '@/components/VideoLightbox';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HomePage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState({ url: '', title: '' });

  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [schoolsDropdownOpen, setSchoolsDropdownOpen] = useState(false);

  const openLightbox = (videoUrl: string, title: string) => {
    setCurrentVideo({ url: videoUrl, title });
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const toggleSchoolsDropdown = () => {
    setSchoolsDropdownOpen(!schoolsDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (schoolsDropdownOpen && !target.closest('.schools-dropdown-container')) {
        setSchoolsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [schoolsDropdownOpen]);





  return (
    <div className="h-screen bg-black text-white relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://liclwdxursggsdzfrfnd.supabase.co/storage/v1/object/public/home/pexels-katerina-holmes-5905441.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>



      {/* Header Section */}
      <header className="relative z-20 px-6 py-4" style={{ backgroundColor: 'transparent !important' }}>
        <div className="flex items-center justify-between">
          {/* Left - Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-white tracking-wide">EDUCATION</h1>
          </div>

          {/* Center - Contact Info */}
          <div className="hidden lg:flex items-center space-x-32 text-sm tracking-wide">
            <span>Atlanta, Georgia</span>
            <span>About</span>
          </div>

          {/* Right - Buttons and Menu */}
          <div className="flex items-center space-x-4">
            {/* See Schools Button with Dropdown */}
            <div className="flex items-center relative schools-dropdown-container">
              <div className="bg-transparent border border-white/20 rounded-full px-6 py-2 shadow-lg flex items-center justify-between w-48">
                <button 
                  onClick={toggleSchoolsDropdown}
                  className="text-white font-medium text-sm"
                >
                  See "schools"
                </button>
                
                {/* Yellow Arrow Button */}
                <button 
                  onClick={toggleSchoolsDropdown}
                  className={`w-7 h-7 bg-yellow-400 rounded-full flex items-center justify-center hover:bg-yellow-300 transition-colors shadow-lg transform transition-transform duration-200 ${
                    schoolsDropdownOpen ? 'rotate-180' : ''
                  }`}
                >
                  <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Schools Dropdown */}
              <AnimatePresence>
                {schoolsDropdownOpen && (
                  <motion.div 
                    className="absolute top-full left-0 mt-2 w-64 z-50"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="space-y-2">
                      <motion.div
                        className="bg-transparent border border-white/20 rounded-full px-6 py-2 shadow-lg"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1, duration: 0.3 }}
                      >
                        <button className="text-white font-medium text-sm w-full text-left">
                          Daycare @ Vine City
                        </button>
                      </motion.div>
                      
                      <motion.div
                        className="bg-transparent border border-white/20 rounded-full px-6 py-2 shadow-lg"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                      >
                        <button className="text-white font-medium text-sm w-full text-left">
                          High School @ Old Fourth Ward
                        </button>
                      </motion.div>
                      
                      <motion.div
                        className="bg-transparent border border-white/20 rounded-full px-6 py-2 shadow-lg"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.3 }}
                      >
                        <button className="text-white font-medium text-sm w-full text-left">
                          Proposed Site @ Bankhead
                        </button>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <CustomHamburgerMenu />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-20 flex-1 flex flex-col justify-between">
        {/* Top Section - Company Info */}
        <div className="px-6 pt-60">
          <div className="flex justify-start ml-16">
            <div className="relative">
              <div className="absolute left-0 top-0 w-px bg-white/30" style={{ height: '50vh' }}>
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/30 to-transparent"></div>
              </div>
              
              <div className="ml-8 space-y-4">
                <div className="text-left space-y-2">
                  <span className="text-sm text-gray-300 tracking-wide">2025</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold tracking-wide">Building</span>
                    <span className="text-sm tracking-wide">real schools, careers, and ownership.</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="text-left space-y-2">
                    <div className="text-2xl lg:text-3xl font-bold text-white tracking-wide relative z-40">
                      <span 
                        className="cursor-pointer hover:text-yellow-400 transition-colors duration-200"
                        onClick={() => openLightbox('https://www.youtube.com/embed/your-equity-video-id', 'Equity')}
                      >
                        Equity
                      </span>
                      <span className="text-white"> + </span>
                      <span 
                        className="cursor-pointer hover:text-yellow-400 transition-colors duration-200"
                        onClick={() => openLightbox('https://www.youtube.com/embed/your-experience-video-id', 'Experience')}
                      >
                        Experience
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Center Section - Services */}
        <div className="flex-1 flex items-center justify-end px-6 mt-20 mr-16">
          <div className="relative">
            {/* Vertical line extending from top of viewport */}
            <div className="absolute left-0 top-0 w-px bg-white/30" style={{ height: '100vh' }}>
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/30 to-transparent"></div>
            </div>
            
            <div className="ml-8 space-y-4">
              <div className="space-y-1">
                <div 
                  className="text-sm text-white cursor-pointer hover:text-yellow-400 transition-colors duration-200 font-normal"
                  onMouseEnter={() => setHoveredItem('parents')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  Parents
                </div>
                <div 
                  className="text-sm text-white cursor-pointer hover:text-yellow-400 transition-colors duration-200 font-normal"
                  onMouseEnter={() => setHoveredItem('students')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  Students
                </div>
                <div 
                  className="text-sm text-white cursor-pointer hover:text-yellow-400 transition-colors duration-200 font-normal"
                  onMouseEnter={() => setHoveredItem('community')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  Community
                </div>
                <div 
                  className="text-sm text-white cursor-pointer hover:text-yellow-400 transition-colors duration-200 font-normal"
                  onMouseEnter={() => setHoveredItem('institutions')}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  Institutions
                </div>
              </div>
            </div>
          </div>
        </div>


      </main>

      {/* Hover Popup */}
      {hoveredItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="bg-transparent border border-white/20 rounded-lg p-4 shadow-xl w-64 h-48 flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-24 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                <span className="text-gray-500 text-sm">Placeholder Image</span>
              </div>
              <div className="text-white text-sm font-medium capitalize">
                {hoveredItem}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Lightbox */}
      <VideoLightbox
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        videoUrl={currentVideo.url}
        title={currentVideo.title}
      />

    </div>
  );
}