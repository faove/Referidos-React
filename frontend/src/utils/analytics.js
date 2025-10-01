// frontend/src/utils/analytics.js
// Analytics utility functions for fetching dynamic data for all environments.

// -----------------------------------------------------------------------------
// CONFIGURACIÓN MULTI-ENTORNO (Clave)
// -----------------------------------------------------------------------------
// Determina la URL base:
// 1. Usa process.env.REACT_APP_API_URL si está definida (ej. en desarrollo: http://localhost:5000).
// 2. Si no está definida (ej. en un build de producción sin la variable),
//    usa la URL de producción como fallback.
const BASE_URL = process.env.REACT_APP_API_URL || 'https://panel.erpelantar.com';

// Agregamos el endpoint base del API.
const API_BASE_URL = `${BASE_URL}/api`;

// -----------------------------------------------------------------------------
// UTILITY: Manejo de Peticiones y Autenticación
// -----------------------------------------------------------------------------

/**
 * Función genérica para hacer peticiones GET con autenticación (cookies).
 * @param {string} endpoint - La parte final de la URL (ej. '/stats').
 * @returns {Promise<any>} - Los datos JSON de la respuesta.
 */
const fetchData = async (endpoint, errorName) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      // CRUCIAL: Incluye las cookies de sesión
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Lanza un error específico para que el componente pueda redirigir
        throw new Error(`Not authenticated to fetch ${errorName} (401)`);
      }
      throw new Error(`Failed to fetch ${errorName}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${errorName}:`, error);
    // Vuelve a lanzar el error para que el componente que llama lo capture
    throw error;
  }
};


// -----------------------------------------------------------------------------
// EXPORTS: Funciones de Fetch Específicas
// -----------------------------------------------------------------------------

// Fetch user analytics trends
export const fetchUserAnalytics = () => {
  return fetchData('/analytics/trends', 'user analytics data');
};

// Fetch admin analytics trends
export const fetchAdminAnalytics = () => {
  return fetchData('/analytics/admin-trends', 'admin analytics data');
};

// Fetch user stats
export const fetchUserStats = () => {
  return fetchData('/stats', 'user stats');
};

// -----------------------------------------------------------------------------
// EXPORTS: Helper para Formateo de Datos (Sin Cambios)
// -----------------------------------------------------------------------------

/**
 * Helper function to format trend data for StatsCard.
 * @param {object} trendData - Los datos de tendencia completos.
 * @param {string} type - El tipo de tendencia a extraer (ej. 'clicks', 'conversions').
 * @returns {object|null} - Datos formateados para la tarjeta o null.
 */
export const formatTrendData = (trendData, type) => {
  if (!trendData || !trendData[type]) {
    return null;
  }

  const trend = trendData[type];
  return {
    data: trend.data,
    period: trend.period,
    change: trend.change,
    changeType: trend.changeType
  };
};