import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../../components/Loader/Loader";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import unlock from "../../../assests/unlock.png";
import lock from "../../../assests/lock.png";
import tick from "../../../assests/tick.png";
import "./PlannerOrder.css";

const PlannerOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [orderInput, setOrderInput] = useState(false);
  const [is700, setIs700] = useState(window.innerWidth < 700);

  //useselector
  const loading = useSelector((state) => state.rootReducer.mainSlice.loading);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Breadcrumb />
          {!is700 ? <Sidebar className="hide-sidebar" /> : <></>}
          <div className="container-form">
            <h1>Create Order</h1>
            <form>
              <button
                type="button"
                className="collapsible"
                id="addLoadDetailsButton"
                onClick={() => {
                  setOrderInput(!orderInput);
                }}
              >
                Add order details
                <img
                  src={unlock}
                  alt="Lock Icon"
                  id="addLoadDetailsIcon"
                  className="icon"
                />
              </button>
              <div className="content">
                <div className="order-inputs">
                  <div className="input">
                    <label>Order Number</label>
                    <input type="text" />
                  </div>
                  <div className="input">
                    <label>Order Date</label>
                    <input type="date" style={{ width: "100%" }} />
                  </div>
                  <div className="input">
                    <label>Source</label>
                    <input type="text" />
                  </div>
                  <div className="input">
                    <label>Destination</label>
                    <input type="text" />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PlannerOrder;
