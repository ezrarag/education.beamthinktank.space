import { GraduationGapChart } from '@/components/GraduationGapChart'
import { RecordsRequestTracker } from '@/components/RecordsRequestTracker'
import { recordsRequestsSeed, taxBurdenRows } from '@/lib/content'

export default function ResearchPage() {
  return (
    <div className="page-shell py-12">
      <div className="surface-panel p-8">
        <p className="eyebrow">The Audit</p>
        <h1 className="mt-4 section-title">The fiscal and educational audit behind BEAM Education.</h1>
        <p className="mt-5 max-w-3xl section-copy">
          This page packages the current research narrative driving the Education NGO: tax burden, graduation outcomes, teacher representation, and active records requests.
        </p>
      </div>

      <section className="mt-8 data-card">
        <p className="eyebrow">1. Where the money goes</p>
        <h2 className="mt-3 text-3xl font-semibold text-education-navy">Wisconsin tax burden by income percentile</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
          Source reference: ITEP, <em>Who Pays?</em> Wisconsin incidence tables. Seed values below are included for the UI build and should be replaced with final audited extract before launch.
        </p>
        <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-education-line">
          <table className="min-w-full divide-y divide-slate-200 bg-white text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium">Income Group</th>
                <th className="px-4 py-3 font-medium">Income Range</th>
                <th className="px-4 py-3 font-medium">Effective Tax Rate</th>
                <th className="px-4 py-3 font-medium">Interpretation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {taxBurdenRows.map((row) => (
                <tr key={row.group}>
                  <td className="px-4 py-4 font-semibold text-education-navy">{row.group}</td>
                  <td className="px-4 py-4 text-slate-700">{row.incomeRange}</td>
                  <td className="px-4 py-4 text-slate-700">{row.effectiveTaxRate}</td>
                  <td className="px-4 py-4 text-slate-700">{row.burdenNote}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8">
        <GraduationGapChart title="2. Where the outcomes land" />
      </section>

      <section className="mt-8 data-card">
        <p className="eyebrow">3. The gap in teachers</p>
        <h2 className="mt-3 text-3xl font-semibold text-education-navy">Teacher demographics and representation</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
          Data requested. Placeholder shown while the DPI teacher demographics records request is pending.
        </p>
        <div className="mt-6 rounded-[1.5rem] border border-dashed border-education-line bg-slate-50 p-6">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-semibold text-education-navy">Data requested</p>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">April 5, 2026</span>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[70, 52, 35].map((height, index) => (
              <div key={height} className="rounded-[1.3rem] border border-education-line bg-white p-4">
                <div className="flex h-40 items-end rounded-2xl bg-slate-100 p-3">
                  <div className="w-full rounded-t-xl bg-slate-300" style={{ height: `${height}%` }} />
                </div>
                <p className="mt-4 text-sm text-slate-500">Placeholder series {index + 1}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8 data-card">
        <p className="eyebrow">4. Active Records Requests</p>
        <h2 className="mt-3 text-3xl font-semibold text-education-navy">Current open requests and response status</h2>
        <div className="mt-6">
          <RecordsRequestTracker requests={recordsRequestsSeed} />
        </div>
      </section>
    </div>
  )
}
