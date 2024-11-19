import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/user" element={<UserDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;