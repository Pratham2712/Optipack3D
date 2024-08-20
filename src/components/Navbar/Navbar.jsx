import React, { useState } from "react";
import logo from "../../assests/logo.png";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { free_trail, join } from "../../constants/links";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <>
      <nav>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={logo}
            style={{ height: "40px", width: "55px", margin: "10px" }}
          />
          <div class="logo">OptiPack3D</div>
        </div>
        <div className={`CTA ${menuOpen ? "open" : ""}`}>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="#">Features</a>
            </li>
            <li>
              <a href="#">Settings</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>
        <div className={`nav-buttons ${menuOpen ? "open" : ""}`}>
          <NavLink
            to={free_trail}
            style={{
              width: "100%",
              textDecoration: "none",
            }}
            className="btn"
          >
            Free Trail
          </NavLink>
          <NavLink
            to={join}
            style={{
              width: "100%",
              textDecoration: "none",
            }}
            className="btn-secondary"
          >
            Login/Signup
          </NavLink>
        </div>
        <div className="menu-icon" onClick={toggleMenu}>
          {menuOpen ? <span>&#10005;</span> : <span>&#9776;</span>}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
