const VITE_GOOGLE_API_KEY = "AIzaSyDJ-ajy0m5UU4gIbvZSigDYf6ZMNicnAt8"

export const LIVE_CHAT_COUNT = 25;

export const YOUTUBE_VIDEOS_API = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&key=" + VITE_GOOGLE_API_KEY

export const YOUTUBE_SEARCH_API = "https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q="
export const YOUTUBE_SEARCH_API_VIDEOS = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&order=relevance&type=video&key=" + VITE_GOOGLE_API_KEY