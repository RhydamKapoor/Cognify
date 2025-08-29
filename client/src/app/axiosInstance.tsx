"use client";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  withCredentials: true,
});

// 🔑 separate instance without interceptors for refresh
const refreshInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  withCredentials: true,
});

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // use plain refresh instance so it won’t loop
        await refreshInstance.post("/auth/refresh");

        // retry the original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token expired:", refreshError);
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
