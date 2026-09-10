import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { closeMenu } from '../utils/redux/appSlice'
import { YOUTUBE_SHORTS_API, YOUTUBE_VIDEO_DETAILS_API } from '../utils/contants'
import { formatViewCount, timeAgo } from '../utils/helper'

/* ══════════════════════════════════════════════════════════
   ICONS
═══════════════════════════════════════════════════════════*/
const ThumbUpIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M18.77 11h-4.23l1.52-4.94C16.38 5.03 15.54 4 14.38 4c-.58 0-1.14.24-1.52.65L7 11H3v10h4h10.43c1.06 0 1.98-.67 2.3-1.68l1.52-5C21.68 12.87 20.48 11 18.77 11zM7 20H4v-8h3v8zm12.98-6.83l-1.52 5c-.13.4-.52.83-1.03.83H8V12.41l5.86-6.29c.1-.1.25-.18.52-.18.26 0 .5.24.4.68l-1.69 5.5h7.68c.49 0 1.07.47.21 1.05z" />
  </svg>
)
const ThumbDownIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M5.23 13h4.23l-1.52 4.94C7.62 18.97 8.46 20 9.62 20c.58 0 1.14-.24 1.52-.65L17 13h4V3H7c-1.06 0-1.98.67-2.3 1.68l-1.52 5C2.32 11.13 3.52 13 5.23 13zm9.77 5.59c-.1.1-.25.18-.52.18-.26 0-.5-.24-.4-.68l1.69-5.5H8.09c-.49 0-1.07-.47-.21-1.05l1.52-5c.13-.4.52-.83 1.03-.83H16V11.59L15 18.59zm3.02-15.59h3v8h-3V3z" />
  </svg>
)
const ShareIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M15 5.63 20.66 12 15 18.37V15h-1c-3.96 0-7.14 1-9.75 3.09 1.84-8.31 7.14-11.82 10.75-12.47V5.63M14 3v4C6.22 8.13 3.11 15.33 2 22c2.78-3.97 6.44-6 12-6v4l8-8.5L14 3z" />
  </svg>
)
const CommentIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
  </svg>
)
const MoreVertIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
  </svg>
)
const ShortsLogoIcon = () => (
  <svg viewBox="0 0 90 20" height="24" fill="none">
    {/* Red play badge */}
    <rect width="26" height="20" rx="4" fill="#FF0000" />
    <path d="M11 6l7 4-7 4V6z" fill="white" />
    {/* "Shorts" text */}
    <text x="30" y="15" fontFamily="Roboto,Arial,sans-serif" fontWeight="700" fontSize="13" fill="var(--yt-spec-text-primary)">Shorts</text>
  </svg>
)
const ChevronUpIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
  </svg>
)
const ChevronDownIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
  </svg>
)
const MuteIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
  </svg>
)
const UnmuteIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
  </svg>
)

/* ══════════════════════════════════════════════════════════
   ACTION BUTTON
═══════════════════════════════════════════════════════════*/
const ActionBtn = ({ icon, label, onClick, active = false }) => (
  <button
    onClick={onClick}
    className={`shorts-action-btn${active ? ' active' : ''}`}
    aria-label={label}
    aria-pressed={active}
  >
    <span className="shorts-action-icon">{icon}</span>
    {label && <span className="shorts-action-label">{label}</span>}
  </button>
)

