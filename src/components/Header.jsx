import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toggleMenu } from '../utils/redux/appSlice'
import { cacheResults } from '../utils/redux/searchSlice'
import { YOUTUBE_SEARCH_API } from '../utils/contants'
import UserMenu from './UserMenu'

/* ─── SVG Icons ─────────────────────────────────────────── */
const MenuIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" focusable="false">
    <path d="M21 6H3v-1h18v1zm0 5H3v1h18v-1zm0 6H3v1h18v-1z"/>
  </svg>
)
const SearchIcon = () => (
  <svg height="24" viewBox="0 0 24 24" width="24" fill="currentColor" focusable="false">
    <path d="m20.87 20.17-5.59-5.59C16.35 13.35 17 11.75 17 10c0-3.87-3.13-7-7-7s-7 3.13-7 7 3.13 7 7 7c1.75 0 3.35-.65 4.58-1.71l5.59 5.59.7-.71zM10 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
  </svg>
)
const MicIcon = () => (
  <svg height="24" viewBox="0 0 24 24" width="24" fill="currentColor" focusable="false">
    <path d="M12 3c-1.66 0-3 1.34-3 3v5c0 1.66 1.34 3 3 3s3-1.34 3-3V6c0-1.66-1.34-3-3-3zm5.91 8c-.49 4-3.05 6-5.91 6s-5.42-2-5.91-6H4c.49 4.5 3.49 7.23 7 7.73V22h2v-3.27c3.51-.5 6.51-3.23 7-7.73h-2.09z"/>
  </svg>
)
const VideoIcon = () => (
  <svg height="24" viewBox="0 0 24 24" width="24" fill="currentColor" focusable="false">
    <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4zM14 13h-3v3H9v-3H6v-2h3V8h2v3h3v2z"/>
  </svg>
)
const NotifIcon = () => (
  <svg height="24" viewBox="0 0 24 24" width="24" fill="currentColor" focusable="false">
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
  </svg>
)
const SunIcon = () => (
  <svg height="24" viewBox="0 0 24 24" width="24" fill="currentColor" focusable="false">
    <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-12.37l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0zM7.05 18.36l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0z"/>
  </svg>
)
const MoonIcon = () => (
  <svg height="24" viewBox="0 0 24 24" width="24" fill="currentColor" focusable="false">
    <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/>
  </svg>
)
const ClearIcon = () => (
  <svg height="24" viewBox="0 0 24 24" width="24" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </svg>
)

