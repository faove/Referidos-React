import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MagnifyingGlassIcon,
  BellIcon,
  UserIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  SunIcon,
  MoonIcon,
  GlobeAltIcon,
  CreditCardIcon,
  QuestionMarkCircleIcon,
  ChevronDownIcon,
  Bars3Icon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';

function TopBar({ title, subtitle, onNotificationClick, notificationsCount, searchValue, onSearchChange, onMenuClick }) {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const userMenuItems = [
    { icon: UserIcon, label: 'Profile', action: () => console.log('Profile') },
    { icon: Cog6ToothIcon, label: 'Settings', action: () => console.log('Settings') },
    { icon: CreditCardIcon, label: 'Billing', action: () => console.log('Billing') },
    { icon: QuestionMarkCircleIcon, label: 'Help', action: () => console.log('Help') },
    { type: 'divider' },
    { icon: ArrowRightOnRectangleIcon, label: 'Sign out', action: logout, danger: true }
  ];

  return (
    <div className="h-16 sm:h-20 bg-white/60 backdrop-blur-xl border-b border-white/20 shadow-soft z-[9999] relative">
      <div className="h-full px-4 sm:px-6 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl bg-white/40 backdrop-blur-sm border border-white/30 shadow-soft hover:bg-white/60 transition-all duration-300 mr-3"
        >
          <Bars3Icon className="w-5 h-5 text-secondary-600" />
        </motion.button>

        {/* Left Section - Title */}
        <div className="flex-1 min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            <h1 className="text-lg sm:text-2xl font-bold text-gradient truncate">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs sm:text-sm text-secondary-500 mt-1 truncate">
                {subtitle}
              </p>
            )}
          </motion.div>
        </div>

        {/* Center Section - Search (Hidden on small screens) */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative">
            <AnimatePresence>
              {showSearch ? (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 'auto', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center"
                >
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchValue}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full input-premium text-sm"
                    autoFocus
                    onBlur={() => !searchValue && setShowSearch(false)}
                  />
                </motion.div>
              ) : (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => setShowSearch(true)}
                  className="w-full flex items-center space-x-3 px-4 py-3 bg-white/40 backdrop-blur-sm rounded-2xl border border-white/30 shadow-soft hover:bg-white/60 hover:shadow-medium transition-all duration-300 group"
                >
                  <MagnifyingGlassIcon className="w-5 h-5 text-secondary-400 group-hover:text-secondary-600 transition-colors" />
                  <span className="text-sm text-secondary-400 group-hover:text-secondary-600 transition-colors">
                    Search...
                  </span>
                  <div className="flex-1"></div>
                  <div className="flex items-center space-x-1">
                    <kbd className="px-2 py-1 text-2xs text-secondary-400 bg-secondary-100/50 rounded border border-secondary-200/50">
                      ⌘
                    </kbd>
                    <kbd className="px-2 py-1 text-2xs text-secondary-400 bg-secondary-100/50 rounded border border-secondary-200/50">
                      K
                    </kbd>
                  </div>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center justify-end space-x-2 sm:space-x-4">
          {/* Theme Toggle - Hidden on mobile */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden sm:flex p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-white/40 backdrop-blur-sm border border-white/30 shadow-soft hover:bg-white/60 hover:shadow-medium transition-all duration-300 group"
          >
            <SunIcon className="w-4 h-4 sm:w-5 sm:h-5 text-secondary-600 group-hover:text-primary-600 transition-colors" />
          </motion.button>

          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNotificationClick}
            className="relative p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-white/40 backdrop-blur-sm border border-white/30 shadow-soft hover:bg-white/60 hover:shadow-medium transition-all duration-300 group"
          >
            <BellIcon className="w-4 h-4 sm:w-5 sm:h-5 text-secondary-600 group-hover:text-primary-600 transition-colors" />
            {notificationsCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-error-500 to-error-600 rounded-full flex items-center justify-center shadow-glow"
              >
                <span className="text-2xs font-bold text-white">
                  {notificationsCount > 99 ? '99+' : notificationsCount}
                </span>
              </motion.div>
            )}
          </motion.button>

          {/* User Menu */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 sm:space-x-3 p-2 rounded-xl sm:rounded-2xl bg-white/40 backdrop-blur-sm border border-white/30 shadow-soft hover:bg-white/60 hover:shadow-medium transition-all duration-300 group"
            >
              <div className="relative">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-soft">
                  <UserIcon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 sm:w-3 sm:h-3 bg-success-500 rounded-full border border-white shadow-soft"></div>
              </div>
              
              <div className="hidden sm:flex flex-col items-start">
                <span className="text-sm font-medium text-secondary-900 truncate max-w-24">
                  {user?.name || 'User'}
                </span>
                <span className="text-2xs text-secondary-500">
                  {user?.is_admin ? 'Admin' : 'Member'}
                </span>
              </div>
              
              <ChevronDownIcon className={`w-3 h-3 sm:w-4 sm:h-4 text-secondary-400 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
            </motion.button>

            {/* User Dropdown Menu */}
            <AnimatePresence>
              {showUserMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-[9997]" 
                    onClick={() => setShowUserMenu(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-64 bg-white/90 backdrop-blur-xl rounded-3xl border border-white/50 shadow-elegant z-[9997] overflow-hidden"
                  >
                    {/* User Info Header */}
                    <div className="p-4 border-b border-white/20 bg-gradient-to-r from-primary-50/50 to-accent-50/50">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-glow">
                          <UserIcon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-secondary-900 truncate">
                            {user?.name || 'User'}
                          </p>
                          <p className="text-2xs text-secondary-500 truncate">
                            {user?.email || 'user@example.com'}
                          </p>
                          {user?.is_admin && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-2xs font-medium bg-gradient-to-r from-accent-500/10 to-primary-500/10 text-accent-700 border border-accent-200/50 mt-1">
                              Administrator
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2">
                      {userMenuItems.map((item, index) => {
                        if (item.type === 'divider') {
                          return (
                            <div key={index} className="h-px bg-secondary-200/50 my-2" />
                          );
                        }

                        const Icon = item.icon;
                        return (
                          <motion.button
                            key={index}
                            onClick={item.action}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-2xl text-sm font-medium transition-all duration-200 ${
                              item.danger 
                                ? 'text-error-600 hover:bg-error-50 hover:text-error-700' 
                                : 'text-secondary-600 hover:bg-white/60 hover:text-secondary-900'
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                            <span>{item.label}</span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
