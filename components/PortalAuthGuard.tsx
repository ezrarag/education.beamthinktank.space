'use client'

import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export default function PortalAuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    if (!auth) {
      router.replace(`/login?next=${encodeURIComponent(pathname || '/portal')}`)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace(`/login?next=${encodeURIComponent(pathname || '/portal')}`)
        return
      }

      setChecking(false)
    })

    return unsubscribe
  }, [pathname, router])

  if (checking) {
    return <div className="p-8 text-center text-education-navy/72">Loading portal session...</div>
  }

  return <>{children}</>
}
