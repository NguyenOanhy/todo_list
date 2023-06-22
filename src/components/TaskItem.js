import React, { useState } from 'react';
import TaskForm from './TaskForm';
import './styles/TaskItem.css';

const TaskItem = ({ task, onDeleteTask, onCheckboxChange, onFormSubmit }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleDeleteClick = () => {
    onDeleteTask(task.id);
  }

  const handleCheckboxChange = () => {
    onCheckboxChange(task.id);
  }

  const handleDetailsClick = () => {
    setShowDetails(!showDetails);
    setShowForm(false);
  }

  const handleUpdateClick = (newTask) =>  {
    setShowDetails(false);
    setShowForm(false);
    onFormSubmit(newTask);  
  }

  return (
    <li className='TaskItem'>
      <div className='task-details'>
        <div className='task-title'>
          <div className='task-check'>
            <input type='checkbox' checked={task.isDone} onChange={handleCheckboxChange} />
            <div className='title'>{task.title}</div>
          </div>
          <div className='task-button'>
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