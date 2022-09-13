
import './App.css';
import TaskStatus from './Components/TaskStatus/TaskStatus';
import { useState,useEffect } from 'react';

function App() {
  const[task,setTasks]=useState([])
  useEffect(()=>{
    LoadTaskFromLocalStorage();
  },[])
  function addEmptyTask(status){
    const lastTask=tasks[tasks.length-1];
    let newTaskId=1;
    if(lastTask!==undefined){
      newTaskId=lastTaskId+1
    }
    setTasks((tasks)=>[
      ...tasks,
      {
        id:newTaskId,
        title:"",
        description: "",
        urgency:"",
        status:status,
      }
    ])
  }
  function addTask(taskToAdd){
    let filteredTasks=tasks.filter((tasks)=>{
      return task.id !==taskToAdd.id;
    })
    let newTaskList=[...filteredTasks,taskToAdd];
    setTasks(newTaskList);
    saveTaskToLocalStorage(newTaskList);
  }
  function deleteTask(taskId){
    let filteredTasks=tasks.filter((task)=>{
      return task.id !==taskId;
    })
    setTasks(filteredTasks);
    saveTaskToLocalStorage(filteredTasks)
  }
  function moveTask(id,newStatus){
    let task=tasks.filter((task)=>{
      return task.id===id
    })
    let filteredTasks=tasks.filter((task)=>{
      return task.id!==id
    })
    task.status=newStatus;
    let newTaskList=[...filteredTasks,task];
    setTasks(newTaskList);
    saveTaskToLocalStorage(newTaskList)
  }
  function saveTaskToLocalStorage(task){
    localStorage.setItem("tasks",JSON.stringify(tasks))
  }
  function LoadTaskFromLocalStorage(){
    let loadedTasks=localStorage.getItem("tasks");
    let tasks=JSON.parse(loadedTasks);
    if(tasks){
      setTasks(tasks)
    }
  }
  return (
    <div className="App">
      <h2>Task management</h2>
      <main>
        <section>
          <TaskStatus
          tasks={task}
          addEmptyTask={addEmptyTask}
          addTask={addTask}
          deleteTask={deleteTask}
          moveTask={moveTask}
          status="Backlog"
          />
          <TaskStatus
          tasks={task}
          addEmptyTask={addEmptyTask}
          addTask={addTask}
          deleteTask={deleteTask}
          moveTask={moveTask}
          status="Progress"
          /> 
          <TaskStatus
          tasks={task}
          addEmptyTask={addEmptyTask}
          addTask={addTask}
          deleteTask={deleteTask}
          moveTask={moveTask}
          status="done"
          />

        </section>
      </main>
    </div>
  );
}

export default App;
