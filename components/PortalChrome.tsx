'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { onAuthStateChanged, signOut, type User } from 'firebase/auth'
import { LogOut } from 'lucide-react'
import { auth } from '@/lib/firebase'
import { readUserMembership } from '@/lib/portalMembership'
import { cn } from '@/lib/utils'

type VisibleRole = 'participant' | 'educator' | 'researcher' | 'admin'

const navItems: Array<{ href: string; label: string; roles: VisibleRole[] }> = [
  { href: '/portal/dashboard', label: 'Dashboard', roles: ['participant', 'educator', 'researcher', 'admin'] },
  { href: '/portal/research', label: 'Research', roles: ['researcher', 'admin'] },
  { href: '/portal/audit', label: 'Audit', roles: ['researcher', 'admin'] },
  { href: '/portal/advocacy', label: 'Advocacy', roles: ['researcher', 'admin'] },
  { href: '/portal/programs/new', label: 'Programs', roles: ['admin'] },
]

export function PortalChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(auth?.currentUser ?? null)
  const [role, setRole] = useState<VisibleRole>('participant')
  const [signingOut, setSigningOut] = useState(false)

  useEffect(() => {
    if (!auth) return

    return onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser)
      if (!nextUser) return

      void readUserMembership(nextUser.uid).then((membership) => {
        if (!membership) return
        setRole(membership.role)
      })
    })
  }, [])

  async function handleSignOut() {
    if (!auth) {
      router.replace('/login')
      return
    }

    setSigningOut(true)

    try {
      await signOut(auth)
      router.replace('/login')
    } finally {
      setSigningOut(false)
    }
  }

  const visibleItems = navItems.filter((item) => item.roles.includes(role))

  return (
    <div className="page-shell py-8">
      <div className="surface-panel sticky top-24 z-20 flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="eyebrow">Protected Portal</p>
          <h1 className="mt-2 text-2xl font-semibold text-education-navy">BEAM Education</h1>
        </div>

        <nav className="flex flex-wrap gap-2">
          {visibleItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'rounded-full border px-4 py-2 text-sm transition',
                pathname === item.href ? 'border-education-navy/20 bg-education-navy text-white' : 'border-education-line bg-white/75 text-education-navy hover:border-education-navy/30',
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-full border border-education-line bg-white/75 px-4 py-2 text-sm text-slate-600">{user?.email ?? 'Authenticated member'}</div>
          <button
            type="button"
            onClick={() => void handleSignOut()}
            disabled={signingOut}
            className="inline-flex items-center gap-2 rounded-full border border-education-line px-4 py-2 text-sm font-medium text-education-navy transition hover:border-education-navy/30 hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            <LogOut className="h-4 w-4" />
            {signingOut ? 'Signing out...' : 'Sign Out'}
          </button>
        </div>
      </div>

      <div className="mt-6">{children}</div>
    </div>
  )
}
