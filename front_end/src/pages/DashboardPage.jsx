import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Avatar, AvatarFallback } from '../components/ui/Avatar';
import { Tabs, TabsContent } from '../components/ui/Tabs';
import { BarChart3, MessageCircle, LogOut, Settings, User, PlusSquare } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

// Import API functions
import { 
  getShoutouts, 
  getLeaderboard, 
  getDepartmentHighlights, 
  getAdminInsights 
} from '../api/apiService';

// --- 1. IMPORT YOUR REAL MODAL ---
import CreateShoutoutModal from '../components/shoutout/CreateShoutoutModal.jsx';
// ---------------------------------


export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('feed');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // --- Data States ---
  const [loading, setLoading] = useState(true);
  const [shoutouts, setShoutouts] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [insights, setInsights] = useState(null);
  
  // --- 2. Add state to refresh feed ---
  const [refreshFeed, setRefreshFeed] = useState(false);

  const { logout } = useAuth();
  const navigate = useNavigate();

  // --- Data Fetching Effect ---
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        if (activeTab === 'feed') {
          const res = await getShoutouts();
          setShoutouts(res.data);
          setRefreshFeed(false); // Reset refresh trigger
        } else if (activeTab === 'leaderboard') {
          const res = await getLeaderboard();
          setLeaderboard(res.data);
        } else if (activeTab === 'departments') {
          const res = await getDepartmentHighlights();
          setDepartments(res.data);
        } else if (activeTab === 'admin') {
          const res = await getAdminInsights();
          setInsights(res.data);
        }
      } catch (error) {
        console.error(`Failed to load data for tab ${activeTab}:`, error);
      } finally {
        setLoading(false);
      }
    };

    // 3. Trigger data load on activeTab OR refreshFeed change
    if (['feed', 'leaderboard', 'departments', 'admin'].includes(activeTab) || refreshFeed) {
      loadData();
    } else {
      setLoading(false);
    }

    if (activeTab === 'create') {
      setShowCreateModal(true);
      setActiveTab('feed'); // Reset tab to feed after opening modal
    }

  }, [activeTab, refreshFeed]); // <-- 4. Add refreshFeed to dependency array

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  // --- 5. Add handler to refresh feed after creation ---
  const handleShoutoutCreated = () => {
    setShowCreateModal(false); // Close the modal
    setActiveTab('feed'); // Switch to the feed
    setRefreshFeed(true); // Trigger a refresh
  };

  // --- Navigation Item Component ---
  const NavItem = ({ label, value, icon: Icon, onClick }) => (
    <button
      onClick={onClick || (() => setActiveTab(value))}
      className={`flex items-center gap-2 p-3 rounded-lg w-full text-left transition ${
        activeTab === value ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-indigo-100'
      }`}
    >
      <Icon size={18} /> {label}
    </button>
  );

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-md p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-indigo-600 mb-6">🏆 BragBoard</h2>
          <nav className="space-y-2">
            <NavItem label="Feed" value="feed" icon={MessageCircle} />
            <NavItem label="Leaderboard" value="leaderboard" icon={BarChart3} />
            <NavItem label="Departments" value="departments" icon={User} />
            <NavItem label="Admin Insights" value="admin" icon={BarChart3} />
            <NavItem label="Create Shout-out" value="create" icon={PlusSquare} />
          </nav>
        </div>
        <div className="border-t pt-4 space-y-2">
          <NavItem label="My Shout-outs" value="myshoutouts" icon={MessageCircle} />
          <NavItem label="Profile" value="profile" icon={User} />
          <NavItem label="Settings" value="settings" icon={Settings} />
          <NavItem label="Logout" value="logout" icon={LogOut} onClick={handleLogout} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Tabs value={activeTab}>
            {/* FEED TAB */}
            <TabsContent value="feed">
              <h1 className="text-2xl font-bold mb-4">Recent Shout-outs 🎉</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {shoutouts.map((post) => (
                  <Card key={post.id} className="shadow-md hover:shadow-lg transition">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>{post.sender.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{post.sender.name}</h3>
                          <p className="text-sm text-gray-500">
                            Appreciating {post.recipients.map(r => r.name).join(', ')}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-3">{post.message}</p>
                      <div className="flex items-center space-x-4 text-gray-600">
                        <span>👍 {post.reactions.like || 0}</span>
                        <span>👏 {post.reactions.clap || 0}</span>
                        <span>⭐ {post.reactions.star || 0}</span>
                        <span className="ml-auto flex items-center space-x-1">
                          <MessageCircle size={16} /> <span>{post.comment_count || 0}</span>
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* LEADERBOARD TAB */}
            <TabsContent value="leaderboard">
              <h1 className="text-2xl font-bold mb-4">Top Contributors 🏅</h1>
              <Card className="p-4 shadow-md overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-indigo-100 text-left">
                      <th className="p-2">Rank</th>
                      <th className="p-2">Employee</th>
                      <th className="p-2">Shout-outs Sent</th>
                      <th className="p-2">Shout-outs Received</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((user) => (
                      <tr key={user.rank} className="border-b hover:bg-gray-50">
                        <td className="p-2 font-medium">{user.rank}</td>
                        <td className="p-2 font-medium">{user.name}</td>
                        <td className="p-2">{user.sent}</td>
                        <td className="p-2">{user.received}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </TabsContent>

            {/* DEPARTMENTS TAB */}
            <TabsContent value="departments">
              <h1 className="text-2xl font-bold mb-4">Department Highlights 💼</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {departments.map((d) => (
                  <Card key={d.department} className="p-4 text-center">
                    <h3 className="text-xl font-bold mb-2">🚀 {d.department}</h3>
                    <p className="text-gray-600">{d.count} shout-outs this month</p>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* ADMIN TAB */}
            <TabsContent value="admin">
              <h1 className="text-2xl font-bold mb-4">Admin Insights 🔍</h1>
              {insights ? (
                <Card className="p-4 shadow-md">
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Total Posts: {insights.total_posts}</li>
                    <li>Total Users: {insights.total_users}</li>
                    <li>Top 3 Tagged Users: {insights.top_tagged_users.join(', ')}</li>
                  </ul>
                  <div className="flex space-x-3 mt-4">
                    <Button>Download CSV</Button>
                    <Button variant="outline">View Activity Logs</Button>
                  </div>
                </Card>
              ) : (
                <p>No admin insights available.</p>
              )}
            </TabsContent>
            
            {/* Add blank tabs for the others so it doesn't crash */}
            <TabsContent value="myshoutouts"><h1 className="text-2xl font-bold mb-4">My Shout-outs</h1></TabsContent>
            <TabsContent value="profile"><h1 className="text-2xl font-bold mb-4">My Profile</h1></TabsContent>
            <TabsContent value="settings"><h1 className="text-2xl font-bold mb-4">Settings</h1></TabsContent>
            
          </Tabs>
        )}
        
        <footer className="mt-10 text-center text-gray-500 text-sm">
          <p>“Recognition is the spark that fuels excellence.” ✨</p>
          <p>Keep appreciating. Keep inspiring. 💪</p>
        </footer>
      </main>

      {/* --- 6. Render the REAL modal with correct props --- */}
      {showCreateModal && (
        <CreateShoutoutModal 
          onClose={() => setShowCreateModal(false)} 
          onShoutoutCreated={handleShoutoutCreated}
        />
      )}
    </div>
  );
}