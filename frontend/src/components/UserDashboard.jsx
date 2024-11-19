import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './TaskList';

function UserDashboard() {
  const [tasks, setTasks] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    fetchTasks();
    fetchUsername();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks/user', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const fetchUsername = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUsername(response.data.username);
    } catch (error) {
      console.error('Error fetching username:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    window.location.href = '/';
  };

  const handleTaskAction = async (taskId, action, forwardTo = null) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${taskId}/${action}`, 
        { forwardTo },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      fetchTasks();
    } catch (error) {
      console.error(`Error ${action} task:`, error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">User Dashboard</h1>
      <hr className='mb-2'/>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-4 float-end"
      >
        Logout
      </button>
      <TaskList 
        tasks={tasks} 
        onAccept={(id) => handleTaskAction(id, 'accept')}
        onForward={(id, forwardTo) => handleTaskAction(id, 'forward', forwardTo)}
        onComplete={(id) => handleTaskAction(id, 'complete')}
        onFail={(id) => handleTaskAction(id, 'fail')}
      />
    </div>
  );
}

export default UserDashboard;