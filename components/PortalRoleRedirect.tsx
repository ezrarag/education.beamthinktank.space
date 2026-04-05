'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { ensureUserMembership } from '@/lib/portalMembership'
import { resolvePortalPath } from '@/lib/resolvePortalPath'

export function PortalRoleRedirect() {
  const router = useRouter()
  const [status, setStatus] = useState('Checking membership...')

  useEffect(() => {
    if (!auth) {
      router.replace('/login?next=/portal')
      return
    }

    return onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace('/login?next=/portal')
        return
      }

      setStatus('Loading your portal destination...')

      void ensureUserMembership(user).then((membership) => {
        router.replace(resolvePortalPath(membership.role))
      })
    })
  }, [router])

  return <div className="surface-panel p-8 text-center text-slate-600">{status}</div>
}
