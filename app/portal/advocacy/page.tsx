import { PortalAdvocacyWorkspace } from '@/components/PortalAdvocacyWorkspace'
import { PortalPageShell } from '@/components/PortalPageShell'
import { PortalRoleGate } from '@/components/PortalRoleGate'

export default function PortalAdvocacyPage() {
  return (
    <PortalRoleGate allowedRoles={['researcher', 'admin']}>
      <PortalPageShell
        title="Legislative Tracker"
        description="Track legislative outreach, bill movement, and testimony strategy tied to Wisconsin education equity advocacy."
      >
        <PortalAdvocacyWorkspace />
      </PortalPageShell>
    </PortalRoleGate>
  )
}
