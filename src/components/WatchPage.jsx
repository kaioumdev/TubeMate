import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { closeMenu } from '../utils/redux/appSlice'
import CommentsContainer from './CommentsContainer'
import LiveChat from './LiveChat'
import { YOUTUBE_VIDEOS_API } from '../utils/contants'
import { formatViewCount, timeAgo } from '../utils/helper'

/* ─── Icons ──────────────────────────────────────────────── */
const ThumbUpIcon = () => (
  <svg height="22" viewBox="0 0 24 24" width="22" fill="currentColor">
    <path d="M18.77 11h-4.23l1.52-4.94C16.38 5.03 15.54 4 14.38 4c-.58 0-1.14.24-1.52.65L7 11H3v10h4h10.43c1.06 0 1.98-.67 2.3-1.68l1.52-5C21.68 12.87 20.48 11 18.77 11zM7 20H4v-8h3v8zm12.98-6.83l-1.52 5c-.13.4-.52.83-1.03.83H8V12.41l5.86-6.29c.1-.1.25-.18.52-.18.26 0 .5.24.4.68l-1.69 5.5h7.68c.49 0 1.07.47.21 1.05z"/>
  </svg>
)
const ThumbDownIcon = () => (
  <svg height="22" viewBox="0 0 24 24" width="22" fill="currentColor">
    <path d="M5.23 13h4.23l-1.52 4.94C7.62 18.97 8.46 20 9.62 20c.58 0 1.14-.24 1.52-.65L17 13h4V3H7c-1.06 0-1.98.67-2.3 1.68l-1.52 5C2.32 11.13 3.52 13 5.23 13zm9.77 5.59c-.1.1-.25.18-.52.18-.26 0-.5-.24-.4-.68l1.69-5.5H8.09c-.49 0-1.07-.47-.21-1.05l1.52-5c.13-.4.52-.83 1.03-.83H16V11.59L14.98 18.59H15zm3.02-15.59h3v8h-3V3z"/>
  </svg>
)
const ShareIcon = () => (
  <svg height="22" viewBox="0 0 24 24" width="22" fill="currentColor">
    <path d="M15 5.63 20.66 12 15 18.37V15h-1c-3.96 0-7.14 1-9.75 3.09 1.84-8.31 7.14-11.82 10.75-12.47V5.63M14 3v4C6.22 8.13 3.11 15.33 2 22c2.78-3.97 6.44-6 12-6v4l8-8.5L14 3z"/>
  </svg>
)
const DownloadIcon = () => (
  <svg height="22" viewBox="0 0 24 24" width="22" fill="currentColor">
    <path d="M17 18v1H6v-1h11zm-.5-6.6-.7-.7-3.8 3.7V4h-1v10.4l-3.8-3.8-.7.7 5 5 5-4.9z"/>
  </svg>
)
const MoreIcon = () => (
  <svg height="22" viewBox="0 0 24 24" width="22" fill="currentColor">
    <path d="M7.5 12c0 .83-.67 1.5-1.5 1.5S4.5 12.83 4.5 12 5.17 10.5 6 10.5s1.5.67 1.5 1.5zm4.5 0c0 .83-.67 1.5-1.5 1.5S9 12.83 9 12s.67-1.5 1.5-1.5 1.5.67 1.5 1.5zm3 1.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5z"/>
  </svg>
)
const BellIcon = () => (
  <svg height="22" viewBox="0 0 24 24" width="22" fill="currentColor">
    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
  </svg>
)

/* ─── Action pill button ─────────────────────────────────── */
const ActionBtn = ({ icon, label, onClick, active }) => (
  <button
    onClick={onClick}
    style={{
      display: 'flex', alignItems: 'center', gap: 6,
      padding: '8px 16px', borderRadius: 18, border: 'none',
      background: active ? 'var(--yt-spec-text-primary)' : 'var(--yt-spec-chip-background)',
      color: active ? 'var(--yt-spec-base-background)' : 'var(--yt-spec-text-primary)',
      cursor: 'pointer', fontWeight: 600, fontSize: 14,
      fontFamily: 'Roboto, Arial, sans-serif',
      transition: 'background 0.15s',
      whiteSpace: 'nowrap',
    }}
    aria-pressed={active}
  >
    {icon}
    {label}
  </button>
)

