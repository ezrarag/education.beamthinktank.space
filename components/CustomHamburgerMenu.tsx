'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

export default function CustomHamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Education', href: '/education' },
    { name: 'Enroll', href: '/enroll' },
    { name: 'Join BEAM', href: '/join-beam' },
    { name: 'Cities', href: '/cities' },
    { name: 'Partner With Us', href: '/partner-with-us' },
    { name: 'Support', href: '/support' }
  ];

  const socialLinks = [
    { name: 'Instagram', href: 'https://instagram.com' },
    { name: 'Behance', href: 'https://behance.net' },
    { name: 'Twitter', href: 'https://twitter.com' }
  ];

  const MenuContent = () => (
    <div className="fixed inset-0 bg-black" style={{ zIndex: 999999 }}>
      {/* Top Section - Logo and Close Button */}
      <div className="flex justify-between items-start p-8">
        {/* Logo */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl lg:text-6xl font-bold text-white tracking-wide pl-4"
        >
          EDUCATION
        </motion.h1>
        
        {/* Close Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          onClick={() => setIsOpen(false)}
          className="w-12 h-12 border border-blue-400 rounded flex items-center justify-center text-white hover:text-gray-300 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Left Side - Contact Information */}
        <div className="w-1/2 flex items-end pb-8 pl-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-white space-y-6"
          >
            {/* Address Block */}
            <div className="space-y-2">
              <div className="text-sm tracking-wide">Atlanta, Georgia</div>
              <div className="text-sm tracking-wide">Str. Believe in Yourself 29</div>
              <div className="text-sm tracking-wide">App. 390</div>
            </div>
            
            {/* Email & Phone Block */}
            <div className="space-y-2">
              <div className="text-sm tracking-wide">hello@beameducation.space</div>
              <div className="text-sm tracking-wide">(555) 123-4567</div>
            </div>
          </motion.div>
        </div>

        {/* Right Side - Navigation */}
        <div className="w-1/2 flex flex-col justify-center pr-8">
          {/* Main Navigation */}
          <motion.nav
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6 mb-12"
          >
            {menuItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="block text-2xl lg:text-3xl font-medium text-white hover:text-gray-300 transition-colors tracking-wide"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </motion.a>
            ))}
          </motion.nav>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="space-y-3"
          >
            {socialLinks.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                className="block text-sm text-white hover:text-gray-300 transition-colors tracking-wide"
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.name}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 flex items-center justify-center text-white hover:text-gray-300 transition-colors"
      >
        <div className="w-6 h-6 flex flex-col justify-center space-y-1">
          <div className={`w-full h-0.5 bg-current transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
          <div className={`w-full h-0.5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></div>
          <div className={`w-full h-0.5 bg-current transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
        </div>
      </button>

      {/* Portal for Menu */}
      {mounted && isOpen && createPortal(
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <MenuContent />
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
