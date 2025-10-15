import React, { useState } from 'react';

// The styles are now loaded from the separate DashboardPage.css file via index.css

function DashboardPage() {
  const initialFeedItems = [
    { id: 1, sender: { name: 'Jane Doe', initials: 'JD' }, message: 'Huge thanks to John for helping out with the deployment last night. Lifesaver! 🙌', timestamp: '2 hours ago' },
    { id: 2, sender: { name: 'John Smith', initials: 'JS' }, message: 'Shout-out to the entire design team for the amazing new mockups. They look fantastic!', timestamp: '5 hours ago' },
    { id: 3, sender: { name: 'Emily White', initials: 'EW' }, message: 'Welcome to the team, Alex! So excited to have you on board.', timestamp: '1 day ago' }
  ];

  const initialLeaderboard = [
    { id: 1, name: 'Jane Doe', initials: 'JD', score: 125 },
    { id: 2, name: 'John Smith', initials: 'JS', score: 98 },
    { id: 3, name: 'Peter Jones', initials: 'PJ', score: 76 },
    { id: 4, name: 'Emily White', initials: 'EW', score: 64 },
  ];

  const [feedItems, setFeedItems] = useState(initialFeedItems);
  const [leaderboard] = useState(initialLeaderboard);
  const [newShoutout, setNewShoutout] = useState('');

  const handlePostShoutout = () => {
    if (newShoutout.trim() === '') return;
    const newPost = {
      id: Date.now(),
      sender: { name: 'Alex Ray', initials: 'AR' },
      message: newShoutout,
      timestamp: 'Just now',
    };
    setFeedItems([newPost, ...feedItems]);
    setNewShoutout('');
  };

  return (
    <>
      <header className="dashboard-header">
        <h1 className="header-title">BragBoard</h1>
        <div className="user-profile-avatar">AR</div>
      </header>

      <div className="dashboard-grid">
        <aside className="dashboard-sidebar">
          <nav className="sidebar-menu">
            <a href="#" className="sidebar-link bg-violet-100">
              <svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.125 1.125 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" /></svg>
              Home
            </a>
            <a href="#" className="sidebar-link">
              <svg className="sidebar-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
              Profile
            </a>
          </nav>
        </aside>

        <main className="main-feed">
          <div className="create-post-card">
            <textarea 
              className="create-post-input" 
              rows="3" 
              placeholder="Write a shout-out..."
              value={newShoutout}
              onChange={(e) => setNewShoutout(e.target.value)}
            ></textarea>
            <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem'}}>
              <button 
                className="auth-button" 
                style={{ width: 'auto', padding: '0.5rem 1.5rem' }}
                onClick={handlePostShoutout}
                disabled={!newShoutout.trim()}
              >
                Post
              </button>
            </div>
          </div>
          
          <div className="shoutout-feed">
            {feedItems.map((item) => (
              <div key={item.id} className="shoutout-card">
                <div className="card-header">
                  <div className="avatar">{item.sender.initials}</div>
                  <div>
                    <p className="sender-name">{item.sender.name}</p>
                    <p className="timestamp">{item.timestamp}</p>
                  </div>
                </div>
                <p className="card-body">{item.message}</p>
                <div className="card-footer">
                  <span className="footer-action">👍 Like</span>
                  <span className="footer-action">💬 Comment</span>
                </div>
              </div>
            ))}
          </div>
        </main>

        <aside className="right-sidebar">
          <div className="leaderboard-card">
            <h3 className="leaderboard-title">Leaderboard</h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
              {leaderboard.map((user, index) => (
                <div key={user.id} className="leaderboard-item">
                  <span className="leaderboard-rank">{index + 1}</span>
                  <div className="avatar" style={{width: '2.5rem', height: '2.5rem', marginRight: '0.75rem', fontSize: '1rem'}}>{user.initials}</div>
                  <span style={{fontWeight: 500, color: '#334155', flexGrow: 1}}>{user.name}</span>
                  <span style={{marginLeft: 'auto', fontWeight: 'bold', color: '#64748b'}}>{user.score}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

export default DashboardPage;