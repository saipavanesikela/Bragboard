import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { loginUser } from '../api/apiService.js';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1. Try to log in by calling the backend API
      const data = await loginUser(email, password);

      // 2. If successful, save the token from the backend
      login(data.access_token);

      // 3. Give a "correct details" pop-up ✅
      alert('Login Successful! Welcome back.');

      // 4. Redirect to the homepage
      navigate('/');

    } catch (err) {
      // 5. If login fails, give a "wrong details" pop-up ❌
      alert('Login Failed: Incorrect email or password.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="w-full p-2 border rounded" 
            />
          </div>
          <div>
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="w-full p-2 border rounded" 
            />
          </div>
          <button type="submit" className="w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700">
            Sign In
          </button>
        </form>
        <p className="mt-4 text-center">
          New user? <Link to="/register" className="text-blue-600">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;