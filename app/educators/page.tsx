import Link from 'next/link'

const steps = ['Apply', 'Get matched to a BEAM track', 'Access curriculum resources']
const faqs = [
  { question: 'Is this free?', answer: 'Yes. BEAM supplemental curriculum access is free to participating educators.' },
  { question: 'Does it require school approval?', answer: 'No. Educators can enroll independently and use materials as supplements.' },
  { question: 'What commitment is required?', answer: 'Minimum one program per semester.' },
]

export default function EducatorsPage() {
  return (
    <div className="page-shell py-12">
      <div className="surface-panel p-8">
        <p className="eyebrow">For Educators</p>
        <h1 className="mt-4 section-title">Integrate BEAM supplemental curriculum into your classroom without changing your lesson plan.</h1>
        <p className="mt-5 max-w-3xl section-copy">
          BEAM Education is designed to fit alongside the classroom. Educators get track-aligned supplements, portfolio tracking, and teacher professional development credit options.
        </p>
      </div>

      <section className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="data-card">
          <h2 className="text-2xl font-semibold text-education-navy">Curriculum supplements by NGO track</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">Bring in web development, finance, environmental science, food entrepreneurship, music theory, or automotive systems without rebuilding your existing course map.</p>
        </div>
        <div className="data-card">
          <h2 className="text-2xl font-semibold text-education-navy">Student portfolio tracking</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">Students document artifacts that can move from classroom enrichment to live BEAM pathway evidence.</p>
        </div>
        <div className="data-card">
          <h2 className="text-2xl font-semibold text-education-navy">Professional development credit</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">Educator participation can be packaged into PD-aligned professional learning and implementation support.</p>
        </div>
      </section>

      <section className="mt-8 data-card">
        <p className="eyebrow">How It Works</p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step} className="rounded-[1.4rem] border border-education-line bg-slate-50 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Step {index + 1}</p>
              <p className="mt-3 text-xl font-semibold text-education-navy">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 data-card flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow">Apply To Partner</p>
          <h2 className="mt-3 text-3xl font-semibold text-education-navy">Start the educator enrollment flow.</h2>
        </div>
        <Link href="/join?role=educator" className="primary-button">
          Apply to Partner
        </Link>
      </section>

      <section className="mt-8 data-card">
        <p className="eyebrow">FAQ</p>
        <div className="mt-5 space-y-5">
          {faqs.map((faq) => (
            <div key={faq.question} className="rounded-[1.4rem] border border-education-line bg-slate-50 p-5">
              <h3 className="text-xl font-semibold text-education-navy">{faq.question}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
