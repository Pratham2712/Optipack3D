import React, { useState } from "react";
import logo from "../../assests/logo.png";
import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import {
  admin_setting,
  blog,
  contact_us,
  free_trail,
  join,
  new_user,
  planner_order,
  User_root,
} from "../../constants/links";
import { useScroll } from "../../Util/ScrollContext";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollToFeatures } = useScroll();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const isLogin = useSelector((state) => state.rootReducer.authSlice.isLogin);
  const user = useSelector((state) => state.rootReducer.authSlice.data.user);

  const redirect = () => {
    if (user?.userType == "Company_Admin") {
      navigate(admin_setting);
    } else if (user?.userType == "Company_planner") {
      navigate(planner_order);
    } else {
      navigate(new_user);
    }
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
          {!isLogin ? (
            <NavLink
              to={free_trail}
              style={{
                textDecoration: "none",
              }}
              className="btn-secondary"
            >
              Free Trial
            </NavLink>
          ) : (
            <></>
          )}

          {isLogin ? (
            <button
              style={{
                textDecoration: "none",
                background: "white",
                border: "2px solid #cc9c87",
                color: "black",
              }}
              className="btn-secondary"
              onClick={redirect}
            >
              My Load Planner
            </button>
          ) : (
            <NavLink
              to={join}
              style={{
                textDecoration: "none",
              }}
              className="btn-secondary"
            >
              Login/Signup
            </NavLink>
          )}
        </div>
        <div className="menu-icon" onClick={toggleMenu}>
          {menuOpen ? <span>&#10005;</span> : <span>&#9776;</span>}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
