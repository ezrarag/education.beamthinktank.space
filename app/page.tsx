import { Suspense } from 'react'
import Hero from '@/components/Hero'
import CaseStudySection from '@/components/CaseStudySection'
import CollaborativeUseModel from '@/components/CollaborativeUseModel'
import OwnershipPathway from '@/components/OwnershipPathway'
import CalculatorSection from '@/components/CalculatorSection'
import UpdatedCTASection from '@/components/UpdatedCTASection'
import EquipmentNeedsModal from '@/components/EquipmentNeedsModal'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <CaseStudySection />
      <CollaborativeUseModel />
      <OwnershipPathway />
      <CalculatorSection />
      <UpdatedCTASection />
    </main>
  )
}
