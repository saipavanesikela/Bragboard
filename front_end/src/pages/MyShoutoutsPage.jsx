import React, { useState, useEffect } from 'react';
import { getMyShoutouts } from '../api/apiService.js';
import ShoutoutCard from '../components/shoutout/ShoutoutCard.jsx';

function MyShoutoutsPage() {
  const [shoutouts, setShoutouts] = useState([]);
  useEffect(() => {
    getMyShoutouts().then(setShoutouts).catch(console.error);
  }, []);

  return (
    <main className="main-content">
      <h2 className="text-3xl font-bold text-slate-800 mb-6">My Sent Shout-outs</h2>
      <div className="space-y-6">
        {shoutouts.length > 0 ? (
          shoutouts.map((item) => (
            <ShoutoutCard key={item.id} shoutout={item} onUpdate={() => getMyShoutouts().then(setShoutouts)} />
          ))
        ) : (
          <div className="shoutout-card"><p>You haven't sent any shout-outs yet.</p></div>
        )}
      </div>
    </main>
  );
}
export default MyShoutoutsPage;