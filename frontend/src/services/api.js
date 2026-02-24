import axios from 'axios';

// Utiliser la variable d'environnement ou une URL par défaut
// En développement local: http://localhost:5000
// En production: utilisera REACT_APP_API_URL si défini
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://travel-agency-k953.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Intercepteur pour ajouter le token JWT aux requêtes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentification
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (userData) => api.post('/auth/login', userData),
};

// Voyages
export const tripsAPI = {
  getAll: () => api.get('/trips'),
  create: (tripData) => api.post('/trips', tripData),
};

// Réservations
export const bookingsAPI = {
  getAll: () => api.get('/bookings'),
  create: (bookingData) => api.post('/bookings', bookingData),
  update: (id, updateData) => api.put(`/bookings/${id}`, updateData),
};

export default api;