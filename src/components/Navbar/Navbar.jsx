import React from "react";
import logo from "../../assests/logo.png";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { free_trail } from "../../constants/links";

const Navbar = () => {
  return (
    <>
      <nav>
        <img
          src={logo}
          style={{ height: "40px", width: "55px", margin: "10px" }}
        />
        <div class="logo">OptiPack3D</div>
        <div class="CTA">
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
        <div class="nav-buttons">
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

          <a class="btn-secondary">Login/Signup</a>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
