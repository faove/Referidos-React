import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChartBarIcon,
  UserIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  BellIcon,
  HomeIcon,
  LinkIcon,
  UsersIcon,
  TrophyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';

const sidebarVariants = {
  expanded: { width: 280 },
  collapsed: { width: 80 }
};

function Sidebar({ activeView, setActiveView, onLogout, notificationsCount, isCollapsed, setIsCollapsed }) {
  const { user } = useAuth();

  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: HomeIcon,
      gradient: 'from-blue-500 to-cyan-500'
    },
    { 
      id: 'analytics', 
      label: 'Analytics', 
      icon: ChartBarIcon,
      gradient: 'from-purple-500 to-pink-500'
    },
    { 
      id: 'referrals', 
      label: 'Referrals', 
      icon: LinkIcon,
      gradient: 'from-green-500 to-emerald-500'
    },
    { 
      id: 'network', 
      label: 'Network', 
      icon: UsersIcon,
      gradient: 'from-orange-500 to-red-500'
    },
    { 
      id: 'achievements', 
      label: 'Achievements', 
      icon: TrophyIcon,
      gradient: 'from-yellow-500 to-orange-500'
    }
  ];

  const bottomItems = [
    { 
      id: 'notifications', 
      label: 'Notifications', 
      icon: BellIcon,
      badge: notificationsCount,
      gradient: 'from-indigo-500 to-purple-500'
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: Cog6ToothIcon,
      gradient: 'from-gray-500 to-slate-500'
    }
  ];

  return (
    <motion.div
      variants={sidebarVariants}
      animate={isCollapsed ? 'collapsed' : 'expanded'}
      transition={{ duration: 0.3 }}
      className="h-screen bg-white/80 backdrop-blur-xl border-r border-white/20 shadow-elegant flex flex-col relative lg:relative z-[9999]"
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 z-10 w-6 h-6 bg-white shadow-medium rounded-full flex items-center justify-center text-secondary-400 hover:text-primary-600 hover:shadow-glow transition-all duration-300 hover:scale-110"
      >
        {isCollapsed ? (
          <ChevronRightIcon className="w-3 h-3" />
        ) : (
          <ChevronLeftIcon className="w-3 h-3" />
        )}
      </button>

      {/* Header */}
      <div className="p-6 border-b border-white/10 justify-center align-items-center">
        <div className="flex items-center space-x-3 justify-center align-items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-glow">
            <SparklesIcon className="w-6 h-6 text-white" />
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex flex-col"
              >
                <h1 className="text-lg font-bold text-gradient">Elantar Referral Program</h1>
                <p className="text-2xs text-secondary-500 font-medium">ERP - Elantar Edition</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-6 border-b border-white/10 justify-center align-items-center">
        <div className="flex items-center space-x-3 justify-center align-items-center">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-secondary-200 to-secondary-300 rounded-2xl flex items-center justify-center">
              <UserIcon className="w-6 h-6 text-secondary-600" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success-500 rounded-full border-2 border-white shadow-soft"></div>
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-semibold text-secondary-900 truncate">
                  {user?.name || 'User'}
                </p>
                <p className="text-2xs text-secondary-500 truncate">
                  {user?.email || 'user@example.com'}
                </p>
                {user?.is_admin && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-2xs font-medium bg-gradient-to-r from-accent-500/10 to-primary-500/10 text-accent-700 border border-accent-200/50 mt-1">
                    Admin
                  </span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center px-4 py-3 rounded-2xl transition-all duration-300 relative group ${
                isActive 
                  ? 'bg-gradient-to-r from-primary-500/10 to-accent-500/10 text-primary-700 shadow-soft' 
                  : 'text-secondary-600 hover:bg-white/50 hover:text-secondary-900'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-accent-500/10 rounded-2xl border border-primary-200/50"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              
              <Icon className={`relative z-10 w-5 h-5 ${isActive ? 'text-primary-600' : 'text-secondary-500'}`} />
              
              <AnimatePresence>
                {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="ml-3 text-sm font-medium relative z-10"
              >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 space-y-2 border-t border-white/10">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center px-4 py-3 rounded-2xl transition-all duration-300 relative group ${
                isActive 
                  ? 'bg-gradient-to-r from-primary-500/10 to-accent-500/10 text-primary-700' 
                  : 'text-secondary-600 hover:bg-white/50 hover:text-secondary-900'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'text-primary-600' : 'text-secondary-500'}`} />
                {item.badge && item.badge > 0 && (
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-error-500 to-error-600 rounded-full flex items-center justify-center shadow-glow">
                    <span className="text-2xs font-bold text-white">{item.badge}</span>
                  </div>
                )}
              </div>
              
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="ml-3 text-sm font-medium"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}

        {/* Logout Button */}
        <motion.button
          onClick={onLogout}
          className="w-full flex items-center px-4 py-3 rounded-2xl text-secondary-600 hover:bg-error-50 hover:text-error-700 transition-all duration-300 group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5 text-error-500" />
          
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="ml-3 text-sm font-medium"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  );
}

export default Sidebar;
