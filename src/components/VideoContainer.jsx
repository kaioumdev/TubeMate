import React, { useCallback, useEffect, useRef, useState } from 'react'
import VideoCard, { AdVideoCard } from './VideoCard'
import {
    VIDEO_CATEGORIES,
    CHIP_QUERY_MAP,
    YOUTUBE_VIDEOS_PAGED_API,
    YOUTUBE_SEARCH_FEED_API,
    YOUTUBE_VIDEO_DETAILS_API,
} from '../utils/contants'

/* ─── Skeleton card ──────────────────────────────────────── */
const VideoCardSkeleton = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Thumbnail */}
        <div style={{
            width: '100%', paddingTop: '56.25%', borderRadius: 12,
            background: 'var(--yt-spec-chip-background)',
            animation: 'skeletonPulse 1.6s ease-in-out infinite',
            position: 'relative',
        }} />
        {/* Info row */}
        <div style={{ display: 'flex', gap: 12 }}>
            <div style={{
                width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                background: 'var(--yt-spec-chip-background)',
                animation: 'skeletonPulse 1.6s ease-in-out infinite',
            }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ height: 14, borderRadius: 4, background: 'var(--yt-spec-chip-background)', width: '90%', animation: 'skeletonPulse 1.6s ease-in-out infinite' }} />
                <div style={{ height: 14, borderRadius: 4, background: 'var(--yt-spec-chip-background)', width: '60%', animation: 'skeletonPulse 1.6s ease-in-out infinite' }} />
                <div style={{ height: 12, borderRadius: 4, background: 'var(--yt-spec-chip-background)', width: '40%', animation: 'skeletonPulse 1.6s ease-in-out infinite' }} />
            </div>
        </div>
    </div>
)

const SkeletonGrid = ({ count = 12 }) => (
    <div className="video-grid">
        {Array.from({ length: count }).map((_, i) => (
            <VideoCardSkeleton key={i} />
        ))}
    </div>
)

/* ─── Error / empty state ────────────────────────────────── */
const ErrorState = ({ message, onRetry }) => (
    <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '80px 24px', gap: 16, color: 'var(--yt-spec-text-secondary)',
    }}>
        <svg height="80" viewBox="0 0 24 24" width="80" fill="var(--yt-spec-text-disabled)">
            <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
        </svg>
        <p style={{ fontSize: 15, textAlign: 'center', maxWidth: 360 }}>{message}</p>
        <button
            onClick={onRetry}
            style={{
                padding: '10px 24px', borderRadius: 20, border: 'none',
                background: 'var(--yt-spec-text-primary)', color: 'var(--yt-spec-base-background)',
                fontWeight: 600, cursor: 'pointer', fontSize: 14,
                fontFamily: 'Roboto, Arial, sans-serif',
            }}
        >
            Try again
        </button>
    </div>
)

/* ─── Loading spinner row ────────────────────────────────── */
const LoadingMore = () => (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '32px 0' }}>
        <div className="spinner" />
    </div>
)

