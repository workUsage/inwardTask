import React, { useState } from 'react';
import axios from 'axios';

function TaskForm({ users, onTaskCreated }) {
  const [task, setTask] = useState({
    inwardNo: '',
    subject: '',
    description: '',
    startDate: '',
    endDate: '',
    assignedTo: ''
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/tasks', task, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      onTaskCreated();
      setTask({
        inwardNo: '',
        subject: '',
        description: '',
        startDate: '',
        endDate: '',
        assignedTo: ''
      });
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 md:px-5">
      <div className="grid grid-cols-2 gap-4">
        <div className='w-full '>
        <label htmlFor="inWardNo" className='font-semibold'>Inward No</label>
        <input
        id='inWardNo'
          type="text"
          name="inwardNo"
          value={task.inwardNo}
          onChange={handleChange}
          placeholder="Inward No"
          className="border p-2 rounded w-full"
          required
        />
        </div>
        <div>
        <label htmlFor="subject" className='font-semibold'>Subject</label>
        <input
        id='subject'
          type="text"
          name="subject"
          value={task.subject}
          onChange={handleChange}
          placeholder="Subject"
          className="border p-2 rounded w-full"
          required
        />
        </div>
        <div className='col-span-2'>
        <label htmlFor="description" className='font-semibold'>Description</label>
        <textarea
        id='description'
          name="description"
          value={task.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 rounded w-full"
          required
        />
        </div>
        <div>
        <label htmlFor="startDate" className='font-semibold'>Start Date</label>
        <input
          type="date"
          id='startDate'
          name="startDate"
          value={task.startDate}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        
        </div>
        <div>
        <label htmlFor="endDate" className='font-semibold'>End Date</label>
        <input
        id='endDate'
          type="date"
          name="endDate"
          value={task.endDate}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        </div>
        <div className='col-span-2'>
        <label htmlFor="assignTo" className='font-semibold'>Assign To</label>
        <select
        id='assignTo'
          name="assignedTo"
          value={task.assignedTo}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        >
          <option value="">Assign to</option>
          {users.map(user => (
            <option key={user._id} value={user._id}>{user.username}</option>
          ))}
        </select>
        </div>
      </div>
      <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white p-2 rounded font-bold">Create Inward</button>
    </form>
  );
}

export default TaskForm;