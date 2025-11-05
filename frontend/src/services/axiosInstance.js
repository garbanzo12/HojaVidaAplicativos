// src/services/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/", // tu backend
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("❌ Error en la API:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
