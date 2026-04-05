'use client'

import { useEffect, useState } from 'react'
import { jsPDF } from 'jspdf'
import { collection, getDocs } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '@/lib/firebase'
import { grantApplicationsSeed, recordsRequestsSeed, researchBriefsSeed, type GrantApplication, type RecordsRequest, type ResearchBrief } from '@/lib/content'
import { ngoConfig } from '@/lib/ngoConfig'
import { ResearchBriefBuilder } from '@/components/ResearchBriefBuilder'
import { RecordsRequestTracker } from '@/components/RecordsRequestTracker'
import { StatusBadge } from '@/components/StatusBadge'

function exportBrief(brief: ResearchBrief) {
  const pdf = new jsPDF({ unit: 'pt', format: 'letter' })
  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(18)
  pdf.text(brief.initiativeName, 48, 56)
  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(11)
  pdf.text(`Assigned writer: ${brief.assignedWriter}`, 48, 80)
  pdf.text(`Budget estimate: ${brief.budgetEstimate}`, 48, 98)
  pdf.text('Problem Statement', 48, 132)
  pdf.text(pdf.splitTextToSize(brief.problemStatement, 520), 48, 150)
  pdf.text('Evidence Citations', 48, 242)
  pdf.text(pdf.splitTextToSize(brief.evidenceCitations, 520), 48, 260)
  pdf.text('Outcome Metrics', 48, 352)
  pdf.text(pdf.splitTextToSize(brief.outcomeMetrics, 520), 48, 370)
  pdf.save(`${brief.initiativeName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-brief.pdf`)
}

export function PortalResearchWorkspace() {
  const [grantApplications, setGrantApplications] = useState<GrantApplication[]>(grantApplicationsSeed)
  const [briefs, setBriefs] = useState<ResearchBrief[]>(researchBriefsSeed)
  const [recordsRequests, setRecordsRequests] = useState<RecordsRequest[]>(recordsRequestsSeed)
  const [currentWriter, setCurrentWriter] = useState('Education Research Team')

  useEffect(() => {
    if (!auth || !db) return
    const firestore = db

    return onAuthStateChanged(auth, (user) => {
      if (user?.email) {
        setCurrentWriter(user.email)
      }

      void Promise.all([
        getDocs(collection(firestore, ngoConfig.firestoreCollections.grantApplications)),
        getDocs(collection(firestore, ngoConfig.firestoreCollections.researchBriefs)),
        getDocs(collection(firestore, ngoConfig.firestoreCollections.recordsRequests)),
      ]).then(([grantSnapshot, briefSnapshot, recordsSnapshot]) => {
        if (!grantSnapshot.empty) {
          setGrantApplications(
            grantSnapshot.docs.map((entry) => ({
              id: entry.id,
              funder: String(entry.data().funder ?? 'Unknown funder'),
              amount: String(entry.data().amount ?? 'TBD'),
              deadline: String(entry.data().deadline ?? 'TBD'),
              status: entry.data().status as GrantApplication['status'],
              assignedWriter: String(entry.data().assignedWriter ?? 'Unassigned'),
            })),
          )
        }

        if (!briefSnapshot.empty) {
          setBriefs(
            briefSnapshot.docs.map((entry) => ({
              id: entry.id,
              initiativeName: String(entry.data().initiativeName ?? 'Untitled brief'),
              problemStatement: String(entry.data().problemStatement ?? ''),
              evidenceCitations: String(entry.data().evidenceCitations ?? ''),
              outcomeMetrics: String(entry.data().outcomeMetrics ?? ''),
              budgetEstimate: String(entry.data().budgetEstimate ?? 'TBD'),
              assignedWriter: String(entry.data().assignedWriter ?? 'Unassigned'),
            })),
          )
        }

        if (!recordsSnapshot.empty) {
          setRecordsRequests(
            recordsSnapshot.docs.map((entry) => ({
              id: entry.id,
              agency: String(entry.data().agency ?? 'Unknown agency'),
              requestDate: String(entry.data().requestDate ?? ''),
              recordsRequested: String(entry.data().recordsRequested ?? ''),
              status: entry.data().status as RecordsRequest['status'],
              contactName: String(entry.data().contactName ?? ''),
              referenceNumber: String(entry.data().referenceNumber ?? ''),
              dateReceived: typeof entry.data().dateReceived === 'string' ? entry.data().dateReceived : undefined,
              analysisStatus: typeof entry.data().analysisStatus === 'string' ? entry.data().analysisStatus : undefined,
            })),
          )
        }
      })
    })
  }, [])

  return (
    <div className="grid gap-6">
      <section className="data-card">
        <p className="eyebrow">Active Grant Applications</p>
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {grantApplications.map((application) => (
            <article key={application.id} className="rounded-[1.4rem] border border-education-line bg-slate-50 p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold text-education-navy">{application.funder}</p>
                <StatusBadge status={application.status} />
              </div>
              <p className="mt-3 text-sm text-slate-600">Amount: {application.amount}</p>
              <p className="mt-2 text-sm text-slate-600">Deadline: {application.deadline}</p>
              <p className="mt-2 text-sm text-slate-600">Assigned writer: {application.assignedWriter}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="data-card">
          <p className="eyebrow">Research Briefs</p>
          <div className="mt-5 space-y-4">
            {briefs.map((brief) => (
              <article key={brief.id} className="rounded-[1.4rem] border border-education-line bg-slate-50 p-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-education-navy">{brief.initiativeName}</p>
                    <p className="mt-2 text-sm text-slate-600">Writer: {brief.assignedWriter}</p>
                  </div>
                  <button type="button" onClick={() => exportBrief(brief)} className="secondary-button">
                    Export Brief
                  </button>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-600">{brief.problemStatement}</p>
                <p className="mt-3 text-sm text-slate-600"><strong>Evidence:</strong> {brief.evidenceCitations}</p>
                <p className="mt-2 text-sm text-slate-600"><strong>Metrics:</strong> {brief.outcomeMetrics}</p>
                <p className="mt-2 text-sm text-slate-600"><strong>Budget:</strong> {brief.budgetEstimate}</p>
              </article>
            ))}
          </div>
        </div>

        <ResearchBriefBuilder currentWriter={currentWriter} onCreated={(brief) => setBriefs((current) => [brief, ...current])} />
      </section>

      <section className="data-card">
        <p className="eyebrow">Records Requests Tracker</p>
        <h3 className="mt-3 text-2xl font-semibold text-education-navy">Open DPI, NCES, and ITEP requests</h3>
        <div className="mt-6">
          <RecordsRequestTracker requests={recordsRequests} />
        </div>
      </section>
    </div>
  )
}
