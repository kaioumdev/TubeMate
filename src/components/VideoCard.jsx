/* eslint-disable no-unused-vars */
import React from 'react'

const VideoCard = ({ info }) => {
    if (!info) {
        return <div>Loading...</div>
    }
    console.log(info)
    const { snippet, statistics } = info;
    const { channelTitle, title, thumbnails } = snippet;
    return (
        <div className='p-2 m-2 w-72 shadow-lg'>
            <img className='rounded-lg' src={thumbnails?.high?.url} alt="thumbnails" />
            <ul>
                <li className='font-bold py-2'>{title}</li>
                <li>{channelTitle}</li>
                <li>{statistics.viewCount} Views</li>
            </ul>
        </div>
    )
}

export default VideoCard