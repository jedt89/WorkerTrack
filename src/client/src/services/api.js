import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor - manejo de errores globaal
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      return Promise.reject({
        message: error.response.data?.error || 'Error en la solicitud',
        status: error.response.status
      });
    }
    return Promise.reject({ message: 'Error de conexión' });
  }
);

export default api;
