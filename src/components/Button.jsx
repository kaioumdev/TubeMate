import React from 'react'

const Button = ({ name, active, onClick }) => {
  return (
    <button
      className={`yt-chip${active ? ' active' : ''}`}
      onClick={onClick}
      aria-pressed={active}
    >
      {name}
    </button>
  )
}

export default Button
