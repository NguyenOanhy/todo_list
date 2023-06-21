import React, { useState } from 'react';
import TaskForm from './TaskForm';

function TaskItem({ task, onDeleteTask, onCheckboxChange, onFormSubmit }) {
  const [showDetails, setShowDetails] = useState(false);
  const [showForm, setShowForm] = useState(false);

  function handleDeleteClick() {
    onDeleteTask(task.id);
  }

  function handleCheckboxChange() {
    onCheckboxChange(task.id);
  }

  function handleDetailsClick() {
    setShowDetails(!showDetails);
    setShowForm(false);
  }

  function handleUpdateClick(newTask) {
    setShowDetails(false);
    setShowForm(false);
    onFormSubmit(newTask);  
  }

  return (
    <li className='TaskItem'>
      <input type='checkbox' checked={task.isDone} onChange={handleCheckboxChange} />
      <div className='task-details'>
        <h3>{task.title}</h3>
        <button onClick={handleDetailsClick}>{showDetails ? 'Detail' : 'Detail'}</button>
        <button onClick={handleDeleteClick}>Remove</button>
        {showDetails && (
          <div>
            <TaskForm task={task} onFormSubmit={handleUpdateClick} />
          </div>
        )}
      </div>
      
    </li>
  );
}

export default TaskItem;