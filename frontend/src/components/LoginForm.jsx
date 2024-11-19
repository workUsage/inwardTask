import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logoImage from '../assets/img_magnet_logo_11_1.png'

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userType', response.data.userType);
      navigate(response.data.userType === 'admin' ? '/admin' : '/user');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-12 pt-6 pb-8 mb-4 md:w-2/5">
      <div className='w-2/5  mx-auto'>
      <img src={logoImage} alt="logo" srcSet="" className='' />
      </div>
        <h2 className="text-2xl mb-4 text-center font-semibold">Login</h2>
        <hr className='my-2' />
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
        <div className="mb-6">
            <label htmlFor="password" className='font-semibold'>Enter Password</label>
          <input
          id='password'
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
        <hr className='my-5'/>
        <p className='text-center'>Haven't Account <a href="/register" className='text-blue-800 font-semibold'>register</a></p>
        
      </form>
    </div>
  );
}

export default LoginForm;