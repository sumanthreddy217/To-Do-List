import { useState } from "react";
import "./App.css";
import TaskItem from "./components/TaskItem.jsx";

function App() {
  const [newTask, setNewTask] = useState("");

  const [myTasks, setMyTasks] = useState(() => {
    const storedTasks = localStorage.getItem("myTasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const [completedTasks, setCompletedTasks] = useState(() => {
    const storedCompleted = localStorage.getItem("completedTasks");
    return storedCompleted ? JSON.parse(storedCompleted) : [];
  });

  function handleInput(e) {
    let newValue = e.target.value;
    setNewTask(newValue);
  }

  function addTask() {
    if (newTask.trim() === "") return;
    setMyTasks((prev) => {
      const updated = [...prev, newTask];
      console.log(myTasks);
      localStorage.setItem("myTasks", JSON.stringify(updated));
      return updated;
    });
    setNewTask("");
  }

  function deleteTask(taskName) {
    const updatedMyTasks = myTasks.filter((x) => x !== taskName);
    const updatedCompleted = completedTasks.filter((x) => x !== taskName);

    setMyTasks(updatedMyTasks);
    setCompletedTasks(updatedCompleted);

    localStorage.setItem("myTasks", JSON.stringify(updatedMyTasks));
    localStorage.setItem("completedTasks", JSON.stringify(updatedCompleted));
  }

  function completeTask(taskName) {
    const updatedMyTasks = myTasks.filter((x) => x !== taskName);
    const completedTask = myTasks.find((x) => x === taskName);
    const updatedCompleted = [...completedTasks, completedTask];

    setMyTasks(updatedMyTasks);
    setCompletedTasks(updatedCompleted);

    localStorage.setItem("myTasks", JSON.stringify(updatedMyTasks));
    localStorage.setItem("completedTasks", JSON.stringify(updatedCompleted));
  }

  return (
    <div className="main-body d-flex justify-content-center align-items-center">
      <div className="todo-list-mainDiv">
        <h3>My To-Do List</h3>

        <div>
          <div className="todo-task-input-div d-flex align-items-center justify-content-center mb-2 ">
            <div className="input-group input-group-lg w-75">
              <input type="text" className="form-control small-input fs-6" id="floatingInput" placeholder="To-Do Task" onChange={(e) => {handleInput(e);}} value={newTask} />
            </div>
            <button className="btn btn-primary" id="add-button" onClick={() => {addTask();}}>
              {" "} + {" "}
            </button>
          </div>


          <h6 className="cgreen"> {" "} Need To Completed: {" "} </h6>
          <ul className="tasks-list">
            {myTasks.map((task, index) => (
              <TaskItem
                taskName={task}
                key={index}
                deleteTask={deleteTask}
                completeTask={completeTask}
                isCompleted={false}
              />
            ))}
          </ul>

          <hr />
          
          <h6 className="cred"> {" "} Completed tasks: {" "} </h6>
          <ul className="tasks-list">
            {completedTasks.map((task, index) => (
              <TaskItem
                taskName={task}
                key={index}
                deleteTask={deleteTask}
                completeTask={completeTask}
                isCompleted={true}
              />
            ))}
          </ul>

          <div className="mobile_response">
            <h6 className="cgreen-2"> {" "} Need To Completed: {" "} </h6>
          <ul className="tasks-list-2">
            {myTasks.map((task, index) => (
              <TaskItem
                taskName={task}
                key={index}
                deleteTask={deleteTask}
                completeTask={completeTask}
                isCompleted={false}
              />
            ))}
          </ul>

          <hr />
          
          <h6 className="cred-2"> {" "} Completed tasks: {" "} </h6>
          <ul className="tasks-list-2">
            {completedTasks.map((task, index) => (
              <TaskItem
                taskName={task}
                key={index}
                deleteTask={deleteTask}
                completeTask={completeTask}
                isCompleted={true}
              />
            ))}
          </ul>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
