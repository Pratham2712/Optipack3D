import React, { useState } from "react";
import logo from "../../assests/logo.png";
import dashboard from "../../assests/dashboard.png";
import eye from "../../assests/eye.png";
import eye_hide from "../../assests/eye hide.png";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../../redux/Slices/authSlice";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const errorMsg = useSelector(
    (state) => state.rootReducer.authSlice.errorData.message
  );
  // Toggle password visibility
  const handleToggle = () => {
    setShowPassword(!showPassword);
  };
  const handleBlur = async (e) => {
    await trigger(e.target.name);
  };
  const onSubmit = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    dispatch(loginThunk(formData));
  };
  const schema = yup.object().shape({
    password: yup
      .string()
      .required("Password is required")
      .min(3, "Password must be at least 3 characters"),
    email: yup
      .string()
      .required("Email is required")
      .email("Email must be a valid email address"),
  });

  const {
    handleSubmit,
    setError,
    trigger,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      password: "",
      email: "",
    },
  });
  return (
    <div className="container">
      <div className="left-side">
        <div className="logo">
          <img src={logo} alt="ShelfLyf Logo" />
          <span
            style={{ fontWeight: "600", fontSize: "22px", lineHeight: "24px" }}
          >
            Optipack
          </span>
        </div>
        <div style={{ position: "relative" }}>
          <h1>Welcome to our platform</h1>
          <h1>Login to your account</h1>
          <p className="subtitle">Design your optimized load plan</p>
          <div className="all-errors2">{errorMsg}</div>

          <div className="input-group">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email address"
              {...register("email")}
              onBlur={handleBlur}
            />
            {errors?.email && (
              <div className="error">{errors?.email?.message}</div>
            )}
          </div>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Password"
              style={{ position: "relative" }}
              {...register("password")}
              onBlur={handleBlur}
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
            {errors?.password && (
              <div className="error">{errors?.password?.message}</div>
            )}
          </div>
          <div className="options">
            <div className="remember-me">
              <input type="checkbox" id="remember-me" name="remember-me" />
              <label for="remember-me">Remember me</label>
            </div>
            <div className="forgot-password">
              <a href="#">Forgot password?</a>
            </div>
          </div>
          <div
            className="g-recaptcha"
            data-sitekey="6LenihQqAAAAAAVcWTmdA7jl7THorDvWHJfRVV-5"
          ></div>
          <button
            type="submit"
            className="login-button"
            onClick={handleSubmit(onSubmit)}
          >
            Let's go!
          </button>
        </div>

        <footer>
          <p>
            ©2024 Container Builder · <a href="#">Privacy & terms</a>
          </p>
        </footer>
      </div>
      <div className="right-side">
        <div className="testimonial">
          <p>
            “Current container utilisation for good transfer is in the range of
            70-75% and freight shipment charges (Shippageddon 2.0) is further
            leading to increase in costs thereby impacting bottom line.
            Optipack3d can assist in optimally designing your load plan by
            creating a realizable load plan and strengthening your loading
            process”.
          </p>
        </div>
        <div className="dashboard-image">
          <img src={dashboard} alt="Dashboard" />
        </div>
      </div>
    </div>
  );
};

export default Login;
