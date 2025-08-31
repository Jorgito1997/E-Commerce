import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, clearAuth } from "../../utils/auth";
import { Container, Nav, Navbar } from "react-bootstrap";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { Platform } from "../../Platform";
import { Strings } from "../../utils/strings";
import SearchBar from "../SeachBar/SearchBar"; // <-- import del SearchBar

import { IconFacebook, IconWhatsapp } from "../Icons";
import SideBar from "../SideBar/SideBar";
import Drawer from "../Drawer/Drawer";

const NavBar = () => {
  const { cartList } = useSelector((state) => state.cart);
  const [expand, setExpand] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  // nuevo estado para el menú de perfil
  const [showProfileMenu, setShowProfileMenu] = useState(true);
  const navigate = useNavigate();
  const profileRef = useRef(null);

  // auth state (usa localStorage, validación jwt en utils/auth.js)
  const [isLoggedIn, setIsLoggedIn] = useState(() => isAuthenticated());
  const [authUser, setAuthUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const onUserChanged = () => {
      setIsLoggedIn(isAuthenticated());
      try {
        setAuthUser(JSON.parse(localStorage.getItem("user")));
      } catch {
        setAuthUser(null);
      }
    };
    window.addEventListener("user:changed", onUserChanged);
    return () => window.removeEventListener("user:changed", onUserChanged);
  }, []);

  const handleLogout = () => {
    clearAuth();
    setIsLoggedIn(false);
    setAuthUser(null);
    window.dispatchEvent(new Event("user:changed"));
    navigate("/login");
  };

  // helper: cuando el SearchBar en el navbar llame a setFilterList
  // guardamos resultados temporalmente y navegamos a /shop para mostrar
  const handleNavbarFilter = (list) => {
    try {
      sessionStorage.setItem("navbarFilter", JSON.stringify(list));
    } catch (e) {
      /* ignore */
    }
    navigate("/shop");
  };

  // cerrar menú con Escape y sincronizar login entre pestañas
  useEffect(() => {
    function onStorage(e) {
      if (e.key === "user") setIsLoggedIn(Boolean(e.newValue));
    }
    function onKey(e) {
      if (e.key === "Escape") setShowProfileMenu(false);
    }
    window.addEventListener("storage", onStorage);
    document.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("storage", onStorage);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // fixed Header
  function scrollHandler() {
    if (window.scrollY >= 100) {
      setIsFixed(true);
    } else if (window.scrollY <= 50) {
      setIsFixed(false);
    }
  }
  window.addEventListener("scroll", scrollHandler);

  // cerrar menú al click fuera
  useEffect(() => {
    function handleOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  function handleToggleProfile() {
    setShowProfileMenu((s) => !s);
  }

  function handleLogin() {
    setShowProfileMenu(false);
    // navegar a login (ajusta ruta si hace falta)
    navigate("/login");
  }

  return (
    <>
      <Navbar
        fixed="top"
        expand="md"
        className={isFixed ? "navbar fixed" : "navbar"}
      >
        <Container fluid className="navbar-container">
          {/* left toggle / brand */}
          <div className="left-corner">

            <button
              type="button"
              className="left-toggle-btn"
              aria-label="Abrir menú"
              // onClick={() => setSidebarOpen(true)}
            >
              <div className="transparent-btn">
                <svg
                  className="left-toggle-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <rect x="3" y="5" width="18" height="2" rx="1" fill="currentColor" />
                  <rect x="3" y="11" width="18" height="2" rx="1" fill="currentColor" />
                  <rect x="3" y="17" width="18" height="2" rx="1" fill="currentColor" />
                </svg>
              </div>
            </button>

            <Navbar.Brand to="/" className="brand-wrap">
              <img src="/atpm.svg" alt="logo" width="56" />
              <h1 className="logo">{Platform.AppName}</h1>
            </Navbar.Brand>
          </div>

          {/* SearchBar centrado */}
          <div className="navbar-search-center">
            <SearchBar setFilterList={handleNavbarFilter} />
          </div>

          {/* Media cart and profile (derecha) */}
          <div className="navbar-actions d-flex">
            <div className="media-cart">
              <div className="profile-wrap" ref={profileRef}>
                <button
                  type="button"
                  aria-label="Profile"
                  className="transparent-btn profile"
                  onClick={handleToggleProfile}
                >
                  {/* perfil svg */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="nav-icon" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                  </svg>
                </button>

                {showProfileMenu && (
                  <div className="profile-dropdown" role="menu" aria-hidden={!showProfileMenu}>
                    {isLoggedIn ? (
                      <>
                        <div className="dropdown-header">{authUser?.name || authUser?.email || "Cuenta"}</div>
                        <button
                          type="button"
                          className="dropdown-item"
                          onClick={() => {
                            setShowProfileMenu(false);
                            navigate("/account");
                          }}
                        >
                          Perfil
                        </button>
                        <button
                          type="button"
                          className="dropdown-item"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          className="dropdown-item"
                          onClick={() => {
                            setShowProfileMenu(false);
                            navigate("/login");
                          }}
                        >
                          Login
                        </button>
                        <button
                          type="button"
                          className="dropdown-item"
                          onClick={() => {
                            setShowProfileMenu(false);
                            navigate("/register");
                          }}
                        >
                          Crear cuenta
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>

              <button
                aria-label="Go to Cart Page"
                className="cart transparent-btn"
                data-num={cartList.length}
                // onClick={() => setDrawerOpen(true)}
              >
                {/* ícono carrito */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="black"
                  className="nav-icon"
                >
                  <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                </svg>
              </button>
            </div>
          </div>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Item>
                <Link
                  aria-label="Go to Home Page"
                  className="navbar-link"
                  to="/"
                  onClick={() => setExpand(false)}
                >
                  <span className="nav-link-label">{Strings.linkHome}</span>
                </Link>
              </Nav.Item>

              <Nav.Item>
                <Link
                  aria-label="Go to Shop Page"
                  className="navbar-link"
                  to="/shop"
                  onClick={() => setExpand(false)}
                >
                  <span className="nav-link-label">{Strings.linkShop}</span>
                </Link>
              </Nav.Item>

              <Nav.Item>
                <Link
                  aria-label="Go to Cart Page"
                  className="navbar-link"
                  to="/cart"
                  onClick={() => setExpand(false)}
                >
                  <span className="nav-link-label">{Strings.linkCart}</span>
                </Link>
              </Nav.Item>

              <Nav.Item>
                <div className="profile-wrap" ref={profileRef}>
                  <button
                    type="button"
                    aria-label="Profile"
                    className="transparent-btn profile"
                    onClick={handleToggleProfile}
                  >
                    {/* perfil svg */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="nav-icon" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                    </svg>
                  </button>

                  {showProfileMenu && (
                    <div className="profile-dropdown" role="menu" aria-hidden={!showProfileMenu}>
                      {isLoggedIn ? (
                        <>
                          <div className="dropdown-header">{authUser?.name || authUser?.email || "Cuenta"}</div>
                          <button
                            type="button"
                            className="dropdown-item"
                            onClick={() => {
                              setShowProfileMenu(false);
                              navigate("/account");
                            }}
                          >
                            Perfil
                          </button>
                          <button
                            type="button"
                            className="dropdown-item"
                            onClick={handleLogout}
                          >
                            Logout
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            className="dropdown-item"
                            onClick={() => {
                              setShowProfileMenu(false);
                              navigate("/login");
                            }}
                          >
                            Login
                          </button>
                          <button
                            type="button"
                            className="dropdown-item"
                            onClick={() => {
                              setShowProfileMenu(false);
                              navigate("/register");
                            }}
                          >
                            Crear cuenta
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </Nav.Item>

              <Nav.Item className="expanded-cart">
                <Link
                  aria-label="Go to Cart Page"
                  to="/cart"
                  className="cart"
                  data-num={cartList.length}
                >
                  <div className="transparent-btn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="black"
                      className="nav-icon"
                    >
                      <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                    </svg>
                  </div>
                </Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* SideBar & Drawer (controlados por el navbar) */}
      {/* <SideBar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} /> */}
      <Drawer
        // isOpen={drawerOpen}
        // onClose={() => setDrawerOpen(false)}
        title="Carrito / Perfil"
      />
    </>
  );
};

export default NavBar;
