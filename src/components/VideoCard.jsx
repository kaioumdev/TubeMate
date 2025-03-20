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
        <div>
            <img src={thumbnails?.high?.url} alt="" />
            <ul>
                <li>{title}</li>
                <li>{channelTitle}</li>
                <li>{statistics.viewCount}</li>
            </ul>
        </div>
    )
}

export default VideoCard