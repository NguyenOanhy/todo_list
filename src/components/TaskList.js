import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onDeleteTask, onCheckboxChange }) {
  function handleDeleteTask(taskId) {
    onDeleteTask(taskId);
  }

  function handleCheckboxChange(taskId) {
    onCheckboxChange(taskId);
  }

  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDeleteTask={handleDeleteTask}
          onCheckboxChange={handleCheckboxChange}
        />
      ))}
    </ul>
  );
}

export default TaskList;