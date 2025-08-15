import { Suspense } from 'react'
import Hero from '@/components/Hero'
import CitySelector from '@/components/CitySelector'
import ProgramsOverview from '@/components/ProgramsOverview'
import FeaturedClasses from '@/components/FeaturedClasses'
import InstructorsSection from '@/components/InstructorsSection'
import DonationSection from '@/components/DonationSection'
import MilestonesSection from '@/components/MilestonesSection'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <CitySelector />
      <ProgramsOverview />
      <Suspense fallback={<LoadingSpinner />}>
        <FeaturedClasses />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <InstructorsSection />
      </Suspense>
      <DonationSection />
      <MilestonesSection />
    </main>
  )
}