/* ─── Suggested video card (right column) ────────────────── */
const SuggestedCard = ({ info }) => {
  if (!info) return null
  const { snippet, statistics, id } = info
  const { title, channelTitle, thumbnails, publishedAt } = snippet
  const thumb = thumbnails?.medium?.url || thumbnails?.high?.url
  const videoId = typeof id === 'string' ? id : id?.videoId
  const views = formatViewCount(statistics?.viewCount)
  const uploaded = timeAgo(publishedAt)

  return (
    <a
      href={`/watch?v=${videoId}`}
      style={{ display: 'flex', gap: 8, textDecoration: 'none', color: 'inherit', marginBottom: 8 }}
    >
      <div style={{ position: 'relative', flexShrink: 0, width: 168, height: 94, borderRadius: 8, overflow: 'hidden', background: '#000' }}>
        <img src={thumb} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontSize: 13, fontWeight: 600, lineHeight: 1.4, margin: '0 0 4px',
          color: 'var(--yt-spec-text-primary)',
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {title}
        </p>
        <p style={{ fontSize: 12, color: 'var(--yt-spec-text-secondary)', margin: '0 0 2px' }}>{channelTitle}</p>
        <p style={{ fontSize: 12, color: 'var(--yt-spec-text-secondary)', margin: 0 }}>{views} • {uploaded}</p>
      </div>
    </a>
  )
}

