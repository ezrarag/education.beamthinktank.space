'use client'

import { CalendarDays, ExternalLink } from 'lucide-react'
import type { GrantOpportunity } from '@/lib/content'

function resolveDeadlineBadge(deadline: string) {
  const millisecondsPerDay = 1000 * 60 * 60 * 24
  const daysUntil = Math.max(0, Math.ceil((new Date(deadline).getTime() - new Date().getTime()) / millisecondsPerDay))

  if (daysUntil < 30) {
    return { label: `${daysUntil} days`, className: 'bg-red-100 text-red-700' }
  }

  if (daysUntil <= 60) {
    return { label: `${daysUntil} days`, className: 'bg-amber-100 text-amber-800' }
  }

  return { label: `${daysUntil} days`, className: 'bg-emerald-100 text-emerald-700' }
}

export function GrantCard({
  grant,
  onAddToPortal,
}: {
  grant: GrantOpportunity
  onAddToPortal: (grant: GrantOpportunity) => void
}) {
  const deadlineBadge = resolveDeadlineBadge(grant.deadline)

  return (
    <article className="data-card">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">{grant.funder}</p>
          <h3 className="mt-3 text-2xl font-semibold text-education-navy">{grant.name}</h3>
        </div>
        <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${deadlineBadge.className}`}>{deadlineBadge.label}</span>
      </div>

      <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-slate-600">
        <span className="rounded-full bg-slate-100 px-3 py-1.5">{grant.amountRange}</span>
        <span className="rounded-full bg-slate-100 px-3 py-1.5">{grant.focusArea}</span>
        <span className="rounded-full bg-slate-100 px-3 py-1.5">{grant.eligibility}</span>
      </div>

      <p className="mt-5 text-sm leading-7 text-slate-700">{grant.description}</p>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-sm">
        <span className="inline-flex items-center gap-2 text-slate-600">
          <CalendarDays className="h-4 w-4" />
          Deadline: {grant.deadline}
        </span>
        <div className="flex flex-wrap gap-3">
          <a href={grant.href} target="_blank" rel="noreferrer" className="secondary-button">
            Source
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
          <button type="button" onClick={() => onAddToPortal(grant)} className="primary-button">
            Add to Portal
          </button>
        </div>
      </div>
    </article>
  )
}
