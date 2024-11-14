import React from "react";
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
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),
});
const Contact = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.rootReducer.mainSlice.loading);
  const {
    handleSubmit,
    setError,
    trigger,
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
    },
  });
  const onSubmit = (data) => {
    console.log(data, "subit");

    if (localStorage.getItem("contacted")) {
      toast("Already contacted", { icon: "👍" });
      return;
    }
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
            <section className="contact-section">
              <div style={{ display: "flex", alignItems: "center" }}>
                <div className="img-cont">
                  <img src={home_container} alt="image" />
                </div>
              </div>
              <div>
                <form className="form-container">
                  <div className="input-form">
                    <label htmlFor="first">
                      First Name <span style={{ color: "red" }}>*</span>{" "}
                    </label>
                    <input type="text" id="first" {...register("first")} />
                    {errors?.first && (
                      <div className="error-contact">
                        {errors?.first?.message}
                      </div>
                    )}
                  </div>
                  <div className="input-form">
                    <label htmlFor="last">Last Name</label>
                    <input type="text" id="last" {...register("last")} />
                  </div>
                  <div className="input-form">
                    <label htmlFor="email">
                      Email Address<span style={{ color: "red" }}>*</span>
                    </label>
                    <input type="text" id="email" {...register("email")} />
                    {errors?.email && (
                      <div className="error-contact">
                        {errors?.email?.message}
                      </div>
                    )}
                  </div>
                  <div className="input-form">
                    <label htmlFor="domain">
                      Enter your company domain
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <input type="text" id="domain" {...register("domain")} />
                    {errors?.domain && (
                      <div className="error-contact">
                        {errors?.domain?.message}
                      </div>
                    )}
                  </div>
                  <div className="input-form">
                    <label htmlFor="phone">
                      Phone Number<span style={{ color: "red" }}>*</span>
                    </label>
                    <input type="text" id="phone" {...register("phone")} />
                    {errors?.phone && (
                      <div className="error-contact">
                        {errors?.phone?.message}
                      </div>
                    )}
                  </div>
                  <button
                    className="btn-apply"
                    style={{ marginTop: "1.5rem" }}
                    onClick={handleSubmit(onSubmit)}
                  >
                    {" "}
                    submit{" "}
                  </button>
                </form>
              </div>
            </section>
          </main>
        </div>
      )}
    </>
  );
};

export default Contact;
