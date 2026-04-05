import type { ReactNode } from 'react'
import { ngoConfig } from '@/lib/ngoConfig'

export function PortalPageShell({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <section className="surface-panel p-8 shadow-research">
      <p className="eyebrow">Role-Based Dashboard</p>
      <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-education-navy sm:text-4xl">{title}</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">{description}</p>
        </div>
        <div className="rounded-[1.4rem] border border-education-line bg-white/65 px-5 py-4 text-sm text-slate-600">
          Authenticated workspace for {ngoConfig.name}
        </div>
      </div>
      <div className="mt-8">{children}</div>
    </section>
  )
}
