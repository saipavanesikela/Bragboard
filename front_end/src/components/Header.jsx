import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-violet-600">
          BragBoard ✨
        </Link>
        <div>
          <Link to="/" className="text-slate-600 hover:text-violet-600 font-medium px-4 py-2">
            Feed
          </Link>
          {/* This will eventually have real logout logic */}
          <Link to="/login" className="text-slate-600 hover:text-violet-600 font-medium px-4 py-2">
            Logout
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header; // This line fixes the error