import axios from 'axios';

// Create a single, configured Axios instance for the entire application.
// This is the base for all API calls.
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1',
  // Default content type is JSON. Specific calls can override this.
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Axios Request Interceptor
 * This function automatically attaches the JWT token to the Authorization header
 * for every single request sent from the app, if a token exists in localStorage.
 * This avoids having to add the token manually to every authenticated API call.
 */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    // If the token exists, add it to the request header
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  // Handle request errors
  return Promise.reject(error);
});


// --- Authentication Functions ---

/**
 * Logs in a user.
 * NOTE: FastAPI's OAuth2 expects form data, not JSON.
 * We override the default 'Content-Type' header for this specific request.
 * @param {object} credentials - User's login details.
 * @param {string} credentials.username - The user's email.
 * @param {string} credentials.password - The user's password.
 * @returns {Promise} Axios promise with the response.
 */
export const loginUser = (credentials) => {
  // Convert the credentials object to URLSearchParams for the form-data request
  const formData = new URLSearchParams(credentials);

  return api.post('/auth/token', formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};

/**
 * Registers a new user.
 * This endpoint expects a standard JSON payload.
 * @param {object} userData - New user's registration details.
 * @returns {Promise} Axios promise with the response.
 */
export const registerUser = (userData) => {
  // The correct RESTful endpoint for creating a user is typically '/users/'
  return api.post('/users/', userData);
};

/**
 * Fetches the details of the currently authenticated user.
 * The interceptor will automatically add the required auth token.
 * @returns {Promise} Axios promise with the user's data.
 */
export const getCurrentUser = () => {
  return api.get('/users/me');
};


// --- Shoutout Functions ---

/**
 * Fetches a list of shoutouts, with an optional filter for department.
 * @param {string|null} department - Optional department name to filter by.
 * @returns {Promise} Axios promise with the list of shoutouts.
 */
export const getShoutouts = (department = null) => {
  const params = {};
  if (department) {
    params.department = department;
  }
  return api.get('/shoutouts/', { params });
};

/**
 * Creates a new shoutout.
 * @param {object} shoutoutData - The data for the new shoutout.
 * @returns {Promise} Axios promise with the created shoutout data.
 */
export const createShoutout = (shoutoutData) => {
  return api.post('/shoutouts/', shoutoutData);
};


// --- Analytics & Admin Functions ---

/**
 * Fetches administrative insights.
 * @returns {Promise} Axios promise with analytics data.
 */
export const getAdminInsights = () => {
  return api.get('/analytics/insights');
};

/**

 * Fetches the employee leaderboard.
 * @returns {Promise} Axios promise with leaderboard data.
 */
export const getLeaderboard = () => {
  return api.get('/analytics/leaderboard');
};

/**
 * Fetches highlights for all departments.
 * @returns {Promise} Axios promise with department highlights.
 */
export const getDepartmentHighlights = () => {
  return api.get('/analytics/departments');
};

// You can still export the default instance if you need to use it directly elsewhere
export default api;
