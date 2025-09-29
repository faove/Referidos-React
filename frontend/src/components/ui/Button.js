import React from 'react';
import { motion } from 'framer-motion';

function Button({
  children,
  variant = 'primary', // 'primary', 'secondary', 'ghost', 'accent', 'outline'
  size = 'default', // 'small', 'default', 'large'
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left', // 'left', 'right'
  className = '',
  onClick,
  type = 'button',
  ...props
}) {
  const baseClasses = 'inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-elegant hover:from-primary-700 hover:to-primary-800 hover:shadow-glow focus:ring-primary-500',
    secondary: 'bg-white/60 backdrop-blur-sm text-secondary-700 shadow-soft ring-1 ring-secondary-200/50 hover:bg-white/80 hover:shadow-medium hover:ring-secondary-300/50 focus:ring-primary-500',
    ghost: 'text-secondary-600 hover:bg-secondary-100/50 hover:text-secondary-900 focus:ring-primary-500',
    accent: 'bg-gradient-to-r from-accent-500 to-accent-600 text-white shadow-elegant hover:from-accent-600 hover:to-accent-700 hover:shadow-glow focus:ring-accent-500',
    outline: 'border-2 border-primary-500 text-primary-600 hover:bg-primary-50 focus:ring-primary-500'
  };

  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm rounded-lg',
    default: 'px-6 py-3 text-sm rounded-xl',
    large: 'px-8 py-4 text-base rounded-2xl'
  };

  const iconSizes = {
    small: 'w-3 h-3',
    default: 'w-4 h-4',
    large: 'w-5 h-5'
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const renderIcon = () => {
    if (loading) {
      return (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className={`border-2 border-current border-t-transparent rounded-full ${iconSizes[size]}`}
        />
      );
    }

    if (icon) {
      const IconComponent = icon;
      return <IconComponent className={iconSizes[size]} />;
    }

    return null;
  };

  return (
    <motion.button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={classes}
      {...props}
    >
      {iconPosition === 'left' && renderIcon() && (
        <span className={children ? 'mr-2' : ''}>{renderIcon()}</span>
      )}
      
      {children}
      
      {iconPosition === 'right' && renderIcon() && (
        <span className={children ? 'ml-2' : ''}>{renderIcon()}</span>
      )}
    </motion.button>
  );
}

export default Button;
