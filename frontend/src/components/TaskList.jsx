import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TaskList({ tasks, onAccept, onForward, onComplete, onFail }) {
  const [sortBy, setSortBy] = useState('status');
  const [users, setUsers] = useState([]);
  const [forwardTo, setForwardTo] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const sortedTasks = [...tasks].sort((a, b) => a[sortBy].localeCompare(b[sortBy]));

  return (
    <div >
      <div className="mb-4 flex justify-end items-center mt-4 w-full">
        <label className="mr-2">Sort by:</label>
        <select onChange={(e) => setSortBy(e.target.value)} value={sortBy} className="border p-2 rounded">
          <option value="status">Status</option>
          <option value="inwardNo">Inward No</option>
          <option value="subject">Subject</option>
        </select>
      </div>
      <div className=' overflow-x-scroll'>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Inward No</th>
            <th className="border p-2">Subject</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Start Date</th>
            <th className="border p-2">End Date</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedTasks.map(task => (
            <tr key={task._id}>
              <td className="border p-2">{task.inwardNo}</td>
              <td className="border p-2">{task.subject}</td>
              <td className="border p-2">{task.description}</td>
              <td className="border p-2">{new Date(task.startDate).toLocaleDateString()}</td>
              <td className="border p-2">{new Date(task.endDate).toLocaleDateString()}</td>
              <td className="border p-2">{task.status}</td>
              <td className="border p-2">
                {task.status === 'pending' && onAccept && (
                  <button onClick={() => onAccept(task._id)} className="bg-green-500 text-white p-1 rounded mr-2 mb-2">Accept</button>
                )}
                {task.status === 'pending' && onForward && (
                  <>
                    <select
                      value={forwardTo}
                      onChange={(e) => setForwardTo(e.target.value)}
                      className="border p-1 rounded mr-2 mb-2"
                    >
                      <option value="">Select user</option>
                      {users.map(user => (
                        <option key={user._id} value={user._id}>{user.username}</option>
                      ))}
                    </select>
                    <button 
                      onClick={() => {
                        if (forwardTo) {
                          onForward(task._id, forwardTo);
                          setForwardTo('');
                        }
                      }} 
                      className="bg-blue-500 text-white p-1 rounded mr-2 mb-2"
                      disabled={!forwardTo}
                    >
                      Forward
                    </button>
                  </>
                )}
                {task.status === 'accepted' && onComplete && (
                  <button onClick={() => onComplete(task._id)} className="bg-blue-500 text-white p-1 rounded mr-1">Complete</button>
                )}
                {task.status === 'accepted' && onFail && (
                  <button onClick={() => onFail(task._id)} className="bg-red-500 text-white p-1 rounded">Fail</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default TaskList;