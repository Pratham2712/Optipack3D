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
  sendOtpThunk,
  signupThunk,
  verifyOtpThunk,
} from "../../redux/Slices/authSlice";
import Loader from "../../components/Loader/Loader";
import toast, { Toaster } from "react-hot-toast";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [email, setEmail] = useState("");
  const inputsRef = useRef([]);
  const publicEmailDomains = [
    //"gmail.com",
    "yahoo.com",
    "outlook.com",
    "hotmail.com",
    "aol.com",
  ];
  const dispatch = useDispatch();
  //useSelector
  const errorMsg = useSelector(
    (state) => state.rootReducer.authSlice.errorData.message
  );
  const otpSend = useSelector((state) => state.rootReducer.authSlice.otpSend);
  const successMsg = useSelector(
    (state) => state.rootReducer.authSlice.successMsg
  );
  const loading = useSelector((state) => state.rootReducer.authSlice.loading);
  // Toggle password visibil
  const handleToggle = () => {
    setShowPassword(!showPassword);
  };
  const handleBlur = async (e) => {
    await trigger(e.target.name);
  };
  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, "");
    console.log(control);

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
  const sendOtp = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    setEmail(data?.email);

    dispatch(sendOtpThunk(formData));
  };
  console.log(email);
  const verify = (data) => {
    console.log(data);
    setValue3("email", email);
    const otpString = data.otp.join("");

    const formData = new FormData();
    formData.append("otp", otpString);
    Object.keys(data).forEach((key) => {
      if (key !== "otp") {
        formData.append(key, data[key]);
      }
    });
    dispatch(verifyOtpThunk(formData));
  };
  const schema = yup.object().shape({
    company_name: yup
      .string()
      .required("Company name is required")
      .min(3, "Username must be at least 3 characters"),
    password: yup
      .string()
      .required("Password is required")
      .min(3, "Password must be at least 3 characters"),
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
    handleSubmit,
    setError,
    trigger,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      company_name: "",
      password: "",
      email: email,
    },
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
    },
  });

  console.log(errors3);

  useEffect(() => {
    if (errorMsg) {
      toast.error(errorMsg, {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
      });
    }
    if (successMsg) {
      toast.success(successMsg, {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
      });
    }
  }, [successMsg, errorMsg]);

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
          <h1>Register your Company</h1>
          <p className="subtitle">Design your optimized load plan</p>
          <Toaster />

          <>
            {loading ? (
              <Loader />
            ) : otpSend ? (
              <div className="input-group">
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
              </div>
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
              </>
            )}
          </>

          {/* <div className="input-group">
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
          </div> */}
          {/* <div className="input-group">
            <input
              type="text"
              id="company-name"
              name="company_name"
              placeholder="Company Name"
              {...register("company_name")}
              onBlur={handleBlur}
            />
            {errors?.company_name && (
              <div className="error">{errors?.company_name?.message}</div>
            )}
          </div> */}
          {/* <div className="options">
            <div className="remember-me">
              <input type="checkbox" id="remember-me" name="remember-me" />
              <label for="remember-me">Remember me</label>
            </div>
            <div className="forgot-password">
              <a href="#">Forgot password?</a>
            </div>
          </div> */}
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

export default Signup;
