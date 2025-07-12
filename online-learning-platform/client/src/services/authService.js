import axios from 'axios';

// 1. Set base URL properly (adjust if using proxy)
const API_URL = 'http://localhost:5000/api/auth'; // Full backend URL

// Configure axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor for auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Register user
const register = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    
    // Store token if received
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  } catch (error) {
    console.error('Registration error:', error.response?.data);
    throw error.response?.data || error.message;
  }
};

// Login user
const login = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response?.data);
    throw error.response?.data || error.message;
  }
};

// Get user data
const getMe = async () => {
  try {
    const response = await api.get('/me');
    return response.data;
  } catch (error) {
    console.error('Get user error:', error.response?.data);
    logout(); // Auto-logout if token is invalid
    throw error.response?.data || error.message;
  }
};

// Logout user
const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  delete api.defaults.headers.Authorization;
};

const authService = {
  register,
  login,
  getMe,
  logout
};

export default authService;