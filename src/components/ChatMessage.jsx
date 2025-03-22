import React, { useEffect } from 'react'

const ChatMessage = ({ name, message }) => {

    useEffect(() => {
        const polling = setTimeout(() => {

        }, 200)
        return () => {
            clearTimeout(polling)
        }
    }, [])
    return (
        <div className='flex items-center'>
            <img className='h-8' src="https://static.vecteezy.com/system/resources/previews/019/879/186/original/user-icon-on-transparent-background-free-png.png" alt="User" />
            <div>
                <span className='font-bold'>{name}</span>
                <span className='ml-2'>{message}</span>
            </div>
        </div>
    )
}

export default ChatMessage