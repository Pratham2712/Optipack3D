import React, { useEffect, useRef, useState } from "react";
import logo from "../../assests/logo.png";
import dashboard from "../../assests/dashboard.png";
import eye from "../../assests/eye.png";
import eye_hide from "../../assests/eye hide.png";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import {
  checkEmailThunk,
  loginThunk,
  sendOtpThunk,
  verifyLoginThunk,
} from "../../redux/Slices/authSlice";
import Loader from "../../components/Loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import {
  admin_setting,
  new_user,
  planner_order,
  signupurl,
  User_root,
} from "../../constants/links";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [minuteLeft, setMinuteLeft] = useState("00");
  const [secondLeft, setSecondLeft] = useState("00");
  const [otpTime, setOtpTime] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [email, setEmail] = useState("");
  const inputsRef = useRef([]);
  const navigate = useNavigate(); // Get the navigate function

  const publicEmailDomains = [
    //"gmail.com",
    "yahoo.com",
    "outlook.com",
    "hotmail.com",
    "aol.com",
  ];
  const dispatch = useDispatch();
  //useSelector
  const otpSend = useSelector((state) => state.rootReducer.authSlice.otpSend);

  const loading = useSelector((state) => state.rootReducer.authSlice.loading);
  const errorMsg = useSelector(
    (state) => state.rootReducer.authSlice.errorData.message
  );
  const userType = useSelector(
    (state) => state.rootReducer.authSlice.data.user.userType
  );
  // Toggle password visibility
  const handleToggle = () => {
    setShowPassword(!showPassword);
  };
  const handleBlur = async (e) => {
    await trigger(e.target.name);
  };
  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, "");

    if (value) {
      const currentValues = getValues("otp");
      const newValues = [...currentValues];
      newValues[index] = value;
      setValue3("otp", newValues);
      if (index < 5 && value) {
        inputsRef.current[index + 1].focus();
      }
    }
  };
  const handleBackspace = (element, index) => {
    const newOtp = [...otp];
    // Clear the current input
    if (element.target.value === "") {
      if (index > 0) {
        inputsRef.current[index - 1].focus(); // Move focus to previous input
        newOtp[index - 1] = ""; // Clear previous input value
      }
    } else {
      newOtp[index] = ""; // Clear current input value
    }
    setOtp(newOtp);
  };
  const resendTimer = (inputTime) => {
    const givenTime = new Date(inputTime);
    const currentTime = new Date();
    const expirationTime = new Date(givenTime.getTime() + 2 * 60 * 1000);
    const timeDifference = expirationTime - currentTime;
    if (timeDifference <= 0) {
      return true;
    }
    const minutesLeft = Math.floor(timeDifference / (1000 * 60));
    setMinuteLeft(minutesLeft);
    const secondsLeft = Math.floor((timeDifference % (1000 * 60)) / 1000);
    setSecondLeft(secondsLeft);
    // return `${minutesLeft}:${secondsLeft < 10 ? "0" : ""}${secondsLeft}`;
    return false;
  };
  const sendOtp = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    setEmail(data?.email);

    dispatch(checkEmailThunk(formData)).then((data) => {
      if (data.payload["ERROR"]) {
        dispatch(sendOtpThunk(formData)).then((data) => {
          if (data.payload["ERROR"]) {
            toast.error(data.payload["ERROR"], {
              style: {
                border: "1px solid #713200",
                padding: "16px",
                color: "#713200",
              },
            });
          }
          if (data.payload["SUCCESS"]) {
            toast.success(data.payload["SUCCESS"], {
              style: {
                border: "1px solid #713200",
                padding: "16px",
                color: "#713200",
              },
            });
            setOtpTime(data.payload.sendTime);
            setIsResendDisabled(true);
          }
        });
      } else {
        toast.error(data.payload["SUCCESS"], {
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#713200",
          },
        });
      }
    });
  };

  const extractDomain = (email) => {
    const parts = email.split("@");
    if (parts.length === 2) {
      const domainPart = parts[1];
      const domainParts = domainPart.split(".");
      return domainParts[0];
    }
    return "";
  };
  const verify = (data) => {
    setValue3("email", email);
    const extractedDomain = extractDomain(email);
    setValue3("company_name", extractedDomain);
    const otpString = data.otp.join("");
    const formData = new FormData();
    formData.append("otp", otpString);
    Object.keys(data).forEach((key) => {
      if (key !== "otp") {
        formData.append(key, data[key]);
      }
    });
    dispatch(verifyLoginThunk(formData)).then((data) => {
      if (data.payload["ERROR"]) {
        toast.error(data.payload["ERROR"], {
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#713200",
          },
        });
      }
      if (data.payload["SUCCESS"]) {
        toast.success(data.payload["SUCCESS"]?.message, {
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#713200",
          },
        });
        // const res = axios.get(`${BASE_URL}/dashboard_admin`);
        if (data.payload["SUCCESS"]?.userType == "Company_Admin") {
          navigate(admin_setting);
        } else if (data.payload["SUCCESS"]?.userType == "Company_planner") {
          navigate(planner_order);
        } else {
          navigate(new_user);
        }
      }
    });
  };
  const emailSchema = yup.object().shape({
    email: yup
      .string()
      .required("Company email is required")
      .email("Enter valid company email address")
      .test("is-company-email", "Please use a company email", (value) => {
        if (!value) return false;
        const domain = value.split("@")[1];
        return !publicEmailDomains.includes(domain);
      }),
  });

  const otpSchema = yup.object().shape({
    otp: yup
      .array()
      .of(yup.string().length(1, "Each OTP digit must be 1 character"))
      .required("OTP is required"),
  });

  const {
    handleSubmit: handleSubmit2,
    register: register2,
    control,
    formState: { errors: errors2 },
  } = useForm({
    resolver: yupResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const {
    handleSubmit: handleSubmit3,
    register: register3,
    setValue: setValue3,
    getValues,
    formState: { errors: errors3 },
  } = useForm({
    resolver: yupResolver(otpSchema),
    defaultValues: {
      email: "",
      otp: ["", "", "", "", "", ""],
      company_name: "",
    },
  });

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
  //useEffect=====================================================================================================================
  useEffect(() => {
    const checkTimer = () => {
      const isTimerOver = resendTimer(otpTime);
      setIsResendDisabled(!isTimerOver);
    };

    const intervalId = setInterval(checkTimer, 1000);

    return () => clearInterval(intervalId);
  }, [otpTime]);
  return (
    <div className="container">
      <Toaster />

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
          <h1>Welcome to our platform</h1>
          <h1>Login to your account</h1>
          <p className="subtitle">Design your optimized load plan</p>
          {/* <div className="all-errors2">{errorMsg}</div> */}

          <>
            {loading ? (
              <Loader />
            ) : otpSend && email ? (
              <form className="input-group" onSubmit={handleSubmit3(verify)}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  {otp.map((data, index) => (
                    <Controller
                      key={index}
                      name={`otp[${index}]`}
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          maxLength="1"
                          onChange={(e) => handleChange(e, index)}
                          onKeyDown={(e) =>
                            e.key === "Backspace" && handleBackspace(e, index)
                          }
                          ref={(ref) => (inputsRef.current[index] = ref)}
                          style={{
                            width: "45px",
                            height: "40px",
                            textAlign: "center",
                            fontSize: "20px",
                          }}
                        />
                      )}
                    />
                  ))}
                  {errors3?.otp && <div className="error">Enter valid OTP</div>}
                </div>
                <button
                  type="submit"
                  className="login-button"
                  onClick={handleSubmit3(verify)}
                  style={{ marginTop: "1.5rem" }}
                >
                  Verify OTP
                </button>
                <button
                  className="resend-button"
                  style={{ color: isResendDisabled ? "grey" : "skyblue" }}
                  disabled={isResendDisabled}
                  onClick={handleSubmit2(sendOtp)}
                >
                  Resend OTP {"   "}
                </button>
                <span
                  style={{
                    fontSize: "1rem",
                    color: "skyblue",
                    display: isResendDisabled ? "inline-block" : "none",
                  }}
                >
                  {minuteLeft < 1 ? "0" : ""}
                  {minuteLeft}:{secondLeft < 10 ? "0" : ""}
                  {secondLeft}
                </span>
              </form>
            ) : (
              <>
                <div className="input-group">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email address"
                    {...register2("email")}
                    onBlur={handleBlur}
                  />
                  {errors2?.email && (
                    <div className="error">{errors2?.email?.message}</div>
                  )}
                </div>
                <button
                  type="submit"
                  className="login-button"
                  onClick={handleSubmit2(sendOtp)}
                >
                  Send OTP
                </button>
                <div className="blue-text">
                  <Link to={signupurl} className="blue-text">
                    Don't have account? Register
                  </Link>
                </div>
              </>
            )}
          </>

          {/* <div className="input-group">
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
          </button> */}
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
