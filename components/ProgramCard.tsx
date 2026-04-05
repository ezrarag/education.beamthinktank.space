import Link from 'next/link'
import type { EducationProgram } from '@/lib/content'

export function ProgramCard({
  program,
  ctaLabel = 'View Program',
}: {
  program: EducationProgram
  ctaLabel?: string
}) {
  return (
    <article className="data-card flex h-full flex-col">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{program.trackName}</p>
          <h3 className="mt-3 text-2xl font-semibold text-education-navy">{program.name}</h3>
        </div>
        <div className="flex items-center gap-3 rounded-full border border-education-line bg-white px-3 py-2 text-xs font-semibold text-slate-700">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full text-white"
            style={{ backgroundColor: program.ngoColor }}
          >
            {program.ngoLogo}
          </span>
          {program.ngo}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-slate-600">
        <span className="rounded-full bg-slate-100 px-3 py-1.5">{program.gradeBand}</span>
        <span className="rounded-full bg-slate-100 px-3 py-1.5">{program.format}</span>
        <span className="rounded-full bg-slate-100 px-3 py-1.5">{program.location}</span>
      </div>

      <p className="mt-5 flex-1 text-sm leading-7 text-slate-700">{program.description}</p>

      <div className="mt-6 flex items-center justify-between gap-4">
        <a href={program.ngoUrl} target="_blank" rel="noreferrer" className="text-sm font-medium text-education-navy underline decoration-education-amber/50 underline-offset-4">
          {program.ngo}
        </a>
        <Link href={program.enrollmentHref} className="secondary-button">
          {ctaLabel}
        </Link>
      </div>
    </article>
  )
}
