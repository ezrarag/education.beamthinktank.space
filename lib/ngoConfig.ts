export type NGORole = 'participant' | 'educator' | 'researcher' | 'admin'

export interface NGOTrack {
  id: string
  label: string
  role: NGORole
  slug: string
  name: string
  summary: string
  focus: string
  outcomes: string[]
}

export interface NGOConfig {
  id: string
  slug: string
  name: string
  subdomain: string
  siteUrl: string
  domain: string
  tagline: string
  description: string
  primaryColor: string
  accentColor: string
  roles: NGORole[]
  defaultRole: NGORole
  firestoreCollections: {
    memberships: string
    enrollments: string
    programs: string
    grantApplications: string
    recordsRequests: string
    advocacy: string
    researchBriefs: string
  }
  tracks: NGOTrack[]
  cohortId: string
  organizationId: string
  entryChannel: string
  beamHomeUrl: string
  handoffReturnPath: string
}

const educationTracks: NGOTrack[] = [
  {
    id: 'dashboard',
    label: 'Participant Dashboard',
    role: 'participant',
    slug: 'participant-dashboard',
    name: 'Participant Dashboard',
    summary: 'Enrollment, matched opportunities, and portfolio tracking for BEAM Education participants.',
    focus: 'Student-facing program navigation and portfolio readiness.',
    outcomes: ['Program enrollments', 'Opportunity queue', 'Portfolio milestones'],
  },
  {
    id: 'educator-network',
    label: 'Educator Network',
    role: 'educator',
    slug: 'educator-network',
    name: 'Educator Network',
    summary: 'Curriculum supplements and classroom partnership flow for teacher collaborators.',
    focus: 'Supplemental lesson integration and educator support.',
    outcomes: ['Track-aligned lesson assets', 'Partner onboarding', 'Teacher PD pathways'],
  },
  {
    id: 'research-workspace',
    label: 'Research Workspace',
    role: 'researcher',
    slug: 'research-workspace',
    name: 'Research Workspace',
    summary: 'Grant development, records request tracking, and Finance-intake-ready briefs.',
    focus: 'Evidence production, data requests, and funder strategy.',
    outcomes: ['Grant applications', 'Research briefs', 'Records analysis pipeline'],
  },
  {
    id: 'program-administration',
    label: 'Program Administration',
    role: 'admin',
    slug: 'program-administration',
    name: 'Program Administration',
    summary: 'Program setup, capacity planning, and final approval control for education staff.',
    focus: 'Program creation, governance, and operations.',
    outcomes: ['New program records', 'Enrollment controls', 'Operational oversight'],
  },
]

export const ngoConfig: NGOConfig = {
  id: 'education',
  slug: 'education',
  name: 'BEAM Education',
  subdomain: 'education',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'https://education.beamthinktank.space',
  domain: 'education.beamthinktank.space',
  tagline: 'Research-driven supplemental education built to close Wisconsin’s graduation gap.',
  description:
    'BEAM Education exists to close the 20-point K-12 graduation gap in Wisconsin through rigorous research, supplemental learning tracks, and a zero-tolerance stance toward the expectation gap.',
  primaryColor: '#1A3A5C',
  accentColor: '#F4A11D',
  roles: ['participant', 'educator', 'researcher', 'admin'],
  defaultRole: 'participant',
  firestoreCollections: {
    memberships: 'ngoMemberships',
    enrollments: 'educationEnrollments',
    programs: 'educationPrograms',
    grantApplications: 'educationGrantApplications',
    recordsRequests: 'educationRecordsRequests',
    advocacy: 'educationAdvocacy',
    researchBriefs: 'educationResearchBriefs',
  },
  tracks: educationTracks,
  cohortId: process.env.NEXT_PUBLIC_EDUCATION_COHORT_ID?.trim() || 'cohort_beam_education_launch',
  organizationId: process.env.NEXT_PUBLIC_EDUCATION_ORGANIZATION_ID?.trim() || 'org_beam_education',
  entryChannel: process.env.NEXT_PUBLIC_EDUCATION_ENTRY_CHANNEL?.trim() || 'education.beamthinktank.space',
  beamHomeUrl: process.env.NEXT_PUBLIC_BEAM_HOME_URL?.trim() || 'https://home.beamthinktank.space',
  handoffReturnPath: '/portal/dashboard',
}

export const educationConfig = ngoConfig
