import React, { useRef , useState } from 'react'
import { CiCirclePlus } from "react-icons/ci";
import Modal from '../Modal/Modal';
import './TimerPanel.scss'
import TimerRing from '../TimerRing/TimerRing';
const TimerPanel = ({onAddTask , tasks , timeLeft , isRunning,mode ,resetTimer, formatTime,
   toggleTimer, switchModes, duration }) => {
  const modal = useRef();
  const [inputValue , setInputValue] = useState('');
  function handleChange(event){
    setInputValue(event.target.value);
    
  }
  function handleAddTask(){
     if(inputValue.trim() === ''){
      return;
    }
    onAddTask(inputValue);
    setInputValue('');
    modal.current.close();
   
  }
 
const activeTask = tasks.find(t => t.status === 'doing');
const fullText = activeTask ? activeTask.text : "No active task";
const displayShortText = fullText.length > 25  
? fullText.substring(0, 25) + "..." : fullText;

  return (
    <div className='timer-panel'>
      <h2 className='timer-panel__title'>Pomodoro Timer</h2>
      <div className='timer-panel__info'>Focusing ON: {displayShortText}</div>

     <TimerRing formatTime={formatTime} duration={duration} mode = {mode} timeLeft={timeLeft}/>
      <div className="timer-panel__action">
    <button className='timer-panel__button timer-panel__button-focus'
     onClick={() => switchModes('work')}
     disabled = {(isRunning && mode === 'work') || !activeTask}>{'Start'} Focus</button>
    <button className='timer-panel__button timer-panel__button-short'
     onClick={() => switchModes('short')} 
     disabled = {isRunning && mode === 'work'
      || activeTask }>Short Break</button>
    <button className='timer-panel__button timer-panel__button-long'
     onClick={() => switchModes('long')} 
     disabled = {isRunning && mode === 'work' 
     || activeTask}>Long Break</button>
   
      </div>
      
      <div className="timer-panel__add-task">
      <button className='plus-icon' 
      onClick={() => modal.current.open()}> Open Modal</button>
      <Modal ref = {modal} className = 'modal-overlay'>
        <h2>Enter your new task</h2>
          <input type="text"
           value={inputValue} 
          onChange={handleChange}
          onKeyDown={(e) => {if(e.key === "Enter"){
            e.preventDefault();
            handleAddTask();
          }}}
          />
          <button className='modal-task-btn' onClick={handleAddTask}>Add Task</button>
      </Modal>
         
      </div>
        {(tasks.find(task => task.status === 'doing')) 
        || (mode === 'short') || (mode === 'long') ? 
        <div className="timer-panel__controls">
        <button onClick={toggleTimer} disabled = {timeLeft <= 0}>
            {isRunning ? 'Pause' : 'Start'}
        </button>
        <button onClick={resetTimer} disabled = {timeLeft <= 0}>
            Reset
        </button>
    </div> : ''}
    </div>
  )
}

export default TimerPanel
