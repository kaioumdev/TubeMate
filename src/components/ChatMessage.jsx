import React from 'react'

/* Deterministic colour from name string */
const nameToColor = (name) => {
    const colors = [
        '#ff6b6b', '#ffa94d', '#ffd43b', '#69db7c',
        '#74c0fc', '#9775fa', '#f783ac', '#63e6be',
    ]
    let hash = 0
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
    return colors[Math.abs(hash) % colors.length]
}

const ChatMessage = ({ name, message }) => {
    const color = nameToColor(name)

    return (
        <div className="chat-msg">
            {/* Coloured circle avatar */}
            <div
                className="chat-msg-avatar"
                style={{ background: color, color: '#fff', fontWeight: 700, fontSize: 12,
                         display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                aria-hidden="true"
            >
                {name?.[0]?.toUpperCase() || '?'}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
                <span className="chat-msg-name" style={{ color }}>{name}</span>
                <span className="chat-msg-text">{message}</span>
            </div>
        </div>
    )
}

export default ChatMessage
