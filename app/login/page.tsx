'use client'

import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { ngoConfig } from '@/lib/ngoConfig'
import { ensureUserMembership } from '@/lib/portalMembership'
import { resolvePortalPath } from '@/lib/resolvePortalPath'

const googleProvider = new GoogleAuthProvider()

function resolveNextPath(nextPath: string | null) {
  if (!nextPath) return null
  if (!nextPath.startsWith('/') || nextPath.startsWith('//')) return null
  return nextPath
}

function LoginContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const nextPath = resolveNextPath(searchParams.get('next'))
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!auth) return

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) return

      setPending(true)
      void ensureUserMembership(user)
        .then((membership) => {
          router.replace(nextPath ?? resolvePortalPath(membership.role))
        })
        .catch((membershipError) => {
          setError(membershipError instanceof Error ? membershipError.message : 'Unable to create membership.')
          setPending(false)
        })
    })

    return unsubscribe
  }, [nextPath, router])

  async function handleGoogleSignIn() {
    if (!auth) {
      setError('Firebase Auth is not configured.')
      return
    }

    setPending(true)
    setError('')

    try {
      await signInWithPopup(auth, googleProvider)
    } catch (signInError) {
      setError(signInError instanceof Error ? signInError.message : 'Unable to sign in.')
      setPending(false)
    }
  }

  return (
    <div className="page-shell py-12">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="overflow-hidden rounded-[2.2rem] bg-education-navy p-8 text-white shadow-research">
          <p className="text-xs uppercase tracking-[0.28em] text-education-amber">Google SSO</p>
          <h1 className="mt-4 font-display text-5xl leading-tight text-white">{ngoConfig.name}</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/74">{ngoConfig.tagline}</p>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/66">
            Authentication is Google only. On first login, this site writes an idempotent membership record to `ngoMemberships/{'{uid}'}` with a default role of `participant`.
          </p>
        </div>

        <div className="surface-panel p-8">
          <p className="eyebrow">Portal Access</p>
          <h2 className="mt-4 text-3xl font-semibold text-education-navy">Continue with Google</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            After sign-in, your Firestore membership role determines whether you land in the participant dashboard, research workspace, or admin tools.
          </p>

          {error ? <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}

          <button type="button" onClick={() => void handleGoogleSignIn()} disabled={pending} className="primary-button mt-8 w-full">
            {pending ? 'Signing in...' : 'Continue with Google'}
          </button>

          <Link href="/" className="mt-6 inline-flex text-sm font-medium text-education-navy underline decoration-education-amber/60 underline-offset-4">
            Return to public site
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="page-shell py-12 text-slate-600">Loading sign-in...</div>}>
      <LoginContent />
    </Suspense>
  )
}
