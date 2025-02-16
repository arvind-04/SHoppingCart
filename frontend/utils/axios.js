import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const API = axios.create({ baseURL: BASE_URL, withCredentials: true });

// Request interceptor
API.interceptors.request.use(
  (config) => {
    console.log('Request:', config.url, config.data);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default API;
