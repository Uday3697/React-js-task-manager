import React from 'react'
import { useState } from 'react'

const Task = (props) => {
    const {addTask,deleteTask,moveTask,task,urgency}=props;
    const[urgencyLevel,setUrgencyLevel]=useState(task,urgency)
    const[collapsed,setCollapsed]=useState(task.isCollapsed)
    const[formAction,setFormAction]=useState("");

    function setUrgency(event){
        setUrgencyLevel(event.target.attributes.urgency.value)
    }
    function handleSubmit(event){
        event.preventDefault();
        if(formAction==="save"){
            if(collapsed){
                setCollapsed(false)
            }else{
                let newTask={
                    id:task.id,
                    title:event.target.elements.title.value,
                    description:event.target.elements.description.value,
                    urgency:urgencyLevel,
                    status:task.status,isCollapsed:true,
                
                };
                addTask(newTask);
                setCollapsed(true)
            }

        }
        if(formAction==="delete"){
            deleteTask(task.id)
        }
    }
    function handleMoveLeft(){
        letnewStatus="";
        if(task.status==="In Progress"){
            newStatus="BackLog"
        }else if(task.status==="Done"){
            newStatus="In Progress"
        }
        if(newStatus!== ""){
            moveTask(task.id,newStatus);  
        }
        
    }
    function handleMoveRight(){
        letnewStatus="";
        if(task.status==="Backlog"){
            newStatus="In Progress"
        }else if(task.status==="Progress"){
            newStatus="Done"
        }
        if(newStatus!== ""){
            moveTask(task.id,newStatus);  
        }
        
    }
  return (
    <div className={`task ${collapsed ?"collapsedTask" : ""}`}>
        <button onClick={handleMoveLeft} className="button MoveTask">&#171;</button>
        <form onSubmit={handleSubmit} className={collapsed ? "collapsed" : "" }>
            <input type="text" className='title input'
                name='title' placeholder='Enter Title'
                disabled={collapsed}
                defaultValue={task.title}
            />
            <textarea 
                rows="2"
                className='description input'
                name='description'
                placeholder='Enter Description'
                defaultValue={task.description}
            />
            <div className="urgencyLabels">
                <label className={`low ${urgencyLevel==="low"? "selected" : " "}`}> 
                    <input urgency="low" 
                      onChange={setUrgency} 
                      type="radio" 
                      name="urgency"
                    />
                    Low
                </label>
                <label className={`medium ${urgencyLevel==="medium"? "selected" : " "}`}> 
                    <input urgency="medium" 
                      onChange={setUrgency} 
                      type="radio" 
                      name="urgency"
                    />
                    Medium
                </label>
                <label className={`high ${urgencyLevel==="high"? "selected" : " "}`}> 
                    <input urgency="high" 
                      onChange={setUrgency} 
                      type="radio" 
                      name="urgency"
                    />
                    High
                </label>
                <button onClick={()=>{
                    setFormAction("save")
                }} className="button">

                    {collapsed ? "Edit" :"Save"}
                </button>
                {collapsed && <button 
                    onClick={()=>{
                        setFormAction("delete")
                    }} className="button delete "
                >X</button> }
            </div>

        </form>

        <button onClick={handleMoveRight} className="button MoveTask">&#187;</button>



    </div>
  )
}

export default Task