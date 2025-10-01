import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlusIcon, 
  LinkIcon,
  EyeIcon,
  ArrowTrendingUpIcon,
  TrophyIcon,
  SparklesIcon,
  CurrencyDollarIcon,
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


// -----------------------------------------------------------------------------
// CONFIGURACIÓN MULTI-ENTORNO (Corrección Aplicada)
// -----------------------------------------------------------------------------
// 1. Usa process.env.REACT_APP_API_URL para desarrollo (ej. http://localhost:5000).
// 2. Si no está definida (producción), usa la URL final como fallback.
const BASE_URL = process.env.REACT_APP_API_URL || 'https://panel.erpelantar.com';
const API_BASE_URL = `${BASE_URL}/api`;
// -----------------------------------------------------------------------------


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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true); // Start collapsed on mobile
  const [searchValue, setSearchValue] = useState('');
  
  // Network data state
  const [networkData, setNetworkData] = useState([]);
  const [networkLoading, setNetworkLoading] = useState(true);
  
  // Achievements data state
  const [achievements, setAchievements] = useState([]);
  const [achievementsLoading, setAchievementsLoading] = useState(true);

  useEffect(() => {
    fetchReferralLinks();
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      // Las llamadas a fetchUserStats y fetchUserAnalytics usan la corrección de URL en analytics.js
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

  // Fetch network data
  useEffect(() => {
    const fetchNetworkData = async () => {
      try {
        // CORRECCIÓN APLICADA: Usando API_BASE_URL
        const response = await axios.get(`${API_BASE_URL}/network`, {
          withCredentials: true
        });
        setNetworkData(response.data);
      } catch (error) {
        console.error('Error fetching network data:', error);
        // Fallback to demo data if API fails
        setNetworkData([
          { id: 1, name: 'Maria Rodriguez', email: 'maria@example.com', referrals: 5, joined: '2024-01-15', status: 'active' },
          { id: 2, name: 'John Smith', email: 'john@example.com', referrals: 3, joined: '2024-02-20', status: 'active' },
          { id: 3, name: 'Ana Garcia', email: 'ana@example.com', referrals: 8, joined: '2024-01-10', status: 'active' },
          { id: 4, name: 'Carlos Lopez', email: 'carlos@example.com', referrals: 2, joined: '2024-03-05', status: 'pending' },
        ]);
      } finally {
        setNetworkLoading(false);
      }
    };

    if (activeView === 'network') {
      fetchNetworkData();
    }
  }, [activeView]);

  // Fetch achievements data
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        // CORRECCIÓN APLICADA: Usando API_BASE_URL
        const response = await axios.get(`${API_BASE_URL}/achievements`, {
          withCredentials: true
        });
        setAchievements(response.data);
      } catch (error) {
        console.error('Error fetching achievements:', error);
        // Fallback to demo data
        setAchievements([
          { id: 1, title: 'First Referral', description: 'Made your first successful referral', completed: true, icon: '🎯', reward: '$10' },
          { id: 2, title: 'Network Builder', description: 'Referred 5 people', completed: true, icon: '🏗️', reward: '$50' },
          { id: 3, title: 'Super Referrer', description: 'Referred 10 people', completed: false, icon: '⭐', reward: '$100', progress: 7 },
          { id: 4, title: 'Elite Member', description: 'Referred 25 people', completed: false, icon: '👑', reward: '$250', progress: 7 },
        ]);
      } finally {
        setAchievementsLoading(false);
      }
    };

    if (activeView === 'achievements') {
      fetchAchievements();
    }
  }, [activeView]);

  const fetchReferralLinks = async () => {
    try {
      // CORRECCIÓN APLICADA: Usando API_BASE_URL
      const response = await axios.get(`${API_BASE_URL}/referral-links`, {
        withCredentials: true
      });
      // Ensure response.data is an array
      setReferralLinks(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching referral links:', error);
      toast.error('Error loading referral links');
      setReferralLinks([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const createReferralLink = async () => {
    setCreatingLink(true);
    try {
      // CORRECCIÓN APLICADA: Usando API_BASE_URL
      const response = await axios.post(`${API_BASE_URL}/referral-links`, {}, {
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


  // Calculate stats - ensure referralLinks is an array
  const safeReferralLinks = Array.isArray(referralLinks) ? referralLinks : [];
  const totalClicks = safeReferralLinks.reduce((sum, link) => sum + (link.clicks || 0), 0);
  const totalConversions = safeReferralLinks.reduce((sum, link) => sum + (link.conversions || 0), 0);
  const conversionRate = totalClicks > 0 ? (totalConversions / totalClicks * 100) : 0;
  const activeLinks = safeReferralLinks.filter(link => link.is_active).length;

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
         transition={{ duration: 0.4 }}
         className="card-premium p-8 bg-gradient-to-br from-primary-50/50 to-accent-50/30 border-primary-200/50"
       >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-glow">
              <RocketLaunchIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-bold text-secondary-900 mb-1">
                Welcome back, {user?.name || 'User'}! 🎉
              </h2>
              <p className="text-sm sm:text-base text-secondary-600">
                You're crushing it! Your referral program is performing excellently.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 w-full sm:w-auto justify-start sm:justify-end">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
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
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
        <div className="xl:col-span-2">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-secondary-900">Recent Referral Links</h3>
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
             {safeReferralLinks.slice(0, 3).map((link, index) => (
               <motion.div
                 key={link.id}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.3, delay: index * 0.05 }}
               >
                <ReferralCard 
                  link={{
                    ...link,
                    code: link.link_code,
                    is_active: true
                  }} 
                  onViewDetails={() => setActiveView('analytics')}
                  compact
                />
              </motion.div>
            ))}
            
            {safeReferralLinks.length === 0 && (
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
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.4, delay: 0.1 }}
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
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
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

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
         {safeReferralLinks.map((link, index) => (
           <motion.div
             key={link.id}
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
           >
            <ReferralCard 
              link={{
                ...link,
                code: link.link_code,
                is_active: true
              }} 
              onViewDetails={() => setActiveView('analytics')}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderNetworkView = () => {
    if (networkLoading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-secondary-900">Your Network</h2>
          <p className="text-secondary-600">People you've referred to the platform</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="card-premium p-6">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">Network Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-secondary-600">Total Referred</span>
                <span className="font-semibold">{Array.isArray(networkData) ? networkData.length : 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-600">Active Members</span>
                <span className="font-semibold">{Array.isArray(networkData) ? networkData.filter(n => n.status === 'active').length : 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-600">Total Earnings</span>
                <span className="font-semibold">${Array.isArray(networkData) ? networkData.reduce((sum, n) => sum + (n.referrals * 15), 0) : 0}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="card-premium overflow-hidden">
              <div className="p-6 border-b border-white/20">
                <h3 className="text-lg font-semibold text-secondary-900">Network Members</h3>
              </div>
              <div className="divide-y divide-white/20">
                {networkData.map((member) => (
                  <div key={member.id} className="p-4 hover:bg-secondary-50/30 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-secondary-900">{member.name}</p>
                          <p className="text-sm text-secondary-500">{member.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-secondary-900">{member.referrals} referrals</p>
                        <p className="text-xs text-secondary-500">Joined {new Date(member.joined).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAchievementsView = () => {
    if (achievementsLoading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-secondary-900">Achievements</h2>
          <p className="text-secondary-600">Unlock rewards by reaching milestones</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`card-premium p-6 ${achievement.completed ? 'bg-gradient-to-br from-success-50/50 to-emerald-50/50 border-success-200/50' : ''}`}
            >
              <div className="flex items-start space-x-4">
                <div className={`text-4xl ${achievement.completed ? 'grayscale-0' : 'grayscale'}`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-secondary-900">{achievement.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      achievement.completed 
                        ? 'bg-success-100 text-success-700' 
                        : 'bg-secondary-100 text-secondary-600'
                    }`}>
                      {achievement.completed ? 'Completed' : 'In Progress'}
                    </span>
                  </div>
                  <p className="text-secondary-600 mb-3">{achievement.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-primary-600 font-semibold">Reward: {achievement.reward}</span>
                    {!achievement.completed && achievement.progress && (
                      <span className="text-sm text-secondary-500">
                        {achievement.progress}/10 completed
                      </span>
                    )}
                  </div>
                  {!achievement.completed && achievement.progress && (
                    <div className="mt-3 w-full bg-secondary-100 rounded-full h-2">
                      <div 
                        className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-500"
                        style={{ width: `${(achievement.progress / 10) * 100}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50/30 flex flex-col lg:flex-row">
      {/* Sidebar - Hidden on mobile, show as overlay */}
      <div className={`${sidebarCollapsed ? 'hidden' : 'block'} lg:block fixed lg:relative inset-y-0 left-0 z-50 lg:z-auto w-full lg:w-auto`}>
        <Sidebar
          activeView={activeView}
          setActiveView={setActiveView}
          onLogout={logout}
          notificationsCount={notificationsCount}
          isCollapsed={sidebarCollapsed}
          setIsCollapsed={setSidebarCollapsed}
        />
      </div>

      {/* Overlay for mobile sidebar */}
      {!sidebarCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarCollapsed(true)}
        />
      )}

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
          onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="container-premium section-padding">
            <AnimatePresence mode="wait">
               <motion.div
                 key={activeView}
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -30 }}
                 transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
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