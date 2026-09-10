import React, { useState } from 'react'

/* ─── Sample data ────────────────────────────────────────── */
const commentsData = [
    {
        id: 1,
        name: 'Alex Johnson',
        avatar: null,
        text: 'This is absolutely incredible! The production quality keeps getting better every single video.',
        likes: 4821,
        timeAgo: '3 days ago',
        replies: [
            {
                id: 11,
                name: 'Sarah Chen',
                avatar: null,
                text: 'Totally agree! I\'ve been following this channel for years and the improvement is insane.',
                likes: 312,
                timeAgo: '2 days ago',
                replies: [
                    {
                        id: 111,
                        name: 'Mike Torres',
                        avatar: null,
                        text: 'Same here. Subscribed since day one 🎉',
                        likes: 87,
                        timeAgo: '1 day ago',
                        replies: [],
                    },
                ],
            },
            {
                id: 12,
                name: 'DataDriven Dev',
                avatar: null,
                text: 'The editing alone must take days. Respect! 🙌',
                likes: 203,
                timeAgo: '2 days ago',
                replies: [],
            },
        ],
    },
    {
        id: 2,
        name: 'Priya Sharma',
        avatar: null,
        text: 'I watched this three times already and I keep learning something new. The level of detail is outstanding.',
        likes: 2109,
        timeAgo: '5 days ago',
        replies: [
            {
                id: 21,
                name: 'Carlos Mendez',
                avatar: null,
                text: 'Same! Bookmarked and shared it with my entire team at work.',
                likes: 178,
                timeAgo: '4 days ago',
                replies: [],
            },
        ],
    },
    {
        id: 3,
        name: 'TechNomad',
        avatar: null,
        text: 'Finally a clear explanation of this topic. Most tutorials skip the fundamentals but this one nails it from start to finish.',
        likes: 987,
        timeAgo: '1 week ago',
        replies: [],
    },
    {
        id: 4,
        name: 'Lena Fischer',
        avatar: null,
        text: 'The timestamps in the description are a lifesaver. I always come back to this specific section at 12:34 whenever I need a refresher.',
        likes: 543,
        timeAgo: '2 weeks ago',
        replies: [
            {
                id: 41,
                name: 'Omar Khalid',
                avatar: null,
                text: '12:34 is genuinely the best part. Explained it better than my university professor ever did.',
                likes: 221,
                timeAgo: '1 week ago',
                replies: [],
            },
        ],
    },
]

/* ─── Helpers ────────────────────────────────────────────── */
const nameToColor = (name) => {
    const palette = [
        '#e53e3e','#dd6b20','#d69e2e','#38a169',
        '#3182ce','#805ad5','#d53f8c','#319795',
    ]
    let hash = 0
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
    return palette[Math.abs(hash) % palette.length]
}

const formatLikes = (n) => {
    if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
    return String(n)
}

/* ─── ThumbUpIcon / ThumbDownIcon ────────────────────────── */
const ThumbUpIcon = () => (
    <svg height="16" viewBox="0 0 24 24" width="16" fill="currentColor">
        <path d="M18.77 11h-4.23l1.52-4.94C16.38 5.03 15.54 4 14.38 4c-.58 0-1.14.24-1.52.65L7 11H3v10h4l0 0h10.43c1.06 0 1.98-.67 2.3-1.68l1.52-5C21.68 12.87 20.48 11 18.77 11zM7 20H4v-8h3v8zm12.98-6.83l-1.52 5c-.13.4-.52.83-1.03.83H8V12.41l5.86-6.29c.1-.1.25-.18.52-.18.26 0 .5.24.4.68l-1.69 5.5h7.68c.49 0 1.07.47.21 1.05z"/>
    </svg>
)
const ThumbDownIcon = () => (
    <svg height="16" viewBox="0 0 24 24" width="16" fill="currentColor">
        <path d="M5.23 13h4.23l-1.52 4.94C7.62 18.97 8.46 20 9.62 20c.58 0 1.14-.24 1.52-.65L17 13h4V3H7c-1.06 0-1.98.67-2.3 1.68l-1.52 5C2.32 11.13 3.52 13 5.23 13zm9.77 5.59c-.1.1-.25.18-.52.18-.26 0-.5-.24-.4-.68l1.69-5.5H8.09c-.49 0-1.07-.47-.21-1.05l1.52-5c.13-.4.52-.83 1.03-.83H16V11.59L14.98 18.59H15zm3.02-15.59h3v8h-3V3z"/>
    </svg>
)
const ReplyIcon = () => (
    <svg height="16" viewBox="0 0 24 24" width="16" fill="currentColor">
        <path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"/>
    </svg>
)

