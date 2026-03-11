import React, { useEffect, useState, useContext } from 'react'
import AnalyticsPanel from './components/AnalyticsPanel/AnalyticsPanel'
import TaskBoard from './components/TaskBoard/TaskBoard'
import TimerPanel from './components/TimerPanel/TimerPanel'
import "@fontsource/inter/400.css";
  import { TaskMateContext } from './store/taskMate-context';
const App = () => {
  const [tasks , setTasks] = useState([])
  const [timeLeft , setTimeLeft ] = useState(0);
  const [isRunning , setIsRunning] = useState(false);
  const [mode , setMode] = useState("");
  const [duration , setDuration] = useState(1500);
  const taskCtx = useContext(TaskMateContext);
  useEffect(() => {
    let timer;
    if(isRunning){
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if(prev <= 0){
            handleTimerEnd();
            return 0;
          }
          return prev - 1;
        })
      },1000)
    }
    return () => clearInterval(timer); 
  } , [isRunning])

  function toggleTimer(){
    setIsRunning(prev => !prev);
  }
  function formatTime(){
    const mins = Math.floor(timeLeft / 60).toString().padStart(2 , '0');
    const secs = (timeLeft % 60).toString().padStart(2 , '0');
    return `${mins}:${secs}`;
  }
  function resetTimer(){
  setIsRunning(false);
  console.log('Timer reset')
  if(mode === ''){
    setTimeLeft(1500);
  }else if(mode === 'work'){
    setTimeLeft(1500)
  }
  else if(mode === 'long'){
    setTimeLeft(900);
  }else if(mode === 'short'){
    setTimeLeft(300);
  }
  }
  function switchModes(modes){
    setIsRunning(false);
    setMode(modes)
    let time = 0;
    if(modes === 'work'){
      time = 1500;
      setTimeLeft(time)
      setDuration(time)
    }else if(modes === 'long'){
      time = 900;
      setTimeLeft(time)
      setDuration(time)
    }else if(modes === 'short'){
      time = 300;
      setTimeLeft(time)
      setDuration(time)
    }
  }
  function handleTimerEnd(){
    setTasks(prevTasks => prevTasks.map((task) => 
      task.status === 'doing' ? {...task , status: 'done'} : task
    ))
     setIsRunning(false);
  if (mode === 'work') {
    setMode('short');
    setTimeLeft(300); 
    setDuration(300);
  } else {
    setMode('work');
    setTimeLeft(1500);
    setDuration(1500)
  }
  }

  function handleNewTask(text){
    setTasks(prevTasks => {
      const newTask = {
        id: Date.now(),
        text: text,
        status:'todo'
      }
      return[...prevTasks , newTask]
      
    })
  }
  function focusTask(id){
   setTasks( prevTasks => prevTasks.map(prevTask => {
    if(prevTask.id === id){
     return {...prevTask , status: 'doing'}
    }
      if(prevTask.status === 'doing'){
      return {...prevTask , status: 'todo'}
     }else return{...prevTask}
   }))
   
  }
  function handleDelete(id){
    setTasks(prevTasks => {
     return prevTasks.filter(task => task.id !== id)
    })
  }
  const ctxValue = {
    tasks:tasks,
    timeLeft,
    isRunning,
    mode:mode,
    duration,
    focusTask: focusTask,
    onDelete: handleDelete,
    onAddTask: handleNewTask,
    handleTimerEnd: handleTimerEnd,
    resetTimer: resetTimer,
    formatTime: formatTime,
    toggleTimer: toggleTimer,
    switchModes: switchModes
  }
  return (
     <TaskMateContext value={ctxValue}>
   <div className='task-mate-grid'>
    <TimerPanel />
     <TaskBoard />
   <AnalyticsPanel/> 
  </div>
   </TaskMateContext>
  )
}

export default App
