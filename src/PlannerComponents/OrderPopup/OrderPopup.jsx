import React, { useEffect, useRef } from "react";

const OrderPopup = ({ edit, setEdit, order }) => {
  const popupRef = useRef(null);
  //useEffect====================================================================================================
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setEdit(false);
      }
    };

    if (edit) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [edit, setEdit]);
  return (
    <div id="popup" className="popup-overlay">
      <div className="popup-user-content" ref={popupRef}>
        <div className="popup-input-text">
          <h2>Edit order</h2>
          <div className="user-inputs">
            <div>
              <label htmlFor="order_number">Order Number</label>
              <input type="text" id="order_number" value={order.order_number} />
            </div>
            <div>
              <label htmlFor="order_date">Order Date</label>
              <input
                type="date"
                id="order_date"
                value={order.planned_start_date}
              />
            </div>
            <div>
              <label htmlFor="source">Source</label>
              <select
                name=""
                id="source"
                style={{ width: "100%" }}
                value={order.source_location}
              ></select>
            </div>
            <div>
              <label htmlFor="destination">Destination</label>
              <select
                id="destination"
                style={{ width: "100%" }}
                value={order.destination_location}
              ></select>
            </div>
          </div>
          <div
            className="send-button"
            style={{ textAlign: "center", marginTop: "1rem" }}
          >
            <button className="btn-apply">Edit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPopup;
