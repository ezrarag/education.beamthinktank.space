import { ProgramsFilterGrid } from '@/components/ProgramsFilterGrid'

export default function ProgramsPage() {
  return (
    <div className="page-shell py-12">
      <div className="surface-panel p-8">
        <p className="eyebrow">Programs</p>
        <h1 className="mt-4 section-title">Supplemental programs built around live BEAM tracks.</h1>
        <p className="mt-5 max-w-3xl section-copy">
          Filter by track, grade band, delivery model, or location. Each program is designed to supplement school, not replace it.
        </p>
      </div>

      <section className="mt-8">
        <ProgramsFilterGrid />
      </section>
    </div>
  )
}
