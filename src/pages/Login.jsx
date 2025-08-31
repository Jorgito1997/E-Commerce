import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../components/Navbar/navbar.css"; // asegura que la variable --primary-color esté cargada
import "../styles/Login.css"
import api from "../api/axiosClient";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Por favor completa todos los campos.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post("/user/login", { email, password });
      // espera que la API responda { user: {...}, token: "..." }
      if (data?.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      if (data?.token) {
        localStorage.setItem("authToken", data.token);
      }
      window.dispatchEvent(new Event("user:changed"));
      setLoading(false);
      navigate("/");
    } catch (err) {
      setLoading(false);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Error al autenticar. Intenta de nuevo."
      );
    }
  };

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="brand">
          <img src="/atpm.svg" alt="logo" width="128" />
          <h1>Iniciar sesión</h1>
        </div>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          {error && <div className="login-error" role="alert">{error}</div>}

          <label className="input-group">
            <span className="label">Correo</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tucorreo@ejemplo.com"
              aria-label="Correo electrónico"
              required
            />
          </label>

          <label className="input-group">
            <span className="label">Contraseña</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              aria-label="Contraseña"
              required
            />
          </label>

          <div className="form-actions">
            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? "Ingresando..." : "Ingresar"}
            </button>
          </div>

          <div className="alt-actions" >
            <Link to="/forgot">¿Olvidaste tu contraseña?</Link>
            <span>·</span>
            <Link to="/register">Crear cuenta</Link>
          </div>

        </form>
      </section>
    </main>
  );
};

export default Login;