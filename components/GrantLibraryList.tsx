'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '@/lib/firebase'
import { grantLibrarySeed, type Eligibility, type GrantFocus, type GrantOpportunity } from '@/lib/content'
import { ensureUserMembership } from '@/lib/portalMembership'
import { resolvePortalPath } from '@/lib/resolvePortalPath'
import { GrantCard } from '@/components/GrantCard'

const focusOptions: GrantFocus[] = ['Research', 'Programs', 'Advocacy', 'Capacity Building']
const eligibilityOptions: Eligibility[] = ['Nonprofit', 'University', 'Both']

export function GrantLibraryList() {
  const router = useRouter()
  const [focusFilter, setFocusFilter] = useState<GrantFocus | 'All'>('All')
  const [eligibilityFilter, setEligibilityFilter] = useState<Eligibility | 'All'>('All')

  async function handleAddToPortal(grant: GrantOpportunity) {
    const user = auth?.currentUser

    if (!user) {
      router.push(`/join?grant=${grant.id}`)
      return
    }

    const membership = await ensureUserMembership(user)
    const target = membership.role === 'researcher' || membership.role === 'admin' ? `/portal/research?grant=${grant.id}` : `${resolvePortalPath(membership.role)}?grant=${grant.id}`
    router.push(target)
  }

  const filteredGrants = grantLibrarySeed.filter((grant) => {
    const matchesFocus = focusFilter === 'All' || grant.focusArea === focusFilter
    const matchesEligibility = eligibilityFilter === 'All' || grant.eligibility === eligibilityFilter
    return matchesFocus && matchesEligibility
  })

  return (
    <div className="space-y-8">
      <div className="surface-panel p-6">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-education-navy">Focus Area</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {['All', ...focusOptions].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setFocusFilter(option as GrantFocus | 'All')}
                  className={focusFilter === option ? 'rounded-full bg-education-navy px-3 py-2 text-xs font-semibold text-white' : 'rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700'}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-education-navy">Eligibility</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {['All', ...eligibilityOptions].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setEligibilityFilter(option as Eligibility | 'All')}
                  className={eligibilityFilter === option ? 'rounded-full bg-education-navy px-3 py-2 text-xs font-semibold text-white' : 'rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700'}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {filteredGrants.map((grant) => (
          <GrantCard key={grant.id} grant={grant} onAddToPortal={handleAddToPortal} />
        ))}
      </div>
    </div>
  )
}
