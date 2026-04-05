import { Suspense } from 'react'
import { JoinForm } from '@/components/JoinForm'

export default function JoinPage() {
  return (
    <div className="page-shell py-12">
      <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="surface-panel p-8">
          <p className="eyebrow">Join BEAM Education</p>
          <h1 className="mt-4 section-title">Enrollment starts with identity, interests, and a real program path.</h1>
          <p className="mt-5 section-copy">
            Students, educators, researchers, grant writers, and community members all use the same shared BEAM Firebase project. Your Google sign-in creates or updates `ngoMemberships/{'{uid}'}` and then completes the Education-specific profile fields.
          </p>
          <div className="mt-8 space-y-4 rounded-[1.6rem] border border-education-line bg-white p-6">
            <div>
              <p className="font-semibold text-education-navy">What happens after submission?</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">Participants land in the dashboard. Educators and researchers can be routed into portal workspaces after role review.</p>
            </div>
            <div>
              <p className="font-semibold text-education-navy">What data is stored?</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">Only membership profile data needed for matching, program requests, and research coordination.</p>
            </div>
          </div>
        </div>

        <Suspense fallback={<div className="surface-panel p-8 text-slate-600">Loading enrollment form...</div>}>
          <JoinForm />
        </Suspense>
      </div>
    </div>
  )
}
