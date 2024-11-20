import React from "react";
import logo from "../../assests/logo-removebg-preview.png";
import "./Footer.css";
import { Link, useNavigate } from "react-router-dom";
import {
  blog,
  contact_us,
  privacy_policy,
  term_condition,
  User_root,
} from "../../constants/links";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="footer">
        <div className="footer-cta">
          <a href="#" onClick={() => navigate(User_root)}>
            Home
          </a>
          <a href="#">About</a>
          {/* <a href="#">Settings</a> */}
          <Link to={contact_us}>Contact</Link>
          <Link to={blog}>Blog</Link>
          <a href="#feature-tab">Features</a>
          <Link to={privacy_policy}>Privacy Policy</Link>
          <Link to={term_condition}>Terms of Service</Link>
        </div>
        <div className="logo-footer">
          <img src={logo} alt="" />
          <div>OptiPack3D</div>
        </div>
        <div className="social-media">
          <a href="#">
            <i class="fa-brands fa-linkedin"></i>
          </a>
          {/* <a href="#">
            <i class="fa-brands fa-square-x-twitter"></i>
          </a> */}
          <a href="mailto:shahrukh@optipack3d.com">
            <i class="fa-solid fa-envelope"></i>{" "}
          </a>
        </div>
        <p style={{ textAlign: "center" }}>
          {" "}
          &copy; 2024 OptiPack3D. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
