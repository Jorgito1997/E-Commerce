import { useEffect, useState, useRef } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Platform } from "../../Platform";
import { Strings } from "../../utils/strings";

const SubNavbar = () => {

    const [showLeftMenu, setShowLeftMenu] = useState(false);
    const leftMenuRef = useRef(null);

    useEffect(() => {
        function handleOutside(e) {
            if (leftMenuRef.current && !leftMenuRef.current.contains(e.target)) {
                setShowLeftMenu(false);
            }
        }
        function handleEsc(e) {
            if (e.key === "Escape") setShowLeftMenu(false);
        }
        document.addEventListener("mousedown", handleOutside);
        document.addEventListener("keydown", handleEsc);
        return () => {
            document.removeEventListener("mousedown", handleOutside);
            document.removeEventListener("keydown", handleEsc);
        };
    }, []);

    return (
        <div
        >

            <Navbar
                style={{
                    backgroundColor: "var(--primary-color, red)", // aplicar aquí
                    minHeight: "56px",
                    boxShadow: '0px 10px 10px 0px rgba(9, 5, 29, 0.171)'
                }}
            >
                <Container className="navbar-container">

                    <Navbar.Toggle
                        aria-controls="basic-navbar-nav"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </Navbar.Toggle>

                    {/* left aligned toggle */}
                    <div ref={leftMenuRef} className="left-toggle">
                        <button
                            type="button"
                            className="left-toggle-btn"
                            aria-haspopup="true"
                            aria-expanded={showLeftMenu}
                            onClick={() => setShowLeftMenu((s) => !s)}
                        >
                            
                        </button>

                        {showLeftMenu && (
                            <div className="left-toggle-menu" role="menu" aria-label="Left menu">
                                <Link to="/" className="left-menu-item" onClick={() => setShowLeftMenu(false)}>Home</Link>
                                <Link to="/shop" className="left-menu-item" onClick={() => setShowLeftMenu(false)}>Shop</Link>
                                <Link to="/cart" className="left-menu-item" onClick={() => setShowLeftMenu(false)}>Cart</Link>
                            </div>
                        )}
                    </div>

                </Container>
            </Navbar>
        </div>
    )
}

export default SubNavbar;