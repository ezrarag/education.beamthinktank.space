import { GrantLibraryList } from '@/components/GrantLibraryList'

export default function GrantLibraryPage() {
  return (
    <div className="page-shell py-12">
      <div className="surface-panel p-8">
        <p className="eyebrow">Active Funding Opportunities</p>
        <h1 className="mt-4 section-title">Grant opportunities aligned to K-12 equity, supplemental education, research, and advocacy.</h1>
        <p className="mt-5 max-w-3xl section-copy">
          The library is seeded for the portal build and can be routed into the researcher workspace with membership-aware access.
        </p>
      </div>

      <section className="mt-8">
        <GrantLibraryList />
      </section>
    </div>
  )
}
