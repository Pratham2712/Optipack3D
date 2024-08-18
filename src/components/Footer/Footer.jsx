import React from "react";
import linkedIn from "../../assests/linkedin.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <div className="footer-cta">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Settings</a>
          <a href="#">Contact</a>
          <a href="#">Blog</a>
          <a href="#">Features</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
        <div className="social-media">
          <a href="#">
            <img src={linkedIn} />
          </a>
        </div>
        <p style={{ textAlign: "center" }}>
          {" "}
          &copy; 2024 OptiPack3D. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
