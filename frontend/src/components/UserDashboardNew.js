import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlusIcon, 
  LinkIcon,
  EyeIcon,
  ArrowTrendingUpIcon,
  UsersIcon,
  TrophyIcon,
  SparklesIcon,
  CurrencyDollarIcon,
  ClockIcon,
  GiftIcon,
  ChartBarIcon,
  UserGroupIcon,
  RocketLaunchIcon,
  FireIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { fetchUserStats, fetchUserAnalytics, formatTrendData } from '../utils/analytics';
import toast from 'react-hot-toast';
import Sidebar from './ui/Sidebar';
import TopBar from './ui/TopBar';
import StatsCard from './ui/StatsCard';
import ReferralCard from './ui/ReferralCard';
import AnalyticsDashboard from './AnalyticsDashboard';
import NotificationsCenter from './NotificationsCenter';
import SettingsPanel from './SettingsPanel';

function UserDashboard() {
  const { user, logout } = useAuth();
  const [referralLinks, setReferralLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creatingLink, setCreatingLink] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [notificationsCount] = useState(3);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [userStats, setUserStats] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    fetchReferralLinks();
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      const [statsResponse, analyticsResponse] = await Promise.all([
        fetchUserStats(),
        fetchUserAnalytics()
      ]);
      
      setUserStats(statsResponse);
      setAnalyticsData(analyticsResponse);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      toast.error('Failed to load analytics data');
    }
  };

  const fetchReferralLinks = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/referral-links`, {
        withCredentials: true
      });
      setReferralLinks(response.data);
    } catch (error) {
      toast.error('Error loading referral links');
    } finally {
      setLoading(false);
    }
  };

  const createReferralLink = async () => {
    setCreatingLink(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/referral-links`, {}, {
        withCredentials: true
      });
      setReferralLinks([...referralLinks, response.data]);
      toast.success('Referral link created successfully!');
    } catch (error) {
      toast.error('Error creating referral link');
    } finally {
      setCreatingLink(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Link copied to clipboard!');
  };

  // Calculate stats
  const totalClicks = referralLinks.reduce((sum, link) => sum + link.clicks, 0);
  const totalConversions = referralLinks.reduce((sum, link) => sum + (link.conversions || 0), 0);
  const conversionRate = totalClicks > 0 ? (totalConversions / totalClicks * 100) : 0;
  const activeLinks = referralLinks.filter(link => link.is_active).length;

  // Simulate additional stats
  const earnings = totalConversions * 15; // $15 per conversion
  const thisWeekClicks = Math.floor(totalClicks * 0.3);
  const weeklyGrowth = 12.5;

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full mx-auto mb-4"
          />
          <p className="text-secondary-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const handleNotificationClick = () => {
    setActiveView('notifications');
    setShowNotifications(true);
  };

  const getPageTitle = () => {
    switch (activeView) {
      case 'analytics':
        return 'Analytics';
      case 'referrals':
        return 'Referral Links';
      case 'network':
        return 'Network';
      case 'achievements':
        return 'Achievements';
      case 'notifications':
        return 'Notifications';
      case 'settings':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };

  const getPageSubtitle = () => {
    switch (activeView) {
      case 'analytics':
        return 'Track your performance and growth metrics';
      case 'referrals':
        return 'Manage and monitor your referral links';
      case 'network':
        return 'Your referral network and connections';
      case 'achievements':
        return 'Unlock rewards and track milestones';
      case 'notifications':
        return 'Stay updated with the latest activities';
      case 'settings':
        return 'Customize your account and preferences';
      default:
        return `Welcome back, ${user?.name || 'User'}! Here's your performance overview.`;
    }
  };

  // Component to render different views
  const renderContent = () => {
    switch (activeView) {
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'notifications':
        return <NotificationsCenter isOpen={true} onClose={() => setActiveView('dashboard')} />;
      case 'settings':
        return <SettingsPanel isOpen={true} onClose={() => setActiveView('dashboard')} />;
      case 'referrals':
        return renderReferralsView();
      case 'network':
        return renderNetworkView();
      case 'achievements':
        return renderAchievementsView();
      default:
        return renderDashboard();
    }
  };

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="card-premium p-8 bg-gradient-to-br from-primary-50/50 to-accent-50/30 border-primary-200/50"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-3xl flex items-center justify-center shadow-glow">
              <RocketLaunchIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-secondary-900 mb-1">
                Welcome back, {user?.name || 'User'}! 🎉
              </h2>
              <p className="text-secondary-600">
                You're crushing it! Your referral program is performing excellently.
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            {user?.is_admin && (
              <span className="inline-flex items-center px-4 py-2 rounded-2xl text-sm font-medium bg-gradient-to-r from-accent-500/10 to-primary-500/10 text-accent-700 border border-accent-200/50">
                <StarIcon className="w-4 h-4 mr-2" />
                Admin
              </span>
            )}
            <span className="inline-flex items-center px-4 py-2 rounded-2xl text-sm font-medium bg-gradient-to-r from-success-500/10 to-emerald-500/10 text-success-700 border border-success-200/50">
              <FireIcon className="w-4 h-4 mr-2" />
              Pro Member
            </span>
          </div>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Earnings"
          value={`$${userStats?.earnings?.toLocaleString() || earnings.toLocaleString()}`}
          change={formatTrendData(analyticsData, 'earnings')?.change || weeklyGrowth}
          changeType={formatTrendData(analyticsData, 'earnings')?.changeType || "positive"}
          icon={CurrencyDollarIcon}
          gradient="from-green-500 to-emerald-500"
          description="Your total commission earned"
          trend={formatTrendData(analyticsData, 'earnings')?.data || [45, 52, 48, 61, 58, 71, 65]}
          periodText={formatTrendData(analyticsData, 'earnings')?.period || "vs last period"}
          trendPeriodText={formatTrendData(analyticsData, 'earnings')?.period || "Last 7 days"}
        />
        
        <StatsCard
          title="Total Clicks"
          value={userStats?.totalClicks || totalClicks}
          change={formatTrendData(analyticsData, 'clicks')?.change || 15.3}
          changeType={formatTrendData(analyticsData, 'clicks')?.changeType || "positive"}
          icon={EyeIcon}
          gradient="from-blue-500 to-cyan-500"
          description="All-time referral link clicks"
          trend={formatTrendData(analyticsData, 'clicks')?.data || [12, 19, 15, 25, 22, 30, 28]}
          periodText={formatTrendData(analyticsData, 'clicks')?.period || "vs last period"}
          trendPeriodText={formatTrendData(analyticsData, 'clicks')?.period || "Last 7 days"}
          animated
        />
        
        <StatsCard
          title="Conversions"
          value={userStats?.totalConversions || totalConversions}
          change={formatTrendData(analyticsData, 'conversions')?.change || 8.7}
          changeType={formatTrendData(analyticsData, 'conversions')?.changeType || "positive"}
          icon={ArrowTrendingUpIcon}
          gradient="from-purple-500 to-pink-500"
          description="Successful referral conversions"
          trend={formatTrendData(analyticsData, 'conversions')?.data || [3, 5, 4, 7, 6, 9, 8]}
          periodText={formatTrendData(analyticsData, 'conversions')?.period || "vs last period"}
          trendPeriodText={formatTrendData(analyticsData, 'conversions')?.period || "Last 7 days"}
          animated
        />
        
        <StatsCard
          title="Conversion Rate"
          value={`${userStats?.conversionRate?.toFixed(1) || conversionRate.toFixed(1)}%`}
          change={formatTrendData(analyticsData, 'conversionRate')?.change || 2.1}
          changeType={formatTrendData(analyticsData, 'conversionRate')?.changeType || "positive"}
          icon={ChartBarIcon}
          gradient="from-orange-500 to-red-500"
          description="Click to conversion ratio"
          trend={formatTrendData(analyticsData, 'conversionRate')?.data || [15, 18, 16, 22, 20, 25, 23]}
          periodText={formatTrendData(analyticsData, 'conversionRate')?.period || "vs last period"}
          trendPeriodText={formatTrendData(analyticsData, 'conversionRate')?.period || "Last 7 days"}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-secondary-900">Recent Referral Links</h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={createReferralLink}
              disabled={creatingLink}
              className="btn-primary flex items-center space-x-2"
            >
              {creatingLink ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <PlusIcon className="w-4 h-4" />
              )}
              <span>{creatingLink ? 'Creating...' : 'Create Link'}</span>
            </motion.button>
          </div>

          <div className="space-y-4">
            {referralLinks.slice(0, 3).map((link, index) => (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ReferralCard 
                  link={link} 
                  onViewDetails={() => setActiveView('analytics')}
                  compact
                />
              </motion.div>
            ))}
            
            {referralLinks.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <LinkIcon className="w-16 h-16 text-secondary-300 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-secondary-900 mb-2">No referral links yet</h4>
                <p className="text-secondary-500 mb-6">Create your first referral link to start earning commissions.</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={createReferralLink}
                  disabled={creatingLink}
                  className="btn-primary flex items-center space-x-2 mx-auto"
                >
                  <PlusIcon className="w-4 h-4" />
                  <span>Create Your First Link</span>
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Performance Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card-premium p-6"
          >
            <h4 className="text-lg font-semibold text-secondary-900 mb-4 flex items-center">
              <TrophyIcon className="w-5 h-5 text-accent-500 mr-2" />
              This Week's Performance
            </h4>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-secondary-600">New Clicks</span>
                <span className="text-sm font-semibold text-secondary-900">{thisWeekClicks}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-secondary-600">Active Links</span>
                <span className="text-sm font-semibold text-secondary-900">{activeLinks}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-secondary-600">Growth Rate</span>
                <span className="text-sm font-semibold text-success-600">+{weeklyGrowth}%</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/20">
              <div className="flex items-center justify-between text-sm">
                <span className="text-secondary-600">Next Milestone</span>
                <span className="text-accent-600 font-medium">$1,000 earned</span>
              </div>
              <div className="mt-2 w-full bg-secondary-100 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(earnings / 1000) * 100}%` }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-accent-500 to-primary-500 rounded-full"
                />
              </div>
              <p className="text-2xs text-secondary-500 mt-1">
                ${(1000 - earnings).toLocaleString()} to go
              </p>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card-premium p-6"
          >
            <h4 className="text-lg font-semibold text-secondary-900 mb-4 flex items-center">
              <SparklesIcon className="w-5 h-5 text-primary-500 mr-2" />
              Quick Actions
            </h4>
            
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveView('referrals')}
                className="w-full btn-ghost text-left justify-start"
              >
                <LinkIcon className="w-4 h-4 mr-3" />
                Manage Links
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveView('analytics')}
                className="w-full btn-ghost text-left justify-start"
              >
                <ChartBarIcon className="w-4 h-4 mr-3" />
                View Analytics
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveView('network')}
                className="w-full btn-ghost text-left justify-start"
              >
                <UserGroupIcon className="w-4 h-4 mr-3" />
                View Network
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );

  const renderReferralsView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-secondary-900">Referral Links</h2>
          <p className="text-secondary-600">Manage and track all your referral links</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={createReferralLink}
          disabled={creatingLink}
          className="btn-primary flex items-center space-x-2"
        >
          <PlusIcon className="w-4 h-4" />
          <span>Create New Link</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {referralLinks.map((link, index) => (
          <motion.div
            key={link.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ReferralCard 
              link={link} 
              onViewDetails={() => setActiveView('analytics')}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderNetworkView = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-secondary-900">Your Network</h2>
      <div className="card-premium p-8 text-center">
        <UserGroupIcon className="w-16 h-16 text-secondary-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-secondary-900 mb-2">Network View</h3>
        <p className="text-secondary-500">Your referral network visualization will appear here.</p>
      </div>
    </div>
  );

  const renderAchievementsView = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-secondary-900">Achievements</h2>
      <div className="card-premium p-8 text-center">
        <TrophyIcon className="w-16 h-16 text-secondary-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-secondary-900 mb-2">Coming Soon</h3>
        <p className="text-secondary-500">Achievement system is under development.</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/30 flex">
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

      {/* Modals */}
      <AnimatePresence>
        {showNotifications && (
          <NotificationsCenter 
            isOpen={showNotifications} 
            onClose={() => setShowNotifications(false)} 
          />
        )}
        {showSettings && (
          <SettingsPanel 
            isOpen={showSettings} 
            onClose={() => setShowSettings(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default UserDashboard;
