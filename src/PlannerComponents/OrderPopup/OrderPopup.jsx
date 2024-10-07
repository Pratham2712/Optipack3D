import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { EditOrderThunk } from "../../redux/Slices/plannerSlice";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { planner_skuSelection } from "../../constants/links";

const schema = yup.object().shape({
  order_number: yup
    .number()
    .typeError("Order Number must be a number")
    .required("Order Number is required"),
  planned_start_date: yup.string().required("Order Date is required"),
  source_location: yup.string().required("Source is required"),
  destination_location: yup.string().required("Destination is required"),
});

const OrderPopup = ({ edit, setEdit, order, loadplanData }) => {
  const popupRef = useRef(null);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  //function =====================================================================================================
  const editOrder = (data) => {
    const updatedData = {
      ...data,
      order_id: order.order_id,
    };
    dispatch(EditOrderThunk(updatedData)).then((ele) => {
      if (ele.payload["ERROR"]) {
        toast.error(ele.payload["ERROR"], {
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#713200",
          },
        });
      }
      if (ele.payload["SUCCESS"]?.message) {
        toast.success(ele.payload["SUCCESS"]?.message, {
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#713200",
          },
        });
        const searchParams = new URLSearchParams(location.search);
        Object.keys(data).forEach((key) => {
          searchParams.set(key, data[key]);
        });
        const url = `${planner_skuSelection}?${searchParams.toString()}`;
        navigate(url);
      }
    });
    setEdit(false);
  };
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
              <input
                type="text"
                id="order_number"
                value={order.order_number}
                {...register("order_number")}
              />
              {errors.order_number && (
                <p style={{ color: "red" }} className="error-order">
                  {errors.order_number.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="order_date">Order Date</label>
              <Controller
                name="planned_start_date"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="date"
                    placeholder="Select order date"
                    defaultValue={order?.planned_start_date}
                    {...register("planned_start_date")}
                  />
                )}
              />
              {errors.planned_start_date && (
                <p style={{ color: "red" }} className="error-order">
                  {errors.planned_start_date.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="source">Source</label>
              <Controller
                name="source_location"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="styled-select"
                    style={{ width: "100%" }}
                    {...register("source_location")}
                  >
                    <option value="">Select From Dropdown</option>
                    {loadplanData?.["shipping_location"]?.map((ele) => (
                      <option
                        key={ele}
                        value={ele}
                        selected={order?.source_location == ele}
                      >
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
            <div>
              <label htmlFor="destination">Destination</label>
              <Controller
                name="source_location"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="styled-select"
                    style={{ width: "100%" }}
                    {...register("destination_location")}
                  >
                    <option value="">Select From Dropdown</option>
                    {loadplanData?.["destination_location"]?.map((ele) => (
                      <option
                        key={ele}
                        value={ele}
                        selected={order?.destination_location == ele}
                      >
                        {ele}
                      </option>
                    ))}
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
          <div
            className="send-button"
            style={{ textAlign: "center", marginTop: "1rem" }}
          >
            <button className="btn-apply" onClick={handleSubmit(editOrder)}>
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPopup;
