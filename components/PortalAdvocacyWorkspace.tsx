'use client'

import { useEffect, useState } from 'react'
import { addDoc, collection, doc, getDocs, serverTimestamp, updateDoc } from 'firebase/firestore'
import { advocacyContactsSeed, type AdvocacyContact, type BillStatus } from '@/lib/content'
import { AdvocacyTracker } from '@/components/AdvocacyTracker'
import { db } from '@/lib/firebase'
import { ngoConfig } from '@/lib/ngoConfig'

export function PortalAdvocacyWorkspace() {
  const [contacts, setContacts] = useState<AdvocacyContact[]>(advocacyContactsSeed)
  const [showModal, setShowModal] = useState(false)
  const [formState, setFormState] = useState({
    legislatorName: '',
    district: '',
    party: '',
    lastContactDate: '',
    contactMethod: '',
    outcome: '',
    relatedBillNumber: '',
  })

  useEffect(() => {
    if (!db) return
    const firestore = db

    void getDocs(collection(firestore, ngoConfig.firestoreCollections.advocacy)).then((snapshot) => {
      if (snapshot.empty) return
      setContacts(
        snapshot.docs.map((entry) => ({
          id: entry.id,
          legislatorName: String(entry.data().legislatorName ?? ''),
          district: String(entry.data().district ?? ''),
          party: String(entry.data().party ?? ''),
          lastContactDate: String(entry.data().lastContactDate ?? ''),
          contactMethod: String(entry.data().contactMethod ?? ''),
          outcome: String(entry.data().outcome ?? ''),
          relatedBillNumber: String(entry.data().relatedBillNumber ?? ''),
          billStatus: entry.data().billStatus as BillStatus,
          testimonySubmitted: Boolean(entry.data().testimonySubmitted),
        })),
      )
    })
  }, [])

  async function handleStatusChange(contactId: string, status: BillStatus) {
    setContacts((current) => current.map((entry) => (entry.id === contactId ? { ...entry, billStatus: status } : entry)))
    if (!db) return
    const firestore = db
    await updateDoc(doc(firestore, ngoConfig.firestoreCollections.advocacy, contactId), {
      billStatus: status,
      updatedAt: serverTimestamp(),
    })
  }

  async function handleCreateContact(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!db) return
    const firestore = db

    const payload = {
      ...formState,
      billStatus: 'In Committee' as BillStatus,
      testimonySubmitted: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }

    const docRef = await addDoc(collection(firestore, ngoConfig.firestoreCollections.advocacy), payload)
    setContacts((current) => [
      {
        id: docRef.id,
        ...formState,
        billStatus: 'In Committee',
        testimonySubmitted: false,
      },
      ...current,
    ])
    setShowModal(false)
    setFormState({
      legislatorName: '',
      district: '',
      party: '',
      lastContactDate: '',
      contactMethod: '',
      outcome: '',
      relatedBillNumber: '',
    })
  }

  const legislatorsContacted = contacts.length
  const billsTracked = new Set(contacts.map((contact) => contact.relatedBillNumber)).size
  const testimoniesSubmitted = contacts.filter((contact) => contact.testimonySubmitted).length

  return (
    <div className="grid gap-6">
      <section className="grid gap-4 md:grid-cols-3">
        <div className="data-card">
          <p className="eyebrow">Summary</p>
          <p className="mt-3 text-4xl font-display text-education-navy">{legislatorsContacted}</p>
          <p className="mt-2 text-sm text-slate-600">Legislators contacted</p>
        </div>
        <div className="data-card">
          <p className="eyebrow">Summary</p>
          <p className="mt-3 text-4xl font-display text-education-navy">{billsTracked}</p>
          <p className="mt-2 text-sm text-slate-600">Bills tracked</p>
        </div>
        <div className="data-card">
          <p className="eyebrow">Summary</p>
          <p className="mt-3 text-4xl font-display text-education-navy">{testimoniesSubmitted}</p>
          <p className="mt-2 text-sm text-slate-600">Testimonies submitted</p>
        </div>
      </section>

      <section className="data-card flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow">Legislative Tracker</p>
          <h3 className="mt-3 text-2xl font-semibold text-education-navy">Legislative contacts and bill tracking</h3>
        </div>
        <button type="button" onClick={() => setShowModal(true)} className="primary-button">
          Add Contact
        </button>
      </section>

      <AdvocacyTracker contacts={contacts} editable onStatusChange={handleStatusChange} />

      {showModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/35 p-4">
          <form onSubmit={handleCreateContact} className="surface-panel w-full max-w-2xl p-8">
            <h3 className="text-2xl font-semibold text-education-navy">Add legislative contact</h3>
            <div className="mt-6 grid gap-4">
              <input className="field-input" placeholder="Legislator name" value={formState.legislatorName} onChange={(event) => setFormState((current) => ({ ...current, legislatorName: event.target.value }))} required />
              <input className="field-input" placeholder="District" value={formState.district} onChange={(event) => setFormState((current) => ({ ...current, district: event.target.value }))} required />
              <input className="field-input" placeholder="Party" value={formState.party} onChange={(event) => setFormState((current) => ({ ...current, party: event.target.value }))} required />
              <input className="field-input" type="date" value={formState.lastContactDate} onChange={(event) => setFormState((current) => ({ ...current, lastContactDate: event.target.value }))} required />
              <input className="field-input" placeholder="Contact method" value={formState.contactMethod} onChange={(event) => setFormState((current) => ({ ...current, contactMethod: event.target.value }))} required />
              <input className="field-input" placeholder="Related bill number" value={formState.relatedBillNumber} onChange={(event) => setFormState((current) => ({ ...current, relatedBillNumber: event.target.value }))} required />
              <textarea className="field-input min-h-[120px]" placeholder="Outcome" value={formState.outcome} onChange={(event) => setFormState((current) => ({ ...current, outcome: event.target.value }))} required />
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => setShowModal(false)} className="secondary-button">
                Cancel
              </button>
              <button type="submit" className="primary-button">
                Save Contact
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  )
}
