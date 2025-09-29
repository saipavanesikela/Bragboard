import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Creating account for:\nName: ${name}\nEmail: ${email}`);
    console.log({ name, email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-800">Create an Account</h1>
          <p className="mt-2 text-slate-500">Get started with BragBoard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Full Name" 
            />
          </div>
          <div>
            <input
              id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Email address" 
            />
          </div>
          <div>
            <input
              id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 font-bold text-white bg-violet-600 rounded-lg hover:bg-violet-700"
          >
            Create Account
          </button>
        </form>
        <div className="text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-violet-600 hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;