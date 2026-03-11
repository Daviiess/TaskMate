import React from 'react'
import './TaskBoard.scss';
import { CiSearch } from "react-icons/ci";
import TaskCard from '../TaskCard/TaskCard';
import EmptyTaskBoard from '../EmptyTaskBoard/EmptyTaskBoard';
const TaskBoard = ({tasks , focusTask , onDelete, mode, isRunning,timeLeft }) => { //Remember to remove the onAddTask
  
  return (
    <div className='task-board'>
      <div className="task-board__search">
        <input type="text" className='input-bar' placeholder='Search for your task'/>
        <CiSearch className = 'search-icon'/>
      </div>
      <div className="task-board__columns">
      <div className="task-column">
            <h2 className='column-header'>To-Do</h2>
            <div className="column-list">
              {tasks.filter(task => task.status === 'todo').length <= 0 && <EmptyTaskBoard text1 = 'No current added task'/>} 
              {tasks.filter(task => task.status === 'todo').map((task) => <TaskCard className={'todo-card'} task = {task}  focusTask = {focusTask} key={task.id} onDelete = {onDelete} mode = {mode} isRunning = {isRunning} timeLeft={timeLeft}/> )}    

            </div>  
        </div>

      <div className="task-column">
            <h2 className='column-header'>Doing</h2>
            <div className="column-list">
                  {tasks.filter(task => task.status === 'doing').length <= 0 && <EmptyTaskBoard text1 = 'No task in progress'/>} 
                 { tasks.filter(task => task.status === 'doing').map((task) => <TaskCard className={'doing-card'} task = {task}  focusTask = {focusTask} key={task.id}/> )}

            </div>  
        </div>

        <div className="task-column">
            <h2 className='column-header'>Done</h2>
            <div className="column-list">
                  {tasks.filter(task => task.status === 'done').length <= 0 && <EmptyTaskBoard text1 = 'No completed task'/>} 
                 {tasks.filter(task => task.status === 'done').map((task) => <TaskCard className={'done-card'} task = {task}  focusTask = {focusTask} key={task.id}/> )}                                   
          </div>  
        </div>
      
       
      </div>
    </div>
  )
}

export default TaskBoard
