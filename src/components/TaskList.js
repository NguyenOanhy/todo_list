import React from 'react';
import TaskItem from './TaskItem';
import './styles/TaskList.css'

const TaskList = ({ tasks, onDeleteTask, onCheckboxChange, onFormSubmit }) => {
  return (
    <ul className='TaskList'>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDeleteTask={onDeleteTask}
          onCheckboxChange={onCheckboxChange}
          onFormSubmit={onFormSubmit}
        />
      ))}
    </ul>
  );
}

export default TaskList;