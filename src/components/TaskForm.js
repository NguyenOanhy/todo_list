import React, { useState, useEffect } from 'react';
import './TaskForm.css';

function TaskForm({ task, onFormSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: new Date().toISOString().slice(0, 10),
    priority: 'normal',
  });

  useEffect(() => {
    if (task) {
      setFormData(task);
    }
  }, [task]);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onFormSubmit(formData);
    setFormData({
      title: '',
      description: '',
      dueDate: new Date().toISOString().slice(0, 10),
      priority: 'normal',
    });
  }

  return (
    <form className='TaskForm' onSubmit={handleSubmit}>
      <div className='input-group'>
        <input
          type='text'
          id='title'
          name='title'
          value={formData.title}
          onChange={handleInputChange}
          placeholder='Add new task...'
          required
        />
      </div>
      <div className='input-group'>
        <label htmlFor='description'>Description</label>
        <textarea
          id='description'
          name='description'
          value={formData.description}
          onChange={handleInputChange}
        />
      </div>
      <div className='Date-Pri'>
        <div className='input-group dueDate'>
          <label htmlFor='dueDate'>Due Date</label>
          <input
            type='date'
            id='dueDate'
            name='dueDate'
            value={formData.dueDate}
            onChange={handleInputChange}
            min={new Date().toISOString().slice(0, 10)}
          />
        </div>
        <div className='input-group priority'>
          <label htmlFor='priority'>Priority</label>
          <select
            id='priority'
            name='priority'
            value={formData.priority}
            onChange={handleInputChange}
          >
            <option value='low'>Low</option>
            <option value='normal'>Normal</option>
            <option value='high'>High</option>
          </select>
        </div>
      </div>
      <button type='submit'>{task ? 'Update' : 'Add'}</button>
    </form>
  );
}

export default TaskForm;