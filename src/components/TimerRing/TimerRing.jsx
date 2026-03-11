import React from 'react'

const TimerRing = ({formatTime, duration, timeLeft, mode,}) => {

const radius = 90;
const circumference = 2 * Math.PI * radius;
const safeDuration = duration > 0 ? duration : 100; 
const percentage = safeDuration > 0 ? timeLeft / safeDuration : 100;
const offset = circumference - (percentage * circumference) || 0;
const modeColors = {
  work: '#4B96CC',
  short: '#6C9262',
  long: '#E48746'
};

const currentStroke = modeColors[mode] || modeColors.work;
  return (
   <div className="timer-panel__time-wrapper">
      <svg width={'300'} height={'300'} viewBox='0 0 200 200'>
        <circle className='timer__ring'
        cx={"100"} cy={"100"} r = {radius}
        stroke="white" strokeWidth="10" fill="transparent"
        />
        
        <circle
        className="ring-progress"
        cx="100" cy="100" r={radius}
        stroke={currentStroke} strokeWidth="10" fill="transparent"
        strokeDasharray={circumference}
        strokeDashoffset={offset} 
        strokeLinecap="round" 
        transform="rotate(-90 100 100)"
        style={{transition: 'stroke 0.3s ease, stroke-dashoffset 0.5s linear'}}
        />
      </svg>
      <h1 className='timer-panel__display'>{formatTime()}</h1>
          
      </div> 
  )
}

export default TimerRing
