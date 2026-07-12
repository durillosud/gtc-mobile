import axios from "axios";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || "http://gnuteca-ng.local/api/v1",
  withCredentials: true, // Crucial para o envio e recepção de cookies HttpOnly do BFF
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
