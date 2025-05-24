
import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, LogOut, Home, Calendar, MessageCircle, Upload, Menu, X, BarChart, Swords, Brain, Edit 
} from 'lucide-react';
import RankingsMenu from '@/components/RankingsMenu';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  
  // Placeholder user data - this would come from your auth context
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    avatarUrl: ''
  };

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Rivalizer Arena', path: '/rivalizer', icon: Calendar },
    { name: 'Rivalizer Agent', path: '/ai-rivalizer', icon: Swords },
    { name: 'Coach Agent', path: '/ai-coach', icon: Brain },
    { name: 'Charts', path: '/charts', icon: BarChart },
    { name: 'Upload', path: '/upload', icon: Upload },
  ];

  const handleLogout = async () => {
    // This will be implemented with Supabase authentication
    console.log("Logout clicked");
    // Add your Supabase auth logic here
    navigate('/');
  };

  const handleEditProfile = () => {
    navigate('/profile');
  };

  const getActiveStyles = (linkPath: string) => {
    switch (linkPath) {
      case '/ai-rivalizer':
        return 'bg-red-500/10 text-red-400 border border-red-500/30';
      case '/ai-coach':
        return 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30';
      default:
        return 'bg-neon-green/10 text-neon-green border border-neon-green/30';
    }
  };

  return (
    <div className="flex h-screen bg-matrix-darker">
      {/* Mobile sidebar toggle */}
      <button
        className="lg:hidden fixed z-50 bottom-4 right-4 p-2 rounded-full bg-neon-green text-black"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out bg-matrix-dark border-r border-matrix-gray/30 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-matrix-gray/30">
            <img 
              src="/lovable-uploads/43b4aae5-404e-48b7-9d0b-f05717d5161a.png" 
              alt="Futmatrix" 
              className="h-10 w-auto mx-auto" 
            />
          </div>

          {/* User profile */}
          <div className="p-4 border-b border-matrix-gray/30">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={user.avatarUrl} />
                <AvatarFallback className="bg-neon-green/20 text-neon-green">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-gray-400">{user.email}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-matrix-gray/20"
                onClick={handleEditProfile}
                title="Edit Profile"
              >
                <Edit size={14} />
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => `
                  flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${isActive 
                    ? getActiveStyles(link.path)
                    : 'text-gray-300 hover:bg-matrix-gray/20 hover:text-white'
                  }
                `}
                onClick={() => setSidebarOpen(false)}
              >
                <link.icon className="mr-3 h-5 w-5" />
                {link.name}
              </NavLink>
            ))}
            
            {/* Rankings Menu with submenu */}
            <RankingsMenu />
          </nav>

          {/* Logout button */}
          <div className="p-4 border-t border-matrix-gray/30">
            <Button 
              variant="outline" 
              className="w-full justify-start text-gray-300 hover:text-white hover:bg-matrix-gray/20"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className={`flex-1 transition-all duration-300 overflow-auto ${
        sidebarOpen ? 'lg:ml-64' : 'ml-0 lg:ml-64'
      }`}>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
