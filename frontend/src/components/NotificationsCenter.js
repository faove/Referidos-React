import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BellIcon, 
  XMarkIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  UserPlusIcon,
  TrophyIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

function NotificationsCenter({ isOpen, onClose }) {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Simulated notifications data
    const mockNotifications = [
      {
        id: 1,
        type: 'success',
        title: '¡Nueva conversión!',
        message: 'Tu enlace de referido ha generado una nueva conversión',
        time: '2 minutos',
        read: false,
        icon: CheckCircleIcon,
        color: 'text-green-600',
        bgColor: 'bg-green-100'
      },
      {
        id: 2,
        type: 'info',
        title: 'Nuevo referidor activo',
        message: 'María García se ha unido usando tu código de referido',
        time: '1 hora',
        read: false,
        icon: UserPlusIcon,
        color: 'text-blue-600',
        bgColor: 'bg-blue-100'
      },
      {
        id: 3,
        type: 'warning',
        title: 'Enlace inactivo',
        message: 'Uno de tus enlaces no ha recibido clics en 7 días',
        time: '3 horas',
        read: true,
        icon: ExclamationTriangleIcon,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-100'
      },
      {
        id: 4,
        type: 'achievement',
        title: '¡Logro desbloqueado!',
        message: 'Has alcanzado 10 conversiones este mes',
        time: '1 día',
        read: true,
        icon: TrophyIcon,
        color: 'text-purple-600',
        bgColor: 'bg-purple-100'
      },
      {
        id: 5,
        type: 'success',
        title: 'Pago procesado',
        message: 'Tu comisión de $25.00 ha sido procesada',
        time: '2 días',
        read: true,
        icon: SparklesIcon,
        color: 'text-green-600',
        bgColor: 'bg-green-100'
      }
    ];
    
    setNotifications(mockNotifications);
  }, []);

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    toast.success('Todas las notificaciones marcadas como leídas');
  };

  const deleteNotification = (id) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== id)
    );
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] overflow-hidden"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-primary-100 rounded-xl flex items-center justify-center">
                <BellIcon className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Notificaciones</h2>
                <p className="text-sm text-gray-500">{unreadCount} sin leer</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Filters */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex space-x-2">
              {[
                { key: 'all', label: 'Todas' },
                { key: 'unread', label: 'Sin leer' },
                { key: 'success', label: 'Éxito' },
                { key: 'info', label: 'Info' }
              ].map((filterOption) => (
                <button
                  key={filterOption.key}
                  onClick={() => setFilter(filterOption.key)}
                  className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors ${
                    filter === filterOption.key
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {filterOption.label}
                </button>
              ))}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="mt-3 text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Marcar todas como leídas
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto">
            <AnimatePresence>
              {filteredNotifications.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-12"
                >
                  <BellIcon className="h-12 w-12 text-gray-300 mb-4" />
                  <p className="text-gray-500">No hay notificaciones</p>
                </motion.div>
              ) : (
                filteredNotifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      !notification.read ? 'bg-blue-50/50' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`h-10 w-10 ${notification.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <notification.icon className={`h-5 w-5 ${notification.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={`text-sm font-medium ${
                            !notification.read ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {notification.title}
                          </p>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">{notification.time}</span>
                            {!notification.read && (
                              <div className="h-2 w-2 bg-primary-500 rounded-full"></div>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                          >
                            Marcar como leída
                          </button>
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="text-xs text-red-600 hover:text-red-700 font-medium"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default NotificationsCenter;



