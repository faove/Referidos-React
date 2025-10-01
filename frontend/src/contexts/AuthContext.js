import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// -----------------------------------------------------------------------------
// CONFIGURACIÓN MULTI-ENTORNO (Corrección Clave)
// -----------------------------------------------------------------------------
// 1. Usa la variable de entorno (para desarrollo: http://localhost:5000).
// 2. Si no está definida (producción), usa la URL final.
const BASE_URL = process.env.REACT_APP_API_URL || 'https://panel.erpelantar.com';
const API_BASE_URL = `${BASE_URL}/api`;

// -----------------------------------------------------------------------------
// CONFIGURACIÓN GLOBAL DE AXIOS
// IMPORTANTE: Asegura que Axios SIEMPRE envíe cookies con todas las peticiones
axios.defaults.withCredentials = true;
// -----------------------------------------------------------------------------


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Verificar el estado de autenticación al cargar la app
  const checkAuthStatus = async () => {
    try {
      // USANDO API_BASE_URL
      const response = await axios.get(`${API_BASE_URL}/user/profile`);
      setUser(response.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      // USANDO API_BASE_URL (Axios ya tiene withCredentials=true globalmente)
      const response = await axios.post(`${API_BASE_URL}/login`, {
        username,
        password
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
      const referralLinkCode = localStorage.getItem('referralLinkCode');
      
      const requestData = {
        username,
        email,
        password
      };
      
      if (referralLinkCode) {
        requestData.referralLinkCode = referralLinkCode;
      }
      
      // USANDO API_BASE_URL (La registración no necesita withCredentials ya que no se envían cookies)
      const response = await axios.post(`${API_BASE_URL}/register`, requestData);
      
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
      // USANDO API_BASE_URL
      await axios.post(`${API_BASE_URL}/logout`);
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