/* ─── YouTube wordmark ───────────────────────────────────── */
const YTWordmark = () => (
  <svg height="20" viewBox="0 0 90 20" focusable="false" aria-hidden="true">
    <g>
      <path d="M27.97 3.63a3.2 3.2 0 0 0-2.25-2.26C23.69 1 16.04 1 16.04 1S8.39 1 6.36 1.37A3.2 3.2 0 0 0 4.11 3.63 33.56 33.56 0 0 0 3.75 10a33.56 33.56 0 0 0 .36 6.37 3.2 3.2 0 0 0 2.25 2.26C8.39 19 16.04 19 16.04 19s7.65 0 9.68-.37a3.2 3.2 0 0 0 2.25-2.26A33.56 33.56 0 0 0 28.33 10a33.56 33.56 0 0 0-.36-6.37z" fill="#ff0000"/>
      <path d="M13.43 13.93 20.58 10l-7.15-3.93v7.86z" fill="#fff"/>
    </g>
    <g fill="var(--yt-spec-text-primary)">
      <path d="M37.3 16.27c-.74-.5-1.26-1.26-1.56-2.3-.3-1.03-.45-2.4-.45-4.1v-2.33c0-1.72.17-3.1.5-4.16.34-1.05.88-1.82 1.64-2.3.76-.49 1.76-.73 3-.73 1.23 0 2.21.25 2.95.74.74.5 1.28 1.26 1.62 2.3.34 1.04.51 2.43.51 4.15v2.33c0 1.7-.16 3.08-.49 4.12-.32 1.04-.86 1.81-1.61 2.3-.75.5-1.75.75-3 .75-1.29 0-2.3-.26-3.1-.77zm4.37-1.97c.21-.53.32-1.39.32-2.56V7.36c0-1.14-.1-1.98-.32-2.51-.21-.53-.57-.8-1.08-.8-.5 0-.85.27-1.06.8-.21.53-.32 1.37-.32 2.51v4.38c0 1.17.1 2.03.31 2.56.2.53.56.8 1.07.8.51 0 .87-.27 1.08-.8z"/>
      <path d="M61.09 17.85h-2.72l-.32-2.17h-.08c-.74 1.64-1.86 2.47-3.35 2.47-.99 0-1.72-.32-2.2-.96-.48-.64-.72-1.6-.72-2.9V5.04h3.43v8.95c0 .67.07 1.15.22 1.44.15.29.39.44.73.44.29 0 .57-.09.84-.27.27-.18.47-.41.6-.69V5.04h3.44v12.81z"/>
      <path d="M50.72 2.1l-2.28 8.35h-.1L46.07 2.1H42.5l3.58 10.66v5.09h3.41v-5.09L53.08 2.1h-2.36z"/>
      <path d="M67.24 17.85V4.9h-2.98V2.1h9.35v2.8h-2.97v12.95h-3.4z"/>
      <path d="M79.36 18.15c-1.25 0-2.2-.42-2.85-1.27-.65-.85-.97-2.1-.97-3.75V7.64c0-1.67.33-2.93.98-3.78.65-.85 1.6-1.27 2.84-1.27 1.26 0 2.2.42 2.84 1.27.64.85.96 2.11.96 3.78v5.49c0 1.65-.32 2.9-.97 3.75-.65.85-1.59 1.27-2.83 1.27zm.95-11.17c0-.62-.06-1.07-.2-1.37-.13-.3-.34-.44-.63-.44-.27 0-.47.14-.6.43-.13.28-.2.74-.2 1.38v6.14c0 .65.07 1.12.2 1.41.13.3.33.44.6.44.3 0 .5-.14.63-.43.13-.3.2-.77.2-1.42V7z"/>
      <path d="M88.46 14.41c0 .77-.13 1.35-.38 1.74-.25.39-.64.58-1.17.58-.38 0-.72-.09-1.03-.28-.31-.18-.55-.44-.73-.76V5.04h-3.27v12.81h2.56l.38-1.58h.08c.65 1.19 1.62 1.78 2.92 1.78.93 0 1.62-.37 2.06-1.1.44-.74.66-1.88.66-3.43V5.04h-3.08v9.37z"/>
    </g>
  </svg>
)

