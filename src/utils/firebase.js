import { initializeApp } from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'

// ── Firebase project config ─────────────────────────────────────────────────
// These values come from your Firebase console → Project settings → Your apps.
// Replace with your own config if you create a new Firebase project.
// All values are safe to be public (they are not secret API keys).
const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
}

// ── Initialize ──────────────────────────────────────────────────────────────
const app      = initializeApp(firebaseConfig)
export const auth     = getAuth(app)
export const provider = new GoogleAuthProvider()

// Request extra scopes so we get the user's profile photo + email
provider.addScope('profile')
provider.addScope('email')
provider.setCustomParameters({ prompt: 'select_account' })

// ── Auth helpers ────────────────────────────────────────────────────────────

/** Sign in with Google popup (preferred on desktop) */
export const signInWithGoogle = () => signInWithPopup(auth, provider)

/** Sign in with redirect (fallback for browsers that block popups) */
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider)

/** Handle redirect result after page reload */
export const handleRedirectResult = () => getRedirectResult(auth)

/** Sign out the current user */
export const signOutUser = () => signOut(auth)

/** Subscribe to auth state changes.
 *  Calls callback(user) immediately with current user (or null).
 *  Returns unsubscribe function. */
export const onAuthChange = (callback) => onAuthStateChanged(auth, callback)

/** Serialize a Firebase User object to a plain Redux-safe object */
export const serializeUser = (user) => {
  if (!user) return null
  return {
    uid:         user.uid,
    displayName: user.displayName,
    email:       user.email,
    photoURL:    user.photoURL,
    providerId:  user.providerData?.[0]?.providerId ?? 'google.com',
  }
}
