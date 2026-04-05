import { NewProgramForm } from '@/components/NewProgramForm'
import { PortalPageShell } from '@/components/PortalPageShell'
import { PortalRoleGate } from '@/components/PortalRoleGate'

export default function NewProgramPage() {
  return (
    <PortalRoleGate allowedRoles={['admin']}>
      <PortalPageShell
        title="Create A New Supplemental Program"
        description="Administrators can publish new Education supplemental programs directly into the `educationPrograms` collection."
      >
        <NewProgramForm />
      </PortalPageShell>
    </PortalRoleGate>
  )
}
