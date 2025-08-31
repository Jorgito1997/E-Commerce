import { useEffect, useState } from "react";
import { isAuthenticated, getAuthToken } from "../utils/auth";
import api from "../api/axiosClient";

export default function useAuth() {
  const [auth, setAuth] = useState({ authenticated: isAuthenticated(), token: getAuthToken() });

  useEffect(() => {
    const onChange = () => setAuth({ authenticated: isAuthenticated(), token: getAuthToken() });
    window.addEventListener("user:changed", onChange);
    return () => window.removeEventListener("user:changed", onChange);
  }, []);

  // opcional: validar token contra backend
  const validateServer = async () => {
    try {
      await api.get("/auth/validate"); // endpoint que debe devolver 200 si token ok
      setAuth({ authenticated: true, token: getAuthToken() });
      return true;
    } catch {
      setAuth({ authenticated: false, token: null });
      return false;
    }
  };

  return { ...auth, validateServer };
}