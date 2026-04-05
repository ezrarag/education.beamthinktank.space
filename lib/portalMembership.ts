import type { User } from 'firebase/auth'
import { arrayUnion, doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { ngoConfig, type NGORole } from '@/lib/ngoConfig'
import type { MembershipInterestRole } from '@/lib/content'

export interface MembershipRecord {
  uid: string
  email: string | null
  ngo: string
  role: NGORole
  fullName?: string
  cityState?: string
  joinRole?: MembershipInterestRole
  school?: string
  gradeLevel?: string
  heardAbout?: string
  interests?: string[]
  academicCreditInterest?: boolean
  createdAt?: unknown
}

const ROLE_ALIASES: Record<NGORole, Set<string>> = {
  participant: new Set(['participant', 'student', 'family', 'parent', 'community', 'member']),
  educator: new Set(['educator', 'teacher', 'instructor', 'coach', 'counselor']),
  researcher: new Set(['researcher', 'grant', 'writer', 'analyst', 'policy']),
  admin: new Set(['admin', 'director', 'lead', 'manager', 'operator', 'staff']),
}

export function normalizeMembershipRole(role: unknown): NGORole {
  if (typeof role !== 'string') return ngoConfig.defaultRole

  const tokens = role
    .trim()
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean)

  for (const [resolvedRole, aliases] of Object.entries(ROLE_ALIASES) as [NGORole, Set<string>][]) {
    if (tokens.some((token) => aliases.has(token))) {
      return resolvedRole
    }
  }

  return ngoConfig.defaultRole
}

export function deriveMembershipRole(joinRole: MembershipInterestRole): NGORole {
  if (joinRole === 'Educator') return 'educator'
  if (joinRole === 'Grant Writer' || joinRole === 'Researcher') return 'researcher'
  return 'participant'
}

export async function ensureUserMembership(user: User): Promise<MembershipRecord> {
  if (!db) {
    throw new Error('Firebase is not configured for Firestore access.')
  }

  const membershipRef = doc(db, ngoConfig.firestoreCollections.memberships, user.uid)
  const membershipSnap = await getDoc(membershipRef)

  if (!membershipSnap.exists()) {
    const membership: MembershipRecord = {
      uid: user.uid,
      email: user.email,
      ngo: ngoConfig.id,
      role: ngoConfig.defaultRole,
    }

    await setDoc(membershipRef, {
      ...membership,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })

    return membership
  }

  const membershipData = membershipSnap.data()
  const role = normalizeMembershipRole(membershipData.role)
  const email = user.email ?? (typeof membershipData.email === 'string' ? membershipData.email : null)

  if (role !== membershipData.role || membershipData.ngo !== ngoConfig.id || membershipData.email !== email) {
    await setDoc(
      membershipRef,
      {
        uid: user.uid,
        email,
        ngo: ngoConfig.id,
        role,
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    )
  }

  return {
    uid: user.uid,
    email,
    ngo: ngoConfig.id,
    role,
    fullName: typeof membershipData.fullName === 'string' ? membershipData.fullName : undefined,
    cityState: typeof membershipData.cityState === 'string' ? membershipData.cityState : undefined,
    joinRole: typeof membershipData.joinRole === 'string' ? (membershipData.joinRole as MembershipInterestRole) : undefined,
    school: typeof membershipData.school === 'string' ? membershipData.school : undefined,
    gradeLevel: typeof membershipData.gradeLevel === 'string' ? membershipData.gradeLevel : undefined,
    heardAbout: typeof membershipData.heardAbout === 'string' ? membershipData.heardAbout : undefined,
    interests: Array.isArray(membershipData.interests) ? membershipData.interests.filter((value): value is string => typeof value === 'string') : undefined,
    academicCreditInterest: typeof membershipData.academicCreditInterest === 'boolean' ? membershipData.academicCreditInterest : undefined,
    createdAt: membershipData.createdAt,
  }
}

export async function readUserMembership(userId: string) {
  if (!db) return null

  const membershipSnap = await getDoc(doc(db, ngoConfig.firestoreCollections.memberships, userId))
  if (!membershipSnap.exists()) return null

  const membershipData = membershipSnap.data()

  return {
    uid: userId,
    email: typeof membershipData.email === 'string' ? membershipData.email : null,
    ngo: typeof membershipData.ngo === 'string' ? membershipData.ngo : ngoConfig.id,
    role: normalizeMembershipRole(membershipData.role),
    fullName: typeof membershipData.fullName === 'string' ? membershipData.fullName : undefined,
    cityState: typeof membershipData.cityState === 'string' ? membershipData.cityState : undefined,
    joinRole: typeof membershipData.joinRole === 'string' ? (membershipData.joinRole as MembershipInterestRole) : undefined,
    school: typeof membershipData.school === 'string' ? membershipData.school : undefined,
    gradeLevel: typeof membershipData.gradeLevel === 'string' ? membershipData.gradeLevel : undefined,
    heardAbout: typeof membershipData.heardAbout === 'string' ? membershipData.heardAbout : undefined,
    interests: Array.isArray(membershipData.interests) ? membershipData.interests.filter((value): value is string => typeof value === 'string') : undefined,
    academicCreditInterest: typeof membershipData.academicCreditInterest === 'boolean' ? membershipData.academicCreditInterest : undefined,
    createdAt: membershipData.createdAt,
  } satisfies MembershipRecord
}

export interface JoinProfilePayload {
  fullName: string
  email: string
  role: MembershipInterestRole
  gradeLevel?: string
  school?: string
  cityState: string
  heardAbout: string
  interests: string[]
  academicCreditInterest: boolean
  selectedProgramId?: string | null
}

export async function saveJoinProfile(user: User, payload: JoinProfilePayload) {
  if (!db) {
    throw new Error('Firebase is not configured for Firestore access.')
  }

  const membershipRole = deriveMembershipRole(payload.role)
  const membershipRef = doc(db, ngoConfig.firestoreCollections.memberships, user.uid)

  await setDoc(
    membershipRef,
    {
      uid: user.uid,
      email: user.email ?? payload.email,
      ngo: ngoConfig.id,
      role: membershipRole,
      fullName: payload.fullName,
      joinRole: payload.role,
      gradeLevel: payload.gradeLevel || null,
      school: payload.school || null,
      cityState: payload.cityState,
      heardAbout: payload.heardAbout,
      interests: payload.interests,
      academicCreditInterest: payload.academicCreditInterest,
      updatedAt: serverTimestamp(),
      joinedAt: serverTimestamp(),
    },
    { merge: true },
  )

  if (payload.selectedProgramId) {
    await setDoc(
      doc(db, ngoConfig.firestoreCollections.enrollments, user.uid),
      {
        programs: arrayUnion(payload.selectedProgramId),
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    )
  }

  return {
    uid: user.uid,
    email: user.email ?? payload.email,
    ngo: ngoConfig.id,
    role: membershipRole,
    fullName: payload.fullName,
    joinRole: payload.role,
    gradeLevel: payload.gradeLevel,
    school: payload.school,
    cityState: payload.cityState,
    heardAbout: payload.heardAbout,
    interests: payload.interests,
    academicCreditInterest: payload.academicCreditInterest,
  } satisfies MembershipRecord
}
