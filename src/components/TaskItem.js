import React, { useState } from 'react';

function TaskItem({ task, onDeleteTask, onCheckboxChange }) {
  const [isChecked, setIsChecked] = useState(false);

  function handleCheckboxChange() {
    setIsChecked((prevIsChecked) => !prevIsChecked);
    onCheckboxChange(task.id);
  }

  function handleDeleteTask() {
    onDeleteTask(task.id);
  }

  return (
    <li className={isChecked ? 'checked' : ''}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <div className="task-info">
        <h3>{task.title}</h3>
        {/* <p>{task.description}</p>
        <p>Due date: {task.dueDate}</p>
        <p>Priority: {task.priority}</p> */}
      </div>
      <button className="delete-btn" onClick={handleDeleteTask}>
        Delete
      </button>
    </li>
  );
}

export default TaskItem;