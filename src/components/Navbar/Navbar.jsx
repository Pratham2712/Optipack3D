import React, { useState } from "react";
import logo from "../../assests/logo.png";
import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import {
  blog,
  contact_us,
  free_trail,
  join,
  User_root,
} from "../../constants/links";
import { useScroll } from "../../Util/ScrollContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollToFeatures } = useScroll();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav>
        <div
          style={{ display: "flex", alignItems: "center" }}
          onClick={() => navigate(User_root)}
        >
          <img
            src={logo}
            style={{
              height: "40px",
              width: "55px",
              margin: "10px",
              cursor: "pointer",
            }}
          />
          <div class="logo">OptiPack3D</div>
        </div>
        <div className={`CTA ${menuOpen ? "open" : ""}`}>
          <ul>
            {/* <li>
              <a href="#">Home</a>
            </li> */}
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <NavLink to={blog}>Blog</NavLink>
            </li>
            <li onClick={scrollToFeatures}>
              <a href="#feature-tab">Features</a>
            </li>
            {/* <li>
              <a href="#">Settings</a>
            </li> */}
            <li>
              <NavLink to={contact_us}>Contact</NavLink>
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
            Free Trial
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
