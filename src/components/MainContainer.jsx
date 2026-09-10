import React, { useState } from 'react'
import ButtonList from './ButtonList'
import VideoContainer from './VideoContainer'

const MainContainer = () => {
    const [activeChip, setActiveChip] = useState('All')

    return (
        <div style={{ paddingLeft: '24px', paddingRight: '12px' }}>
            <ButtonList
                activeChip={activeChip}
                onChipClick={setActiveChip}
            />
            <VideoContainer activeChip={activeChip} />
        </div>
    )
}

export default MainContainer
