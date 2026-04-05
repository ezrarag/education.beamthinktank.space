'use client'

import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { readUserMembership } from '@/lib/portalMembership'
import type { NGORole } from '@/lib/ngoConfig'

export function PortalRoleGate({
  allowedRoles,
  children,
}: {
  allowedRoles: NGORole[]
  children: ReactNode
}) {
  const [status, setStatus] = useState<'loading' | 'allowed' | 'denied'>('loading')

  useEffect(() => {
    if (!auth) {
      setStatus('denied')
      return
    }

    return onAuthStateChanged(auth, (user) => {
      if (!user) {
        setStatus('denied')
        return
      }

      void readUserMembership(user.uid).then((membership) => {
        if (!membership) {
          setStatus('denied')
          return
        }

        setStatus(allowedRoles.includes(membership.role) ? 'allowed' : 'denied')
      })
    })
  }, [allowedRoles])

  if (status === 'loading') {
    return <div className="surface-panel p-8 text-slate-600">Checking role access...</div>
  }

  if (status === 'denied') {
    return (
      <div className="surface-panel p-8">
        <p className="eyebrow">Access Restricted</p>
        <h3 className="mt-4 text-2xl font-semibold text-education-navy">This workspace is limited to researchers or administrators.</h3>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">If you need access, update your BEAM Education membership role in Firestore or complete the join flow as an educator, grant writer, or researcher.</p>
      </div>
    )
  }

  return <>{children}</>
}
