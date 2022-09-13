
import './App.css';
import TaskStatus from './Components/TaskStatus/TaskStatus';
import { useState } from 'react';

function App() {
  const[task,setTask]=useState([])
  useEffect(()=>{
    console.log("using effect")
  },[])
  return (
    <div className="App">
      <h2>Task management</h2>
      <main>
        <section>
          <TaskStatus
          task={task}
          addEmptyTask={addEmptyTask}
          addTask={addTask}
          deleteTask={deleteTask}
          moveTask={moveTask}
          status="Backlog"
          />
          <TaskStatus
          task={task}
          addEmptyTask={addEmptyTask}
          addTask={addTask}
          deleteTask={deleteTask}
          moveTask={moveTask}
          status="Progress"
          />
          <TaskStatus
          task={task}
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
