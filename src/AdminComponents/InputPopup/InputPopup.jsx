import React, { useEffect, useRef, useState } from "react";
import "./InputPopup.css";
import { loadPlanThunk } from "../../redux/Slices/companyAdminSlice";
import { useDispatch } from "react-redux";

const InputPopup = ({ loadData, setLoadData, inputPop, setInputPop }) => {
  const popupRef = useRef(null);
  const [inputVal, setInputVal] = useState(loadData[inputPop.name]);
  const dispatch = useDispatch();

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
          </div>

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
        </div>
      </div>
    </div>
  );
};

export default InputPopup;