/* ══════════════════════════════════════════════════════════
   SINGLE SHORT CARD
═══════════════════════════════════════════════════════════*/
const ShortCard = ({ short, isActive, isMuted, onMuteToggle }) => {
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const iframeRef = useRef(null)

  const { id, snippet, statistics } = short
  const videoId = typeof id === 'string' ? id : id?.videoId
  const { title, channelTitle, publishedAt } = snippet || {}
  const views = formatViewCount(statistics?.viewCount)
  const likes = formatViewCount(statistics?.likeCount)
  const comments = formatViewCount(statistics?.commentCount)

  // Channel avatar colour from channel name
  const avatarColors = ['#f44336','#e91e63','#9c27b0','#3f51b5','#2196f3','#009688','#ff9800']
  const avatarColor = avatarColors[(channelTitle?.charCodeAt(0) || 0) % avatarColors.length]

  return (
    <div className="short-card" data-video-id={videoId}>
      {/* ── Video player (iframe embed) ── */}
      <div className="short-player">
        {isActive ? (
          <iframe
            ref={iframeRef}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&controls=0&rel=0&modestbranding=1&mute=${isMuted ? 1 : 0}&playsinline=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ width: '100%', height: '100%', border: 0, borderRadius: 12 }}
          />
        ) : (
          /* Thumbnail shown for non-active cards — saves iframe quota */
          <div className="short-thumbnail-placeholder">
            <img
              src={snippet?.thumbnails?.high?.url || snippet?.thumbnails?.medium?.url}
              alt={title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 12 }}
              loading="lazy"
            />
            {/* Play overlay */}
            <div className="short-play-overlay" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="48" height="48" fill="rgba(255,255,255,0.9)">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}

        {/* ── Mute / Unmute pill (bottom-left of player) ── */}
        {isActive && (
          <button
            className="short-mute-btn"
            onClick={onMuteToggle}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <MuteIcon /> : <UnmuteIcon />}
          </button>
        )}
      </div>

      {/* ── Right-side action rail ── */}
      <div className="short-actions">
        {/* Channel avatar + subscribe */}
        <div className="short-channel-wrap">
          <div
            className="short-channel-avatar"
            style={{ background: avatarColor }}
            aria-hidden="true"
          >
            {channelTitle?.[0]?.toUpperCase() || 'C'}
          </div>
          <button
            className={`short-subscribe-dot${subscribed ? ' subscribed' : ''}`}
            onClick={() => setSubscribed(s => !s)}
            aria-label={subscribed ? 'Unsubscribe' : 'Subscribe'}
            title={subscribed ? 'Unsubscribe' : 'Subscribe'}
          >
            {subscribed ? '✓' : '+'}
          </button>
        </div>

        {/* Like */}
        <ActionBtn
          icon={<ThumbUpIcon />}
          label={liked ? formatViewCount(String((parseInt(statistics?.likeCount || 0) + 1))) : likes || '0'}
          onClick={() => { setLiked(l => !l); setDisliked(false) }}
          active={liked}
        />

        {/* Dislike */}
        <ActionBtn
          icon={<ThumbDownIcon />}
          label="Dislike"
          onClick={() => { setDisliked(d => !d); setLiked(false) }}
          active={disliked}
        />

        {/* Comments */}
        <ActionBtn
          icon={<CommentIcon />}
          label={comments || '0'}
        />

        {/* Share */}
        <ActionBtn
          icon={<ShareIcon />}
          label="Share"
          onClick={() => navigator.share?.({ title, url: `https://youtube.com/shorts/${videoId}` })}
        />

        {/* More */}
        <ActionBtn icon={<MoreVertIcon />} label="" />
      </div>

      {/* ── Bottom info overlay ── */}
      <div className="short-info">
        <div className="short-info-channel">
          <span className="short-info-channel-name">@{channelTitle?.replace(/\s+/g, '')}</span>
          <button
            className={`short-info-subscribe-btn${subscribed ? ' subscribed' : ''}`}
            onClick={() => setSubscribed(s => !s)}
          >
            {subscribed ? 'Subscribed' : 'Subscribe'}
          </button>
        </div>
        <p className="short-info-title">{title}</p>
        <p className="short-info-meta">
          {views} &bull; {timeAgo(publishedAt)}
        </p>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════
   LOADING SKELETON
═══════════════════════════════════════════════════════════*/
const ShortSkeleton = () => (
  <div className="short-card">
    <div className="short-player" style={{ background: '#1a1a1a', borderRadius: 12 }}>
      <div style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg,#1a1a1a 25%,#2a2a2a 50%,#1a1a1a 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite', borderRadius: 12 }} />
    </div>
    <div className="short-actions" style={{ gap: 24 }}>
      {[60, 60, 60, 60, 60].map((_, i) => (
        <div key={i} style={{ width: 44, height: 44, borderRadius: '50%', background: '#2a2a2a', animation: 'shimmer 1.5s infinite' }} />
      ))}
    </div>
  </div>
)

