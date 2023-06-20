import React, { useState } from 'react';

function TaskForm({ onFormSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: new Date().toISOString().slice(0, 10),
    priority: 'normal',
  });

  function handleFormChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onFormSubmit(formData.title, formData.description, formData.dueDate, formData.priority);
    setFormData({
      title: formData.title,
      description: formData.description,
      dueDate: formData.dueDate,
      priority: formData.priority,
    });
  }

  return (
    <form onSubmit={handleSubmit} className='TaskForm'>
      <input
        type="text"
        id="title"
        name="title"
        placeholder='Add new task ...'
        value={formData.title}
        onChange={handleFormChange}
        required
      />
      <div>
        <div>Description</div>
        <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleFormChange}
        />
      </div>
      <div className='Date-Pri'>
        <div className='Date'>
            <label htmlFor="dueDate">Due date</label>
            <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleFormChange}
                required
                min={new Date().toISOString().slice(0, 10)}
            />
        </div>

        <div className='Priority'>
            <label htmlFor="priority">Priority</label>
            <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleFormChange}
            >
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
            </select>
        </div>
      </div>

      <button type="submit">Add</button>
    </form>
  );
}

export default TaskForm;