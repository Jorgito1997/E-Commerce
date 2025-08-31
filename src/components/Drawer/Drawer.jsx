// filepath: d:\Dev\React\E-Commerce\src\components\Drawer\Drawer.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Drawer.css";

const Drawer = ({ isOpen = false, onClose = () => {}, title = "Detalle" }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" onMouseDown={onClose}>
      <aside
        className="drawer"
        role="dialog"
        aria-modal="true"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="drawer-header">
          <h4>{title}</h4>
          <button className="drawer-close" aria-label="Cerrar" onClick={onClose}>×</button>
        </div>

        <div className="drawer-body">
          {/* ejemplo: contenido del drawer (puedes reemplazar por listado de carrito) */}
          <p className="muted">Aquí puedes renderizar el contenido dinámico del drawer.</p>
          <Link to="/cart" onClick={onClose} className="drawer-action">Ir al carrito</Link>
        </div>
      </aside>
    </div>
  );
};

export default Drawer;