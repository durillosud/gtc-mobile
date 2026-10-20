import axios from "axios";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || "http://gnuteca-ng.local/api/v1",
  withCredentials: true, // Crucial para o envio e recepção de cookies HttpOnly do BFF
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para auto-renovação de tokens via BFF em caso de expiração (401)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/bff/auth/")
    ) {
      originalRequest._retry = true;
      try {
        await api.post("/bff/auth/refresh-token", {});
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
