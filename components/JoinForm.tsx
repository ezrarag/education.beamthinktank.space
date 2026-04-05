'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, type User } from 'firebase/auth'
import { CheckCircle2 } from 'lucide-react'
import { auth } from '@/lib/firebase'
import { educationProgramsSeed, type MembershipInterestRole } from '@/lib/content'
import { saveJoinProfile } from '@/lib/portalMembership'

const roleOptions: MembershipInterestRole[] = ['Student', 'University Student', 'Educator', 'Community Member', 'Grant Writer', 'Researcher']
const gradeLevelOptions = ['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
const interestOptions = Array.from(new Set(educationProgramsSeed.map((program) => program.trackName)))

function normalizeRoleQuery(value: string | null): MembershipInterestRole {
  if (!value) return 'Student'
  const normalized = value.trim().toLowerCase()
  if (normalized === 'educator') return 'Educator'
  if (normalized === 'researcher') return 'Researcher'
  if (normalized === 'grant-writer' || normalized === 'grant writer') return 'Grant Writer'
  if (normalized === 'community-member' || normalized === 'community member') return 'Community Member'
  if (normalized === 'university-student' || normalized === 'university student') return 'University Student'
  return 'Student'
}

export function JoinForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedProgramId = searchParams.get('program')
  const presetTrack = searchParams.get('track')
  const [user, setUser] = useState<User | null>(auth?.currentUser ?? null)
  const [pending, setPending] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [formState, setFormState] = useState({
    fullName: '',
    email: '',
    role: normalizeRoleQuery(searchParams.get('role')),
    gradeLevel: '',
    school: '',
    cityState: '',
    heardAbout: '',
    interests: presetTrack ? [presetTrack] : [],
    academicCreditInterest: false,
  })

  useEffect(() => {
    if (!auth) return
    return onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser)
      if (!nextUser?.email) return
      setFormState((current) => ({
        ...current,
        email: nextUser.email ?? current.email,
      }))
    })
  }, [])

  function toggleInterest(interest: string) {
    setFormState((current) => ({
      ...current,
      interests: current.interests.includes(interest)
        ? current.interests.filter((item) => item !== interest)
        : [...current.interests, interest],
    }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!auth) {
      setError('Firebase Auth is not configured.')
      return
    }

    setPending(true)
    setError('')

    try {
      let activeUser = auth.currentUser

      if (!activeUser) {
        const provider = new GoogleAuthProvider()
        const signInResult = await signInWithPopup(auth, provider)
        activeUser = signInResult.user
        setUser(activeUser)
      }

      await saveJoinProfile(activeUser, {
        fullName: formState.fullName,
        email: formState.email || activeUser.email || '',
        role: formState.role,
        gradeLevel: formState.role === 'Student' ? formState.gradeLevel : undefined,
        school: formState.school,
        cityState: formState.cityState,
        heardAbout: formState.heardAbout,
        interests: formState.interests,
        academicCreditInterest: formState.role === 'University Student' ? formState.academicCreditInterest : false,
        selectedProgramId,
      })

      setSuccess(true)
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to complete enrollment.')
    } finally {
      setPending(false)
    }
  }

  if (success) {
    return (
      <div className="surface-panel p-8">
        <p className="eyebrow">Enrollment Complete</p>
        <div className="mt-4 flex items-start gap-3">
          <CheckCircle2 className="mt-1 h-6 w-6 text-emerald-600" />
          <div>
            <h2 className="text-3xl font-semibold text-education-navy">Your BEAM Education membership is active.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">Next steps: open your portal, review active opportunities, and look for a follow-up from the Education research team if you signed up as an educator, grant writer, or researcher.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" onClick={() => router.push('/portal')} className="primary-button">
                Open Portal
              </button>
              <Link href="/programs" className="secondary-button">
                Browse Programs
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="surface-panel p-8">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="fullName">
            Full name
          </label>
          <input id="fullName" className="field-input mt-2" value={formState.fullName} onChange={(event) => setFormState((current) => ({ ...current, fullName: event.target.value }))} required />
        </div>

        <div>
          <label className="field-label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="field-input mt-2"
            value={formState.email}
            onChange={(event) => setFormState((current) => ({ ...current, email: event.target.value }))}
            readOnly={Boolean(user?.email)}
            required
          />
        </div>

        <div>
          <label className="field-label" htmlFor="role">
            Role
          </label>
          <select id="role" className="field-input mt-2" value={formState.role} onChange={(event) => setFormState((current) => ({ ...current, role: event.target.value as MembershipInterestRole }))}>
            {roleOptions.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        {formState.role === 'Student' ? (
          <div>
            <label className="field-label" htmlFor="gradeLevel">
              Grade level
            </label>
            <select id="gradeLevel" className="field-input mt-2" value={formState.gradeLevel} onChange={(event) => setFormState((current) => ({ ...current, gradeLevel: event.target.value }))} required>
              <option value="">Select grade</option>
              {gradeLevelOptions.map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
            </select>
          </div>
        ) : null}

        <div>
          <label className="field-label" htmlFor="school">
            School / University
          </label>
          <input id="school" className="field-input mt-2" value={formState.school} onChange={(event) => setFormState((current) => ({ ...current, school: event.target.value }))} />
        </div>

        <div>
          <label className="field-label" htmlFor="cityState">
            City / State
          </label>
          <input id="cityState" className="field-input mt-2" value={formState.cityState} onChange={(event) => setFormState((current) => ({ ...current, cityState: event.target.value }))} required />
        </div>

        <div className="md:col-span-2">
          <label className="field-label" htmlFor="heardAbout">
            How did you hear about BEAM?
          </label>
          <input id="heardAbout" className="field-input mt-2" value={formState.heardAbout} onChange={(event) => setFormState((current) => ({ ...current, heardAbout: event.target.value }))} required />
        </div>
      </div>

      <div className="mt-6">
        <p className="field-label">Interests</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {interestOptions.map((interest) => (
            <label key={interest} className="flex items-center gap-3 rounded-2xl border border-education-line bg-white px-4 py-3 text-sm text-slate-700">
              <input type="checkbox" checked={formState.interests.includes(interest)} onChange={() => toggleInterest(interest)} />
              {interest}
            </label>
          ))}
        </div>
      </div>

      {formState.role === 'University Student' ? (
        <label className="mt-6 flex items-center gap-3 rounded-2xl border border-education-line bg-white px-4 py-3 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={formState.academicCreditInterest}
            onChange={(event) => setFormState((current) => ({ ...current, academicCreditInterest: event.target.checked }))}
          />
          I am interested in earning academic credit
        </label>
      ) : null}

      {error ? <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="max-w-xl text-sm leading-7 text-slate-600">Google SSO is required. If you are not signed in, submitting this form will open Google auth first and then complete your membership record in the shared `ngoMemberships` collection.</p>
        <button type="submit" disabled={pending} className="primary-button">
          {pending ? 'Saving...' : 'Join BEAM Education'}
        </button>
      </div>
    </form>
  )
}
