import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./SideBar.css";

const SideBar = ({ isOpen = false, onClose = () => {} }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="sidebar-overlay" onMouseDown={onClose}>
      <aside
        className="sidebar"
        role="dialog"
        aria-modal="true"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button className="sidebar-close" aria-label="Cerrar" onClick={onClose}>
          ×
        </button>
        <nav className="sidebar-nav">
          <Link to="/" onClick={onClose} className="sidebar-item">Inicio</Link>
          <Link to="/shop" onClick={onClose} className="sidebar-item">Tienda</Link>
          <Link to="/cart" onClick={onClose} className="sidebar-item">Carrito</Link>
          <Link to="/account" onClick={onClose} className="sidebar-item">Mi cuenta</Link>
        </nav>
      </aside>
    </div>
  );
};

export default SideBar;