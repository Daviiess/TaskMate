import React from 'react'
import './Sessions.scss'
const Sessions = ({sessions_text , sessions_no , icon }) => {
  return (
    <div className='sessions-container'>
        <div className="sessions-container__flex">
        <div className='sessions-container__left-side'>
       <span className='sessions-container__span-1'>{sessions_text}:</span>
        <span className='sessions-container__span-2'>{sessions_no}</span> 
        </div>
        <div className='sessions-container__right-side'>
          <p className='sessions-container__right-side__text'> {icon} </p>
        </div>
      </div>
    </div>
  )
}

export default Sessions
