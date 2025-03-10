import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Middleware untuk menyertakan token secara otomatis
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Ambil token dari localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Tambahkan token ke header
  }
  return config;
});

export default axiosInstance;