/* ══════════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════════*/
const ShortsPage = () => {
  const dispatch = useDispatch()
  const [shorts, setShorts] = useState([])
  const [nextPageToken, setNextPageToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [error, setError] = useState(null)

  const containerRef = useRef(null)
  const cardRefs = useRef([])
  const sentinelRef = useRef(null)   // bottom sentinel for infinite scroll
  const fetchingRef = useRef(false)  // prevent double-fetch

  /* ── Close sidebar on mount ── */
  useEffect(() => {
    dispatch(closeMenu())
  }, [dispatch])

  /* ── Initial load ── */
  useEffect(() => {
    fetchShorts('', true)
  }, [])

  /* ── Fetch a page of shorts ── */
  const fetchShorts = useCallback(async (pageToken = '', isInitial = false) => {
    if (fetchingRef.current) return
    fetchingRef.current = true
    if (isInitial) setInitialLoading(true)
    else setLoading(true)
    setError(null)

    try {
      // Step 1: search for #shorts videos
      const searchRes = await fetch(YOUTUBE_SHORTS_API(pageToken))
      const searchJson = await searchRes.json()

      if (!searchJson.items || searchJson.items.length === 0) {
        setHasMore(false)
        return
      }

      // Step 2: fetch full details (statistics, contentDetails) for those IDs
      const ids = searchJson.items
        .map(item => item.id?.videoId)
        .filter(Boolean)
        .join(',')

      const detailRes = await fetch(YOUTUBE_VIDEO_DETAILS_API(ids))
      const detailJson = await detailRes.json()

      // Merge snippet from search + statistics from details
      const detailMap = {}
      ;(detailJson.items || []).forEach(v => { detailMap[v.id] = v })

      const enriched = searchJson.items.map(item => {
        const vid = item.id?.videoId
        return detailMap[vid]
          ? { ...item, statistics: detailMap[vid].statistics, contentDetails: detailMap[vid].contentDetails }
          : item
      })

      setShorts(prev => isInitial ? enriched : [...prev, ...enriched])
      setNextPageToken(searchJson.nextPageToken || '')
      if (!searchJson.nextPageToken) setHasMore(false)
    } catch (err) {
      setError('Failed to load Shorts. Please check your API key or try again.')
    } finally {
      if (isInitial) setInitialLoading(false)
      else setLoading(false)
      fetchingRef.current = false
    }
  }, [])

  /* ── IntersectionObserver: track which card is active ── */
  useEffect(() => {
    if (!containerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.dataset.idx, 10)
            if (!isNaN(idx)) setActiveIndex(idx)
          }
        })
      },
      {
        root: containerRef.current,
        threshold: 0.6,   // card must be 60% visible to be "active"
      }
    )

    cardRefs.current.forEach(el => el && observer.observe(el))
    return () => observer.disconnect()
  }, [shorts])

  /* ── IntersectionObserver: sentinel for infinite scroll ── */
  useEffect(() => {
    if (!sentinelRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !fetchingRef.current) {
          fetchShorts(nextPageToken)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(sentinelRef.current)
    return () => observer.disconnect()
  }, [nextPageToken, hasMore, fetchShorts])

  /* ── Keyboard navigation ── */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'j') scrollToIndex(activeIndex + 1)
      if (e.key === 'ArrowUp' || e.key === 'k') scrollToIndex(activeIndex - 1)
      if (e.key === 'm') setIsMuted(m => !m)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [activeIndex])

  const scrollToIndex = (idx) => {
    const clamped = Math.max(0, Math.min(idx, shorts.length - 1))
    cardRefs.current[clamped]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  /* ── Render ── */
  if (initialLoading) {
    return (
      <div className="shorts-page">
        <div className="shorts-header">
          <ShortsLogoIcon />
        </div>
        <div className="shorts-feed">
          {[0,1,2].map(i => <ShortSkeleton key={i} />)}
        </div>
      </div>
    )
  }

  if (error && shorts.length === 0) {
    return (
      <div className="shorts-page">
        <div className="shorts-header"><ShortsLogoIcon /></div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '70vh', gap: 16, color: 'var(--yt-spec-text-secondary)' }}>
          <svg viewBox="0 0 24 24" width="72" height="72" fill="var(--yt-spec-text-disabled)">
            <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.59-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
          </svg>
          <p style={{ fontSize: 16, textAlign: 'center', maxWidth: 320 }}>{error}</p>
          <button
            onClick={() => fetchShorts('', true)}
            style={{ padding: '10px 24px', borderRadius: 20, background: '#ff0000', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer', fontSize: 14 }}
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="shorts-page">
      {/* ── Top bar ── */}
      <div className="shorts-header">
        <ShortsLogoIcon />
        <div className="shorts-header-nav">
          <button
            className="shorts-nav-btn"
            onClick={() => scrollToIndex(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="Previous short"
          >
            <ChevronUpIcon />
          </button>
          <button
            className="shorts-nav-btn"
            onClick={() => scrollToIndex(activeIndex + 1)}
            disabled={activeIndex >= shorts.length - 1}
            aria-label="Next short"
          >
            <ChevronDownIcon />
          </button>
        </div>
        {/* Global mute toggle */}
        <button
          className="shorts-mute-toggle"
          onClick={() => setIsMuted(m => !m)}
          aria-label={isMuted ? 'Unmute all' : 'Mute all'}
          title={isMuted ? 'Unmute (M)' : 'Mute (M)'}
        >
          {isMuted ? <MuteIcon /> : <UnmuteIcon />}
        </button>
      </div>

      {/* ── Scrollable feed ── */}
      <div className="shorts-feed" ref={containerRef}>
        {shorts.map((short, idx) => {
          const videoId = typeof short.id === 'string' ? short.id : short.id?.videoId
          return (
            <div
              key={`${videoId}-${idx}`}
              ref={el => { cardRefs.current[idx] = el }}
              data-idx={idx}
              className="short-card-wrapper"
            >
              <ShortCard
                short={short}
                isActive={activeIndex === idx}
                isMuted={isMuted}
                onMuteToggle={() => setIsMuted(m => !m)}
              />
            </div>
          )
        })}

        {/* Loading more skeletons */}
        {loading && (
          <div className="short-card-wrapper">
            <ShortSkeleton />
          </div>
        )}

        {/* Infinite scroll sentinel */}
        {hasMore && <div ref={sentinelRef} style={{ height: 1 }} />}

        {/* End of feed */}
        {!hasMore && shorts.length > 0 && (
          <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--yt-spec-text-secondary)', fontSize: 13 }}>
            You're all caught up!
          </div>
        )}
      </div>
    </div>
  )
}

export default ShortsPage
