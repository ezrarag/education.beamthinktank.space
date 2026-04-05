'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '@/lib/firebase'
import { crossNgoOpportunities, educationProgramsSeed, type EducationProgram } from '@/lib/content'
import { ngoConfig } from '@/lib/ngoConfig'
import { readUserMembership } from '@/lib/portalMembership'

function resolveGradeBand(gradeLevel?: string) {
  if (!gradeLevel) return null
  const parsed = Number(gradeLevel)
  if (Number.isNaN(parsed)) return null
  if (parsed <= 5) return 'K-5'
  if (parsed <= 8) return '6-8'
  return '9-12'
}

function normalizeProgramRecord(id: string, data: Record<string, unknown>): EducationProgram {
  return {
    id,
    name: typeof data.name === 'string' ? data.name : 'Untitled Program',
    trackId: typeof data.connectedNgo === 'string' ? data.connectedNgo.toLowerCase() : 'education',
    trackName: typeof data.connectedNgo === 'string' ? data.connectedNgo : 'Education',
    ngo: typeof data.connectedNgo === 'string' ? data.connectedNgo : 'BEAM Education',
    ngoColor: '#1A3A5C',
    ngoLogo: 'ED',
    ngoUrl: 'https://education.beamthinktank.space',
    gradeBand: typeof data.gradeBand === 'string' ? (data.gradeBand as EducationProgram['gradeBand']) : '9-12',
    format: typeof data.format === 'string' ? (data.format as EducationProgram['format']) : 'Hybrid',
    location: typeof data.location === 'string' ? (data.location as EducationProgram['location']) : 'Any',
    description: typeof data.description === 'string' ? data.description : 'Program details pending.',
    enrollmentHref: '/join',
  }
}

export function PortalDashboardClient() {
  const [loading, setLoading] = useState(true)
  const [enrolledPrograms, setEnrolledPrograms] = useState<EducationProgram[]>([])
  const [activePrograms, setActivePrograms] = useState<EducationProgram[]>([])

  useEffect(() => {
    if (!auth || !db) {
      setLoading(false)
      return
    }
    const firestore = db

    return onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLoading(false)
        return
      }

      void Promise.all([
        readUserMembership(user.uid),
        getDoc(doc(firestore, ngoConfig.firestoreCollections.enrollments, user.uid)),
        getDocs(collection(firestore, ngoConfig.firestoreCollections.programs)),
      ]).then(([membership, enrollmentSnap, firestorePrograms]) => {
        const enrollmentIds = enrollmentSnap.exists() && Array.isArray(enrollmentSnap.data().programs)
          ? enrollmentSnap
              .data()
              .programs.filter((value: unknown): value is string => typeof value === 'string')
          : []

        const mergedPrograms = [...educationProgramsSeed]
        firestorePrograms.docs.forEach((programDoc) => {
          if (mergedPrograms.some((entry) => entry.id === programDoc.id)) return
          mergedPrograms.push(normalizeProgramRecord(programDoc.id, programDoc.data() as Record<string, unknown>))
        })

        const enrolled = mergedPrograms.filter((program) => enrollmentIds.includes(program.id))
        const gradeBand = resolveGradeBand(membership?.gradeLevel)
        const interests = membership?.interests ?? []

        const recommended = mergedPrograms.filter((program) => {
          if (enrollmentIds.includes(program.id)) return false

          const matchesInterest = interests.length === 0 || interests.includes(program.trackName)
          const matchesGrade = !gradeBand || program.gradeBand === 'K-12' || program.gradeBand === gradeBand
          return matchesInterest && matchesGrade
        })

        setEnrolledPrograms(enrolled)
        setActivePrograms(recommended.slice(0, 4))
        setLoading(false)
      })
    })
  }, [])

  if (loading) {
    return <div className="data-card text-slate-600">Loading dashboard data...</div>
  }

  return (
    <div className="grid gap-6">
      <section className="data-card">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="eyebrow">Enrolled Programs</p>
            <h3 className="mt-3 text-2xl font-semibold text-education-navy">Your current track lineup</h3>
          </div>
          <Link href="/programs" className="secondary-button">
            Find More Programs
          </Link>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {enrolledPrograms.length > 0 ? (
            enrolledPrograms.map((program) => (
              <div key={program.id} className="rounded-[1.4rem] border border-education-line bg-slate-50 p-5">
                <p className="text-sm font-semibold text-education-navy">{program.name}</p>
                <p className="mt-2 text-sm text-slate-600">{program.description}</p>
              </div>
            ))
          ) : (
            <div className="rounded-[1.4rem] border border-dashed border-education-line bg-slate-50 p-5 text-sm text-slate-600">
              No active enrollments yet. Use the public programs page or the join flow to request your first BEAM Education program.
            </div>
          )}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="data-card">
          <p className="eyebrow">Active Opportunities</p>
          <h3 className="mt-3 text-2xl font-semibold text-education-navy">Programs matched to your profile</h3>
          <div className="mt-6 space-y-4">
            {activePrograms.length > 0 ? (
              activePrograms.map((program) => (
                <div key={program.id} className="rounded-[1.4rem] border border-education-line bg-slate-50 p-5">
                  <p className="font-semibold text-education-navy">{program.name}</p>
                  <p className="mt-2 text-sm text-slate-600">{program.gradeBand} · {program.format} · {program.location}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{program.description}</p>
                </div>
              ))
            ) : (
              <p className="text-sm leading-7 text-slate-600">No additional recommendations yet. Complete your join profile interests to improve matching.</p>
            )}
          </div>
        </div>

        <div className="data-card">
          <p className="eyebrow">Cross-NGO Opportunities</p>
          <h3 className="mt-3 text-2xl font-semibold text-education-navy">Relevant tracks across the BEAM system</h3>
          <div className="mt-6 space-y-4">
            {crossNgoOpportunities.map((opportunity) => (
              <a key={opportunity.href} href={opportunity.href} target="_blank" rel="noreferrer" className="block rounded-[1.4rem] border border-education-line bg-slate-50 p-5 transition hover:border-education-navy/25">
                <p className="font-semibold text-education-navy">{opportunity.label}</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">{opportunity.summary}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="data-card">
        <p className="eyebrow">Portfolio</p>
        <h3 className="mt-3 text-2xl font-semibold text-education-navy">Your BEAM portfolio will live here.</h3>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">Complete a program to add your first artifact. Education portfolio entries will track real-world outputs, evidence of mastery, and track connections across the wider BEAM ecosystem.</p>
      </section>
    </div>
  )
}
