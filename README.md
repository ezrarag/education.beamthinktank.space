# education.beamthinktank.space

Next.js 14 App Router site for the BEAM Think Tank Education NGO.

## Mission

BEAM Education exists to close the 20-point K-12 graduation gap between Black students and white students in Wisconsin through research-driven supplemental programs tied to live BEAM NGO tracks.

## Stack

- Next.js 14 App Router
- Tailwind CSS
- Firebase Auth (Google SSO only)
- Firestore (`home-beam` shared project)
- Recharts for data visualization

## Firebase Collections

- `ngoMemberships/{uid}`
- `educationEnrollments/{uid}`
- `educationPrograms/{programId}`
- `educationGrantApplications/{grantId}`
- `educationRecordsRequests/{requestId}`
- `educationAdvocacy/{contactId}`
- `educationResearchBriefs/{briefId}`

## Environment Variables

Copy `.env.local` from `grounds.beamthinktank.space` or use the same shared Firebase project values:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

## Local Setup

1. Clone the repo.
2. Copy `.env.local` from the local `grounds.beamthinktank.space` repo into this repo.
3. Run `npm install`.
4. Run `npm run dev`.

## Deployment

1. Deploy with `vercel --prod`.
2. Point DNS for `education.beamthinktank.space` at the Vercel deployment URL.
3. Set all `NEXT_PUBLIC_FIREBASE_*` variables in the Vercel dashboard to the shared `home-beam` project credentials.

## Redirect Note

`community.beamthinktank.space/education/*` should 301 redirect to `https://education.beamthinktank.space/*`.

That redirect cannot be completed from this repo alone. Update the redirect rules or middleware in the `community.beamthinktank.space` project and remove the old `/education` catch so traffic points at this dedicated deployment.

## Auth Pattern

- Google SSO only
- No email/password auth
- First sign-in writes `ngoMemberships/{uid}` idempotently
- Default role is `participant`
- Portal routing resolves from membership role

## Portal Routes

- `/portal/dashboard`
- `/portal/research`
- `/portal/audit`
- `/portal/advocacy`
- `/portal/programs/new`
