import axios from "axios";
import { getAuthToken, clearAuth } from "../utils/auth";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "/api", // solo aquí
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((cfg) => {
  const t = getAuthToken();
  if (t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;
});

api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err.response?.status === 401) {
      clearAuth();
      window.dispatchEvent(new Event("user:changed")); // notifica al app
    }
    return Promise.reject(err);
  }
);

export default api;