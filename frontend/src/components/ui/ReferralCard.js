import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LinkIcon, 
  ClipboardDocumentIcon,
  EyeIcon,
  ChartBarIcon,
  UserGroupIcon,
  CalendarIcon,
  ShareIcon,
  QrCodeIcon,
  CheckIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

function ReferralCard({ link, onViewDetails, compact = false }) {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  const shareLink = async (linkData) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join with my referral link',
          text: 'Get exclusive benefits by joining through my referral!',
          url: `${window.location.origin}/referral/${linkData.code}`
        });
      } catch (error) {
        copyToClipboard(`${window.location.origin}/referral/${linkData.code}`);
      }
    } else {
      copyToClipboard(`${window.location.origin}/referral/${linkData.code}`);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="card hover-lift p-3 sm:p-4 group"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-glow">
              <LinkIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-secondary-900 truncate max-w-32">
                {link.code}
              </p>
              <p className="text-2xs text-secondary-500">
                {link.clicks} clicks
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => copyToClipboard(`${window.location.origin}/referral/${link.code}`)}
              className="p-2 rounded-xl bg-secondary-100/50 hover:bg-secondary-200/50 transition-colors"
            >
              {copied ? (
                <CheckIcon className="w-4 h-4 text-success-600" />
              ) : (
                <ClipboardDocumentIcon className="w-4 h-4 text-secondary-600" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card-premium group overflow-hidden"
    >
      {/* Header with gradient background */}
      <div className="relative p-6 bg-gradient-to-br from-primary-50/50 to-accent-50/30 border-b border-white/20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5" />
        
        <div className="relative flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-accent-500 rounded-3xl flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300">
              <LinkIcon className="w-7 h-7 text-white" />
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-secondary-900 mb-1">
                {link.code}
              </h3>
              <div className="flex items-center space-x-4 text-sm text-secondary-500">
                <div className="flex items-center space-x-1">
                  <CalendarIcon className="w-4 h-4" />
                  <span>Created {formatDate(link.created_at)}</span>
                </div>
                {link.expires_at && (
                  <div className="flex items-center space-x-1">
                    <span>Expires {formatDate(link.expires_at)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center space-x-2">
            {link.is_active ? (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-2xs font-medium bg-success-100 text-success-700 border border-success-200">
                <div className="w-2 h-2 bg-success-500 rounded-full mr-2 animate-pulse" />
                Active
              </span>
            ) : (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-2xs font-medium bg-secondary-100 text-secondary-700 border border-secondary-200">
                <div className="w-2 h-2 bg-secondary-500 rounded-full mr-2" />
                Inactive
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mx-auto mb-2 shadow-glow">
              <EyeIcon className="w-6 h-6 text-white" />
            </div>
            <p className="text-lg sm:text-2xl font-bold text-secondary-900">{link.clicks}</p>
            <p className="text-2xs sm:text-xs text-secondary-500 font-medium">Total Clicks</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl mx-auto mb-2 shadow-glow">
              <UserGroupIcon className="w-6 h-6 text-white" />
            </div>
            <p className="text-lg sm:text-2xl font-bold text-secondary-900">{link.conversions || 0}</p>
            <p className="text-2xs sm:text-xs text-secondary-500 font-medium">Conversions</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mx-auto mb-2 shadow-glow">
              <ChartBarIcon className="w-6 h-6 text-white" />
            </div>
            <p className="text-lg sm:text-2xl font-bold text-secondary-900">
              {link.clicks > 0 ? Math.round((link.conversions || 0) / link.clicks * 100) : 0}%
            </p>
            <p className="text-2xs sm:text-xs text-secondary-500 font-medium">Conversion Rate</p>
          </div>
        </div>

        {/* URL Display */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            Referral Link
          </label>
          <div className="flex items-center space-x-2">
            <div className="flex-1 px-4 py-3 bg-secondary-50/50 border border-secondary-200/50 rounded-xl text-sm font-mono text-secondary-700 truncate">
              {window.location.origin}/referral/{link.code}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => copyToClipboard(`${window.location.origin}/referral/${link.code}`)}
              className={`p-3 rounded-xl border transition-all duration-300 ${
                copied 
                  ? 'bg-success-100 border-success-200 text-success-600' 
                  : 'bg-white border-secondary-200 text-secondary-600 hover:bg-secondary-50'
              }`}
            >
              {copied ? (
                <CheckIcon className="w-5 h-5" />
              ) : (
                <ClipboardDocumentIcon className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => shareLink(link)}
            className="btn-secondary flex items-center justify-center space-x-2"
          >
            <ShareIcon className="w-4 h-4" />
            <span>Share</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onViewDetails(link)}
            className="btn-primary flex items-center justify-center space-x-2"
          >
            <ChartBarIcon className="w-4 h-4" />
            <span>Analytics</span>
          </motion.button>
        </div>

        {/* QR Code Toggle */}
        <div className="mt-4 pt-4 border-t border-white/20">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowQR(!showQR)}
            className="w-full btn-ghost flex items-center justify-center space-x-2"
          >
            <QrCodeIcon className="w-4 h-4" />
            <span>{showQR ? 'Hide' : 'Show'} QR Code</span>
          </motion.button>
          
          <AnimatePresence>
            {showQR && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 flex justify-center"
              >
                <div className="w-32 h-32 bg-white rounded-2xl p-4 border border-secondary-200/50 shadow-soft">
                  {/* QR Code placeholder - you can integrate a QR code library here */}
                  <div className="w-full h-full bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-xl flex items-center justify-center">
                    <QrCodeIcon className="w-12 h-12 text-secondary-400" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Premium indicator */}
      {link.is_premium && (
        <div className="absolute top-4 right-4">
          <div className="flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-accent-500 to-primary-500 rounded-full shadow-glow">
            <SparklesIcon className="w-3 h-3 text-white" />
            <span className="text-2xs font-medium text-white">Premium</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default ReferralCard;
