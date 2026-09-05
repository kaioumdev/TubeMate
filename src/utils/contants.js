const VITE_GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

export const LIVE_CHAT_COUNT = 25;

// ── Home feed: mostPopular with optional videoCategoryId + pageToken ──────────
// Rotating across categories gives unlimited fresh content for free.
export const YOUTUBE_VIDEOS_API = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&key=" + VITE_GOOGLE_API_KEY

export const YOUTUBE_VIDEOS_PAGED_API = ({ categoryId = '', pageToken = '', maxResults = 24 } = {}) => {
    const base = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=${maxResults}&regionCode=US`
    const cat  = categoryId ? `&videoCategoryId=${categoryId}` : ''
    const page = pageToken  ? `&pageToken=${pageToken}`        : ''
    return `${base}${cat}${page}&key=${VITE_GOOGLE_API_KEY}`
}

// ── Search-based feed: keyword → latest videos (has nextPageToken) ──────────
// Used when a specific chip (Gaming, Music …) is selected.
export const YOUTUBE_SEARCH_FEED_API = ({ query = '', pageToken = '', maxResults = 24 } = {}) => {
    const page = pageToken ? `&pageToken=${pageToken}` : ''
    return `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${encodeURIComponent(query)}&type=video&videoDuration=medium&order=viewCount${page}&key=${VITE_GOOGLE_API_KEY}`
}

// ── Video category IDs (YouTube standard) ───────────────────────────────────
// Rotating through these on "All" gives unlimited homepage content.
export const VIDEO_CATEGORIES = [
    { id: '',   label: 'All'         },
    { id: '20', label: 'Gaming'      },
    { id: '10', label: 'Music'       },
    { id: '17', label: 'Sports'      },
    { id: '24', label: 'Entertainment' },
    { id: '28', label: 'Technology'  },
    { id: '22', label: 'People & Blogs' },
    { id: '25', label: 'News'        },
    { id: '19', label: 'Travel'      },
    { id: '26', label: 'How-to'      },
    { id: '23', label: 'Comedy'      },
    { id: '15', label: 'Pets'        },
]

// ── Chip label → search query mapping (for non-category chips) ───────────────
export const CHIP_QUERY_MAP = {
    'All':              '',
    'Gaming':           'gaming',
    'Music':            'music',
    'Live':             'live stream',
    'Soccer':           'soccer football',
    'Cricket':          'cricket',
    'Cooking':          'cooking recipes',
    'Mixes':            'youtube mix playlist',
    'News':             'world news today',
    'Recently uploaded':'new videos today',
    'Watched':          'most watched viral',
    'New to you':       'trending viral',
    'Comedy':           'comedy funny',
    'Technology':       'technology review',
    'Science':          'science documentary',
    'Travel':           'travel vlog',
}

export const YOUTUBE_SEARCH_API = "https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q="
export const YOUTUBE_SEARCH_API_VIDEOS = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&order=relevance&type=video&key=" + VITE_GOOGLE_API_KEY

// ── Shorts ───────────────────────────────────────────────────────────────────
export const YOUTUBE_SHORTS_API = (pageToken = "") =>
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=%23shorts&type=video&videoDuration=short&order=viewCount&regionCode=US${pageToken ? "&pageToken=" + pageToken : ""}&key=${VITE_GOOGLE_API_KEY}`

// ── Batch video details ──────────────────────────────────────────────────────
export const YOUTUBE_VIDEO_DETAILS_API = (ids = "") =>
    `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${ids}&key=${VITE_GOOGLE_API_KEY}`