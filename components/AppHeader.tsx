'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut, type User } from 'firebase/auth'
import { ArrowUpRight, BookOpenText, LogOut, LogIn } from 'lucide-react'
import { auth } from '@/lib/firebase'
import type { NGOConfig } from '@/lib/ngoConfig'
import { cn } from '@/lib/utils'

const publicNav = [
  { href: '/programs', label: 'Programs' },
  { href: '/research', label: 'Research' },
  { href: '/data', label: 'Data' },
  { href: '/grant-library', label: 'Grant Library' },
  { href: '/join', label: 'Join' },
]

const authenticatedNav = [
  { href: '/programs', label: 'Programs' },
  { href: '/research', label: 'Research' },
  { href: '/data', label: 'Data' },
  { href: '/grant-library', label: 'Grant Library' },
  { href: '/portal', label: 'Portal' },
]

export function AppHeader({ config, className }: { config: NGOConfig; className?: string }) {
  const [user, setUser] = useState<User | null>(auth?.currentUser ?? null)
  const [signingOut, setSigningOut] = useState(false)

  useEffect(() => {
    if (!auth) return
    return onAuthStateChanged(auth, setUser)
  }, [])

  async function handleSignOut() {
    if (!auth) return
    setSigningOut(true)
    try {
      await signOut(auth)
    } finally {
      setSigningOut(false)
    }
  }

  const navItems = user ? authenticatedNav : publicNav

  return (
    <header className={cn('sticky top-0 z-50 border-b border-education-line bg-[#faf7f2]/88 backdrop-blur-xl', className)}>
      <div className="page-shell flex flex-wrap items-center justify-between gap-4 py-4">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-education-navy text-white shadow-research">
            <BookOpenText className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: config.accentColor }}>
              {config.name}
            </p>
            <p className="truncate text-sm text-slate-600">{config.tagline}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="nav-pill">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Link href="/portal" className="primary-button">
                Open Portal
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
              <button type="button" onClick={() => void handleSignOut()} disabled={signingOut} className="secondary-button">
                <LogOut className="mr-2 h-4 w-4" />
                {signingOut ? 'Signing out...' : 'Sign Out'}
              </button>
            </>
          ) : (
            <Link href="/login" className="primary-button">
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
