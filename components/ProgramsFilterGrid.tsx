'use client'

import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { ProgramCard } from '@/components/ProgramCard'
import { db } from '@/lib/firebase'
import { educationProgramsSeed, type EducationProgram, type GradeBand, type ProgramFormat, type ProgramLocation } from '@/lib/content'
import { ngoConfig } from '@/lib/ngoConfig'

const gradeBandOptions: GradeBand[] = ['K-5', '6-8', '9-12']
const formatOptions: ProgramFormat[] = ['Remote', 'In-Person', 'Hybrid']
const locationOptions: ProgramLocation[] = ['Milwaukee', 'Atlanta', 'Madison', 'Any']

function toggleSelection(values: string[], value: string) {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value]
}

function normalizeFirestoreProgram(id: string, data: Record<string, unknown>): EducationProgram {
  return {
    id,
    name: typeof data.name === 'string' ? data.name : 'Untitled Program',
    trackId: typeof data.connectedNgo === 'string' ? data.connectedNgo.toLowerCase() : 'education',
    trackName: typeof data.connectedNgo === 'string' ? data.connectedNgo : 'Education',
    ngo: typeof data.connectedNgo === 'string' ? data.connectedNgo : 'BEAM Education',
    ngoColor: '#1A3A5C',
    ngoLogo: 'ED',
    ngoUrl: 'https://education.beamthinktank.space',
    gradeBand: typeof data.gradeBand === 'string' ? (data.gradeBand as GradeBand) : '9-12',
    format: typeof data.format === 'string' ? (data.format as ProgramFormat) : 'Hybrid',
    location: typeof data.location === 'string' ? (data.location as ProgramLocation) : 'Any',
    description: typeof data.description === 'string' ? data.description : 'Program details pending.',
    enrollmentHref: typeof data.enrollmentLink === 'string' ? data.enrollmentLink : '/join',
  }
}

export function ProgramsFilterGrid() {
  const [trackFilters, setTrackFilters] = useState<string[]>([])
  const [gradeFilters, setGradeFilters] = useState<string[]>([])
  const [formatFilters, setFormatFilters] = useState<string[]>([])
  const [locationFilters, setLocationFilters] = useState<string[]>([])
  const [programs, setPrograms] = useState<EducationProgram[]>(educationProgramsSeed)

  useEffect(() => {
    if (!db) return
    const firestore = db

    void getDocs(collection(firestore, ngoConfig.firestoreCollections.programs)).then((snapshot) => {
      if (snapshot.empty) return

      const firestorePrograms = snapshot.docs.map((entry) => normalizeFirestoreProgram(entry.id, entry.data() as Record<string, unknown>))
      const mergedPrograms = [...educationProgramsSeed]

      firestorePrograms.forEach((program) => {
        if (!mergedPrograms.some((seedProgram) => seedProgram.id === program.id)) {
          mergedPrograms.push(program)
        }
      })

      setPrograms(mergedPrograms)
    })
  }, [])

  const trackOptions = Array.from(new Set(programs.map((program) => program.trackName)))

  const filteredPrograms = programs.filter((program) => {
    const matchesTrack = trackFilters.length === 0 || trackFilters.includes(program.trackName)
    const matchesGrade = gradeFilters.length === 0 || gradeFilters.includes(program.gradeBand)
    const matchesFormat = formatFilters.length === 0 || formatFilters.includes(program.format)
    const matchesLocation = locationFilters.length === 0 || locationFilters.includes(program.location) || locationFilters.includes('Any')

    return matchesTrack && matchesGrade && matchesFormat && matchesLocation
  })

  return (
    <div className="space-y-8">
      <div className="surface-panel p-6">
        <div className="grid gap-5 lg:grid-cols-4">
          <div>
            <p className="text-sm font-semibold text-education-navy">NGO Track</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {trackOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setTrackFilters((current) => toggleSelection(current, option))}
                  className={trackFilters.includes(option) ? 'rounded-full bg-education-navy px-3 py-2 text-xs font-semibold text-white' : 'rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700'}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-education-navy">Grade Band</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {gradeBandOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setGradeFilters((current) => toggleSelection(current, option))}
                  className={gradeFilters.includes(option) ? 'rounded-full bg-education-navy px-3 py-2 text-xs font-semibold text-white' : 'rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700'}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-education-navy">Format</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {formatOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setFormatFilters((current) => toggleSelection(current, option))}
                  className={formatFilters.includes(option) ? 'rounded-full bg-education-navy px-3 py-2 text-xs font-semibold text-white' : 'rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700'}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-education-navy">Location</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {locationOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setLocationFilters((current) => toggleSelection(current, option))}
                  className={locationFilters.includes(option) ? 'rounded-full bg-education-navy px-3 py-2 text-xs font-semibold text-white' : 'rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700'}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {filteredPrograms.map((program) => (
          <ProgramCard key={program.id} program={program} ctaLabel="Request Enrollment" />
        ))}
      </div>
    </div>
  )
}
