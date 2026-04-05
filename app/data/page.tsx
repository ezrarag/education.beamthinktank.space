import { ExternalLink } from 'lucide-react'
import { datasetLibrarySeed } from '@/lib/content'

export default function DataPage() {
  return (
    <div className="page-shell py-12">
      <div className="surface-panel p-8">
        <p className="eyebrow">Open Data Library</p>
        <h1 className="mt-4 section-title">Research-grade datasets relevant to the graduation gap and fiscal audit.</h1>
        <p className="mt-5 max-w-3xl section-copy">
          Each entry below is a starting point for the Education research workspace and for partner analysts contributing to the audit.
        </p>
      </div>

      <section className="mt-8 space-y-5">
        {datasetLibrarySeed.map((dataset) => (
          <article key={dataset.id} className="data-card flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">{dataset.source}</p>
              <h2 className="mt-3 text-2xl font-semibold text-education-navy">{dataset.name}</h2>
              <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-slate-600">
                <span className="rounded-full bg-slate-100 px-3 py-1.5">{dataset.format}</span>
              </div>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-700">{dataset.description}</p>
            </div>
            <a href={dataset.href} target="_blank" rel="noreferrer" className="secondary-button">
              Open Source
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </article>
        ))}
      </section>
    </div>
  )
}
