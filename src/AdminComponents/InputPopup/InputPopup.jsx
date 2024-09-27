import React, { useEffect, useRef, useState } from "react";
import "./InputPopup.css";
import {
  addContainerThunk,
  loadPlanThunk,
} from "../../redux/Slices/companyAdminSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";

const InputPopup = ({ loadData, setLoadData, inputPop, setInputPop }) => {
  const popupRef = useRef(null);
  const [inputVal, setInputVal] = useState(loadData[inputPop.name]);
  const dispatch = useDispatch();
  const [unit, setUnit] = useState("mm");
  //schema=================================================================================================
  const schema = yup.object().shape({
    container_name: yup.string().required("Container name is required"),
    container_length: yup
      .number()
      .typeError("Length must be a number")
      .required("Length is required"),
    container_width: yup
      .number()
      .typeError("Width must be a number")
      .required("Width is required"),
    container_height: yup
      .number()
      .typeError("Height must be a number")
      .required("Height is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const submitLoadPlan = () => {
    if (inputVal == "") {
      return;
    }
    dispatch(loadPlanThunk(loadData));
    setInputPop((prev) => ({ ...prev, action: false }));
    setLoadData({
      shipping_location: "",
      destination_location: "",
      container_type: "",
    });
  };
  const onSubmit = (data) => {
    let updatedData = { ...data };

    if (unit === "cm") {
      updatedData.container_height = data.container_height * 10;
      updatedData.container_width = data.container_width * 10;
      updatedData.container_length = data.container_length * 10;
    } else if (unit === "m") {
      updatedData.container_height = data.container_height * 1000;
      updatedData.container_width = data.container_width * 1000;
      updatedData.container_length = data.container_length * 1000;
    }
    dispatch(addContainerThunk(updatedData)).then((data) => {
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
      }
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setInputPop((prev) => ({ ...prev, action: false }));
      }
    };

    if (inputPop.action) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputPop, setInputPop]);

  return (
    <div id="popup" className="popup-overlay">
      <div className="popup-input-content" ref={popupRef}>
        <div className="popup-input-text">
          <h2>{inputPop.head}</h2>
          <div className="popup-input">
            {inputPop.name == "container_type" ? (
              <>
                <h4 className="unit-head">Select unit</h4>
                <div className="units">
                  <button
                    className="unit-button"
                    onClick={() => setUnit("mm")}
                    style={{
                      border:
                        unit == "mm" ? "3px solid black" : "3px solid grey",
                      background: unit == "mm" ? "black" : "white",
                      color: unit == "mm" ? "white" : "black",
                    }}
                  >
                    mm
                  </button>
                  <button
                    className="unit-button"
                    onClick={() => setUnit("cm")}
                    style={{
                      border:
                        unit == "cm" ? "3px solid black" : "3px solid grey",
                      background: unit == "cm" ? "black" : "white",
                      color: unit == "cm" ? "white" : "black",
                    }}
                  >
                    cm
                  </button>
                  <button
                    className="unit-button"
                    onClick={() => setUnit("m")}
                    style={{
                      border:
                        unit == "m" ? "3px solid black" : "3px solid grey",
                      background: unit == "m" ? "black" : "white",
                      color: unit == "m" ? "white" : "black",
                    }}
                  >
                    m
                  </button>
                </div>
                <div className="contianer-inputs">
                  <div>
                    <label htmlFor="name">Container name</label>
                    <input
                      type="text"
                      id="name"
                      {...register("container_name")}
                    />
                    {errors.container_name && (
                      <p>{errors.container_name.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="length">Length</label>
                    <input
                      type="text"
                      id="length"
                      {...register("container_length")}
                    />
                    {errors.container_length && (
                      <p>{errors.container_length.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="width">Width</label>
                    <input
                      type="text"
                      id="width"
                      {...register("container_width")}
                    />
                    {errors.container_width && (
                      <p>{errors.container_width.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="height">Height</label>
                    <input
                      type="text"
                      id="height"
                      {...register("container_height")}
                    />
                    {errors.container_height && (
                      <p>{errors.container_height.message}</p>
                    )}
                  </div>
                </div>
                <div className="popup-buttons">
                  <button
                    className="btn-apply"
                    style={{ textDecoration: "none" }}
                    onClick={handleSubmit(onSubmit)}
                  >
                    Add
                  </button>
                  <button
                    className="btn-cancel"
                    style={{ textDecoration: "none" }}
                    onClick={() =>
                      setInputPop((prev) => ({ ...prev, action: false }))
                    }
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <input
                  type="text"
                  onChange={(e) => {
                    setInputVal(e.target.value);
                    setLoadData((prev) => ({
                      ...prev,
                      [inputPop.name]:
                        e.target.value.charAt(0).toUpperCase() +
                        e.target.value.slice(1).toLowerCase(),
                    }));
                  }}
                  value={loadData[inputPop.name]}
                />
                <div className="popup-buttons">
                  <button
                    className="btn-apply"
                    style={{ textDecoration: "none" }}
                    onClick={submitLoadPlan}
                  >
                    Add
                  </button>
                  <button
                    className="btn-cancel"
                    style={{ textDecoration: "none" }}
                    onClick={() =>
                      setInputPop((prev) => ({ ...prev, action: false }))
                    }
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputPopup;
