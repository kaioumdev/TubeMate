import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { closeMenu } from '../utils/redux/appSlice'
import { useSearchParams } from 'react-router-dom'
import CommentsContainer from './CommentsContainer'
import LiveChat from './LiveChat'

const WatchPage = () => {
    const [searchParams] = useSearchParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(closeMenu())
    }, [])
    return (
        <div className='flex flex-col w-full'>
            <div className='px-5 flex w-full'>
                <div>
                    <iframe width="1200" height="600"
                        src={"https://www.youtube.com/embed/" + searchParams.get('v')} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
                <div className='w-full'>
                    <LiveChat></LiveChat>
                </div>
            </div>
            <CommentsContainer></CommentsContainer>
        </div>
    )
}

export default WatchPage