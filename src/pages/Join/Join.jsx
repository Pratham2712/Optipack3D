import React from "react";
import logo from "../../assests/logo.png";
import dashboard from "../../assests/dashboard.png";
import "./Join.css";
import { useNavigate } from "react-router-dom";
import {
  loginurl,
  privacy_policy,
  signupurl,
  User_root,
} from "../../constants/links";
const Join = () => {
  const navigate = useNavigate();
  return (
    <div class="container">
      <div class="left-side">
        <div class="logo" onClick={() => navigate(User_root)}>
          <img src={logo} alt="ShelfLyf Logo" />
          <span
            style={{ fontWeight: "600", fontSize: "22px", lineHeight: "24px" }}
          >
            Optipack
          </span>
        </div>
        <div>
          <h1>Welcome to our platform</h1>
          <p class="subtitle">Design your optimized load plan</p>
          <div class="button-group">
            <button
              class="action-button"
              onClick={() => {
                navigate(loginurl);
              }}
            >
              Login
            </button>
            <button class="action-button" onClick={() => navigate(signupurl)}>
              Register
            </button>
          </div>
        </div>

        <footer>
          <p>
            ©2024 Container Builder ·{" "}
            <a href="#" onClick={() => navigate(privacy_policy)}>
              Privacy & terms
            </a>
          </p>
        </footer>
      </div>
      <div class="right-side">
        <div class="testimonial">
          <p>
            “Current container utilisation for good transfer is in the range of
            70-75% and freight shipment charges (Shippageddon 2.0) is further
            leading to increase in costs thereby impacting bottom line.
            Optipack3d can assist in optimally designing your load plan by
            creating a realizable load plan and strengthening your loading
            process”.
          </p>
        </div>
        <div class="dashboard-image">
          <img src={dashboard} alt="Dashboard" />
        </div>
      </div>
    </div>
  );
};

export default Join;
