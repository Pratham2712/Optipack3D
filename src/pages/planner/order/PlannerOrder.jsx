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
import { getLoadPlanThunk } from "../../../redux/Slices/companyAdminSlice";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addOrderThunk } from "../../../redux/Slices/plannerSlice";
import SkuSetting from "../../admin/SkuSetting/SkuSetting";
import SkuSelect from "../../../PlannerComponents/SkuSelect/SkuSelect";

const schema = yup.object().shape({
  orderNumber: yup
    .number()
    .typeError("Order Number must be a number")
    .required("Order Number is required"),
  planned_start_date: yup.string().required("Order Date is required"),
  source_location: yup.string().required("Source is required"),
  destination_location: yup.string().required("Destination is required"),
});

const PlannerOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [orderInput, setOrderInput] = useState(false);
  const [is700, setIs700] = useState(window.innerWidth < 700);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  //function===============================================================================================================
  const createOrder = (data) => {
    console.log(data);
    dispatch(addOrderThunk(data));
  };
  //useselector
  const loading = useSelector((state) => state.rootReducer.mainSlice.loading);
  const loadplanData = useSelector(
    (state) => state.rootReducer.companyAdminSlice.data.loadplan
  );

  //useEffect===========================================================================================================
  useEffect(() => {
    dispatch(getLoadPlanThunk());
  }, []);
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
            <div className="planner-order-content">
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
                    <div className="settings-group">
                      <label>Order Number</label>
                      <input
                        type="text"
                        style={{ marginTop: "0.5rem" }}
                        placeholder="Type here"
                        {...register("orderNumber")}
                      />
                      {errors.orderNumber && (
                        <p style={{ color: "red" }} className="error-order">
                          {errors.orderNumber.message}
                        </p>
                      )}
                    </div>
                    <div className="settings-group">
                      <label>Order Date</label>
                      <Controller
                        name="planned_start_date"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="date"
                            placeholder="Select order date"
                          />
                        )}
                      />
                      {errors.planned_start_date && (
                        <p style={{ color: "red" }} className="error-order">
                          {errors.planned_start_date.message}
                        </p>
                      )}
                    </div>
                    <div className="settings-group">
                      <label>Source</label>
                      <Controller
                        name="source_location"
                        control={control}
                        render={({ field }) => (
                          <select {...field} className="styled-select">
                            <option value="">Select From Dropdown</option>
                            {loadplanData?.["shipping_location"]?.map((ele) => (
                              <option key={ele} value={ele}>
                                {ele}
                              </option>
                            ))}
                          </select>
                        )}
                      />
                      {errors.source_location && (
                        <p style={{ color: "red" }} className="error-order">
                          {errors.source_location.message}
                        </p>
                      )}
                    </div>
                    <div className="settings-group">
                      <label>Destination</label>
                      <Controller
                        name="destination_location"
                        control={control}
                        render={({ field }) => (
                          <select {...field} className="styled-select">
                            <option value="">Select From Dropdown</option>
                            {loadplanData?.["destination_location"]?.map(
                              (ele) => (
                                <option key={ele} value={ele}>
                                  {ele}
                                </option>
                              )
                            )}
                          </select>
                        )}
                      />
                      {errors.destination_location && (
                        <p style={{ color: "red" }} className="error-order">
                          {errors.destination_location.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="order-button">
                  <button
                    className="btn-apply"
                    onClick={handleSubmit(createOrder)}
                  >
                    Start SKU addition
                  </button>
                </div>
              </form>
              <div className="planner-sku-content">
                <SkuSelect />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlannerOrder;
