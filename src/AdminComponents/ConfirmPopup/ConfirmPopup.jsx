import React, { useEffect, useRef } from "react";
import "./ConfirmPopup.css";

const ConfirmPopup = ({ message, confirm, setConfirm, removeUser }) => {
  const popupRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setConfirm(false);
      }
    };

    if (confirm) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [confirm, setConfirm]);
  return (
    <div className="popup-overlay">
      <div className="popup-confirm-content" ref={popupRef}>
        <div className="popup-confirm-text">
          <h2>Confirm {message}</h2>
        </div>
        <div className="popup-buttons">
          <button className="btn-apply" onClick={removeUser}>
            Yes
          </button>
          <button className="btn-cancel" onClick={() => setConfirm(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopup;
