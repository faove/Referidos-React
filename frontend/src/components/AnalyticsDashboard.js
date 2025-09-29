import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon, 
  ArrowTrendingUpIcon, 
  EyeIcon,
  UserGroupIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  StarIcon,
  BoltIcon
} from '@heroicons/react/24/outline';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import CountUp from 'react-countup';
import toast from 'react-hot-toast';

function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      // Simulated analytics data - in real app, this would come from API
      const mockData = {
        totalClicks: 1247,
        totalConversions: 89,
        conversionRate: 7.1,
        topReferrers: [
          { name: 'Juan Pérez', clicks: 156, conversions: 12 },
          { name: 'María García', clicks: 134, conversions: 9 },
          { name: 'Carlos López', clicks: 98, conversions: 7 },
          { name: 'Ana Martínez', clicks: 87, conversions: 6 },
          { name: 'Luis Rodríguez', clicks: 76, conversions: 5 }
        ],
        dailyStats: [
          { day: 'Lun', clicks: 45, conversions: 3 },
          { day: 'Mar', clicks: 67, conversions: 5 },
          { day: 'Mié', clicks: 89, conversions: 7 },
          { day: 'Jue', clicks: 123, conversions: 9 },
          { day: 'Vie', clicks: 156, conversions: 12 },
          { day: 'Sáb', clicks: 98, conversions: 6 },
          { day: 'Dom', clicks: 67, conversions: 4 }
        ],
        hourlyStats: [
          { hour: '00:00', clicks: 12 },
          { hour: '06:00', clicks: 23 },
          { hour: '12:00', clicks: 89 },
          { hour: '18:00', clicks: 156 },
          { hour: '24:00', clicks: 45 }
        ],
        deviceStats: [
          { name: 'Desktop', value: 45, color: '#3b82f6' },
          { name: 'Mobile', value: 35, color: '#10b981' },
          { name: 'Tablet', value: 20, color: '#f59e0b' }
        ]
      };
      
      setAnalytics(mockData);
    } catch (error) {
      toast.error('Error al cargar las estadísticas');
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      name: 'Clics Totales',
      value: analytics?.totalClicks || 0,
      change: '+12.5%',
      changeType: 'positive',
      icon: EyeIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      name: 'Conversiones',
      value: analytics?.totalConversions || 0,
      change: '+8.2%',
      changeType: 'positive',
      icon: ArrowTrendingUpIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      name: 'Tasa de Conversión',
      value: analytics?.conversionRate || 0,
      change: '-2.1%',
      changeType: 'negative',
      icon: ChartBarIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      name: 'Referidores Activos',
      value: analytics?.topReferrers?.length || 0,
      change: '+5.3%',
      changeType: 'positive',
      icon: UserGroupIcon,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <ChartBarIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Analytics Avanzados</h1>
                <p className="text-gray-600">Insights detallados de tu programa de referidos</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="input-field w-auto"
              >
                <option value="7d">Últimos 7 días</option>
                <option value="30d">Últimos 30 días</option>
                <option value="90d">Últimos 90 días</option>
              </select>
            </div>
          </div>
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card-premium p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`h-12 w-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className={`flex items-center space-x-1 text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.changeType === 'positive' ? (
                    <ArrowUpIcon className="h-4 w-4" />
                  ) : (
                    <ArrowDownIcon className="h-4 w-4" />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-900">
                  <CountUp end={stat.value} duration={2} />
                  {stat.name === 'Tasa de Conversión' && '%'}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Daily Stats Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card-premium p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <ArrowTrendingUpIcon className="h-5 w-5 text-primary-600 mr-2" />
              Actividad Diaria
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={analytics?.dailyStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="clicks" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                <Area type="monotone" dataKey="conversions" stackId="2" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Device Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="card-premium p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <BoltIcon className="h-5 w-5 text-primary-600 mr-2" />
              Dispositivos
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics?.deviceStats}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {analytics?.deviceStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {analytics?.deviceStats.map((device, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: device.color }}></div>
                    <span className="text-sm text-gray-600">{device.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{device.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Top Referrers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="card-premium overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <StarIcon className="h-5 w-5 text-primary-600 mr-2" />
              Top Referidores
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {analytics?.topReferrers.map((referrer, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{referrer.name}</p>
                      <p className="text-sm text-gray-500">{referrer.clicks} clics • {referrer.conversions} conversiones</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary-600">{referrer.conversions}</p>
                    <p className="text-sm text-gray-500">conversiones</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default AnalyticsDashboard;