/* ══════════════════════════════════════════════════════════
   VideoContainer
   Props:
     activeChip  — currently selected chip label (e.g. "Gaming")
═══════════════════════════════════════════════════════════*/
const VideoContainer = ({ activeChip = 'All' }) => {
    const [videos, setVideos] = useState([])
    const [initialLoading, setInitialLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [error, setError] = useState(null)
    const [hasMore, setHasMore] = useState(true)

    // For "All" tab: rotate through VIDEO_CATEGORIES using index
    const categoryIndexRef = useRef(0)
    // For category/search tabs: store nextPageToken from API
    const nextPageTokenRef = useRef('')
    // Prevent concurrent fetches
    const fetchingRef = useRef(false)
    // Sentinel element ref
    const sentinelRef = useRef(null)
    // Track which chip we last loaded for — reset on chip change
    const activeChipRef = useRef(activeChip)

    /* ── Determine fetch mode from active chip ── */
    const getMode = useCallback((chip) => {
        if (chip === 'All') return 'rotate'                   // rotate categories
        if (CHIP_QUERY_MAP[chip]) return 'search'             // keyword search
        return 'rotate'
    }, [])

    /* ── Build the URL for the next page ── */
    const buildUrl = useCallback((chip, pageToken) => {
        const mode = getMode(chip)
        if (mode === 'search') {
            const query = CHIP_QUERY_MAP[chip]
            return YOUTUBE_SEARCH_FEED_API({ query, pageToken, maxResults: 24 })
        }
        // rotate mode: cycle through category IDs
        const cats = VIDEO_CATEGORIES.filter(c => c.id !== '' || chip === 'All')
        const idx = categoryIndexRef.current % cats.length
        const cat = cats[idx]
        return YOUTUBE_VIDEOS_PAGED_API({ categoryId: cat.id, pageToken, maxResults: 24 })
    }, [getMode])

    /* ── Fetch one page of videos ── */
    const fetchVideos = useCallback(async (chip, isInitial = false) => {
        if (fetchingRef.current) return
        fetchingRef.current = true

        if (isInitial) {
            setInitialLoading(true)
            setError(null)
        } else {
            setLoadingMore(true)
        }

        try {
            const pageToken = isInitial ? '' : nextPageTokenRef.current
            const mode = getMode(chip)
            const url = buildUrl(chip, pageToken)

            const res = await fetch(url)
            const json = await res.json()

            if (json.error) {
                throw new Error(json.error.message || 'API error')
            }

            let items = json.items || []

            // Search API returns snippet only — enrich with statistics
            if (mode === 'search' && items.length > 0) {
                const ids = items.map(v => v.id?.videoId).filter(Boolean).join(',')
                if (ids) {
                    const detailRes = await fetch(YOUTUBE_VIDEO_DETAILS_API(ids))
                    const detailJson = await detailRes.json()
                    const detailMap = {}
                    ;(detailJson.items || []).forEach(v => { detailMap[v.id] = v })
                    items = items.map(item => {
                        const vid = item.id?.videoId
                        return detailMap[vid] ? detailMap[vid] : item
                    })
                }
            }

            if (items.length === 0 && isInitial) {
                setError('No videos found. Try a different category.')
                setHasMore(false)
                return
            }

            setVideos(prev => isInitial ? items : [...prev, ...items])

            // Update pagination state
            if (mode === 'search') {
                nextPageTokenRef.current = json.nextPageToken || ''
                if (!json.nextPageToken) setHasMore(false)
            } else {
                // rotate: advance category index; no real pageToken needed
                categoryIndexRef.current += 1
                nextPageTokenRef.current = json.nextPageToken || ''
                // If we've cycled all categories and no pageToken, try next category
                if (categoryIndexRef.current >= VIDEO_CATEGORIES.length * 2) {
                    setHasMore(false) // ~600+ videos loaded — enough
                }
            }
        } catch (err) {
            if (isInitial) {
                setError(err.message?.includes('quota')
                    ? 'API quota exceeded. Please wait a few hours and try again.'
                    : 'Failed to load videos. Check your API key or internet connection.')
            }
            setHasMore(false)
        } finally {
            if (isInitial) setInitialLoading(false)
            else setLoadingMore(false)
            fetchingRef.current = false
        }
    }, [buildUrl, getMode])

    /* ── Reset + reload when active chip changes ── */
    useEffect(() => {
        activeChipRef.current = activeChip
        categoryIndexRef.current = 0
        nextPageTokenRef.current = ''
        setVideos([])
        setHasMore(true)
        setError(null)
        fetchVideos(activeChip, true)
    }, [activeChip]) // eslint-disable-line react-hooks/exhaustive-deps

    /* ── IntersectionObserver: infinite scroll sentinel ── */
    useEffect(() => {
        if (!sentinelRef.current) return

        const observer = new IntersectionObserver(
            (entries) => {
                if (
                    entries[0].isIntersecting &&
                    hasMore &&
                    !fetchingRef.current &&
                    !initialLoading
                ) {
                    fetchVideos(activeChipRef.current, false)
                }
            },
            { rootMargin: '400px' } // start loading 400px before bottom
        )

        observer.observe(sentinelRef.current)
        return () => observer.disconnect()
    }, [hasMore, initialLoading, fetchVideos])

    /* ── Render ── */
    if (initialLoading) return <SkeletonGrid count={12} />

    if (error && videos.length === 0) {
        return <ErrorState message={error} onRetry={() => fetchVideos(activeChip, true)} />
    }

    return (
        <>
            <div className="video-grid">
                {/* First card as "Ad" only on initial All load */}
                {activeChip === 'All' && videos[0] && (
                    <AdVideoCard info={videos[0]} />
                )}
                {videos.map((video, idx) => {
                    // skip index 0 if we already showed it as ad
                    if (activeChip === 'All' && idx === 0) return null
                    const key = typeof video.id === 'string' ? video.id : (video.id?.videoId || idx)
                    return <VideoCard key={key} info={video} />
                })}

                {/* Inline skeleton tiles while loading more */}
                {loadingMore && Array.from({ length: 4 }).map((_, i) => (
                    <VideoCardSkeleton key={`sk-${i}`} />
                ))}
            </div>

            {/* Sentinel + bottom states */}
            {hasMore && !loadingMore && (
                <div ref={sentinelRef} style={{ height: 1 }} />
            )}

            {loadingMore && !initialLoading && (
                <LoadingMore />
            )}

            {!hasMore && videos.length > 0 && (
                <div style={{
                    textAlign: 'center', padding: '40px 0 60px',
                    color: 'var(--yt-spec-text-secondary)', fontSize: 13,
                }}>
                    <svg height="36" viewBox="0 0 24 24" width="36" fill="var(--yt-spec-text-disabled)" style={{ display: 'block', margin: '0 auto 8px' }}>
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    You&apos;re all caught up!
                </div>
            )}
        </>
    )
}

export default VideoContainer
