'use client';

import HeroSmallsloganFramerComponent from '../framer/hero-smallslogan';
import HeroItemsFramerComponent from '../framer/hero-items';
import AllMainMenuFramerComponent from '../framer/all-main-menu';
import ButtonFramerComponent from '../framer/button';
import AdvlogoFramerComponent from '../framer/advlogo';
import OtherFramerComponent from '../framer/other';
import CustomHamburgerMenu from '@/components/CustomHamburgerMenu';
import DropdownMenu from '@/components/DropdownMenu';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
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
            <div className="flex flex-col space-y-1">
              <span>hello@beameducation.space</span>
              <span>(555) 123-4567</span>
            </div>
          </div>

          {/* Right - Buttons and Menu */}
          <div className="flex items-center space-x-6">
            {/* Primary Action Button */}
            <ButtonFramerComponent.Responsive
              link="/contact"
              title="Say 'Hello'"
              variants="White - Big simplelink"
              newTab={false}
              smoothScroll={true}
            />
            
            {/* Yellow Arrow Button */}
            <button className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center hover:bg-yellow-300 transition-colors shadow-lg">
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            <CustomHamburgerMenu />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-20 h-screen flex flex-col justify-between">
        {/* Top Section - Award Info */}
        <div className="px-6 pt-32">
          <div className="flex justify-start">
            <div className="text-left space-y-2">
              <span className="text-sm text-gray-300 tracking-wide">2024</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold tracking-wide">EDU</span>
                <span className="text-sm tracking-wide">Education Excellence Awards</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-start">
            <HeroSmallsloganFramerComponent.Responsive
              partTop="We Craft Education"
              partBottom="Since 2020"
            />
          </div>
        </div>

        {/* Center Section - Services */}
        <div className="flex-1 flex items-center justify-end px-6 -mt-20">
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-white/30">
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/30 to-transparent"></div>
            </div>
            
            <div className="ml-8 space-y-4">
              <HeroItemsFramerComponent.Responsive
                item1st="Academic Programs"
                item2nd="Social Work"
                item3rd="Community Learning"
                item4th=""
              />
            </div>

            {/* Edit Icon */}
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <button className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section - Main Headline */}
        <div className="px-6 pb-32">
          <div className="text-center w-full">
            <h2 className="text-6xl lg:text-8xl xl:text-9xl font-bold leading-tight w-full tracking-wide">
              <div className="w-full">Your Future is Built Here</div>
              <div className="relative w-full">
                From Classrom to 
                <span className="relative inline-block">
                  <span className="relative z-10">Enterprise</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-orange-400/30 transform rotate-1 scale-105 animate-pulse"></div>
                  <div className="absolute inset-0 bg-gradient-to-l from-yellow-400/20 to-orange-400/20 transform -rotate-1 scale-110 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                </span>
              </div>
            </h2>
          </div>
        </div>
      </main>


    </div>
  );
}
