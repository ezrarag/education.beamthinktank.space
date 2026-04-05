import type { NGORole } from '@/lib/ngoConfig'

const ROLE_ROUTE_MAP: Record<NGORole, string> = {
  participant: '/portal/dashboard',
  educator: '/portal/dashboard',
  researcher: '/portal/research',
  admin: '/portal/programs/new',
}

const ROLE_ALIASES: Record<NGORole, Set<string>> = {
  participant: new Set(['participant', 'student', 'family', 'parent', 'community', 'member']),
  educator: new Set(['educator', 'teacher', 'instructor', 'coach', 'counselor']),
  researcher: new Set(['researcher', 'grant', 'writer', 'analyst', 'policy']),
  admin: new Set(['admin', 'director', 'lead', 'manager', 'operator', 'staff']),
}

function tokenizeRole(role: string) {
  return role
    .trim()
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean)
}

export function resolvePortalPath(role: string | null | undefined) {
  if (!role) return ROLE_ROUTE_MAP.participant

  const normalizedRole = role.trim().toLowerCase()

  if (normalizedRole in ROLE_ROUTE_MAP) {
    return ROLE_ROUTE_MAP[normalizedRole as NGORole]
  }

  const tokens = tokenizeRole(role)

  for (const [resolvedRole, aliases] of Object.entries(ROLE_ALIASES) as [NGORole, Set<string>][]) {
    if (tokens.some((token) => aliases.has(token))) {
      return ROLE_ROUTE_MAP[resolvedRole]
    }
  }

  return ROLE_ROUTE_MAP.participant
}
