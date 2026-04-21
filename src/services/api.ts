import axios from "axios";
import { useAuthStore } from "../app/store";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});


// 🔥 REQUEST → inject token proprement
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  console.log("🔥 TOKEN ENVOYÉ:", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


// 🔥 RESPONSE → gestion erreurs propre
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error.response?.status;

    console.log("🔥 API ERROR:", status, error.response?.data);

    // 🔴 uniquement si vrai problème auth
    if (status === 401) {
      console.log("🔴 TOKEN EXPIRE → LOGOUT");

      useAuthStore.getState().logout();

      // évite refresh brutal pendant debug
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);