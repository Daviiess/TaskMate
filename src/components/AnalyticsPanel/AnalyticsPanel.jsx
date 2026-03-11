import React from 'react';
import './AnalyticsPanel.scss';
import { FaCheck } from "react-icons/fa";
import Sessions from '../Sessions/sessions';
import { FaX } from "react-icons/fa6";

const AnalyticsPanel = ({tasks}) => {
  const taskCompletedNo = tasks.filter(task => task.status === 'done').length;
  console.log(taskCompletedNo)
  const totalTasks = tasks.filter(task => task.status === 'todo').length;
  const completionPercentage = totalTasks > 0 
  ? Math.round((taskCompletedNo / totalTasks) * 100) 
  : 0;
  return (
    <div className='analytics-panel'>
      <h2 className='analytics-panel__title'>Session Analytics</h2>
      <div className="analytics-panel__chart">
       <p className='chart-text'>
       <span className='chart-text-span'>{completionPercentage}%</span> 
       <span> of your goals reached</span>
        </p> 
      </div>
      <Sessions sessions_text={'Tasks completed'} sessions_no={taskCompletedNo} icon={taskCompletedNo > 0 ? <FaCheck/> : <FaX />}/>
      <Sessions sessions_text={'Remaining Tasks'} sessions_no={totalTasks} icon={totalTasks}/>
      <div className="analytics-panel__div session-journal">
      <span>Session Journal</span>
      <p className='session-journal__bg'>
        <textarea name="" id="" className='textarea'>
        </textarea>
      </p>
      </div>
  </div>
  )
}

export default AnalyticsPanel
