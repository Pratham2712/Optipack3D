import React from "react";
import logo from "../../assests/logo-removebg-preview.png";
import "./Footer.css";
import { useNavigate } from "react-router-dom";
import {
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
          <a href="#">Contact</a>
          <a href="#">Blog</a>
          <a href="#feature-tab">Features</a>
          <a href="#" onClick={() => navigate(privacy_policy)}>
            Privacy Policy
          </a>
          <a href="#" onClick={() => navigate(term_condition)}>
            Terms of Service
          </a>
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
          <a href="#">
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
