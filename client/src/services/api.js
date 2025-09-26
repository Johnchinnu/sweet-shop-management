import axios from 'axios';

// Create an instance of axios with a base URL for our backend
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Your server's address
  headers: {
    'Content-Type': 'application/json',
  },
});

/*
  Add a request interceptor to include the token in all requests.
  This logic checks if a token exists in localStorage and, if so,
  adds it to the Authorization header of every outgoing request.
*/
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;