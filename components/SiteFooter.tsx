import Link from 'next/link'
import type { NGOConfig } from '@/lib/ngoConfig'
import { systemLinks } from '@/lib/content'

export function SiteFooter({ config }: { config: NGOConfig }) {
  return (
    <footer className="relative z-10 mt-24 border-t border-education-line bg-white/70">
      <div className="page-shell grid gap-10 py-12 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: config.accentColor }}>
            {config.name}
          </p>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-700">{config.description}</p>
          <p className="mt-4 text-sm text-slate-500">BEAM Think Tank is a 501(c)(3) nonprofit system building real-world pathways across education, research, finance, culture, and civic infrastructure.</p>
        </div>

        <div>
          <p className="font-semibold text-education-navy">Site</p>
          <div className="mt-4 space-y-3 text-sm text-slate-700">
            <Link href="/programs" className="block hover:text-education-navy">
              Programs
            </Link>
            <Link href="/research" className="block hover:text-education-navy">
              Research
            </Link>
            <Link href="/data" className="block hover:text-education-navy">
              Open Data Library
            </Link>
            <Link href="/grant-library" className="block hover:text-education-navy">
              Grant Library
            </Link>
            <Link href="/join" className="block hover:text-education-navy">
              Join
            </Link>
          </div>
        </div>

        <div>
          <p className="font-semibold text-education-navy">BEAM System</p>
          <div className="mt-4 space-y-3 text-sm text-slate-700">
            {systemLinks.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="block hover:text-education-navy">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
