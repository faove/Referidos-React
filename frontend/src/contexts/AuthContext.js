import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/profile`, {
        withCredentials: true
      });
      setUser(response.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
        username,
        password
      }, {
        withCredentials: true
      });
      
      setUser(response.data.user);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Error de inicio de sesión' 
      };
    }
  };

  const register = async (username, email, password) => {
    try {
      // Get referral link code from localStorage if it exists
      const referralLinkCode = localStorage.getItem('referralLinkCode');
      
      const requestData = {
        username,
        email,
        password
      };
      
      // Include referral link code if available
      if (referralLinkCode) {
        requestData.referralLinkCode = referralLinkCode;
      }
      
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/register`, requestData);
      
      // Clear the referral link code from localStorage after successful registration
      if (referralLinkCode) {
        localStorage.removeItem('referralLinkCode');
      }
      
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.error || 'Error de registro' 
      };
    }
  };

  const logout = async () => {
    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/logout`, {}, {
        withCredentials: true
      });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      setUser(null);
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}