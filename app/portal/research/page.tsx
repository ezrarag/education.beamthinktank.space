import { PortalPageShell } from '@/components/PortalPageShell'
import { PortalResearchWorkspace } from '@/components/PortalResearchWorkspace'
import { PortalRoleGate } from '@/components/PortalRoleGate'

export default function PortalResearchPage() {
  return (
    <PortalRoleGate allowedRoles={['researcher', 'admin']}>
      <PortalPageShell
        title="Research & Grant Workspace"
        description="Track grant applications, create Finance-ready research briefs, and keep the records-request pipeline moving."
      >
        <PortalResearchWorkspace />
      </PortalPageShell>
    </PortalRoleGate>
  )
}
