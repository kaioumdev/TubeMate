import React from 'react'
import { Link } from 'react-router-dom'
import { formatViewCount, timeAgo, formatDuration } from '../utils/helper'

/* Generic coloured avatar fallback based on channel name initial */
const ChannelAvatar = ({ name }) => {
    const colors = ['#f44336','#e91e63','#9c27b0','#673ab7','#3f51b5',
                    '#2196f3','#009688','#4caf50','#ff9800','#795548']
    const idx = (name?.charCodeAt(0) || 0) % colors.length
    return (
        <div
            className="video-card-avatar"
            style={{ background: colors[idx], color: '#fff', fontWeight: 700, fontSize: 16 }}
            aria-hidden="true"
        >
            {name?.[0]?.toUpperCase() || '?'}
        </div>
    )
}

const VideoCard = ({ info }) => {
    if (!info) return null

    const { snippet, statistics, contentDetails, id } = info
    const { channelTitle, title, thumbnails, publishedAt } = snippet
    const thumbnail = thumbnails?.maxres?.url || thumbnails?.high?.url || thumbnails?.medium?.url
    const duration = formatDuration(contentDetails?.duration)
    const views = formatViewCount(statistics?.viewCount)
    const uploaded = timeAgo(publishedAt)
    const videoId = typeof id === 'string' ? id : id?.videoId

    return (
        <Link to={`/watch?v=${videoId}`} className="video-card" aria-label={title}>
            {/* Thumbnail */}
            <div className="video-card-thumbnail">
                <img src={thumbnail} alt={title} loading="lazy" />
                {duration && (
                    <span className="video-card-duration">{duration}</span>
                )}
            </div>

            {/* Info row */}
            <div className="video-card-info">
                <ChannelAvatar name={channelTitle} />
                <div className="video-card-meta">
                    <p className="video-card-title" title={title}>{title}</p>
                    <p className="video-card-channel">{channelTitle}</p>
                    <p className="video-card-stats">{views} &bull; {uploaded}</p>
                </div>
            </div>
        </Link>
    )
}

/* Ad card — subtle "Sponsored" badge overlay, no red border */
export const AdVideoCard = ({ info }) => {
    if (!info) return null
    const { snippet, id } = info
    const { channelTitle, title, thumbnails } = snippet
    const thumbnail = thumbnails?.maxres?.url || thumbnails?.high?.url || thumbnails?.medium?.url
    const videoId = typeof id === 'string' ? id : id?.videoId

    return (
        <Link to={`/watch?v=${videoId}`} className="video-card" aria-label={title}>
            <div className="video-card-thumbnail">
                <img src={thumbnail} alt={title} loading="lazy" />
                <span
                    style={{
                        position: 'absolute', top: 6, left: 6,
                        background: 'rgba(0,0,0,0.7)', color: '#fff',
                        fontSize: 11, fontWeight: 600, padding: '2px 6px',
                        borderRadius: 4,
                    }}
                >
                    Ad
                </span>
            </div>
            <div className="video-card-info">
                <ChannelAvatar name={channelTitle} />
                <div className="video-card-meta">
                    <p className="video-card-title">{title}</p>
                    <p className="video-card-channel">{channelTitle}</p>
                    <p className="video-card-stats" style={{ color: 'var(--yt-spec-text-disabled)', fontStyle: 'italic' }}>Sponsored</p>
                </div>
            </div>
        </Link>
    )
}

export default VideoCard
