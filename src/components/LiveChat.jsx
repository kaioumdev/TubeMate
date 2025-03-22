import React, { useEffect } from 'react'
import ChatMessage from './ChatMessage'
import { useDispatch } from 'react-redux';
import { addMessage } from '../utils/redux/chatSlice';

const LiveChat = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const polling = setTimeout(() => {
            dispatch(addMessage({ name: "Kaioum Islam", message: "This is my fevaroite react library" }))
        }, 200)
        return () => {
            clearTimeout(polling)
        }
    }, [])
    return (
        <div className='w-full h-[600px] ml-2 p-2 border border-black bg-slate-100 rounded-lg'>
            <ChatMessage name="Abdul Kaiyum" message="This is hello react app"></ChatMessage>
            <ChatMessage name="Abdul Kaiyum" message="This is hello react app"></ChatMessage>
            <ChatMessage name="Abdul Kaiyum" message="This is hello react app"></ChatMessage>
        </div>
    )
}

export default LiveChat