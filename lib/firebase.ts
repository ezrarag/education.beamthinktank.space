import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const isConfigured = Object.values(firebaseConfig).every((value) => Boolean(value && value !== 'undefined'))

export const firebaseApp = isConfigured ? (getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)) : null
export const auth = firebaseApp ? getAuth(firebaseApp) : null
export const db = firebaseApp ? getFirestore(firebaseApp) : null

if (auth && typeof window !== 'undefined' && !(window as Window & { __BEAM_AUTH_LISTENER_ATTACHED__?: boolean }).__BEAM_AUTH_LISTENER_ATTACHED__) {
  ;(window as Window & { __BEAM_AUTH_LISTENER_ATTACHED__?: boolean }).__BEAM_AUTH_LISTENER_ATTACHED__ = true
  onAuthStateChanged(auth, (user) => {
    ;(window as Window & { __BEAM_AUTH_USER__?: { uid: string; email: string | null; displayName: string | null } | null }).__BEAM_AUTH_USER__ = user
      ? {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        }
      : null
  })
}

export function subscribeToAuth(callback: (user: User | null) => void) {
  if (!auth) {
    callback(null)
    return () => undefined
  }

  return onAuthStateChanged(auth, callback, () => callback(null))
}
