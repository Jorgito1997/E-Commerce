import {jwtDecode} from "jwt-decode"; // npm i jwt-decode (opcional)

export const setAuthToken = (token) => {
  if (token) localStorage.setItem("authToken", token);
  else localStorage.removeItem("authToken");
};

export const getAuthToken = () => localStorage.getItem("authToken");

export const clearAuth = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
};

// Si usas JWT: comprueba expiración
export const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const { exp } = jwtDecode(token); // exp en segundos
    if (!exp) return false; // no exp presente => no se puede saber
    return Date.now() >= exp * 1000;
  } catch (e) {
    return true; // token no decodificable => tratar como expirado
  }
};

// Estado de autenticación simple
export const isAuthenticated = () => {
  const token = getAuthToken();
  if (!token) return false;
  // si es JWT, verifica exp; si no lo es, devuelve true y opcionalmente validar en backend
  return !isTokenExpired(token);
};