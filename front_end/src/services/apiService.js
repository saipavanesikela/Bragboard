import axios from 'axios';

// This is the main axios instance for your app
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// This interceptor adds the auth token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default api;

// --- AUTHENTICATION ---
export const loginUser = (credentials) => {
  return api.post('/auth/token', new URLSearchParams(credentials), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};

export const registerUser = (userData) => {
  return api.post('/auth/register', userData);
};

export const getCurrentUser = () => {
    return api.get('/users/me');
};

// --- USERS ---
export const getAllUsers = () => {
    return api.get('/users/');
}

// --- SHOUTOUTS ---
export const getShoutouts = () => {
  return api.get('/shoutouts/');
};

export const createShoutout = (shoutoutData) => {
  return api.post('/shoutouts/', shoutoutData);
};

// --- ANALYTICS ---
export const getAdminInsights = () => {
  return api.get('/analytics/insights');
};

export const getLeaderboard = () => {
  return api.get('/analytics/leaderboard');
};

export const getDepartmentHighlights = () => {
  return api.get('/analytics/departments');
};
