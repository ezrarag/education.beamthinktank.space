'use client'

import { useEffect, useState } from 'react'
import { addDoc, collection, doc, getDocs, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { ngoConfig } from '@/lib/ngoConfig'
import { recordsRequestsSeed, type RecordsRequest, type RecordsRequestStatus } from '@/lib/content'
import { RecordsRequestTracker } from '@/components/RecordsRequestTracker'

export function PortalAuditWorkspace() {
  const [requests, setRequests] = useState<RecordsRequest[]>(recordsRequestsSeed)
  const [showModal, setShowModal] = useState(false)
  const [formState, setFormState] = useState({
    agency: '',
    requestDate: '',
    recordsRequested: '',
    contactName: '',
    referenceNumber: '',
  })

  useEffect(() => {
    if (!db) return
    const firestore = db

    void getDocs(collection(firestore, ngoConfig.firestoreCollections.recordsRequests)).then((snapshot) => {
      if (snapshot.empty) return
      setRequests(
        snapshot.docs.map((entry) => ({
          id: entry.id,
          agency: String(entry.data().agency ?? ''),
          requestDate: String(entry.data().requestDate ?? ''),
          recordsRequested: String(entry.data().recordsRequested ?? ''),
          status: entry.data().status as RecordsRequestStatus,
          contactName: String(entry.data().contactName ?? ''),
          referenceNumber: String(entry.data().referenceNumber ?? ''),
          dateReceived: typeof entry.data().dateReceived === 'string' ? entry.data().dateReceived : undefined,
          analysisStatus: typeof entry.data().analysisStatus === 'string' ? entry.data().analysisStatus : undefined,
        })),
      )
    })
  }, [])

  async function handleStatusChange(requestId: string, status: RecordsRequestStatus) {
    setRequests((current) => current.map((entry) => (entry.id === requestId ? { ...entry, status } : entry)))
    if (!db) return
    const firestore = db
    await updateDoc(doc(firestore, ngoConfig.firestoreCollections.recordsRequests, requestId), {
      status,
      updatedAt: serverTimestamp(),
    })
  }

  async function handleCreateRequest(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!db) return
    const firestore = db

    const payload = {
      ...formState,
      status: 'Submitted' as RecordsRequestStatus,
      analysisStatus: 'Queued.',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }

    const docRef = await addDoc(collection(firestore, ngoConfig.firestoreCollections.recordsRequests), payload)

    setRequests((current) => [
      {
        id: docRef.id,
        ...formState,
        status: 'Submitted',
        analysisStatus: 'Queued.',
      },
      ...current,
    ])
    setShowModal(false)
    setFormState({
      agency: '',
      requestDate: '',
      recordsRequested: '',
      contactName: '',
      referenceNumber: '',
    })
  }

  return (
    <div className="grid gap-6">
      <section className="data-card flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow">Data Audit Tracker</p>
          <h3 className="mt-3 text-2xl font-semibold text-education-navy">Manage open records requests</h3>
        </div>
        <button type="button" onClick={() => setShowModal(true)} className="primary-button">
          New Request
        </button>
      </section>

      <RecordsRequestTracker requests={requests} editable onStatusChange={handleStatusChange} />

      {showModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/35 p-4">
          <form onSubmit={handleCreateRequest} className="surface-panel w-full max-w-2xl p-8">
            <h3 className="text-2xl font-semibold text-education-navy">New records request</h3>
            <div className="mt-6 grid gap-4">
              <input className="field-input" placeholder="Agency" value={formState.agency} onChange={(event) => setFormState((current) => ({ ...current, agency: event.target.value }))} required />
              <textarea className="field-input min-h-[120px]" placeholder="Request description" value={formState.recordsRequested} onChange={(event) => setFormState((current) => ({ ...current, recordsRequested: event.target.value }))} required />
              <input className="field-input" type="date" value={formState.requestDate} onChange={(event) => setFormState((current) => ({ ...current, requestDate: event.target.value }))} required />
              <input className="field-input" placeholder="Contact name" value={formState.contactName} onChange={(event) => setFormState((current) => ({ ...current, contactName: event.target.value }))} required />
              <input className="field-input" placeholder="Reference number" value={formState.referenceNumber} onChange={(event) => setFormState((current) => ({ ...current, referenceNumber: event.target.value }))} required />
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => setShowModal(false)} className="secondary-button">
                Cancel
              </button>
              <button type="submit" className="primary-button">
                Save Request
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  )
}
