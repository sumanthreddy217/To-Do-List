import React from "react";

function TaskItem({ taskName, deleteTask, completeTask, isCompleted }) {
  return (
    <li className="task d-flex justify-content-between">
      <span className={isCompleted ? "completed-task" : ""}> 
        {taskName}
      </span>
      <div className="task-buttons">
        {!isCompleted && (
          <button className="btn btn-sm btn-success" onClick={() => completeTask(taskName)}>
            Complete
          </button>
        )}
        {isCompleted && (
          <button className="btn btn-sm btn-danger" onClick={() => deleteTask(taskName)}>
            Delete
          </button>
        )}
      </div>
    </li>
  );
}

export default TaskItem;
