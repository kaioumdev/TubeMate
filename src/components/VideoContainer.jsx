import React, { useEffect, useState } from 'react'
import { YOUTUBE_VIDEOS_API } from '../utils/contants'
import VideoCard, { AdVideoCard } from './VideoCard'
import { Link } from 'react-router-dom'

const VideoContainer = () => {
    const [videos, setVideos] = useState([])
    useEffect(() => {
        getVideos()
    }, [])

    const getVideos = async () => {
        const data = await fetch(YOUTUBE_VIDEOS_API)
        const json = await data.json()
        setVideos(json.items)
    }
    return (
        <div className='flex flex-wrap'>
            {videos[0] && <AdVideoCard info={videos[0]}></AdVideoCard>}
            {
                videos.map(video => (
                    <Link to={"/watch?v=" + video.id} key={video.id}>
                        <VideoCard key={video.id} info={video}></VideoCard>
                    </Link>
                ))
            }
        </div>
    )
}

export default VideoContainer