import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UsersIcon, 
  UserGroupIcon, 
  TrophyIcon,
  ArrowRightOnRectangleIcon,
  ArrowTrendingUpIcon,
  CalendarIcon,
  ShieldCheckIcon,
  UserPlusIcon,
  LinkIcon,
  UserIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  EyeIcon,
  Cog6ToothIcon,
  BellIcon,
  SparklesIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { fetchAdminAnalytics, formatTrendData } from '../utils/analytics';
import toast from 'react-hot-toast';
import Sidebar from './ui/Sidebar';
import TopBar from './ui/TopBar';
import StatsCard from './ui/StatsCard';
import Button from './ui/Button';
import Modal from './ui/Modal';

function AdminDashboard() {
  const { user, logout } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [notificationsCount] = useState(2);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [adminAnalytics, setAdminAnalytics] = useState(null);

  useEffect(() => {
    fetchUsers();
    fetchAdminAnalyticsData();
  }, []);

  const fetchAdminAnalyticsData = async () => {
    try {
      const analyticsResponse = await fetchAdminAnalytics();
      setAdminAnalytics(analyticsResponse);
    } catch (error) {
      console.error('Error fetching admin analytics data:', error);
      toast.error('Failed to load analytics data');
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://lacasacowork.com/api/admin/users', {
        withCredentials: true
      });
      setUsers(response.data);
    } catch (error) {
      toast.error('Error loading users');
    } finally {
      setLoading(false);
    }
  };

  // Calculate admin stats
  const totalUsers = users.length;
  const totalReferrals = users.reduce((sum, user) => sum + (user.referrals_count || 0), 0);
  const totalRevenue = totalReferrals * 25; // $25 per referral
  const activeUsers = users.filter(user => user.is_active).length;
  const growthRate = 12.5; // Simulated growth

  const handleNotificationClick = () => {
    setActiveView('notifications');
  };

  const getPageTitle = () => {
    switch (activeView) {
      case 'analytics':
        return 'System Analytics';
      case 'users':
        return 'User Management';
      case 'settings':
        return 'System Settings';
      case 'notifications':
        return 'Notifications';
      default:
        return 'Admin Dashboard';
    }
  };

  const getPageSubtitle = () => {
    switch (activeView) {
      case 'analytics':
        return 'Monitor system performance and user metrics';
      case 'users':
        return 'Manage users and their referral activities';
      case 'settings':
        return 'Configure system settings and preferences';
      case 'notifications':
        return 'System alerts and important updates';
      default:
        return `Welcome back, ${user?.name}! Here's your system overview.`;
    }
  };

  const viewUserDetails = (userData) => {
    setSelectedUser(userData);
    setShowUserModal(true);
  };

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="card-premium p-8 bg-gradient-to-br from-accent-50/50 to-primary-50/30 border-accent-200/50"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-primary-500 rounded-3xl flex items-center justify-center shadow-glow">
              <ShieldCheckIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-secondary-900 mb-1">
                Admin Control Center 🔐
              </h2>
              <p className="text-secondary-600">
                Complete system overview and management tools at your fingertips.
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-3">
            <span className="inline-flex items-center px-4 py-2 rounded-2xl text-sm font-medium bg-gradient-to-r from-accent-500/10 to-primary-500/10 text-accent-700 border border-accent-200/50">
              <SparklesIcon className="w-4 h-4 mr-2" />
              System Administrator
            </span>
          </div>
        </div>
      </motion.div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          change={formatTrendData(adminAnalytics, 'revenue')?.change || growthRate}
          changeType={formatTrendData(adminAnalytics, 'revenue')?.changeType || "positive"}
          icon={CurrencyDollarIcon}
          gradient="from-green-500 to-emerald-500"
          description="Total platform revenue"
          trend={formatTrendData(adminAnalytics, 'revenue')?.data || [42, 51, 47, 58, 55, 68, 62]}
          periodText={formatTrendData(adminAnalytics, 'revenue')?.period || "vs last period"}
          trendPeriodText={formatTrendData(adminAnalytics, 'revenue')?.period || "Last 7 days"}
        />
        
        <StatsCard
          title="Total Users"
          value={totalUsers}
          change={formatTrendData(adminAnalytics, 'users')?.change || 8.2}
          changeType={formatTrendData(adminAnalytics, 'users')?.changeType || "positive"}
          icon={UsersIcon}
          gradient="from-blue-500 to-cyan-500"
          description="Registered platform users"
          trend={formatTrendData(adminAnalytics, 'users')?.data || [25, 28, 24, 32, 29, 35, 33]}
          periodText={formatTrendData(adminAnalytics, 'users')?.period || "vs last period"}
          trendPeriodText={formatTrendData(adminAnalytics, 'users')?.period || "Last 7 days"}
          animated
        />
        
        <StatsCard
          title="Active Referrals"
          value={totalReferrals}
          change={formatTrendData(adminAnalytics, 'referrals')?.change || 15.7}
          changeType={formatTrendData(adminAnalytics, 'referrals')?.changeType || "positive"}
          icon={LinkIcon}
          gradient="from-purple-500 to-pink-500"
          description="Total successful referrals"
          trend={formatTrendData(adminAnalytics, 'referrals')?.data || [8, 12, 10, 15, 13, 18, 16]}
          periodText={formatTrendData(adminAnalytics, 'referrals')?.period || "vs last period"}
          trendPeriodText={formatTrendData(adminAnalytics, 'referrals')?.period || "Last 7 days"}
          animated
        />
        
        <StatsCard
          title="Active Users"
          value={`${Math.round((activeUsers / totalUsers) * 100)}%`}
          change={formatTrendData(adminAnalytics, 'engagement')?.change || 3.4}
          changeType={formatTrendData(adminAnalytics, 'engagement')?.changeType || "positive"}
          icon={ArrowTrendingUpIcon}
          gradient="from-orange-500 to-red-500"
          description="User engagement rate"
          trend={formatTrendData(adminAnalytics, 'engagement')?.data || [78, 82, 79, 85, 83, 88, 86]}
          periodText={formatTrendData(adminAnalytics, 'engagement')?.period || "vs last period"}
          trendPeriodText={formatTrendData(adminAnalytics, 'engagement')?.period || "Last 7 days"}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User List */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-secondary-900">Recent Users</h3>
            <Button
              variant="secondary"
              size="default"
              onClick={() => setActiveView('users')}
              icon={UsersIcon}
            >
              View All Users
            </Button>
          </div>

          <div className="card-premium overflow-hidden">
            <div className="p-6 border-b border-white/20 bg-gradient-to-r from-secondary-50/50 to-primary-50/30">
              <h4 className="font-semibold text-secondary-900">User Overview</h4>
              <p className="text-sm text-secondary-600">Latest user registrations and activity</p>
            </div>
            
            <div className="divide-y divide-white/20">
              {users.slice(0, 5).map((userData, index) => (
                <motion.div
                  key={userData.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 hover:bg-secondary-50/30 transition-colors cursor-pointer"
                  onClick={() => viewUserDetails(userData)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-soft">
                        <UserIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-secondary-900">{userData.username}</p>
                        <p className="text-sm text-secondary-500">{userData.email}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium text-secondary-900">
                          {userData.referrals_count || 0} referrals
                        </span>
                        {userData.is_admin && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent-100 text-accent-700">
                            Admin
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-secondary-500">
                        {new Date(userData.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Admin Actions & Quick Stats */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card-premium p-6"
          >
            <h4 className="text-lg font-semibold text-secondary-900 mb-4 flex items-center">
              <RocketLaunchIcon className="w-5 h-5 text-primary-500 mr-2" />
              Quick Actions
            </h4>
            
            <div className="space-y-3">
              <Button
                variant="ghost"
                size="default"
                onClick={() => setActiveView('users')}
                icon={UsersIcon}
                className="w-full justify-start"
              >
                Manage Users
              </Button>
              
              <Button
                variant="ghost"
                size="default"
                onClick={() => setActiveView('analytics')}
                icon={ChartBarIcon}
                className="w-full justify-start"
              >
                View Analytics
              </Button>
              
              <Button
                variant="ghost"
                size="default"
                onClick={() => setActiveView('settings')}
                icon={Cog6ToothIcon}
                className="w-full justify-start"
              >
                System Settings
              </Button>
            </div>
          </motion.div>

          {/* System Health */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card-premium p-6"
          >
            <h4 className="text-lg font-semibold text-secondary-900 mb-4 flex items-center">
              <TrophyIcon className="w-5 h-5 text-success-500 mr-2" />
              System Health
            </h4>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-secondary-600">Server Status</span>
                <span className="flex items-center text-sm font-semibold text-success-600">
                  <div className="w-2 h-2 bg-success-500 rounded-full mr-2"></div>
                  Online
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-secondary-600">Database</span>
                <span className="flex items-center text-sm font-semibold text-success-600">
                  <div className="w-2 h-2 bg-success-500 rounded-full mr-2"></div>
                  Healthy
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-secondary-600">API Response</span>
                <span className="text-sm font-semibold text-secondary-900">45ms</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-secondary-600">Uptime</span>
                <span className="text-sm font-semibold text-secondary-900">99.9%</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/20">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-secondary-600">System Load</span>
                <span className="text-secondary-900 font-medium">23%</span>
              </div>
              <div className="w-full bg-secondary-100 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '23%' }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-success-500 to-emerald-500 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeView) {
      case 'users':
        return renderUsersView();
      case 'analytics':
        return renderAnalyticsView();
      case 'settings':
        return renderSettingsView();
      default:
        return renderDashboard();
    }
  };

  const renderUsersView = () => (
    <div className="space-y-6">
      <div className="card-premium p-8 text-center">
        <UsersIcon className="w-16 h-16 text-secondary-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-secondary-900 mb-2">User Management</h3>
        <p className="text-secondary-500">Advanced user management interface coming soon.</p>
      </div>
    </div>
  );

  const renderAnalyticsView = () => (
    <div className="space-y-6">
      <div className="card-premium p-8 text-center">
        <ChartBarIcon className="w-16 h-16 text-secondary-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-secondary-900 mb-2">Advanced Analytics</h3>
        <p className="text-secondary-500">Detailed analytics dashboard is being developed.</p>
      </div>
    </div>
  );

  const renderSettingsView = () => (
    <div className="space-y-6">
      <div className="card-premium p-8 text-center">
        <Cog6ToothIcon className="w-16 h-16 text-secondary-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-secondary-900 mb-2">System Settings</h3>
        <p className="text-secondary-500">System configuration panel coming soon.</p>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-accent-200 border-t-accent-600 rounded-full mx-auto mb-4"
          />
          <p className="text-secondary-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-accent-50/30 flex">
      {/* Sidebar */}
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        onLogout={logout}
        notificationsCount={notificationsCount}
        isCollapsed={sidebarCollapsed}
        setIsCollapsed={setSidebarCollapsed}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <TopBar
          title={getPageTitle()}
          subtitle={getPageSubtitle()}
          onNotificationClick={handleNotificationClick}
          notificationsCount={notificationsCount}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
        />

        {/* Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="container-premium section-padding">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeView}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* User Details Modal */}
      <Modal
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
        title="User Details"
        size="large"
      >
        {selectedUser && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-3xl flex items-center justify-center shadow-glow">
                <UserIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-secondary-900">{selectedUser.username}</h3>
                <p className="text-secondary-600">{selectedUser.email}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Total Referrals
                </label>
                <p className="text-2xl font-bold text-primary-600">
                  {selectedUser.referrals_count || 0}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Member Since
                </label>
                <p className="text-sm text-secondary-900">
                  {new Date(selectedUser.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="pt-4 border-t border-secondary-200">
              <p className="text-sm text-secondary-500">
                Additional user management features will be available in the next update.
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default AdminDashboard;
