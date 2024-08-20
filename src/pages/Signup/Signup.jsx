import React, { useState } from "react";
import logo from "../../assests/logo.png";
import dashboard from "../../assests/dashboard.png";
import eye from "../../assests/eye.png";
import eye_hide from "../../assests/eye hide.png";
const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  // Toggle password visibility
  const handleToggle = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div class="container">
      <div class="left-side">
        <div class="logo">
          <img src={logo} alt="ShelfLyf Logo" />
          <span
            style={{ fontWeight: "600", fontSize: "22px", lineHeight: "24px" }}
          >
            Optipack
          </span>
        </div>
        <div>
          <h1>Register your Company</h1>
          <p class="subtitle">Design your optimized load plan</p>
          <div class="input-group">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email address"
              required
            />
          </div>
          <div class="input-group">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Password"
              required
              style={{ position: "relative" }}
            />
            <button
              type="button"
              onClick={handleToggle}
              style={{
                position: "absolute",
                right: "13%",
                top: "0",
                height: "100%",
                border: "none",
                background: "none",
                cursor: "pointer",
              }}
            >
              {showPassword ? (
                <img src={eye} />
              ) : (
                <img src={eye_hide} alt="password" />
              )}
            </button>
          </div>
          <div class="input-group">
            <input
              type="text"
              id="company-name"
              name="company-name"
              placeholder="Company Name"
              required
            />
          </div>
          <div class="options">
            <div class="remember-me">
              <input type="checkbox" id="remember-me" name="remember-me" />
              <label for="remember-me">Remember me</label>
            </div>
            <div class="forgot-password">
              <a href="#">Forgot password?</a>
            </div>
          </div>
          <button type="submit" class="login-button">
            Let's go!
          </button>
        </div>

        <footer>
          <p>
            ©2024 Container Builder · <a href="#">Privacy & terms</a>
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

export default Signup;
