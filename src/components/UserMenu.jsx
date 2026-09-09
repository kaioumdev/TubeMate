import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signOutUser } from '../utils/firebase'
import { clearUser } from '../utils/redux/authSlice'

/* ── Icons ───────────────────────────────────────────────── */
const AccountIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
  </svg>
)
const ChannelIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z"/>
  </svg>
)
const SwitchIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
  </svg>
)
const GoogleAccountIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.05-7.44 7-7.93v15.86zm2-15.86c1.03.13 2 .45 2.87.93H13v-.93zM13 7h5.24c.25.31.48.65.68 1H13V7zm0 3h6.74c.08.33.15.66.19 1H13v-1zm0 9.93V19h2.87c-.87.48-1.84.8-2.87.93zM18.24 17H13v-1h5.92c-.2.35-.43.68-.68 1zm1.5-3H13v-1h6.93c-.04.34-.11.67-.19 1z"/>
  </svg>
)
const PurchasesIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M18 12h-5v5h-2v-5H6v-2h5V5h2v5h5v2zm3-9H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14z"/>
  </svg>
)
const DataIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l7.59-7.59L21 8l-9 9z"/>
  </svg>
)
const AppearanceIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5S18.33 12 17.5 12z"/>
  </svg>
)
const LanguageIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2s.07-1.35.16-2h4.68c.09.65.16 1.32.16 2s-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"/>
  </svg>
)
const SignOutIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
  </svg>
)
const ChevronRight = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style={{ opacity: 0.6 }}>
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
  </svg>
)

/* ── Menu item ───────────────────────────────────────────── */
const MenuItem = ({ icon, label, sub, onClick, hasArrow = false }) => (
  <button className="user-menu-item" onClick={onClick} aria-label={label}>
    <span className="user-menu-item-icon">{icon}</span>
    <span className="user-menu-item-body">
      <span className="user-menu-item-label">{label}</span>
      {sub && <span className="user-menu-item-sub">{sub}</span>}
    </span>
    {hasArrow && <ChevronRight />}
  </button>
)

const MenuDivider = () => <div className="user-menu-divider" />

/* ── UserMenu ─────────────────────────────────────────────── */
const UserMenu = ({ onClose }) => {
  const dispatch  = useDispatch()
  const navigate  = useNavigate()
  const user      = useSelector(s => s.auth.user)
  const menuRef   = useRef(null)

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose()
      }
    }
    // slight delay so the toggle click doesn't immediately close
    const id = setTimeout(() => document.addEventListener('mousedown', handler), 50)
    return () => {
      clearTimeout(id)
      document.removeEventListener('mousedown', handler)
    }
  }, [onClose])

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  const handleSignOut = async () => {
    try {
      await signOutUser()
      dispatch(clearUser())
      onClose()
      navigate('/')
    } catch (err) {
      console.error('Sign out failed:', err)
    }
  }

  return (
    <div className="user-menu" ref={menuRef} role="menu" aria-label="Account menu">
      {/* User identity header */}
      <div className="user-menu-header">
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName}
            className="user-menu-avatar-img"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="user-menu-avatar-fallback">
            {user?.displayName?.[0]?.toUpperCase() || 'U'}
          </div>
        )}
        <div className="user-menu-identity">
          <span className="user-menu-display-name">{user?.displayName}</span>
          <span className="user-menu-email">{user?.email}</span>
          <a
            href="https://myaccount.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="user-menu-manage-link"
          >
            Manage your Google Account
          </a>
        </div>
      </div>

      <MenuDivider />

      {/* Account items */}
      <MenuItem icon={<ChannelIcon />}      label="Your channel"        onClick={onClose} />
      <MenuItem icon={<PurchasesIcon />}    label="Purchases and memberships" onClick={onClose} />
      <MenuItem icon={<DataIcon />}         label="Your data in YouTube"      onClick={onClose} />
      <MenuItem icon={<AppearanceIcon />}   label="Appearance: Device theme"  hasArrow onClick={onClose} />
      <MenuItem icon={<LanguageIcon />}     label="Language: English"         hasArrow onClick={onClose} />

      <MenuDivider />

      <MenuItem icon={<SwitchIcon />}       label="Switch account"   hasArrow onClick={onClose} />
      <MenuItem
        icon={<SignOutIcon />}
        label="Sign out"
        sub={user?.email}
        onClick={handleSignOut}
      />

      <MenuDivider />

      {/* Footer */}
      <div className="user-menu-footer">
        <a href="/" className="user-menu-footer-link">Privacy Policy</a>
        <span className="user-menu-footer-dot">&bull;</span>
        <a href="/" className="user-menu-footer-link">Terms of Service</a>
      </div>
    </div>
  )
}

export default UserMenu
