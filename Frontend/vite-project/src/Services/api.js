// ============================================
//  Services/api.js — Axios API Service Layer
// ============================================

import axios from 'axios';

const BASE_URL = 'http://localhost:8888/pages';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// ── Attach token from localStorage on every request ──
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Response interceptor: handle 401 globally ──
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ── Auth Endpoints ──
export const registerUser = (email, password) =>
  api.post('/register', { email, password });

export const loginUser = (email, password) =>
  api.post('/login', { email, password });

export const getDashboard = () =>
  api.get('/dashboard');

export default api;