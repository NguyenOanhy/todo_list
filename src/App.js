import React, { useState, useEffect } from 'react';
import { Header, TaskForm, TaskList } from './components';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    } else {
      setTasks([]);
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
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
  const taskIndex = tasks.findIndex(task => task.id === formData.id);
  if (taskIndex === -1) {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  } else {
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = newTask;
    setTasks(updatedTasks);
  }
}

  // function handleDeleteTask(taskId) {
  //   setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  //   setSelectedTasks(selectedTasks.filter(id => id !== taskId));
  // }
  function handleDeleteTask(taskId) {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    setSelectedTasks(selectedTasks.filter(id => id !== taskId));
  
    try {
      const storedTasks = JSON.parse(localStorage.getItem('tasks'));
      if (storedTasks) {
        const updatedTasks = storedTasks.filter(task => task.id !== taskId);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      }
    } catch (error) {
      console.error('Error deleting task from local storage:', error);
    }
  }

  function handleCheckboxChange(taskId) {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    const task = tasks[taskIndex];
    const newTasks = [...tasks];
    newTasks[taskIndex] = { ...task, isDone: !task.isDone };
    setTasks(newTasks);

    const selectedTaskIndex = selectedTasks.indexOf(taskId);
    if (selectedTaskIndex === -1) {
      setSelectedTasks([...selectedTasks, taskId]);
    } else {
      setSelectedTasks(selectedTasks.filter(id => id !== taskId));
    }
  }
  function handleUpdateTask(newTask) {
    const updatedTasks = tasks.map((task) =>
      task.id === newTask.id ? newTask : task
    );
    setTasks(updatedTasks);
  }

  function handleBulkDelete() {
    const newTasks = tasks.filter(task => !selectedTasks.includes(task.id));
    setTasks(newTasks);
    setSelectedTasks([]);
  }

  function handleSearch(event) {
    setSearchTerm(event.target.value);
  }

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  return (
    <div className='container'>
      <div className='left'>
        <Header title='New Task'/>
        <div className="form-container">
            <TaskForm onFormSubmit={handleFormSubmit} />
        </div>
      </div>
      <div className='right'>
        <Header title='To Do List'/>
        <div className="list-container">
          <div>
            <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearch} className="search-container"/>
            <TaskList
              tasks={filteredTasks}
              onDeleteTask={handleDeleteTask}
              onCheckboxChange={handleCheckboxChange}
              onFormSubmit={handleUpdateTask}
            />
          </div>
          {selectedTasks.length > 0 && (
            <div className="bulk-actions">
              <div>Bulk Action:</div>
              <div>
                <button className='done'>Done</button>
                <button onClick={handleBulkDelete} className='remove'>Remove</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;