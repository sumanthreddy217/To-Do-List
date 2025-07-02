import { useState } from 'react'
import './App.css'
import TaskItem from './components/taskItem'

function App() {
  const [newTask,setNewTask]=useState("");

  const [myTasks,setMyTasks]=useState(()=>{
    const storedTasks = localStorage.getItem("myTasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const [completedTasks, setCompletedTasks] = useState(() => {
    const storedCompleted = localStorage.getItem("completedTasks");
    return storedCompleted ? JSON.parse(storedCompleted) : [];
  });

  function handleInput(e){
    let newValue = e.target.value;
    setNewTask(newValue);
  }

  function addTask() {
    if (newTask.trim() === "") return;
    setMyTasks(prev=>{
      const updated = [...prev, newTask];
      console.log(myTasks)
      localStorage.setItem("myTasks",JSON.stringify(updated));
      return updated;
    });
    setNewTask("");
  }
  
  function deleteTask(taskName) {
    const updatedMyTasks = myTasks.filter(x => x !== taskName);
    const updatedCompleted = completedTasks.filter(x => x !== taskName);

    setMyTasks(updatedMyTasks);
    setCompletedTasks(updatedCompleted);

    localStorage.setItem("myTasks", JSON.stringify(updatedMyTasks));
    localStorage.setItem("completedTasks", JSON.stringify(updatedCompleted));
  }

  function completeTask(taskName) {
    const updatedMyTasks = myTasks.filter(x => x !== taskName);
    const completedTask = myTasks.find(x => x === taskName);
    const updatedCompleted = [...completedTasks, completedTask];

    setMyTasks(updatedMyTasks);
    setCompletedTasks(updatedCompleted);

    localStorage.setItem("myTasks", JSON.stringify(updatedMyTasks));
    localStorage.setItem("completedTasks", JSON.stringify(updatedCompleted));
  }


  return (
    <div className='main-body d-flex justify-content-center align-items-center'>
      <div className='todo-list-mainDiv'>
        <h3>My To-Do List</h3>

        <div>
          <div className='todo-task-input-div d-flex align-items-center justify-content-center'>
            <div className="form-floating w-75">
              <input type="text" className="form-control small-input" id="floatingInput" placeholder="To-Do Task" onChange={(e)=>{
                handleInput(e)
              }} value={newTask}/>
              <label htmlFor="floatingInput">To-Do Task</label>
            </div>
            <button className='btn btn-primary' id='add-button' onClick={()=>{addTask()}}> + </button>
          </div>
          <h6> <u>Need To Completed</u> </h6>
          <ul className='tasks-list'>
            {
              myTasks.map((task, index)=>
                <TaskItem taskName={task} key={index} deleteTask={deleteTask} completeTask={completeTask} isCompleted={false}/>
              )
            }
          </ul>
          <hr />
          <h6> <u>Completed tasks</u> </h6>
          <ul className='tasks-list'>
            {
              completedTasks.map((task, index)=>
                <TaskItem taskName={task} key={index} deleteTask={deleteTask} completeTask={completeTask} isCompleted={true}/>
              )
            }
          </ul>
        </div>
      
      </div>
    </div>
  )
}

export default App
