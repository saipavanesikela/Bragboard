import React from 'react';

function HomePage() {
  // You can replace this with your styled homepage code later
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-slate-700">
        BragBoard Home
      </h1>
      <p className="mt-4 text-slate-600">
        You are successfully logged in!
      </p>
    </div>
  );
}

export default HomePage; // <-- This is the line that fixes the error