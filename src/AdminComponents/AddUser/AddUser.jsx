import React, { useEffect, useRef } from "react";
import "./AddUser.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsersThunk,
  getUsertypeThunk,
  sendEmailThunk,
} from "../../redux/Slices/companyAdminSlice";
import toast from "react-hot-toast";

const AddUser = ({ user, setUser }) => {
  const popupRef = useRef(null);
  const dispatch = useDispatch();
  const publicEmailDomains = [
    //"gmail.com",
    "yahoo.com",
    "outlook.com",
    "hotmail.com",
    "aol.com",
  ];
  //useEffect============================================================================================================
  const userType = useSelector(
    (state) => state.rootReducer.companyAdminSlice.data.userType
  );
  //schema=================================================================================================
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("company email is required")
      .email("Enter valid company email address")
      .test("is-company-email", "Please use a company email", (value) => {
        if (!value) return false;
        const domain = value.split("@")[1];
        return !publicEmailDomains.includes(domain);
      }),
    message: yup.string().required("message is required"),
    userType: yup.string().required("Role is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const addUser = (data) => {
    dispatch(sendEmailThunk(data)).then((data) => {
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
        setUser(false);
        dispatch(getAllUsersThunk());
      }
    });
  };
  //useEffect===================================================================================================================
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setUser(false);
      }
    };

    if (user) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    dispatch(getUsertypeThunk());
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setUser, user]);

  return (
    <div className="popup-overlay">
      <div className="popup-user-content" ref={popupRef}>
        <div className="popup-input-text">
          <h2>Add user</h2>
          <div className="user-inputs">
            <div>
              <label htmlFor="email">Email</label>
              <input type="text" id="email" {...register("email")} />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div className="role">
              <label htmlFor="select-box1">Role</label>
              <select
                id="select-box1"
                style={{ width: "100%", fontSize: "1rem" }}
                {...register("userType")}
              >
                <option value="" selected disabled>
                  {" "}
                  Select role
                </option>
                {userType?.map((data) => (
                  <option value={data}>{data}</option>
                ))}
              </select>
              {errors.userType && <p>{errors.userType.message}</p>}
            </div>
            <div>
              <label htmlFor="message">Message</label>
              <textarea
                name="message"
                id="message"
                {...register("message")}
                rows={10}
              >
                The administrator of the application for your organization is
                inviting you to join Optipack3d. Pls click on the link to
                complete the sign up process. Optipack3d.com empowers logistics
                operations team to optimise their container loading plan.
              </textarea>
              {errors.message && <p>{errors.message.message}</p>}
            </div>
          </div>
          <div
            className="send-button"
            style={{ textAlign: "center", marginTop: "1rem" }}
          >
            <button className="btn-apply" onClick={handleSubmit(addUser)}>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
