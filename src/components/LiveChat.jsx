import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage } from '../utils/redux/chatSlice'
import { generateRandomName, makeRandomMessage } from '../utils/helper'
import ChatMessage from './ChatMessage'

const LiveIcon = () => (
    <svg height="16" viewBox="0 0 24 24" width="16" fill="var(--yt-spec-brand-icon-active)">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
    </svg>
)

const SendIcon = () => (
    <svg height="20" viewBox="0 0 24 24" width="20">
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
    </svg>
)

const LiveChat = () => {
    const dispatch = useDispatch()
    const chatMessages = useSelector((store) => store.chat.message)
    const [liveMessage, setLiveMessage] = useState('')
    const [isPaused, setIsPaused] = useState(false)
    const messagesEndRef = useRef(null)
    const inputRef = useRef(null)

    /* Auto-scroll to bottom when new messages arrive */
    useEffect(() => {
        if (!isPaused && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [chatMessages, isPaused])

    /* Simulated live chat polling */
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isPaused) {
                dispatch(addMessage({
                    name: generateRandomName(),
                    message: makeRandomMessage(20),
                }))
            }
        }, 1500)
        return () => clearInterval(interval)
    }, [isPaused, dispatch])

    const handleSend = (e) => {
        e.preventDefault()
        const msg = liveMessage.trim()
        if (!msg) return
        dispatch(addMessage({ name: 'You', message: msg }))
        setLiveMessage('')
        inputRef.current?.focus()
    }

    return (
        <div className="livechat-container">
            {/* Header */}
            <div className="livechat-header">
                <LiveIcon />
                <span>Live chat</span>
                <button
                    onClick={() => setIsPaused(p => !p)}
                    style={{
                        marginLeft: 'auto', background: 'none', border: 'none',
                        cursor: 'pointer', fontSize: 12, color: 'var(--yt-spec-text-secondary)',
                        padding: '4px 8px', borderRadius: 4,
                    }}
                    aria-label={isPaused ? 'Resume live chat' : 'Pause live chat'}
                >
                    {isPaused ? '▶ Resume' : '⏸ Pause'}
                </button>
            </div>

            {/* Messages */}
            <div className="livechat-messages">
                <div>
                    {chatMessages.map((msg, i) => (
                        <ChatMessage key={i} name={msg.name} message={msg.message} />
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Input */}
            <div className="livechat-input-row">
                <div
                    style={{
                        width: 24, height: 24, borderRadius: '50%',
                        background: '#065fd4', color: '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 12, fontWeight: 700, flexShrink: 0,
                    }}
                    aria-hidden="true"
                >
                    Y
                </div>
                <form onSubmit={handleSend} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <input
                        ref={inputRef}
                        className="livechat-input"
                        type="text"
                        placeholder="Send a message..."
                        value={liveMessage}
                        onChange={(e) => setLiveMessage(e.target.value)}
                        maxLength={200}
                        aria-label="Chat message"
                    />
                    <button
                        type="submit"
                        className="livechat-send-btn"
                        disabled={!liveMessage.trim()}
                        style={{
                            color: liveMessage.trim() ? 'var(--yt-spec-call-to-action)' : 'var(--yt-spec-text-disabled)',
                            display: 'flex', alignItems: 'center',
                        }}
                        aria-label="Send message"
                    >
                        <SendIcon />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default LiveChat
