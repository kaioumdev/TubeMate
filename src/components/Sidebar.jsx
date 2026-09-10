import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

/* ─── Icons ──────────────────────────────────────────────── */
const HomeIcon = ({ filled }) => (
  <svg height="24" viewBox="0 0 24 24" width="24">
    {filled
      ? <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
      : <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5zm2-18l8 7.5V19h-3v-6H7v6H4V9.5L12 2z"/>
    }
  </svg>
)
const ShortsIcon = () => (
  <svg height="24" viewBox="0 0 24 24" width="24">
    <path d="M17.77 10.32l-1.2-.5L18 9c.66-.27 1-.95.75-1.6l-.04-.1c-.25-.63-.96-.94-1.6-.7l-5 2.08A4 4 0 0 0 10 15c0 2.21 1.79 4 4 4s4-1.79 4-4c0-.67-.16-1.3-.46-1.85l.7-.3c.64-.26.96-.97.7-1.61l-.17-.42a1.2 1.2 0 0 0-.93-.68l-.07-.82zM14 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM10 9V7.5A3.5 3.5 0 0 1 13.5 4H15v2h-1.5A1.5 1.5 0 0 0 12 7.5V9h-2z"/>
  </svg>
)
const SubscriptionsIcon = () => (
  <svg height="24" viewBox="0 0 24 24" width="24">
    <path d="M10 18v-2H4V6h16v2h2V5c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14c0 .55.45 1 1 1h7v-1zm9 0v3l5-3-5-3v3zm-4-4h2v-2h-2v2zm0-4h2V8h-2v2zm-4 4h2v-2h-2v2zm0-4h2V8h-2v2z"/>
  </svg>
)
const LibraryIcon = () => (
  <svg height="24" viewBox="0 0 24 24" width="24">
    <path d="M11 7H9v10h2V7zm4 0h-2v10h2V7zM4 3H2v18h2V3zm15 4h-2v10h2V7zM22 3h-2v18h2V3z"/>
  </svg>
)
const HistoryIcon = () => (
  <svg height="24" viewBox="0 0 24 24" width="24">
    <path d="M13 3C8.03 3 4 7.03 4 12H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
  </svg>
)
const WatchLaterIcon = () => (
  <svg height="24" viewBox="0 0 24 24" width="24">
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>
  </svg>
)
const LikedIcon = () => (
  <svg height="24" viewBox="0 0 24 24" width="24">
    <path d="M18.77 11h-4.23l1.52-4.94C16.38 5.03 15.54 4 14.38 4c-.58 0-1.14.24-1.52.65L7 11H3v10h4l0 0h10.43c1.06 0 1.98-.67 2.3-1.68l1.52-5C21.68 12.87 20.48 11 18.77 11zM7 20H4v-8h3v8zm12.98-6.83l-1.52 5c-.13.4-.52.83-1.03.83H8V12.41l5.86-6.29c.1-.1.25-.18.52-.18.26 0 .5.24.4.68l-1.69 5.5h7.68c.49 0 1.07.47.21 1.05z"/>
  </svg>
)
const TrendingIcon = () => (
  <svg height="24" viewBox="0 0 24 24" width="24">
    <path d="M17.53 11.2c-.23-.3-.5-.56-.76-.82-.65-.6-1.4-1.03-2.03-1.66C13.3 7.26 13 4.85 13.91 3c-.91.23-1.75.75-2.45 1.32C8.9 6.4 8.02 9.88 9.08 12.8c.03.09.06.18.06.28 0 .22-.15.42-.35.5-.22.1-.46.04-.64-.12C8.07 13.4 8 13.3 7.94 13.21c-.63-.98-.73-2.23-.46-3.36C5.82 11 4.86 12.96 5 14.96c.06.56.14 1.12.35 1.65.18.48.43.94.72 1.35.6.81 1.44 1.43 2.38 1.77 1.03.38 2.17.44 3.24.15 1.16-.31 2.18-1.01 2.87-1.95.72-.97.97-2.19.8-3.39-.08-.65-.29-1.28-.59-1.85.44.24.84.56 1.19.95.63.71.99 1.61 1.06 2.54.12 1.02-.11 2.08-.71 2.94-.15.22-.32.42-.49.62.62-.23 1.2-.56 1.7-.99 1.59-1.35 2.36-3.46 1.95-5.5-.1-.46-.27-.91-.49-1.35"/>
  </svg>
)
const GamingIcon = () => (
  <svg height="24" viewBox="0 0 24 24" width="24">
    <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5S14.67 12 15.5 12s1.5.67 1.5 1.5S16.33 15 15.5 15zm3-3c-.83 0-1.5-.67-1.5-1.5S17.67 9 18.5 9 20 9.67 20 10.5 19.33 12 18.5 12z"/>
  </svg>
)
const MusicIcon = () => (
  <svg height="24" viewBox="0 0 24 24" width="24">
    <path d="M12 3v9.28c-.47-.17-.97-.28-1.5-.28C8.01 12 6 14.01 6 16.5S8.01 21 10.5 21c2.31 0 4.2-1.75 4.45-4H15V6h4V3h-7z"/>
  </svg>
)
const SportsIcon = () => (
  <svg height="24" viewBox="0 0 24 24" width="24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.69l4.88-2.04 2.04-4.88 1.08 3.8-3.8-1.08z"/>
  </svg>
)

