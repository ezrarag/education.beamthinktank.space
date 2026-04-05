import Link from 'next/link'
import { GraduationGapChart } from '@/components/GraduationGapChart'
import { ProgramCard } from '@/components/ProgramCard'
import { StatCounter } from '@/components/StatCounter'
import { educationProgramsSeed } from '@/lib/content'

export default function HomePage() {
  return (
    <div className="pb-12">
      <section className="page-shell pt-10 sm:pt-14">
        <div className="overflow-hidden rounded-[2.4rem] bg-education-navy px-6 py-10 text-white shadow-research sm:px-10 sm:py-14">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-education-amber">Wisconsin Graduation Audit</p>
              <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[1.02] text-white sm:text-6xl lg:text-7xl">
                20 points. The gap between belief and outcome.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/76">
                BEAM Education exists to close it with research, real-world programs, and zero tolerance for the expectation gap.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/programs" className="inline-flex items-center rounded-full bg-education-amber px-5 py-3 text-sm font-semibold text-education-navy transition hover:brightness-105">
                  Explore Programs
                </Link>
                <Link href="/research" className="inline-flex items-center rounded-full border border-white/16 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/8">
                  Read The Audit
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="metric-card">
                <p className="text-xs uppercase tracking-[0.22em] text-white/60">Black students</p>
                <p className="mt-4 font-display text-5xl text-education-amber sm:text-6xl">
                  <StatCounter value={75.7} />
                </p>
                <p className="mt-4 text-sm leading-7 text-white/70">Wisconsin four-year graduation rate benchmark used as the front-door accountability metric.</p>
              </div>
              <div className="metric-card">
                <p className="text-xs uppercase tracking-[0.22em] text-white/60">White students</p>
                <p className="mt-4 font-display text-5xl text-white sm:text-6xl">
                  <StatCounter value={95.8} />
                </p>
                <p className="mt-4 text-sm leading-7 text-white/70">The gap is not a mystery. It is measurable, durable, and correctable.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell mt-16 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="surface-panel p-8">
          <p className="eyebrow">The Fiscal Audit</p>
          <h2 className="mt-4 section-title">Taxation without adequate educational return.</h2>
          <div className="mt-5 space-y-5 text-base leading-8 text-slate-700">
            <p>
              The BEAM Education audit starts with a basic question: what does Wisconsin ask Black families to pay into a system that consistently underdelivers for Black children?
            </p>
            <p>
              Families in the lower and middle income quintiles shoulder higher effective state and local tax rates than the wealthiest households, while the public system still produces a persistent outcome gap. That is a fiscal integrity problem, not a narrative problem.
            </p>
            <p>
              We treat that mismatch as an auditable public obligation. The intervention model is direct: pair rigorous evidence with supplemental programs tied to live BEAM tracks so students gain both academic lift and real-world pathway exposure.
            </p>
          </div>
        </div>

        <GraduationGapChart title="Wisconsin Black vs. white graduation rates" />
      </section>

      <section className="page-shell mt-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">The Programs</p>
            <h2 className="mt-4 section-title">Supplemental tracks connected to the wider BEAM system.</h2>
          </div>
          <Link href="/programs" className="secondary-button">
            View All Programs
          </Link>
        </div>

        <div className="mt-8 flex gap-6 overflow-x-auto pb-3">
          {educationProgramsSeed.map((program) => (
            <div key={program.id} className="min-w-[320px] max-w-[360px] flex-1">
              <ProgramCard program={program} ctaLabel="Explore" />
            </div>
          ))}
        </div>
      </section>

      <section className="page-shell mt-16">
        <div className="surface-panel grid gap-8 p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="eyebrow">Join The Research</p>
            <h2 className="mt-4 section-title">Grant writers, researchers, and educators are part of the intervention stack.</h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-700">
              This work is not just student-facing. We need records requests, grant development, educator partnerships, and classroom pilots moving at the same time.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/join?role=researcher" className="primary-button">
              Join The Workspace
            </Link>
            <Link href="/educators" className="secondary-button">
              For Educators
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