/* ─── Header ─────────────────────────────────────────────── */
const Header = () => {
  const [searchQuery, setSearchQuery]       = useState('')
  const [searchSuggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [theme, setTheme]                   = useState(() => localStorage.getItem('yt-theme') || 'light')
  const [showUserMenu, setShowUserMenu]     = useState(false)

  const dispatch    = useDispatch()
  const navigate    = useNavigate()
  const searchCache = useSelector(s => s.search)
  const user        = useSelector(s => s.auth.user)
  const authLoading = useSelector(s => s.auth.loading)

  const inputRef   = useRef(null)
  const wrapperRef = useRef(null)

  /* ── Theme ── */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('yt-theme', theme)
  }, [theme])

  /* ── Close suggestions on outside click ── */
  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  /* ── Debounced autocomplete ── */
  useEffect(() => {
    if (!searchQuery.trim()) { setSuggestions([]); return }
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery])
      } else {
        fetchSuggestions()
      }
    }, 200)
    return () => clearTimeout(timer)
  }, [searchQuery])

  const fetchSuggestions = async () => {
    try {
      const proxyUrl  = 'https://corsproxy.io/?'
      const targetUrl = YOUTUBE_SEARCH_API + encodeURIComponent(searchQuery)
      const res       = await fetch(proxyUrl + encodeURIComponent(targetUrl))
      const json      = await res.json()
      setSuggestions(json[1] || [])
      dispatch(cacheResults({ [searchQuery]: json[1] || [] }))
    } catch { /* silently fail */ }
  }

  const handleSearch = (query) => {
    const q = (query || searchQuery).trim()
    if (!q) return
    setShowSuggestions(false)
    navigate(`/search?q=${encodeURIComponent(q)}`)
  }

  /* ── Avatar initials fallback ── */
  const initials = user?.displayName
    ? user.displayName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'U'

  return (
    <header
      className="app-header"
      style={{ display: 'flex', alignItems: 'center', padding: '0 16px', gap: 8 }}
    >
      {/* ── Left: hamburger + logo ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, minWidth: 160 }}>
        <button
          className="yt-icon-btn"
          data-tooltip="Menu"
          onClick={() => dispatch(toggleMenu())}
          aria-label="Toggle menu"
        >
          <MenuIcon />
        </button>
        <a
          href="/"
          style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', paddingLeft: 8 }}
          aria-label="TubeMate Home"
        >
          <YTWordmark />
        </a>
      </div>

      {/* ── Centre: search ── */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <div ref={wrapperRef} style={{ position: 'relative', flex: 1, maxWidth: 600 }}>
          <div className="search-form">
            <div className="search-input-wrap">
              <input
                ref={inputRef}
                className="search-input"
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery && setShowSuggestions(true)}
                onKeyDown={e => { if (e.key === 'Enter') handleSearch() }}
                aria-label="Search"
                autoComplete="off"
              />
              {searchQuery && (
                <button
                  onClick={() => { setSearchQuery(''); setSuggestions([]); inputRef.current?.focus() }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', color: 'var(--yt-spec-text-secondary)' }}
                  aria-label="Clear search"
                >
                  <ClearIcon />
                </button>
              )}
            </div>
            <button className="search-btn" onClick={() => handleSearch()} aria-label="Search">
              <SearchIcon />
            </button>
          </div>

          {/* Suggestions dropdown */}
          {showSuggestions && searchSuggestions.length > 0 && (
            <div className="suggestions-dropdown">
              {searchSuggestions.map((s, i) => (
                <div
                  key={i}
                  className="suggestion-item"
                  onMouseDown={() => { setSearchQuery(s); handleSearch(s) }}
                >
                  <svg height="18" viewBox="0 0 24 24" width="18" fill="var(--yt-spec-text-secondary)">
                    <path d="m20.87 20.17-5.59-5.59C16.35 13.35 17 11.75 17 10c0-3.87-3.13-7-7-7s-7 3.13-7 7 3.13 7 7 7c1.75 0 3.35-.65 4.58-1.71l5.59 5.59.7-.71zM10 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
                  </svg>
                  <span>{s}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <button className="yt-icon-btn" data-tooltip="Search with your voice" aria-label="Voice search">
          <MicIcon />
        </button>
      </div>

      {/* ── Right: actions ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, minWidth: 'max-content', justifyContent: 'flex-end' }}>
        {/* Dark mode */}
        <button
          className="yt-icon-btn"
          data-tooltip={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle dark mode"
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>

        {/* Create — only shown when signed in */}
        {user && (
          <button className="yt-icon-btn" data-tooltip="Create" aria-label="Create">
            <VideoIcon />
          </button>
        )}

        {/* Notifications — only shown when signed in */}
        {user && (
          <div style={{ position: 'relative' }}>
            <button className="yt-icon-btn" data-tooltip="Notifications" aria-label="Notifications">
              <NotifIcon />
            </button>
            <span className="notif-dot" aria-hidden="true" />
          </div>
        )}

        {/* ── Auth area ── */}
        {authLoading ? (
          /* Skeleton while Firebase resolves */
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'var(--yt-spec-chip-background)',
            animation: 'skeletonPulse 1.6s ease-in-out infinite',
          }} />
        ) : user ? (
          /* Signed-in: avatar button */
          <div style={{ position: 'relative' }}>
            <button
              className="header-avatar-btn"
              onClick={() => setShowUserMenu(v => !v)}
              aria-label="Account"
              aria-expanded={showUserMenu}
              aria-haspopup="true"
            >
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="header-avatar-img"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="header-avatar-fallback">{initials}</div>
              )}
            </button>
            {showUserMenu && <UserMenu onClose={() => setShowUserMenu(false)} />}
          </div>
        ) : (
          /* Signed-out: Sign in button */
          <button
            className="yt-signin-btn"
            onClick={() => navigate('/signin')}
            aria-label="Sign in"
          >
            <svg height="20" viewBox="0 0 24 24" width="20" fill="var(--yt-spec-call-to-action)">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
            Sign in
          </button>
        )}
      </div>
    </header>
  )
}

export default Header