/* ─── Main WatchPage ─────────────────────────────────────── */
const WatchPage = () => {
  const [searchParams] = useSearchParams()
  const dispatch = useDispatch()
  const videoId = searchParams.get('v')

  const [videoInfo, setVideoInfo] = useState(null)
  const [suggested, setSuggested] = useState([])
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const [descExpanded, setDescExpanded] = useState(false)
  const [showChat, setShowChat] = useState(true)

  useEffect(() => {
    dispatch(closeMenu())
  }, [dispatch])

  /* Fetch current video metadata + trending as suggested */
  useEffect(() => {
    if (!videoId) return
    const fetchData = async () => {
      try {
        const res = await fetch(YOUTUBE_VIDEOS_API)
        const json = await res.json()
        if (json.items) {
          const match = json.items.find(v => v.id === videoId)
          setVideoInfo(match || null)
          setSuggested(json.items.filter(v => v.id !== videoId).slice(0, 20))
        }
      } catch {
        // silently fail — video still plays via embed
      }
    }
    fetchData()
  }, [videoId])

  const snippet = videoInfo?.snippet
  const stats = videoInfo?.statistics

  return (
    <div className="watch-page">
      {/* ── Left: player + info ── */}
      <div className="watch-player-section">

        {/* Responsive iframe */}
        <div className="watch-video-wrapper">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: 20, fontWeight: 600, lineHeight: 1.4, margin: '12px 0 8px',
          color: 'var(--yt-spec-text-primary)',
        }}>
          {snippet?.title || 'Loading…'}
        </h1>

        {/* Channel row + action buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
          {/* Channel avatar + name + sub count + subscribe */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
              background: '#ff0000', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: 16,
            }}>
              {snippet?.channelTitle?.[0]?.toUpperCase() || 'C'}
            </div>
            <div>
              <p style={{ margin: 0, fontWeight: 600, fontSize: 15, color: 'var(--yt-spec-text-primary)' }}>
                {snippet?.channelTitle || ''}
              </p>
              <p style={{ margin: 0, fontSize: 12, color: 'var(--yt-spec-text-secondary)' }}>
                {formatViewCount(stats?.subscriberCount || stats?.viewCount)} subscribers
              </p>
            </div>

            {/* Subscribe button */}
            <button
              onClick={() => setSubscribed(s => !s)}
              style={{
                padding: '10px 16px', borderRadius: 20, border: 'none', cursor: 'pointer',
                fontWeight: 600, fontSize: 14, fontFamily: 'Roboto, Arial, sans-serif',
                background: subscribed ? 'var(--yt-spec-chip-background)' : '#0f0f0f',
                color: subscribed ? 'var(--yt-spec-text-primary)' : '#fff',
                display: 'flex', alignItems: 'center', gap: 6,
                transition: 'background 0.15s',
              }}
              aria-label={subscribed ? 'Unsubscribe' : 'Subscribe'}
            >
              {subscribed && <BellIcon />}
              {subscribed ? 'Subscribed' : 'Subscribe'}
            </button>
          </div>

          {/* Like / Dislike / Share / Download / More */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            {/* Like + Dislike joined pill */}
            <div style={{
              display: 'flex', borderRadius: 18, overflow: 'hidden',
              background: 'var(--yt-spec-chip-background)',
            }}>
              <button
                onClick={() => { setLiked(l => !l); setDisliked(false) }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '8px 16px', border: 'none', background: 'transparent',
                  color: liked ? 'var(--yt-spec-text-primary)' : 'var(--yt-spec-text-primary)',
                  cursor: 'pointer', fontWeight: 600, fontSize: 14,
                  borderRight: '1px solid var(--yt-spec-outline)',
                  fontFamily: 'Roboto, Arial, sans-serif',
                }}
                aria-label="Like"
                aria-pressed={liked}
              >
                <ThumbUpIcon />
                {stats?.likeCount ? formatViewCount(stats.likeCount).replace(' views', '') : 'Like'}
              </button>
              <button
                onClick={() => { setDisliked(d => !d); setLiked(false) }}
                style={{
                  display: 'flex', alignItems: 'center',
                  padding: '8px 12px', border: 'none', background: 'transparent',
                  color: 'var(--yt-spec-text-primary)',
                  cursor: 'pointer',
                }}
                aria-label="Dislike"
                aria-pressed={disliked}
              >
                <ThumbDownIcon />
              </button>
            </div>

            <ActionBtn icon={<ShareIcon />} label="Share" />
            <ActionBtn icon={<DownloadIcon />} label="Download" />
            <button
              style={{
                width: 36, height: 36, borderRadius: '50%', border: 'none',
                background: 'var(--yt-spec-chip-background)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--yt-spec-text-primary)',
              }}
              aria-label="More actions"
            >
              <MoreIcon />
            </button>
          </div>
        </div>

        {/* Description box */}
        <div
          style={{
            background: 'var(--yt-spec-chip-background)', borderRadius: 12,
            padding: '12px 16px', marginBottom: 24, cursor: 'pointer',
          }}
          onClick={() => setDescExpanded(e => !e)}
          role="button"
          aria-expanded={descExpanded}
          tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && setDescExpanded(v => !v)}
        >
          {/* Stats line */}
          <p style={{ margin: '0 0 6px', fontWeight: 600, fontSize: 14, color: 'var(--yt-spec-text-primary)' }}>
            {stats?.viewCount ? formatViewCount(stats.viewCount) : ''}
            {snippet?.publishedAt ? `  ${timeAgo(snippet.publishedAt)}` : ''}
          </p>
          <p style={{
            margin: 0, fontSize: 14, color: 'var(--yt-spec-text-primary)',
            whiteSpace: descExpanded ? 'pre-wrap' : 'nowrap',
            overflow: 'hidden', textOverflow: descExpanded ? 'clip' : 'ellipsis',
          }}>
            {snippet?.description || 'No description available.'}
          </p>
          {!descExpanded && (
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--yt-spec-text-primary)', marginTop: 4, display: 'block' }}>
              ...more
            </span>
          )}
          {descExpanded && (
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--yt-spec-text-primary)', marginTop: 8, display: 'block' }}>
              Show less
            </span>
          )}
        </div>

        {/* Comments */}
        <CommentsContainer />
      </div>

      {/* ── Right: Live Chat + Suggested ── */}
      <div className="watch-sidebar">
        {/* Live chat toggle */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <button
            onClick={() => setShowChat(true)}
            style={{
              flex: 1, padding: '8px', borderRadius: 8, border: 'none',
              background: showChat ? 'var(--yt-spec-chip-background-hover)' : 'var(--yt-spec-chip-background)',
              color: 'var(--yt-spec-text-primary)', fontWeight: showChat ? 600 : 400,
              cursor: 'pointer', fontSize: 13, fontFamily: 'Roboto, Arial, sans-serif',
            }}
          >
            Live chat
          </button>
          <button
            onClick={() => setShowChat(false)}
            style={{
              flex: 1, padding: '8px', borderRadius: 8, border: 'none',
              background: !showChat ? 'var(--yt-spec-chip-background-hover)' : 'var(--yt-spec-chip-background)',
              color: 'var(--yt-spec-text-primary)', fontWeight: !showChat ? 600 : 400,
              cursor: 'pointer', fontSize: 13, fontFamily: 'Roboto, Arial, sans-serif',
            }}
          >
            Top chat replay
          </button>
        </div>

        {showChat && <LiveChat />}

        {/* Suggested videos */}
        <div style={{ marginTop: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, margin: '0 0 12px', color: 'var(--yt-spec-text-primary)' }}>
            Up next
          </h3>
          {suggested.map(v => (
            <SuggestedCard key={v.id} info={v} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default WatchPage
