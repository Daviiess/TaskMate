import React from 'react'
import './EmptyTaskBoard.scss'
const EmptyTaskBoard = () => {
  return (
    <div className='empty'>
      <p className='empty__text-no'>No current listed task</p>
      <p className='empty__text-instruction'>Click the open Modal to add task</p>
      
    </div>
  )
}

export default EmptyTaskBoard
