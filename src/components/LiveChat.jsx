import React, { useEffect, useState } from 'react'
import ChatMessage from './ChatMessage'
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../utils/redux/chatSlice';
import { generateRandomName, makeRandomMessage } from '../utils/helper';

const LiveChat = () => {
    const dispatch = useDispatch();
    const chatMessage = useSelector((store) => store.chat.message);
    const [liveMessage, setLiveMessage] = useState("")
    useEffect(() => {
        const polling = setInterval(() => {
            dispatch(addMessage({ name: generateRandomName(), message: makeRandomMessage(20) }))
        }, 1500)
        return () => {
            clearTimeout(polling)
        }
    }, [])
    return (
        <>
            <div className='w-full h-[600px] ml-2 p-2 border border-black bg-slate-100 rounded-lg overflow-y-scroll flex flex-col-reverse'>
                <div>
                    {
                        chatMessage.map((message, index) => <ChatMessage key={index} name={message.name} message={message.message} />)
                    }
                </div>
            </div>
            <form onSubmit={(e) => {
                e.preventDefault()
                console.log('submit', liveMessage)
                dispatch(addMessage({ name: 'Kaioum Islam', message: liveMessage }))
                setLiveMessage("")
            }} className='flex w-full p-2 border border-black'>
                <input className='w-96 border border-black' type='text' value={liveMessage} onChange={(e) => setLiveMessage(e.target.value)} />
                <button className='px-2 mx-2 bg-green-100'>Send</button>
            </form>
        </>
    )
}

export default LiveChat