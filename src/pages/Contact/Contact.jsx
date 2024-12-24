import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Contact.css";
import home_container from "../../assests/home_container.png";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { contactEmailThunk } from "../../redux/Slices/mainSlice";
import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Grid2 } from "@mui/material";
import cube from "../../assests/color-icon/cube.png";
import add from "../../assests/color-icon/add.png";
import download from "../../assests/color-icon/download.png";
import animate from "../../assests/color-icon/animate.png";
import arrow from "../../assests/color-icon/arrow.png";

const schema = yup.object().shape({
  first: yup
    .string()
    .required("First name is required")
    .min(3, "First name must be at least 3 characters"),
  domain: yup
    .string()
    .required("Company domain is required")
    .min(3, "Domain must be at least 3 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Email must be a valid email address"),
  job_title: yup.string().required("Job title is required"),
  message: yup.string().required("Message is required"),
  phone: yup
    .string()
    .required("Phone number is required")
    .test(
      "is-valid-phone",
      "Please enter a valid phone number",
      (value) => value && value.length >= 10 && value.length <= 15
    ),
});
const Contact = () => {
  const dispatch = useDispatch();
  const [val, setVal] = useState();
  const loading = useSelector((state) => state.rootReducer.mainSlice.loading);
  const {
    handleSubmit,
    setError,
    trigger,
    control,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      first: "",
      email: "",
      domain: "",
      phone: "",
      last: "",
      job_title: "",
      message: "",
    },
  });
  const onSubmit = (data) => {
    // if (localStorage.getItem("contacted")) {
    //   toast("Already contacted", { icon: "👍" });
    //   return;
    // }
    dispatch(contactEmailThunk(data)).then((data) => {
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
        localStorage.setItem("contacted", true);
        toast.success(data.payload["SUCCESS"]?.message, {
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#713200",
          },
        });
        setValue("domain", "");
        setValue("email", "");
        setValue("phone", "");
        setValue("first", "");
        setValue("last", "");
        setValue("message", "");
        setValue("job_title", "");
      }
    });
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div style={{ width: "100%", height: "100%" }}>
          <Navbar />
          <main className="contact-main">
            <Grid2
              container
              className="contact-section"
              spacing={3}
              sx={{ flexDirection: { xs: "column-reverse", md: "row" } }}
            >
              <Grid2 size={{ xs: 12, md: 6 }} sx={{ placeContent: "center" }}>
                {/* <div className="img-cont">
                  <img src={home_container} alt="image" />
                </div> */}
                <Grid2
                  container
                  sx={{
                    background: "white",
                    placeContent: "center",
                    padding: "2rem 1rem",
                    borderRadius: "1rem",
                    maxWidth: "31rem",
                  }}
                  spacing={2}
                >
                  <Grid2 size={{ xs: 12, md: 6 }}>
                    <div className="head">
                      <img src={cube} alt="" />
                      <p>Intello Stack</p>
                    </div>

                    <div
                      className="feature-card-inner"
                      style={{ fontSize: "12px" }}
                    >
                      Auto-stack boxes with intelligent algorithms
                    </div>
                  </Grid2>
                  <Grid2 size={{ xs: 12, md: 6 }}>
                    <div className="head">
                      <img src={arrow} alt="" />
                      <p>Practical Load Plan</p>
                    </div>

                    <div
                      className="feature-card-inner"
                      style={{ fontSize: "12px" }}
                    >
                      Load plan considers practical labour constraints
                    </div>
                  </Grid2>
                  <Grid2 size={{ xs: 12, md: 6 }}>
                    <div className="head">
                      <img src={download} alt="" />
                      <p>Export Report</p>
                    </div>

                    <div
                      className="feature-card-inner"
                      style={{ fontSize: "12px" }}
                    >
                      Export the load plan as a PDF, Excel, or 3D image and
                      share with the team.
                    </div>
                  </Grid2>
                  <Grid2 size={{ xs: 12, md: 6 }}>
                    <div className="head">
                      <img src={add} alt="" />
                      <p>Custom Container</p>
                    </div>

                    <div
                      className="feature-card-inner"
                      style={{ fontSize: "12px" }}
                    >
                      Add custom boxes to optimize the load plan
                    </div>
                  </Grid2>
                  <Grid2 size={{ xs: 12, md: 6 }}>
                    <div className="head">
                      <img src={animate} alt="" />
                      <p>Loading Animation</p>
                    </div>

                    <div
                      className="feature-card-inner"
                      style={{ fontSize: "12px" }}
                    >
                      Experience a dynamic loading animation of boxes with
                      adjustable speed.
                    </div>
                  </Grid2>
                </Grid2>
              </Grid2>
              <Grid2 size={{ xs: 12, md: 6 }}>
                <Grid2
                  className="form-container"
                  sx={{ placeContent: "center" }}
                  container
                  spacing={2}
                >
                  <h1 style={{ margin: 0 }}>Get in touch with us</h1>
                  <Grid2 className="input-form" size={{ xs: 12, md: 6 }}>
                    <label htmlFor="first">
                      First Name <span style={{ color: "red" }}>*</span>{" "}
                    </label>
                    <input type="text" id="first" {...register("first")} />
                    {errors?.first && (
                      <div className="error-contact">
                        {errors?.first?.message}
                      </div>
                    )}
                  </Grid2>
                  <Grid2 className="input-form" size={{ xs: 12, md: 6 }}>
                    <label htmlFor="last">Last Name</label>
                    <input type="text" id="last" {...register("last")} />
                  </Grid2>
                  <Grid2 className="input-form" size={{ xs: 12, md: 6 }}>
                    <label htmlFor="email">
                      Email Work Email<span style={{ color: "red" }}>*</span>
                    </label>
                    <input type="text" id="email" {...register("email")} />
                    {errors?.email && (
                      <div className="error-contact">
                        {errors?.email?.message}
                      </div>
                    )}
                  </Grid2>
                  <Grid2 className="input-form" size={{ xs: 12, md: 6 }}>
                    <label htmlFor="domain">
                      Enter Company Name
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <input type="text" id="domain" {...register("domain")} />
                    {errors?.domain && (
                      <div className="error-contact">
                        {errors?.domain?.message}
                      </div>
                    )}
                  </Grid2>
                  <Grid2 className="input-form" size={{ xs: 12, md: 6 }}>
                    <label htmlFor="domain">
                      Job Title
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <input type="text" id="domain" {...register("job_title")} />
                    {errors?.job_title && (
                      <div className="error-contact">
                        {errors?.job_title?.message}
                      </div>
                    )}
                  </Grid2>

                  <Grid2 className="input-form" size={{ xs: 12, md: 6 }}>
                    <label htmlFor="phone">
                      Phone Number<span style={{ color: "red" }}>*</span>
                    </label>
                    {/* <input type="text" id="phone" {...register("phone")} /> */}
                    <Controller
                      name="phone"
                      control={control}
                      render={({ field }) => (
                        <PhoneInput
                          {...field}
                          placeholder="Enter phone number"
                          country="IN" // Default country
                          international
                          withCountryCallingCode
                          defaultCountry="IN"
                          className={`phone-input ${
                            errors.phoneNumber ? "error" : ""
                          }`}
                        />
                      )}
                    />
                    {errors?.phone && (
                      <div className="error-contact">
                        {errors?.phone?.message}
                      </div>
                    )}
                  </Grid2>
                  <Grid2 className="input-form" size={12}>
                    <label htmlFor="domain">
                      Message
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <textarea
                      type="text"
                      id="domain"
                      {...register("message")}
                      rows={7}
                      style={{ width: "100%", border: "1px solid #cbd6e2" }}
                      placeholder="up to 100 words"
                    />
                    {errors?.domain && (
                      <div className="error-contact">
                        {errors?.message?.message}
                      </div>
                    )}
                  </Grid2>
                  <Grid2
                    size={10}
                    className="btn-apply"
                    style={{ marginTop: "0rem" }}
                    onClick={handleSubmit(onSubmit)}
                    sx={{ textAlign: "center" }}
                  >
                    {" "}
                    Submit{" "}
                  </Grid2>
                </Grid2>
              </Grid2>
            </Grid2>
          </main>
        </div>
      )}
    </>
  );
};

export default Contact;
