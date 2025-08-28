import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import Navigation from '@/components/Navigation'
import { LocationProvider } from '@/contexts/LocationContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BEAM Education - Empowering Communities Through Learning',
  description: 'BEAM Education offers academic and social work programs across multiple cities. Join our community of learners and instructors.',
  keywords: 'education, social work, academic programs, community learning, BEAM',
  authors: [{ name: 'BEAM Education' }],
  openGraph: {
    title: 'BEAM Education - Empowering Communities Through Learning',
    description: 'Join our community of learners and instructors in academic and social work programs.',
    url: 'https://beam-education.space',
    siteName: 'BEAM Education',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BEAM Education',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BEAM Education - Empowering Communities Through Learning',
    description: 'Join our community of learners and instructors in academic and social work programs.',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <LocationProvider>
            <Navigation />
            {children}
          </LocationProvider>
        </Providers>
      </body>
    </html>
  )
}
