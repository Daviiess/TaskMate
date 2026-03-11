import React, { useState, useRef } from 'react'
import './TaskCard.scss';
import { FaTrash , FaEdit } from "react-icons/fa";


const TaskCard = ({className  ,task , focusTask , onDelete, mode, isRunning, timeLeft}) => {
  let focusBtn = useRef(null);
const [isFlipped , setIsFlipped] = useState(false);
const isTodo = className === 'todo-card';
 function handleFlip(){
 
    
    setIsFlipped(prevFlipState => !prevFlipState);
  
} 
let cssClass = 'task-card__btn';
  if(mode === 'short' || mode === 'long'
   ||(mode === 'work'  && timeLeft < 1500) 
   || (mode === 'work' && !isRunning) || isRunning 
  ){
   cssClass += ' disallowed'
  }
  return (
  <div className={`task-card ${className} ${isFlipped ? 'is-flipped' : ''}`} onClick={handleFlip}>
       <div className = {`task-card__side task-card__side--front`} >
            <p className="task-card__text">   {task?.text} </p>
           {isTodo && 
           <button className={cssClass}
           onClick={(e) => {focusTask(task.id);
            e.stopPropagation()}} 
            disabled = {mode === 'short' || mode === 'long' || isRunning || (mode === 'work' && timeLeft < 1500) || (mode === 'work' && !isRunning) }>Focus</button>}
          
                  
    </div>
    {isTodo && 
    <div className='task-card__side task-card__side--back'> 
      <button onClick={(e) => {e.stopPropagation(); onDelete(task.id)}} className='task-card__btn-back '><FaTrash className='task-card__icons task-card__icons--trash'/></button>
      <button onClick={(e) => {e.stopPropagation()}} className='task-card__btn-back ' ><FaEdit className='task-card__icons task-card__icons--edit'/></button>
    </div>
    }
  </div>
    
  )
}

export default TaskCard
