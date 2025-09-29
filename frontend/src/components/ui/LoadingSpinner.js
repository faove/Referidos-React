import React from 'react';
import { motion } from 'framer-motion';

function LoadingSpinner({ size = 'default', color = 'primary', message = 'Loading...' }) {
  const sizeClasses = {
    small: 'w-4 h-4',
    default: 'w-8 h-8',
    large: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    primary: 'border-primary-500',
    secondary: 'border-secondary-500',
    accent: 'border-accent-500',
    white: 'border-white'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className={`border-4 border-transparent border-t-current rounded-full ${sizeClasses[size]} ${colorClasses[color]}`}
      />
      {message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-secondary-600"
        >
          {message}
        </motion.p>
      )}
    </div>
  );
}

export default LoadingSpinner;
