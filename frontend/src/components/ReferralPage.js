import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  SparklesIcon, 
  UserIcon, 
  ArrowRightIcon,
  CheckCircleIcon,
  GiftIcon,
  StarIcon,
  HeartIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline';
import axios from 'axios';
import toast from 'react-hot-toast';
import Confetti from 'react-confetti';

function ReferralPage() {
  const { linkCode } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [referrer, setReferrer] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  const trackReferralClick = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/referral/${linkCode}`);
      setReferrer(response.data.referrer);
      
      // Store the referral link code in localStorage for later use during registration
      localStorage.setItem('referralLinkCode', linkCode);
    } catch (error) {
      toast.error('Enlace de referido inválido');
    } finally {
      setLoading(false);
    }
  }, [linkCode]);

  useEffect(() => {
    trackReferralClick();
  }, [linkCode, trackReferralClick]);

  const handleConversion = async () => {
    try {
      await axios.post(`http://localhost:5000/api/referral/${linkCode}/convert`);
      setShowConfetti(true);
      toast.success('¡Gracias! Tu conversión ha sido registrada.');
      setTimeout(() => setShowConfetti(false), 5000);
    } catch (error) {
      toast.error('Error al registrar la conversión');
    }
  };

  const handleNavigateToLogin = () => {
    // The referral code is already stored in localStorage from trackReferralClick
    // Navigate to login page - the referral code will be used during registration
    navigate('/login');
  };

  const features = [
    {
      icon: GiftIcon,
      title: 'Recompensas Exclusivas',
      description: 'Obtén beneficios únicos por cada referido'
    },
    {
      icon: StarIcon,
      title: 'Programa Premium',
      description: 'Accede a funciones avanzadas del sistema'
    },
    {
      icon: HeartIcon,
      title: 'Comunidad Activa',
      description: 'Únete a una red de usuarios comprometidos'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      {showConfetti && <Confetti />}
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow"></div>
      </div>

      <div className="relative z-10 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="sm:mx-auto sm:w-full sm:max-w-md"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto h-20 w-20 bg-gradient-to-br from-primary-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl mb-6"
            >
              <SparklesIcon className="h-10 w-10 text-white" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              ¡Bienvenido!
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-xl text-gray-600 mb-2"
            >
              Has sido invitado por <span className="font-semibold text-primary-600">{referrer}</span>
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-gray-500"
            >
              Únete a nuestro programa de referidos y comienza a ganar
            </motion.p>
          </div>

          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="card-premium p-8 mb-8"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                ¿Qué te espera?
              </h2>
              <p className="text-gray-600">
                Descubre los beneficios de nuestro programa
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl"
                >
                  <div className="h-12 w-12 bg-primary-100 rounded-xl flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <motion.button
                onClick={handleNavigateToLogin}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="btn-primary w-full py-4 text-lg font-semibold flex items-center justify-center space-x-2"
              >
                <UserIcon className="h-5 w-5" />
                <span>Crear Cuenta / Iniciar Sesión</span>
                <ArrowRightIcon className="h-5 w-5" />
              </motion.button>

              <motion.button
                onClick={handleConversion}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.3 }}
                className="btn-secondary w-full py-4 text-lg font-semibold flex items-center justify-center space-x-2"
              >
                <CheckCircleIcon className="h-5 w-5" />
                <span>Registrar Conversión</span>
              </motion.button>

              <motion.a
                href="/"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                className="block text-center text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
              >
                Ir al Inicio
              </motion.a>
            </div>
          </motion.div>

          {/* Success Message */}
          <AnimatePresence>
            {showConfetti && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="card-premium p-6 text-center"
              >
                <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircleIcon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  ¡Conversión Registrada!
                </h3>
                <p className="text-gray-600">
                  Gracias por unirte a nuestro programa. Tu referidor ha sido notificado.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="text-center mt-8"
          >
            <div className="flex items-center justify-center space-x-2 text-gray-500 mb-2">
              <RocketLaunchIcon className="h-4 w-4" />
              <span className="text-sm">Programa de Referidos</span>
            </div>
            <p className="text-xs text-gray-400">
              Este enlace fue generado por nuestro sistema de referidos
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default ReferralPage;