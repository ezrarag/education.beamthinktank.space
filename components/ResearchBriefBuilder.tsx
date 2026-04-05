'use client'

import { useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { ngoConfig } from '@/lib/ngoConfig'
import type { ResearchBrief } from '@/lib/content'

export function ResearchBriefBuilder({
  currentWriter,
  onCreated,
}: {
  currentWriter: string
  onCreated: (brief: ResearchBrief) => void
}) {
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const [formState, setFormState] = useState({
    initiativeName: '',
    problemStatement: '',
    evidenceCitations: '',
    outcomeMetrics: '',
    budgetEstimate: '',
  })

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!db) {
      setError('Firestore is not configured.')
      return
    }
    const firestore = db

    setPending(true)
    setError('')

    try {
      const payload = {
        ...formState,
        assignedWriter: currentWriter,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }

      const docRef = await addDoc(collection(firestore, ngoConfig.firestoreCollections.researchBriefs), payload)

      onCreated({
        id: docRef.id,
        ...formState,
        assignedWriter: currentWriter,
      })

      setFormState({
        initiativeName: '',
        problemStatement: '',
        evidenceCitations: '',
        outcomeMetrics: '',
        budgetEstimate: '',
      })
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to save brief.')
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="data-card">
      <p className="eyebrow">Research Brief Builder</p>
      <h3 className="mt-3 text-2xl font-semibold text-education-navy">Create a Finance-intake-ready brief</h3>

      <div className="mt-6 grid gap-4">
        <input
          className="field-input"
          placeholder="Program / initiative name"
          value={formState.initiativeName}
          onChange={(event) => setFormState((current) => ({ ...current, initiativeName: event.target.value }))}
          required
        />
        <textarea
          className="field-input min-h-[120px]"
          placeholder="Problem statement"
          value={formState.problemStatement}
          onChange={(event) => setFormState((current) => ({ ...current, problemStatement: event.target.value }))}
          required
        />
        <textarea
          className="field-input min-h-[120px]"
          placeholder="Evidence citations"
          value={formState.evidenceCitations}
          onChange={(event) => setFormState((current) => ({ ...current, evidenceCitations: event.target.value }))}
          required
        />
        <textarea
          className="field-input min-h-[120px]"
          placeholder="Outcome metrics"
          value={formState.outcomeMetrics}
          onChange={(event) => setFormState((current) => ({ ...current, outcomeMetrics: event.target.value }))}
          required
        />
        <input
          className="field-input"
          placeholder="Budget estimate"
          value={formState.budgetEstimate}
          onChange={(event) => setFormState((current) => ({ ...current, budgetEstimate: event.target.value }))}
          required
        />
      </div>

      {error ? <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}

      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-sm text-slate-600">Assigned writer: {currentWriter}</p>
        <button type="submit" disabled={pending} className="primary-button">
          {pending ? 'Saving...' : 'Save Brief'}
        </button>
      </div>
    </form>
  )
}
