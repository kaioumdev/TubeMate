import React, { useEffect } from 'react'
import ChatMessage from './ChatMessage'
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../utils/redux/chatSlice';

const LiveChat = () => {
    const dispatch = useDispatch();
    const chatMessage = useSelector((store) => store.chat.message)
    useEffect(() => {
        const polling = setInterval(() => {
            dispatch(addMessage({ name: "Kaioum Islam", message: "This is my fevaroite react library" }))
        }, 2000)
        return () => {
            clearTimeout(polling)
        }
    }, [])
    return (
        <div className='w-full h-[600px] ml-2 p-2 border border-black bg-slate-100 rounded-lg'>
            {
                chatMessage.map((message, index) => <ChatMessage key={index} name={message.name} message={message.message} />)
            }
        </div>
    )
}

export default LiveChat