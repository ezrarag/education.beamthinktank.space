import { PortalAuditWorkspace } from '@/components/PortalAuditWorkspace'
import { PortalPageShell } from '@/components/PortalPageShell'
import { PortalRoleGate } from '@/components/PortalRoleGate'

export default function PortalAuditPage() {
  return (
    <PortalRoleGate allowedRoles={['researcher', 'admin']}>
      <PortalPageShell
        title="Data Audit Tracker"
        description="Maintain the full records-request ledger, update statuses, and keep open-data acquisition synchronized with research analysis."
      >
        <PortalAuditWorkspace />
      </PortalPageShell>
    </PortalRoleGate>
  )
}
