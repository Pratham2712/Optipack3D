import React, { useState } from "react";
import eye_hide from "../../assests/eye hide.png";
import eye from "../../assests/eye.png";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  // Toggle password visibility
  const handleToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <h1>Login to your account</h1>
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
      <div class="options">
        <div class="remember-me">
          <input type="checkbox" id="remember-me" name="remember-me" />
          <label for="remember-me">Remember me</label>
        </div>
        <div class="forgot-password">
          <a href="#">Forgot password?</a>
        </div>
      </div>
      <div
        class="g-recaptcha"
        data-sitekey="6LenihQqAAAAAAVcWTmdA7jl7THorDvWHJfRVV-5"
      ></div>
      <button type="submit" class="login-button">
        Let's go!
      </button>
    </div>
  );
};

export default Login;
