import React, { useState } from "react";
import "../styles/Dashboard.css";
import {
  BarChart3,
  MessageCircle,
  LogOut,
  Settings,
  User,
  PlusSquare,
} from "lucide-react";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("feed");

  const shoutouts = [
    {
      id: 1,
      sender: "Pawan",
      message: "Kudos to Priya for handling the release so efficiently!",
      recipients: ["Priya"],
      reactions: { like: 10, clap: 8, star: 5 },
      comments: 2,
    },
    {
      id: 2,
      sender: "Riya",
      message: "Amazing teamwork by the DevOps crew on the new deployment!",
      recipients: ["DevOps Team"],
      reactions: { like: 6, clap: 12, star: 3 },
      comments: 4,
    },
  ];

  const leaderboard = [
    { rank: 1, name: "Priya", sent: 15, mostTagged: "Rohan" },
    { rank: 2, name: "Rohan", sent: 12, mostTagged: "Meena" },
    { rank: 3, name: "Pawan", sent: 10, mostTagged: "Priya" },
  ];

  const NavItem = ({ label, value, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(value)}
      className={`nav-item ${activeTab === value ? "active" : ""}`}
    >
      <Icon size={18} /> {label}
    </button>
  );

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div>
          <h2>🏆 BragBoard</h2>
          <nav>
            <NavItem label="Feed" value="feed" icon={MessageCircle} />
            <NavItem label="Leaderboard" value="leaderboard" icon={BarChart3} />
            <NavItem label="Departments" value="departments" icon={User} />
            <NavItem label="Admin Insights" value="admin" icon={BarChart3} />
            <NavItem label="Create Shout-out" value="create" icon={PlusSquare} />
          </nav>
        </div>
        <div className="sidebar-bottom">
          <NavItem label="My Shout-outs" value="myshoutouts" icon={MessageCircle} />
          <NavItem label="Profile" value="profile" icon={User} />
          <NavItem label="Settings" value="settings" icon={Settings} />
          <NavItem label="Logout" value="logout" icon={LogOut} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {activeTab === "feed" && (
          <>
            <h1>Recent Shout-outs 🎉</h1>
            <div className="feed-grid">
              {shoutouts.map((post) => (
                <div key={post.id} className="card">
                  <div className="card-header">
                    <div className="avatar">
                      <span>{post.sender[0]}</span>
                    </div>
                    <div>
                      <h3>{post.sender}</h3>
                      <p>Appreciating {post.recipients.join(", ")}</p>
                    </div>
                  </div>
                  <div className="card-content">
                    <p>{post.message}</p>
                    <div className="reactions">
                      <span>👍 {post.reactions.like}</span>
                      <span>👏 {post.reactions.clap}</span>
                      <span>⭐ {post.reactions.star}</span>
                      <span className="comments">
                        <MessageCircle size={16} /> {post.comments}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "leaderboard" && (
          <div className="card">
            <h1>Top Contributors 🏅</h1>
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Employee</th>
                  <th>Shout-outs Sent</th>
                  <th>Most Tagged</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((user) => (
                  <tr key={user.rank}>
                    <td>🥇 {user.rank}</td>
                    <td>{user.name}</td>
                    <td>{user.sent}</td>
                    <td>{user.mostTagged}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "departments" && (
          <>
            <h1>Department Highlights 💼</h1>
            <div className="departments-grid">
              {[
                { dept: "Engineering", count: 25, emoji: "🚀" },
                { dept: "Marketing", count: 18, emoji: "💡" },
                { dept: "HR", count: 10, emoji: "❤️" },
              ].map((d) => (
                <div key={d.dept} className="card text-center">
                  <h3>{d.emoji} {d.dept}</h3>
                  <p>{d.count} shout-outs this month</p>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "admin" && (
          <div className="card">
            <h1>Admin Insights 🔍</h1>
            <ul>
              <li>Total Posts: 320</li>
              <li>Reported Shout-outs: 4 (Pending Review)</li>
              <li>Top 3 Tagged Users: Priya, Rohan, Neha</li>
            </ul>
            <div className="button-group">
              <button className="button">Download CSV</button>
              <button className="button button-outline">View Logs</button>
            </div>
          </div>
        )}

        <footer>
          <p>“Recognition is the spark that fuels excellence.” ✨</p>
          <p>Keep appreciating. Keep inspiring. 💪</p>
        </footer>
      </main>
    </div>
  );
}
