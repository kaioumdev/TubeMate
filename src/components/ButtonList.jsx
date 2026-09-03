import React, { useRef } from 'react'
import Button from './Button'

const list = [
  'All', 'Gaming', 'Music', 'Live', 'Soccer', 'Cricket',
  'Cooking', 'Mixes', 'News', 'Recently uploaded', 'Watched',
  'New to you', 'Comedy', 'Technology', 'Science', 'Travel',
]

/* Props:
   activeChip  — currently selected chip string
   onChipClick — (chip: string) => void
*/
const ButtonList = ({ activeChip = 'All', onChipClick }) => {
  const scrollRef = useRef(null)

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 200, behavior: 'smooth' })
    }
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'var(--yt-spec-base-background)',
      padding: '12px 0 12px 0',
      gap: 0,
    }}>
      {/* Left arrow */}
      <button
        onClick={() => scroll(-1)}
        aria-label="Scroll left"
        style={{
          flexShrink: 0, background: 'var(--yt-spec-base-background)',
          border: 'none', cursor: 'pointer', padding: '8px 4px',
          color: 'var(--yt-spec-text-primary)', display: 'flex', alignItems: 'center',
        }}
      >
        <svg height="24" viewBox="0 0 24 24" width="24" fill="var(--yt-spec-text-primary)">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        </svg>
      </button>

      {/* Scrollable pill list */}
      <div
        ref={scrollRef}
        className="chips-scroll"
        style={{
          display: 'flex', gap: 8, overflowX: 'auto',
          scrollbarWidth: 'none', msOverflowStyle: 'none',
          padding: '4px 0', flex: 1,
        }}
        role="tablist"
        aria-label="Video categories"
      >
        {list.map(item => (
          <Button
            key={item}
            name={item}
            active={activeChip === item}
            onClick={() => onChipClick?.(item)}
          />
        ))}
      </div>

      {/* Right arrow */}
      <button
        onClick={() => scroll(1)}
        aria-label="Scroll right"
        style={{
          flexShrink: 0, background: 'var(--yt-spec-base-background)',
          border: 'none', cursor: 'pointer', padding: '8px 4px',
          color: 'var(--yt-spec-text-primary)', display: 'flex', alignItems: 'center',
        }}
      >
        <svg height="24" viewBox="0 0 24 24" width="24" fill="var(--yt-spec-text-primary)">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
        </svg>
      </button>
    </div>
  )
}

export default ButtonList
