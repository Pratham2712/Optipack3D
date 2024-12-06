import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./UploadImagePop.css";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { uploadImageThunk } from "../../redux/Slices/plannerSlice";
import { checkLoginThunk } from "../../redux/Slices/authSlice";
import toast from "react-hot-toast";
import dummy from "../../assests/dummy_user.png";

const FILE_SIZE = 10 * 1024 * 1024; // 10 MB in bytes
const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "image/jpg"];

const schema = yup.object().shape({
  file: yup
    .mixed()
    .required("File is required")
    .test("fileSize", "File is too large, minimum 10MB", (value) => {
      return value && value.size <= FILE_SIZE;
    })
    .test("fileType", "Unsupported file format", (value) => {
      return value && SUPPORTED_FORMATS.includes(value.type);
    }),
});

const UploadImagePop = ({ uploadPop, setUploadPop, imageUrl }) => {
  const popupRef = useRef(null);
  const [filePreview, setFilePreview] = useState(null);
  const dispatch = useDispatch();

  const user_id = useSelector(
    (state) => state.rootReducer.authSlice.data.user.user_id
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const uploadImage = (data) => {
    const formData = new FormData();
    formData.append("image_file", data.file);
    formData.append("user_id", user_id);
    dispatch(uploadImageThunk(formData)).then((data) => {
      if (data?.payload["ERROR"]) {
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
        dispatch(checkLoginThunk());
        setUploadPop(false);
      }
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setUploadPop(false);
      }
    };

    if (uploadPop) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [uploadPop, setUploadPop]);
  return (
    <div id="popup" className="popup-overlay">
      <div className="popup-user-content" ref={popupRef}>
        <div className="popup-input-text">
          <div
            style={{
              border: "1px solid black",
              height: "300px",
              width: "56%",
              margin: "0 auto",
            }}
          >
            <img
              src={filePreview || imageUrl || dummy}
              alt="your image"
              style={{ width: "100%", height: "100%" }}
            />
            {errors.file && (
              <p style={{ color: "red" }}>{errors.file.message}</p>
            )}
          </div>
          <div className="upload-btn">
            <Controller
              name="file"
              control={control}
              render={({ field }) => (
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    field.onChange(file);
                    setFilePreview(file ? URL.createObjectURL(file) : null);
                  }}
                  className="image-file-input"
                />
              )}
            />
            <button
              type="submit"
              className="btn-apply"
              onClick={handleSubmit(uploadImage)}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadImagePop;
