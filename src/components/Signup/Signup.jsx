import React, { useState } from "react";
import eye_hide from "../../assests/eye hide.png";
import eye from "../../assests/eye.png";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  // Toggle password visibility
  const handleToggle = () => {
    setShowPassword(!showPassword);
  };
  return (
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
  );
};

export default Signup;
