import { PortalDashboardClient } from '@/components/PortalDashboardClient'
import { PortalPageShell } from '@/components/PortalPageShell'

export default function PortalDashboardPage() {
  return (
    <PortalPageShell
      title="Participant Dashboard"
      description="Review your current program enrollments, see track-matched opportunities, and monitor the portfolio space where completed BEAM work will live."
    >
      <PortalDashboardClient />
    </PortalPageShell>
  )
}
