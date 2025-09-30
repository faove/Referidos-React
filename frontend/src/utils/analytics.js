// Analytics utility functions for fetching dynamic data

const API_BASE_URL = 'https://panel.erpelantar.com/api';

// Fetch user analytics trends
export const fetchUserAnalytics = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/analytics/trends`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch analytics data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user analytics:', error);
    throw error;
  }
};

// Fetch admin analytics trends
export const fetchAdminAnalytics = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/analytics/admin-trends`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch admin analytics data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching admin analytics:', error);
    throw error;
  }
};

// Fetch user stats
export const fetchUserStats = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/stats`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user stats');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user stats:', error);
    throw error;
  }
};

// Helper function to format trend data for StatsCard
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
