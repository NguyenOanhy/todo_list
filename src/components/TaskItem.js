import React, { useState } from 'react';
import TaskForm from './TaskForm';
import './styles/TaskItem.css';

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
      <div className='task-details'>
        <div className='task-title'>
          <div>
            <input type='checkbox' checked={task.isDone} onChange={handleCheckboxChange} />
            {task.title}
          </div>
          <div>
            <button onClick={handleDetailsClick} className='detail'>{showDetails ? 'Detail' : 'Detail' }</button>
            <button onClick={handleDeleteClick} className='remove'>Remove</button>
          </div>
        </div>
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