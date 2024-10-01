import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Loader from "../../../components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import unlock from "../../../assests/unlock.png";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getSkuByCodeThunk } from "../../../redux/Slices/plannerSlice";

const schema = yup.object().shape({
  sku_code: yup.number().required("SKU code is required"),
  quantity: yup.number().required("Quantity is required"),
});

const SkuSelect = () => {
  const [manual, setManual] = useState(false);
  const location = useLocation();
  const { result } = location.state || {};
  const [is700, setIs700] = useState(window.innerWidth < 700);
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  //useselector
  const loading = useSelector((state) => state.rootReducer.mainSlice.loading);

  //function===============================================================================================================
  const getSku = (data) => {
    console.log(data);
    const info = {
      sku_code: data.sku_code,
    };
    dispatch(getSkuByCodeThunk(info));
  };

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
            <button
              type="button"
              className="collapsible"
              id="addLoadDetailsButton"
            >
              Add order details
              <img
                src={unlock}
                alt="Lock Icon"
                id="addLoadDetailsIcon"
                className="icon"
              />
            </button>
            <div className="order-data">
              <div>Order Number: #{result?.order_number} </div>
              <div>Order Date: {result?.planned_start_date} </div>
              <div>Source: {result?.source_location} </div>
              <div>Destination: {result?.destination_location} </div>
            </div>
            <div className="order-button">
              <button className="btn-apply">Edit details</button>
            </div>
            <div className="order-two-buttons">
              <button className="btn-apply">Upload SKU excel</button>
              <button className="btn-apply" onClick={() => setManual(!manual)}>
                Enter SKU manually
              </button>
            </div>
            {manual && (
              <div>
                <div className="order-inputs">
                  <div className="settings-group">
                    <label>SKU code</label>
                    <input
                      type="text"
                      style={{ marginTop: "0.5rem" }}
                      placeholder="Type here"
                      {...register("sku_code")}
                    />
                    {errors.sku_code && (
                      <p style={{ color: "red" }} className="error-order">
                        {errors.sku_code.message}
                      </p>
                    )}
                  </div>
                  <div className="settings-group">
                    <label>Quantity</label>
                    <input
                      type="text"
                      style={{ marginTop: "0.5rem" }}
                      placeholder="Type here"
                      {...register("quantity")}
                    />
                  </div>
                </div>
                <div className="order-two-buttons">
                  <button className="btn-apply" onClick={handleSubmit(getSku)}>
                    Add SKU
                  </button>
                  <button className="btn-apply">Finish Adding</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SkuSelect;
