import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../../../components/Loader/Loader";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import unlock from "../../../assests/unlock.png";
import "./PlannerOrder.css";
import { getLoadPlanThunk } from "../../../redux/Slices/companyAdminSlice";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  addOrderThunk,
  EditOrderThunk,
} from "../../../redux/Slices/plannerSlice";
import { planner_skuSelection } from "../../../constants/links";

const schema = yup.object().shape({
  order_number: yup
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
  const [displayInput, setDisplayInput] = useState(false);

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
    const queryParams = new URLSearchParams();
    Object.keys(data).forEach((key) => {
      queryParams.append(key, data[key]);
    });
    dispatch(EditOrderThunk(data)).then((data) => {
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

        setDisplayInput(true);

        const url = `${planner_skuSelection}?${queryParams.toString()}`;
        navigate(url);
      }
    });
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
            {!displayInput && (
              <form>
                <div className="content">
                  <div className="order-inputs">
                    <div className="settings-group">
                      <label>Order Number</label>
                      <input
                        type="text"
                        style={{ marginTop: "0.5rem" }}
                        placeholder="Type here"
                        {...register("order_number")}
                      />
                      {errors.order_number && (
                        <p style={{ color: "red" }} className="error-order">
                          {errors.order_number.message}
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
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PlannerOrder;
