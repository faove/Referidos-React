import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cog6ToothIcon, 
  UserIcon, 
  BellIcon, 
  ShieldCheckIcon,
  PaintBrushIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

function SettingsPanel({ isOpen, onClose }) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    profile: {
      username: user?.username || '',
      email: user?.email || '',
      firstName: '',
      lastName: '',
      bio: '',
      avatar: ''
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      weeklyReports: true,
      newReferrals: true,
      conversions: true,
      achievements: true
    },
    privacy: {
      publicProfile: false,
      showStats: true,
      allowMessages: true,
      dataSharing: false
    },
    appearance: {
      theme: 'light',
      language: 'es',
      timezone: 'America/Mexico_City',
      dateFormat: 'DD/MM/YYYY'
    }
  });

  const tabs = [
    { id: 'profile', name: 'Perfil', icon: UserIcon },
    { id: 'notifications', name: 'Notificaciones', icon: BellIcon },
    { id: 'privacy', name: 'Privacidad', icon: ShieldCheckIcon },
    { id: 'appearance', name: 'Apariencia', icon: PaintBrushIcon }
  ];

  const handleSave = (section) => {
    toast.success(`${section} guardado exitosamente`);
  };

  const handleChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9997] overflow-hidden"
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
          className="absolute right-0 top-0 h-full w-full max-w-2xl bg-white shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-primary-100 rounded-xl flex items-center justify-center">
                <Cog6ToothIcon className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Configuración</h2>
                <p className="text-sm text-gray-500">Personaliza tu experiencia</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="flex h-full">
            {/* Sidebar */}
            <div className="w-64 border-r border-gray-200 bg-gray-50">
              <nav className="p-4 space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <tab.icon className="h-5 w-5" />
                    <span>{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {activeTab === 'profile' && (
                    <motion.div
                      key="profile"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Información Personal</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                            <input
                              type="text"
                              value={settings.profile.firstName}
                              onChange={(e) => handleChange('profile', 'firstName', e.target.value)}
                              className="input-field"
                              placeholder="Tu nombre"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Apellido</label>
                            <input
                              type="text"
                              value={settings.profile.lastName}
                              onChange={(e) => handleChange('profile', 'lastName', e.target.value)}
                              className="input-field"
                              placeholder="Tu apellido"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Biografía</label>
                            <textarea
                              value={settings.profile.bio}
                              onChange={(e) => handleChange('profile', 'bio', e.target.value)}
                              className="input-field"
                              rows={3}
                              placeholder="Cuéntanos sobre ti..."
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleSave('Perfil')}
                        className="btn-primary"
                      >
                        Guardar Cambios
                      </button>
                    </motion.div>
                  )}

                  {activeTab === 'notifications' && (
                    <motion.div
                      key="notifications"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferencias de Notificación</h3>
                        <div className="space-y-4">
                          {Object.entries(settings.notifications).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                              <div>
                                <p className="font-medium text-gray-900">
                                  {key === 'emailNotifications' && 'Notificaciones por Email'}
                                  {key === 'pushNotifications' && 'Notificaciones Push'}
                                  {key === 'weeklyReports' && 'Reportes Semanales'}
                                  {key === 'newReferrals' && 'Nuevos Referidos'}
                                  {key === 'conversions' && 'Conversiones'}
                                  {key === 'achievements' && 'Logros'}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {key === 'emailNotifications' && 'Recibe notificaciones por correo electrónico'}
                                  {key === 'pushNotifications' && 'Notificaciones en tiempo real'}
                                  {key === 'weeklyReports' && 'Resumen semanal de actividad'}
                                  {key === 'newReferrals' && 'Cuando alguien use tu código'}
                                  {key === 'conversions' && 'Cuando se complete una conversión'}
                                  {key === 'achievements' && 'Cuando desbloquees un logro'}
                                </p>
                              </div>
                              <button
                                onClick={() => handleChange('notifications', key, !value)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                  value ? 'bg-primary-600' : 'bg-gray-200'
                                }`}
                              >
                                <span
                                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    value ? 'translate-x-6' : 'translate-x-1'
                                  }`}
                                />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => handleSave('Notificaciones')}
                        className="btn-primary"
                      >
                        Guardar Preferencias
                      </button>
                    </motion.div>
                  )}

                  {activeTab === 'privacy' && (
                    <motion.div
                      key="privacy"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuración de Privacidad</h3>
                        <div className="space-y-4">
                          {Object.entries(settings.privacy).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                              <div>
                                <p className="font-medium text-gray-900">
                                  {key === 'publicProfile' && 'Perfil Público'}
                                  {key === 'showStats' && 'Mostrar Estadísticas'}
                                  {key === 'allowMessages' && 'Permitir Mensajes'}
                                  {key === 'dataSharing' && 'Compartir Datos'}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {key === 'publicProfile' && 'Hacer tu perfil visible para otros usuarios'}
                                  {key === 'showStats' && 'Mostrar tus estadísticas públicamente'}
                                  {key === 'allowMessages' && 'Permitir que otros te envíen mensajes'}
                                  {key === 'dataSharing' && 'Compartir datos anónimos para mejorar el servicio'}
                                </p>
                              </div>
                              <button
                                onClick={() => handleChange('privacy', key, !value)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                  value ? 'bg-primary-600' : 'bg-gray-200'
                                }`}
                              >
                                <span
                                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    value ? 'translate-x-6' : 'translate-x-1'
                                  }`}
                                />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => handleSave('Privacidad')}
                        className="btn-primary"
                      >
                        Guardar Configuración
                      </button>
                    </motion.div>
                  )}

                  {activeTab === 'appearance' && (
                    <motion.div
                      key="appearance"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Apariencia y Localización</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Tema</label>
                            <select
                              value={settings.appearance.theme}
                              onChange={(e) => handleChange('appearance', 'theme', e.target.value)}
                              className="input-field"
                            >
                              <option value="light">Claro</option>
                              <option value="dark">Oscuro</option>
                              <option value="auto">Automático</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Idioma</label>
                            <select
                              value={settings.appearance.language}
                              onChange={(e) => handleChange('appearance', 'language', e.target.value)}
                              className="input-field"
                            >
                              <option value="es">Español</option>
                              <option value="en">English</option>
                              <option value="fr">Français</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Zona Horaria</label>
                            <select
                              value={settings.appearance.timezone}
                              onChange={(e) => handleChange('appearance', 'timezone', e.target.value)}
                              className="input-field"
                            >
                              <option value="America/Mexico_City">México</option>
                              <option value="America/New_York">Nueva York</option>
                              <option value="Europe/London">Londres</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Formato de Fecha</label>
                            <select
                              value={settings.appearance.dateFormat}
                              onChange={(e) => handleChange('appearance', 'dateFormat', e.target.value)}
                              className="input-field"
                            >
                              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleSave('Apariencia')}
                        className="btn-primary"
                      >
                        Guardar Preferencias
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default SettingsPanel;



