import React, { useState, useEffect } from 'react';
import { Header, TaskForm, TaskList } from './components';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  function handleFormSubmit(formData) {
    const newTask = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      dueDate: formData.dueDate,
      priority: formData.priority,
      isDone: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  }

  function handleDeleteTask(taskId) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }

  function handleCheckboxChange(taskId) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isDone: !task.isDone } : task
      )
    );
  }

  function handleBulkDelete() {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.isDone));
  }

  return (
    <div className='container'>
      <div className='left'>
        <Header title='New Task'/>
        <div className="form-container">
            <TaskForm onFormSubmit={handleFormSubmit} />
        </div>
      </div>
      <div className='right'>
        <Header title='Todo List'/>
        <div className="list-container">
          <TaskList
            tasks={tasks}
            onDeleteTask={handleDeleteTask}
            onCheckboxChange={handleCheckboxChange}
          />
          <div className="bulk-actions">
            <button onClick={handleBulkDelete}>Remove selected tasks</button>
            <button disabled>Mark selected tasks as done</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;