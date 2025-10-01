import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

function StatsCard({ 
  title, 
  value, 
  change, 
  changeType = 'positive', 
  icon: Icon, 
  gradient,
  description,
  trend,
  periodText = 'vs last period',
  trendPeriodText = 'Last 7 days',
  animated = true,
  size = 'default' // 'small', 'default', 'large'
}) {
  const changeColor = changeType === 'positive' ? 'text-success-600' : 
                     changeType === 'negative' ? 'text-error-600' : 
                     'text-secondary-400';

  const changeIcon = changeType === 'positive' ? '↗' : 
                    changeType === 'negative' ? '↘' : 
                    '→';

  const sizeClasses = {
    small: 'p-4',
    default: 'p-6',
    large: 'p-8'
  };

  const titleSizes = {
    small: 'text-sm',
    default: 'text-base',
    large: 'text-lg'
  };

  const valueSizes = {
    small: 'text-xl',
    default: 'text-3xl',
    large: 'text-4xl'
  };

  const iconSizes = {
    small: 'w-8 h-8',
    default: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className={`card-premium hover-glow group ${sizeClasses[size]}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className={`font-semibold text-secondary-600 mb-1 ${titleSizes[size]}`}>
            {title}
          </h3>
          {description && (
            <p className="text-2xs text-secondary-400 leading-relaxed">
              {description}
            </p>
          )}
        </div>
        
        {Icon && (
          <div className={`${iconSizes[size]} bg-gradient-to-br ${gradient} p-3 rounded-2xl shadow-glow flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
            <Icon className={`${size === 'small' ? 'w-4 h-4' : size === 'large' ? 'w-8 h-8' : 'w-6 h-6'} text-white`} />
          </div>
        )}
      </div>

      {/* Value */}
      <div className="mb-4">
        <div className={`font-bold text-secondary-900 mb-1 ${valueSizes[size]}`}>
          {animated && typeof value === 'number' ? (
            <CountUp
              end={value}
              duration={2}
              preserveValue
              separator=","
            />
          ) : (
            value
          )}
        </div>
        
        {(change !== undefined && change !== null) && (
          <div className={`flex items-center space-x-1 text-sm ${changeColor}`}>
            <span className="font-semibold">
              {change !== 0 ? `${changeIcon} ${Math.abs(change)}%` : '0%'}
            </span>
            <span className="text-secondary-400">{periodText}</span>
          </div>
        )}
      </div>

      {/* Trend Chart or Additional Info */}
      {trend && trend.length > 0 && (
        <div className="mt-4 pt-4 border-t border-white/20">
          <div className="flex items-center justify-between text-2xs text-secondary-500">
            <span>{trendPeriodText}</span>
            <span className={changeColor}>
              {changeType === 'positive' ? 'Trending up' : 
               changeType === 'negative' ? 'Trending down' : 
               'No activity'}
            </span>
          </div>
          
          {/* Simple trend visualization (CORRECCIÓN DE SINTAXIS APLICADA) */}
          <div className="mt-2 h-8 flex items-end space-x-1">
            {
              (() => { // Usamos una IIFE para declarar variables dentro del JSX
                // Calculamos el valor máximo de forma segura
                const maxValue = Math.max(...trend);
                const safeMax = maxValue > 0 ? maxValue : 1;
                
                return trend.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ height: 0 }}
                    // Usamos safeMax para calcular la altura
                    animate={{ height: `${(point / safeMax) * 100}%` }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className={`flex-1 bg-gradient-to-t ${gradient} rounded-sm opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
                    style={{ minHeight: '2px' }}
                  />
                ));
              })()
            }
          </div>
        </div>
      )}

      {/* Progress bar for percentage values */}
      {typeof value === 'number' && value <= 100 && size !== 'small' && (
        <div className="mt-4">
          <div className="w-full bg-secondary-100 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${value}%` }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className={`h-full bg-gradient-to-r ${gradient} rounded-full`}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default StatsCard;