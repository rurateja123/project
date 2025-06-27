import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  User2, 
  LogOut, 
  Settings, 
  Briefcase, 
  FileText, 
  Users,
  Bell,
  Search,
  Menu,
  X,
  Zap,
  Eye
} from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const notifications = [
    { id: 1, text: 'New job match found!', time: '2 min ago', unread: true },
    { id: 2, text: 'Profile viewed by TechCorp', time: '1 hour ago', unread: true },
    { id: 3, text: 'Application status updated', time: '3 hours ago', unread: false }
  ];

  return (
    <header className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold gradient-text">JobSeek</span>
              <span className="text-xs text-gray-500 -mt-1">Find Your Dream Job</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          {user && (
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                to="/jobs" 
                className="text-gray-700 hover:text-violet-600 transition-colors flex items-center space-x-2 font-medium"
              >
                <Search className="w-4 h-4" />
                <span>Jobs</span>
              </Link>
              
              <Link 
                to="/profiles" 
                className="text-gray-700 hover:text-violet-600 transition-colors flex items-center space-x-2 font-medium"
              >
                <Eye className="w-4 h-4" />
                <span>Profiles</span>
              </Link>
              
              {user.role === 'jobseeker' && (
                <>
                  <Link 
                    to="/applications" 
                    className="text-gray-700 hover:text-violet-600 transition-colors flex items-center space-x-2 font-medium"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Applications</span>
                  </Link>
                  <Link 
                    to="/profile" 
                    className="text-gray-700 hover:text-violet-600 transition-colors flex items-center space-x-2 font-medium"
                  >
                    <User2 className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>
                </>
              )}
              
              {user.role === 'employer' && (
                <>
                  <Link 
                    to="/employer/jobs" 
                    className="text-gray-700 hover:text-violet-600 transition-colors flex items-center space-x-2 font-medium"
                  >
                    <Briefcase className="w-4 h-4" />
                    <span>My Jobs</span>
                  </Link>
                  <Link 
                    to="/employer/applications" 
                    className="text-gray-700 hover:text-violet-600 transition-colors flex items-center space-x-2 font-medium"
                  >
                    <Users className="w-4 h-4" />
                    <span>Applications</span>
                  </Link>
                </>
              )}
              
              {user.role === 'admin' && (
                <Link 
                  to="/admin" 
                  className="text-gray-700 hover:text-violet-600 transition-colors flex items-center space-x-2 font-medium"
                >
                  <Settings className="w-4 h-4" />
                  <span>Admin</span>
                </Link>
              )}
            </nav>
          )}

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Notifications */}
                <div className="relative">
                  <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-2 text-gray-400 hover:text-violet-600 transition-colors relative"
                  >
                    <Bell className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-bold">2</span>
                    </span>
                  </button>
                  
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <h3 className="font-semibold text-gray-900">Notifications</h3>
                      </div>
                      {notifications.map((notification) => (
                        <div key={notification.id} className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${notification.unread ? 'bg-violet-50' : ''}`}>
                          <p className="text-sm text-gray-900">{notification.text}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      ))}
                      <div className="px-4 py-2 border-t border-gray-100">
                        <button className="text-sm text-violet-600 hover:text-violet-700 font-medium">
                          View all notifications
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* User Profile */}
                <div className="flex items-center space-x-3">
                  <Link to="/profile" className="flex items-center space-x-3 hover:bg-gray-50 rounded-lg p-2 transition-colors">
                    <div className="relative">
                      <img
                        src={user.avatar || `https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2`}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      {user.isVerified && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="hidden sm:block">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                    </div>
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-violet-600 transition-colors font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {user && isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="space-y-2">
              <Link 
                to="/jobs" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <Search className="w-5 h-5" />
                <span>Jobs</span>
              </Link>
              
              <Link 
                to="/profiles" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <Eye className="w-5 h-5" />
                <span>Profiles</span>
              </Link>
              
              {user.role === 'jobseeker' && (
                <>
                  <Link 
                    to="/applications" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <FileText className="w-5 h-5" />
                    <span>Applications</span>
                  </Link>
                  <Link 
                    to="/profile" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <User2 className="w-5 h-5" />
                    <span>Profile</span>
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;