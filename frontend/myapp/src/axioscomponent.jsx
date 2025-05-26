import axios from 'axios';
import { toast } from 'react-toastify';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'https://aits-groupl-90wo.onrender.com/api/', // Replace with your API base URL
  headers: { 'Content-Type': 'application/json' },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve the access token from localStorage
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response;
  },
  async (error) => {
    // Handle errors, including token expiration
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      try {
        const { data } = await axios.post('https://aits-groupl-90wo.onrender.com/api/token/refresh/', { refresh: refreshToken });
        localStorage.setItem('accessToken', data.access);
        originalRequest.headers.Authorization = `Bearer ${data.access}`;
        return axiosInstance(originalRequest); // Retry the original request with the new token
      } catch (err) {
        console.error('Refresh token expired or invalid', err);
        toast.info("Session timeout")
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/'; // Redirect to login page
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