/* ─── Data ───────────────────────────────────────────────── */
const mainItems = [
  { icon: HomeIcon, label: 'Home', path: '/' },
  { icon: ShortsIcon, label: 'Shorts', path: '/shorts' },
  { icon: SubscriptionsIcon, label: 'Subscriptions', path: '/' },
]
const libraryItems = [
  { icon: LibraryIcon, label: 'Library', path: '/' },
  { icon: HistoryIcon, label: 'History', path: '/' },
  { icon: WatchLaterIcon, label: 'Watch later', path: '/' },
  { icon: LikedIcon, label: 'Liked videos', path: '/' },
]
const exploreItems = [
  { icon: TrendingIcon, label: 'Trending', path: '/' },
  { icon: MusicIcon, label: 'Music', path: '/' },
  { icon: GamingIcon, label: 'Gaming', path: '/' },
  { icon: SportsIcon, label: 'Sports', path: '/' },
]

/* ─── MiniSidebar ────────────────────────────────────────── */
const MiniSidebar = ({ location }) => (
  <div className="sidebar mini" style={{ paddingTop: '8px' }}>
    {mainItems.map(({ icon: Icon, label, path }) => {
      const isActive = location.pathname === path
      return (
        <Link
          key={label}
          to={path}
          className={`sidebar-item${isActive ? ' active' : ''}`}
          style={{ flexDirection: 'column', height: 64, fontSize: 10, gap: 4, justifyContent: 'center', textDecoration: 'none' }}
        >
          <Icon filled={isActive} />
          <span>{label}</span>
        </Link>
      )
    })}
  </div>
)

/* ─── FullSidebar ────────────────────────────────────────── */
const FullSidebar = ({ location }) => (
  <div className="sidebar" style={{ paddingTop: '8px', paddingBottom: '24px' }}>
    {/* Main nav */}
    {mainItems.map(({ icon: Icon, label, path }) => {
      const isActive = location.pathname === path
      return (
        <Link
          key={label}
          to={path}
          className={`sidebar-item${isActive ? ' active' : ''}`}
          style={{ textDecoration: 'none' }}
        >
          <Icon filled={isActive} />
          <span>{label}</span>
        </Link>
      )
    })}

    <div className="sidebar-divider" />

    {/* You section */}
    <div className="sidebar-section-title">You</div>
    {libraryItems.map(({ icon: Icon, label, path }) => (
      <Link key={label} to={path} className="sidebar-item" style={{ textDecoration: 'none' }}>
        <Icon />
        <span>{label}</span>
      </Link>
    ))}

    <div className="sidebar-divider" />

    {/* Explore */}
    <div className="sidebar-section-title">Explore</div>
    {exploreItems.map(({ icon: Icon, label, path }) => (
      <Link key={label} to={path} className="sidebar-item" style={{ textDecoration: 'none' }}>
        <Icon />
        <span>{label}</span>
      </Link>
    ))}

    <div className="sidebar-divider" />

    {/* Footer text */}
    <div style={{ padding: '12px 24px', fontSize: 12, color: 'var(--yt-spec-text-secondary)', lineHeight: 1.8 }}>
      <p>About  Press  Copyright</p>
      <p>Contact us  Creators</p>
      <p>Advertise  Developers</p>
      <br />
      <p>Terms  Privacy  Policy &amp; Safety</p>
      <p>How YouTube works</p>
      <p>Test new features</p>
      <br />
      <p>© 2025 TubeMate</p>
    </div>
  </div>
)

/* ─── Main Export ────────────────────────────────────────── */
const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen)
  const location = useLocation()

  // Full-screen pages use mini sidebar only
  const isFullscreenPage = location.pathname === '/watch' || location.pathname === '/shorts'

  if (isFullscreenPage) {
    return isMenuOpen ? <MiniSidebar location={location} /> : null
  }

  if (!isMenuOpen) return <MiniSidebar location={location} />
  return <FullSidebar location={location} />
}

export default Sidebar
