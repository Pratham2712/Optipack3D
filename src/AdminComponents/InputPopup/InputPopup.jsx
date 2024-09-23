import React, { useEffect, useRef, useState } from "react";
import "./InputPopup.css";
import { loadPlanThunk } from "../../redux/Slices/companyAdminSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const InputPopup = ({ loadData, setLoadData, inputPop, setInputPop }) => {
  const popupRef = useRef(null);
  const [inputVal, setInputVal] = useState(loadData[inputPop.name]);
  const dispatch = useDispatch();
  const [unit, setUnit] = useState("mm");
  //schema=================================================================================================
  const schema = yup.object().shape({
    container_name: yup.string().required("Container name is required"),
    length_container: yup
      .number()
      .typeError("Length must be a number")
      .required("Length is required"),
    width_container: yup
      .number()
      .typeError("Width must be a number")
      .required("Width is required"),
    height_container: yup
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
    console.log("sumbit");
    console.log(errors);

    console.log(data);
  };
  console.log(errors);

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
                      {...register("length_container")}
                    />
                    {errors.length_container && (
                      <p>{errors.length_container.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="width">Width</label>
                    <input
                      type="text"
                      id="width"
                      {...register("width_container")}
                    />
                    {errors.width_container && (
                      <p>{errors.width_container.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="height">Height</label>
                    <input
                      type="text"
                      id="height"
                      {...register("height_container")}
                    />
                    {errors.height_container && (
                      <p>{errors.height_container.message}</p>
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
                      [inputPop.name]: e.target.value,
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
