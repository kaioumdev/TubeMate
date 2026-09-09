import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signInWithGoogle, signInWithGoogleRedirect, signOutUser } from '../utils/firebase'
import { setAuthError, setAuthLoading } from '../utils/redux/authSlice'

/* ── Icons ───────────────────────────────────────────────── */
const GoogleIcon = () => (
  <svg viewBox="0 0 48 48" width="20" height="20">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.36-8.16 2.36-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    <path fill="none" d="M0 0h48v48H0z"/>
  </svg>
)

const TubeMateLogoFull = () => (
  <svg height="28" viewBox="0 0 140 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="38" height="28" rx="5" fill="#FF0000"/>
    <path d="M16 9l12 5-12 5V9z" fill="white"/>
    <text x="44" y="21" fontFamily="Roboto,Arial,sans-serif" fontWeight="700" fontSize="18" fill="#FF0000">TubeMate</text>
  </svg>
)

/* ── Sign In Page ─────────────────────────────────────────── */
const SignInPage = () => {
  const dispatch   = useDispatch()
  const navigate   = useNavigate()
  const user       = useSelector(s => s.auth.user)
  const authError  = useSelector(s => s.auth.error)
  const [loading, setLoading] = useState(false)
  const [localError, setLocalError] = useState('')

  // Already signed in → go home
  useEffect(() => {
    if (user) navigate('/', { replace: true })
  }, [user, navigate])

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setLocalError('')
    dispatch(setAuthError(null))
    try {
      await signInWithGoogle()
      // onAuthStateChanged in App.jsx will catch the result and update Redux
      navigate('/', { replace: true })
    } catch (err) {
      // popup closed by user — not a real error
      if (err.code === 'auth/popup-closed-by-user' || err.code === 'auth/cancelled-popup-request') {
        setLocalError('')
      } else if (err.code === 'auth/popup-blocked') {
        // Fall back to redirect
        try {
          await signInWithGoogleRedirect()
        } catch {
          setLocalError('Sign-in failed. Please allow popups for this site and try again.')
        }
      } else {
        setLocalError(err.message || 'Sign-in failed. Please try again.')
        dispatch(setAuthError(err.message))
      }
    } finally {
      setLoading(false)
    }
  }

  const error = localError || authError

  return (
    <div className="signin-page">
      {/* Background gradient */}
      <div className="signin-bg" aria-hidden="true" />

      {/* Card */}
      <div className="signin-card" role="main">
        {/* Logo */}
        <div className="signin-logo">
          <TubeMateLogoFull />
        </div>

        {/* Heading */}
        <h1 className="signin-title">Sign in</h1>
        <p className="signin-subtitle">to continue to TubeMate</p>

        {/* Error banner */}
        {error && (
          <div className="signin-error" role="alert">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Google Sign In button */}
        <button
          className="signin-google-btn"
          onClick={handleGoogleSignIn}
          disabled={loading}
          aria-label="Sign in with Google"
        >
          {loading ? (
            <span className="signin-spinner" aria-hidden="true" />
          ) : (
            <GoogleIcon />
          )}
          <span>{loading ? 'Signing in…' : 'Sign in with Google'}</span>
        </button>

        {/* Divider */}
        <div className="signin-divider">
          <span className="signin-divider-line" />
          <span className="signin-divider-text">or</span>
          <span className="signin-divider-line" />
        </div>

        {/* Guest mode */}
        <button
          className="signin-guest-btn"
          onClick={() => navigate('/', { replace: true })}
        >
          Continue as guest
        </button>

        {/* Footer */}
        <p className="signin-footer">
          By continuing, you agree to TubeMate&apos;s{' '}
          <a href="/" className="signin-link">Terms of Service</a>
          {' '}and{' '}
          <a href="/" className="signin-link">Privacy Policy</a>.
        </p>
      </div>

      {/* Bottom branding */}
      <div className="signin-bottom">
        <span>English (US)</span>
        <span>&bull;</span>
        <a href="/" className="signin-link">Help</a>
        <span>&bull;</span>
        <a href="/" className="signin-link">Privacy</a>
        <span>&bull;</span>
        <a href="/" className="signin-link">Terms</a>
      </div>
    </div>
  )
}

export default SignInPage