/* ─── Single Comment ─────────────────────────────────────── */
const Comment = ({ data, depth = 0 }) => {
    const [showReplies, setShowReplies] = useState(false)
    const [liked, setLiked] = useState(false)
    const color = nameToColor(data.name)
    const hasReplies = data.replies && data.replies.length > 0

    return (
        <div className="comment-item" style={{ marginLeft: depth > 0 ? 0 : 0 }}>
            {/* Avatar */}
            <div
                className="comment-avatar"
                style={{ background: color, color: '#fff', fontWeight: 700,
                         fontSize: depth > 0 ? 14 : 16,
                         width: depth > 0 ? 32 : 40, height: depth > 0 ? 32 : 40,
                         minWidth: depth > 0 ? 32 : 40 }}
                aria-hidden="true"
            >
                {data.name[0].toUpperCase()}
            </div>

            {/* Body */}
            <div className="comment-body">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <span className="comment-author">{data.name}</span>
                    <span style={{ fontSize: 12, color: 'var(--yt-spec-text-secondary)' }}>
                        {data.timeAgo}
                    </span>
                </div>
                <p className="comment-text">{data.text}</p>

                {/* Actions */}
                <div className="comment-actions">
                    <button
                        className="comment-action-btn"
                        onClick={() => setLiked(l => !l)}
                        aria-label="Like comment"
                        style={{ color: liked ? 'var(--yt-spec-text-primary)' : 'var(--yt-spec-text-secondary)' }}
                    >
                        <ThumbUpIcon />
                        <span>{formatLikes(data.likes + (liked ? 1 : 0))}</span>
                    </button>
                    <button className="comment-action-btn" aria-label="Dislike comment">
                        <ThumbDownIcon />
                    </button>
                    <button className="comment-action-btn" aria-label="Reply">
                        <ReplyIcon />
                        <span>Reply</span>
                    </button>
                </div>

                {/* Toggle replies */}
                {hasReplies && (
                    <button
                        onClick={() => setShowReplies(v => !v)}
                        style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            color: 'var(--yt-spec-call-to-action)', fontSize: 13,
                            fontWeight: 600, padding: '6px 0', display: 'flex',
                            alignItems: 'center', gap: 4,
                        }}
                        aria-expanded={showReplies}
                    >
                        <svg
                            height="18" viewBox="0 0 24 24" width="18"
                            fill="var(--yt-spec-call-to-action)"
                            style={{ transform: showReplies ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                        >
                            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                        </svg>
                        {showReplies ? 'Hide' : `${data.replies.length}`} repl{data.replies.length !== 1 ? 'ies' : 'y'}
                    </button>
                )}

                {/* Nested replies */}
                {showReplies && hasReplies && (
                    <div className="replies-container">
                        {data.replies.map(reply => (
                            <Comment key={reply.id} data={reply} depth={depth + 1} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

/* ─── Sort / Filter bar ──────────────────────────────────── */
const SortIcon = () => (
    <svg height="20" viewBox="0 0 24 24" width="20" fill="currentColor">
        <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"/>
    </svg>
)

/* ─── Main export ────────────────────────────────────────── */
const CommentsContainer = () => {
    const total = commentsData.reduce((acc, c) => {
        const replyCount = (c.replies || []).reduce((a2, r) => a2 + 1 + (r.replies?.length || 0), 0)
        return acc + 1 + replyCount
    }, 0)

    return (
        <div className="comments-section">
            {/* Header row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 24 }}>
                <h2 className="comment-count" style={{ margin: 0 }}>
                    {total.toLocaleString()} Comments
                </h2>
                <button
                    style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: 6,
                        fontSize: 14, fontWeight: 600,
                        color: 'var(--yt-spec-text-primary)',
                    }}
                    aria-label="Sort comments"
                >
                    <SortIcon />
                    Sort by
                </button>
            </div>

            {/* Add comment input (decorative — no full auth flow) */}
            <div style={{ display: 'flex', gap: 16, marginBottom: 32 }}>
                <div
                    style={{
                        width: 40, height: 40, borderRadius: '50%',
                        background: '#065fd4', color: '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 700, fontSize: 16, flexShrink: 0,
                    }}
                    aria-hidden="true"
                >
                    Y
                </div>
                <input
                    type="text"
                    placeholder="Add a comment..."
                    style={{
                        flex: 1, background: 'transparent', border: 'none',
                        borderBottom: '1px solid var(--yt-spec-outline)',
                        color: 'var(--yt-spec-text-primary)', fontSize: 14,
                        padding: '6px 0', outline: 'none',
                        fontFamily: 'Roboto, Arial, sans-serif',
                    }}
                    onFocus={e => e.target.style.borderBottomColor = '#065fd4'}
                    onBlur={e => e.target.style.borderBottomColor = 'var(--yt-spec-outline)'}
                    aria-label="Add a comment"
                />
            </div>

            {/* Comment list */}
            {commentsData.map(comment => (
                <Comment key={comment.id} data={comment} />
            ))}
        </div>
    )
}

export default CommentsContainer
