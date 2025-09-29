import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  EyeIcon, 
  EyeSlashIcon, 
  UserIcon, 
  LockClosedIcon, 
  EnvelopeIcon,
  SparklesIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  StarIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [hasReferralCode, setHasReferralCode] = useState(false);

  const { login, register } = useAuth();

  useEffect(() => {
    // Check if user has a referral code from localStorage
    const referralCode = localStorage.getItem('referralLinkCode');
    setHasReferralCode(!!referralCode);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let result;
      if (isLogin) {
        result = await login(formData.username, formData.password);
      } else {
        result = await register(formData.username, formData.email, formData.password);
      }

      if (result.success) {
        if (isLogin) {
          toast.success('Welcome back! 🎉');
        } else {
          toast.success(`Registration successful! Your referral code is: ${result.data.referral_code}`);
          setIsLogin(true);
          setFormData({ username: '', email: '', password: '' });
        }
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const formVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    },
    exit: { 
      opacity: 0, 
      y: 30,
      transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  const features = [
    {
      icon: RocketLaunchIcon,
      title: "Launch Your Success",
      description: "Start earning with our powerful referral system"
    },
    {
      icon: ShieldCheckIcon,
      title: "Secure & Trusted",
      description: "Enterprise-grade security for your peace of mind"
    },
    {
      icon: StarIcon,
      title: "Premium Experience",
      description: "Enjoy our premium platform features and support"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50/30 flex items-center justify-center p-2 sm:p-4 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Simplified background gradients */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-500/20 to-accent-500/15 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-accent-500/15 to-primary-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-primary-400/10 to-accent-400/10 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center relative z-10"
      >
        {/* Left Side - Branding & Features */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center lg:text-left order-2 lg:order-1"
        >
          <div className="mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "backOut" }}
              className="inline-flex items-center space-x-3 mb-6"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-3xl flex items-center justify-center shadow-glow">
                <SparklesIcon className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-3xl font-bold text-gradient">Elantar Referral Program</h1>
                <p className="text-sm text-secondary-500 font-medium">ERP - Elantar Edition</p>
              </div>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-secondary-900 mb-4"
            >
              Welcome to the
              <span className="text-gradient block">Future of Referrals</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-lg text-secondary-600 leading-relaxed max-w-md mx-auto lg:mx-0"
            >
              Join thousands of successful referrers earning with our premium platform. 
              Start your journey today and unlock unlimited earning potential.
            </motion.p>
          </div>

          {/* Features */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex items-center space-x-4 p-4 rounded-2xl bg-white/40 backdrop-blur-sm border border-white/30 hover:bg-white/60 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-soft">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-secondary-900">{feature.title}</h3>
                  <p className="text-sm text-secondary-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {hasReferralCode && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="mt-6 p-4 bg-gradient-to-r from-success-50 to-emerald-50 border border-success-200 rounded-2xl"
            >
              <div className="flex items-center space-x-2 text-success-700">
                <SparklesIcon className="w-5 h-5" />
                <span className="font-medium">Special Invitation Detected!</span>
              </div>
              <p className="text-sm text-success-600 mt-1">
                You've been invited to join. Complete registration to activate your benefits.
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full max-w-md mx-auto order-1 lg:order-2"
        >
          <div className="card-premium p-6 sm:p-8 lg:p-10">
            {/* Form Header */}
            <div className="text-center mb-8">
              <motion.h3 
                className="text-2xl font-bold text-secondary-900 mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </motion.h3>
              <motion.p 
                className="text-secondary-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {isLogin ? 'Sign in to your account' : 'Join the premium referral network'}
              </motion.p>
            </div>

            {/* Form Toggle */}
            <div className="flex bg-secondary-100/50 rounded-2xl p-1 mb-8">
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 px-6 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isLogin
                    ? 'bg-white text-primary-600 shadow-soft'
                    : 'text-secondary-600 hover:text-secondary-900'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 px-6 rounded-xl text-sm font-medium transition-all duration-300 ${
                  !isLogin
                    ? 'bg-white text-primary-600 shadow-soft'
                    : 'text-secondary-600 hover:text-secondary-900'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Form */}
            <AnimatePresence mode="wait">
              <motion.form
                key={isLogin ? 'login' : 'register'}
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Username Field */}
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-500" />
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="input-premium pl-12"
                      placeholder="Enter your username"
                      required
                    />
                  </div>
                </div>

                {/* Email Field (Registration only) */}
                <AnimatePresence>
                  {!isLogin && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <EnvelopeIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-500" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="input-premium pl-12"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <LockClosedIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="input-premium pl-12 pr-12"
                      placeholder="Enter your password"
                      required
                      autoComplete="new-password"
                      style={{
                        WebkitAppearance: 'none',
                        MozAppearance: 'none',
                        appearance: 'none'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-secondary-600 transition-colors"
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="w-5 h-5" />
                      ) : (
                        <EyeIcon className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-primary py-4 flex items-center justify-center space-x-2 relative overflow-hidden"
                >
                  {loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      <span className="text-base font-semibold">
                        {isLogin ? 'Sign In' : 'Create Account'}
                      </span>
                      <ArrowRightIcon className="w-5 h-5" />
                    </>
                  )}
                </motion.button>

                {/* Additional Options */}
                {isLogin && (
                  <div className="text-center">
                    <button
                      type="button"
                      className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
                    >
                      Forgot your password?
                    </button>
                  </div>
                )}
              </motion.form>
            </AnimatePresence>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-secondary-200/50 text-center">
              <p className="text-sm text-secondary-500">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Simplified floating elements */}
      <div className="absolute top-20 right-20 w-4 h-4 bg-primary-500/40 rounded-full hidden lg:block"></div>
      <div className="absolute bottom-32 left-20 w-6 h-6 bg-accent-500/30 rounded-full hidden lg:block"></div>
    </div>
  );
}

export default Login;
