import type { ReactNode } from 'react'
import PortalAuthGuard from '@/components/PortalAuthGuard'
import { PortalChrome } from '@/components/PortalChrome'

export default function PortalLayout({ children }: { children: ReactNode }) {
  return (
    <PortalAuthGuard>
      <PortalChrome>{children}</PortalChrome>
    </PortalAuthGuard>
  )
}
