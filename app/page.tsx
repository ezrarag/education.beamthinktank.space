'use client'

import { Suspense, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Hero from '@/components/Hero'
import CaseStudySection from '@/components/CaseStudySection'
import EquityCollaborationModel from '@/components/EquityCollaborationModel'
import EquipmentNeedsSection from '@/components/EquipmentNeedsSection'
import UpdatedCTASection from '@/components/UpdatedCTASection'
import LoadingSpinner from '@/components/LoadingSpinner'
import { useLocation } from '@/contexts/LocationContext'
import { cities } from '@/lib/cities'

export default function HomePage() {
  const router = useRouter()
  const { userLocation, isLoading, error } = useLocation()

  // Redirect to city page if location is detected
  useEffect(() => {
    if (userLocation && !isLoading) {
      const citySlug = Object.values(cities).find(
        city => city.name === userLocation.city
      )?.slug
      
      if (citySlug) {
        router.push(`/${citySlug}`)
      }
    }
  }, [userLocation, isLoading, router])

  // Show loading while detecting location
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Detecting your location...</p>
        </div>
      </div>
    )
  }

  // Show main page if no location detected or error occurred
  return (
    <main className="min-h-screen">
      <Hero />
      <CaseStudySection />
      <EquityCollaborationModel />
      <EquipmentNeedsSection />
      <UpdatedCTASection />
    </main>
  )
}
