import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import { AppHeader } from '@/components/AppHeader'
import { AuthBootstrapper } from '@/components/AuthBootstrapper'
import { SiteFooter } from '@/components/SiteFooter'
import { ngoConfig } from '@/lib/ngoConfig'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
})

function buildMetadataBase(siteUrl: string) {
  if (!siteUrl.trim()) return undefined

  try {
    return new URL(siteUrl)
  } catch {
    return undefined
  }
}

export const metadata: Metadata = {
  metadataBase: buildMetadataBase(ngoConfig.siteUrl),
  title: ngoConfig.name,
  description: ngoConfig.description,
  openGraph: {
    title: ngoConfig.name,
    description: ngoConfig.description,
    url: ngoConfig.siteUrl,
    siteName: ngoConfig.name,
    type: 'website',
  },
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfairDisplay.variable}`}>
      <body className="min-h-screen bg-education-cream font-sans text-education-charcoal antialiased">
        <AuthBootstrapper />
        <div className="relative min-h-screen overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-education-grid bg-[size:54px_54px] opacity-30" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(circle_at_top_left,rgba(244,161,29,0.16),transparent_42%),radial-gradient(circle_at_top_right,rgba(26,58,92,0.18),transparent_35%)]" />
          <AppHeader config={ngoConfig} />
          <main className="relative z-10">{children}</main>
          <SiteFooter config={ngoConfig} />
        </div>
      </body>
    </html>
  )
}
