import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logoImage from '../assets/img_magnet_logo_11_1.png'

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('table');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', { username, password, userType });
      // Redirect to login page after successful registration
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 md:w-2/5">
      <div className='w-2/5  mx-auto'>
      <img src={logoImage} alt="logo" srcSet="" className='' />
      </div>
        <h2 className="text-2xl mb-4 text-center font-semibold">Register</h2>
        <div className="mb-4">
        <label htmlFor="userName" className='font-semibold'>Enter Username</label>
          <input
          id='userName'
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
        <label htmlFor="createPassword" className='font-semibold'>Create Password</label>
          <input
          id='createPassword'
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
        <label htmlFor="role" className='font-semibold'>Role</label>
          <select
          id='role'
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="table">Table</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register
          </button>
        </div>
        <hr className='my-5'/>
        <p className='text-center'>Have Account <a href="/" className='text-blue-800 font-semibold'>Login</a></p>
      </form>
    </div>
  );
}

export default RegisterForm;