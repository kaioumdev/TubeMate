import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { formatViewCount, timeAgo } from '../utils/helper'
import { YOUTUBE_SEARCH_API_VIDEOS } from '../utils/contants'

/* ─── Skeleton loader ────────────────────────────────────── */
const SkeletonItem = () => (
  <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
    <div style={{
      width: 360, height: 202, borderRadius: 12, flexShrink: 0,
      background: 'var(--yt-spec-chip-background)',
      animation: 'pulse 1.5s ease-in-out infinite',
    }} />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ height: 20, borderRadius: 4, background: 'var(--yt-spec-chip-background)', width: '80%' }} />
      <div style={{ height: 14, borderRadius: 4, background: 'var(--yt-spec-chip-background)', width: '40%' }} />
      <div style={{ height: 14, borderRadius: 4, background: 'var(--yt-spec-chip-background)', width: '60%' }} />
    </div>
  </div>
)

/* ─── Single search result row ───────────────────────────── */
const SearchResultItem = ({ video }) => {
  const { id, snippet } = video
  const videoId = id?.videoId || id
  const thumb = snippet?.thumbnails?.medium?.url || snippet?.thumbnails?.high?.url

  return (
    <Link to={`/watch?v=${videoId}`} className="search-result-item" aria-label={snippet?.title}>
      <div className="search-result-thumb">
        <img src={thumb} alt={snippet?.title} loading="lazy" />
      </div>
      <div className="search-result-info">
        <h3 className="search-result-title">{snippet?.title}</h3>
        <p className="search-result-meta">
          {snippet?.publishedAt ? timeAgo(snippet.publishedAt) : ''}
        </p>
        <div className="search-result-channel">
          {/* Small channel avatar */}
          <div style={{
            width: 24, height: 24, borderRadius: '50%',
            background: '#ff0000', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 700, flexShrink: 0,
          }}>
            {snippet?.channelTitle?.[0]?.toUpperCase() || 'C'}
          </div>
          <span>{snippet?.channelTitle}</span>
          {/* Verified tick */}
          <svg height="14" viewBox="0 0 24 24" width="14" fill="var(--yt-spec-text-secondary)">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <p className="search-result-desc">{snippet?.description}</p>
      </div>
    </Link>
  )
}

/* ─── Main component ─────────────────────────────────────── */
const ShowSearchResults = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''

  const [results, setResults] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    if (!query.trim()) return
    const controller = new AbortController()
    const fetchResults = async () => {
      try {
        setLoading(true)
        setError(null)
        const url = `${YOUTUBE_SEARCH_API_VIDEOS}&q=${encodeURIComponent(query)}`
        const res = await fetch(url, { signal: controller.signal })
        const json = await res.json()
        if (json.items) {
          setResults(json.items)
        } else {
          setError(json.error?.message || 'No results found.')
        }
      } catch (err) {
        if (err.name !== 'AbortError') setError('Failed to load results.')
      } finally {
        setLoading(false)
      }
    }
    fetchResults()
    return () => controller.abort()
  }, [query])

  return (
    <div style={{ padding: '16px 24px', maxWidth: 1096 }}>
      {/* Result count */}
      {!loading && results.length > 0 && (
        <p style={{ fontSize: 12, color: 'var(--yt-spec-text-secondary)', marginBottom: 16 }}>
          About {results.length} results for <strong style={{ color: 'var(--yt-spec-text-primary)' }}>{query}</strong>
        </p>
      )}

      {/* Skeletons */}
      {loading && Array.from({ length: 6 }).map((_, i) => <SkeletonItem key={i} />)}

      {/* Error */}
      {error && !loading && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 0', gap: 12 }}>
          <svg height="64" viewBox="0 0 24 24" width="64" fill="var(--yt-spec-text-disabled)">
            <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.59-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
          </svg>
          <p style={{ color: 'var(--yt-spec-text-secondary)', fontSize: 15 }}>{error}</p>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && query && results.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <svg height="80" viewBox="0 0 24 24" width="80" fill="var(--yt-spec-text-disabled)">
            <path d="m20.87 20.17-5.59-5.59C16.35 13.35 17 11.75 17 10c0-3.87-3.13-7-7-7s-7 3.13-7 7 3.13 7 7 7c1.75 0 3.35-.65 4.58-1.71l5.59 5.59.7-.71zM10 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
          </svg>
          <p style={{ color: 'var(--yt-spec-text-secondary)', fontSize: 15, marginTop: 12 }}>
            No results found for "{query}"
          </p>
          <p style={{ color: 'var(--yt-spec-text-secondary)', fontSize: 13 }}>
            Try different keywords or remove search filters
          </p>
        </div>
      )}

      {/* Results list */}
      {!loading && results.map((video, i) => (
        <SearchResultItem key={video.id?.videoId || i} video={video} />
      ))}
    </div>
  )
}

export default ShowSearchResults
