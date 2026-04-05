'use client'

import { useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { ngoConfig } from '@/lib/ngoConfig'
import { educationProgramsSeed } from '@/lib/content'

const ngoOptions = Array.from(new Set(educationProgramsSeed.map((program) => program.ngo)))
const gradeBandOptions = ['K-5', '6-8', '9-12', 'K-12']
const formatOptions = ['Remote', 'In-Person', 'Hybrid']
const locationOptions = ['Milwaukee', 'Atlanta', 'Madison', 'Any']

export function NewProgramForm() {
  const [pending, setPending] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formState, setFormState] = useState({
    name: '',
    connectedNgo: ngoOptions[0] ?? 'BEAM Education',
    gradeBand: ['9-12'],
    format: 'Hybrid',
    location: 'Any',
    description: '',
    startDate: '',
    capacity: '',
    enrollmentLink: '',
  })

  function toggleGradeBand(gradeBand: string) {
    setFormState((current) => ({
      ...current,
      gradeBand: current.gradeBand.includes(gradeBand)
        ? current.gradeBand.filter((item) => item !== gradeBand)
        : [...current.gradeBand, gradeBand],
    }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!db) return
    const firestore = db

    setPending(true)

    try {
      await addDoc(collection(firestore, ngoConfig.firestoreCollections.programs), {
        ...formState,
        gradeBand: formState.gradeBand[0] ?? '9-12',
        gradeBands: formState.gradeBand,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
      setSuccess(true)
      setFormState({
        name: '',
        connectedNgo: ngoOptions[0] ?? 'BEAM Education',
        gradeBand: ['9-12'],
        format: 'Hybrid',
        location: 'Any',
        description: '',
        startDate: '',
        capacity: '',
        enrollmentLink: '',
      })
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="data-card">
      <p className="eyebrow">Program Creation</p>
      <h3 className="mt-3 text-2xl font-semibold text-education-navy">Create a supplemental program</h3>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <input className="field-input" placeholder="Program name" value={formState.name} onChange={(event) => setFormState((current) => ({ ...current, name: event.target.value }))} required />
        <select className="field-input" value={formState.connectedNgo} onChange={(event) => setFormState((current) => ({ ...current, connectedNgo: event.target.value }))}>
          {ngoOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <select className="field-input" value={formState.format} onChange={(event) => setFormState((current) => ({ ...current, format: event.target.value }))}>
          {formatOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <select className="field-input" value={formState.location} onChange={(event) => setFormState((current) => ({ ...current, location: event.target.value }))}>
          {locationOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <input className="field-input" type="date" value={formState.startDate} onChange={(event) => setFormState((current) => ({ ...current, startDate: event.target.value }))} required />
        <input className="field-input" type="number" min="1" placeholder="Capacity" value={formState.capacity} onChange={(event) => setFormState((current) => ({ ...current, capacity: event.target.value }))} required />
      </div>

      <div className="mt-6">
        <p className="field-label">Grade band</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {gradeBandOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => toggleGradeBand(option)}
              className={formState.gradeBand.includes(option) ? 'rounded-full bg-education-navy px-3 py-2 text-xs font-semibold text-white' : 'rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700'}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <textarea className="field-input mt-6 min-h-[140px]" placeholder="Description" value={formState.description} onChange={(event) => setFormState((current) => ({ ...current, description: event.target.value }))} required />
      <input className="field-input mt-4" placeholder="Enrollment link or contact" value={formState.enrollmentLink} onChange={(event) => setFormState((current) => ({ ...current, enrollmentLink: event.target.value }))} required />

      {success ? <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">Program saved to Firestore.</div> : null}

      <div className="mt-6 flex justify-end">
        <button type="submit" disabled={pending} className="primary-button">
          {pending ? 'Saving...' : 'Create Program'}
        </button>
      </div>
    </form>
  )
}
