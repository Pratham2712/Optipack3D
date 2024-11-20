import React, { useEffect, useRef, useState } from "react";
import logo from "../../assests/logo.png";
import dashboard from "../../assests/dashboard.png";
import eye from "../../assests/eye.png";
import eye_hide from "../../assests/eye hide.png";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import { BASE_URL } from "../../constants/constants";
import {
  admin_setting,
  new_user,
  planner_order,
  privacy_policy,
  User_root,
} from "../../constants/links";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setPasswordThunk } from "../../redux/Slices/authSlice";

const SetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { forgot } = location.state || {};
  console.log(forgot, "location");

  //useSelector

  const userId = useSelector(
    (state) => state.rootReducer.authSlice.data.user.user_id
  );
  const user = useSelector((state) => state.rootReducer.authSlice.data.user);

  const loading = useSelector((state) => state.rootReducer.authSlice.loading);

  const schema = yup.object().shape({
    password: yup
      .string()
      .required("Password is required")
      .min(3, "Password must be at least 3 characters"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  //function============================================================================================================================
  const handleToggle = () => {
    setShowPassword(!showPassword);
  };
  const onSubmit = (data) => {
    const info = {
      userId: userId,
      password: data.password,
    };
    const formData = new FormData();
    Object.keys(info).forEach((key) => {
      formData.append(key, info[key]);
    });
    if (!forgot) return;
    if (forgot && !user.isPassword) return;
    dispatch(setPasswordThunk(formData)).then((data) => {
      if (data.payload["ERROR"]) {
        toast.error(data.payload["ERROR"], {
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#713200",
          },
        });
      }
      if (data.payload["SUCCESS"]?.message) {
        toast.success(data.payload["SUCCESS"]?.message, {
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#713200",
          },
        });
        if (user?.userType == "Company_Admin") {
          navigate(admin_setting);
        } else if (user?.userType == "Company_planner") {
          navigate(planner_order);
        } else {
          navigate(new_user);
        }
      }
    });
  };

  const handleSkip = () => {
    if (user?.userType == "Company_Admin") {
      navigate(admin_setting);
    } else if (user?.userType == "Company_planner") {
      navigate(planner_order);
    } else {
      navigate(new_user);
    }
  };

  //useEffect=====================================================================================================================

  return (
    <div className="container">
      <div className="left-side">
        <div className="logo" onClick={() => navigate(User_root)}>
          <img src={logo} alt="ShelfLyf Logo" />
          <span
            style={{ fontWeight: "600", fontSize: "22px", lineHeight: "24px" }}
          >
            Optipack
          </span>
        </div>
        <div style={{ position: "relative" }}>
          <h1>{forgot ? "Change Password" : "Set Password"}</h1>
          {!forgot && <p className="subtitle">Set password for quick access</p>}

          <>
            {true && (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div class="input-group">
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Enter password"
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
                  {errors.password && (
                    <p className="error" style={{ left: "10%", top: "100%" }}>
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div class="input-group">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Confirm password"
                    {...register("confirmPassword")}
                    style={{ position: "relative" }}
                  />
                  {errors.confirmPassword && (
                    <p className="error" style={{ left: "10%", top: "100%" }}>
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn-cancel"
                  style={{ marginRight: "1.5rem" }}
                  onClick={handleSkip}
                >
                  Skip
                </button>
                <button type="submit" className="btn-apply">
                  Save
                </button>
              </form>
            )}
          </>
        </div>

        <footer>
          <p>
            ©2024 Container Builder ·{" "}
            <Link to={privacy_policy}>Privacy & terms</Link>
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

export default SetPassword;
