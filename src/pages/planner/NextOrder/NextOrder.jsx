import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Loader from "../../../components/Loader/Loader";
import unlock from "../../../assests/unlock.png";
import {
  deleteContainer,
  deleteOrder,
  getContainerByNameThunk,
  getOrderByNumberThunk,
} from "../../../redux/Slices/plannerSlice";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getContainerThunk } from "../../../redux/Slices/companyAdminSlice";

const heading = ["Number", "Date", "Source", "Destination"];
const heading2 = ["Name", "Quantity", "Length", "Width", "Height"];
const schema = yup.object().shape({
  container_name: yup.string().required("Container name is required"),
  containerQuantity: yup.number().required("Quantity is required"),
});
const NextOrder = () => {
  const [is700, setIs700] = useState(window.innerWidth < 700);
  const [showOrder, setShowOrder] = useState(false);
  const [orderNumber, setOrderNumber] = useState();
  const [showCont, setShowCont] = useState(false);
  const [containerQuan, setContainerQuan] = useState({});
  const [editQuan, setEditQuan] = useState({});
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  //function=======================================================================================================================
  const getContainer = (data) => {
    const info = {
      container_name: data.container_name,
    };
    if (`${data.container_name}` in containerQuan) return;
    setContainerQuan((prev) => ({
      ...prev,
      [data.container_name]: data.containerQuantity,
    }));
    dispatch(getContainerByNameThunk(info));
    setValue("container_name", "");
    setValue("containerQuantity", "");
  };
  //useselector
  const loading = useSelector((state) => state.rootReducer.mainSlice.loading);
  const orderData = useSelector(
    (state) => state.rootReducer.plannerSlice.data.orderData
  );
  const containerData = useSelector(
    (state) => state.rootReducer.plannerSlice.data.containerData
  );

  const containerList = useSelector(
    (state) => state.rootReducer.companyAdminSlice.data.containerList
  );

  //function=============================================================================================
  const getOrder = () => {
    if (
      orderNumber &&
      !orderData?.find((val) => val.order_number == orderNumber)
    ) {
      const data = {
        order_number: orderNumber,
      };
      dispatch(getOrderByNumberThunk(data));
    }
    setOrderNumber("");
  };
  const handleDelCont = (data) => {
    dispatch(deleteContainer(data));
    const newquan = { ...containerQuan };
    delete newquan[data];
    setContainerQuan(newquan);
  };
  const handleDelOrder = (data) => {
    dispatch(deleteOrder(data));
    setOrderNumber("");
  };
  //useEffect=-================================================================================================
  useEffect(() => {
    dispatch(getContainerThunk());
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Breadcrumb />
          {!is700 ? <Sidebar className="hide-sidebar" /> : <></>}
          <div className="container-planner-form">
            <section
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "1rem",
              }}
            >
              <div style={{ width: "100%", marginTop: "2rem" }}>
                <button
                  type="button"
                  className="collapsible"
                  id="addLoadDetailsButton"
                  onClick={() => setShowOrder(!showOrder)}
                >
                  Select order
                  <img
                    src={unlock}
                    alt="Lock Icon"
                    id="addLoadDetailsIcon"
                    className="icon"
                  />
                </button>
                {showOrder && (
                  <div
                    className="order-two-buttons"
                    style={{ alignItems: "center" }}
                  >
                    <div className="settings-group">
                      <label>Order Number</label>
                      <input
                        type="number"
                        style={{ marginTop: "0.5rem", width: "100%" }}
                        placeholder="Type here"
                        value={orderNumber}
                        onChange={(e) => setOrderNumber(e.target.value)}
                      />
                    </div>
                    <button
                      className="btn-apply"
                      style={{ marginLeft: "1rem", height: "min-content" }}
                      onClick={() => getOrder()}
                    >
                      Add order
                    </button>
                  </div>
                )}
                <button
                  type="button"
                  className="collapsible"
                  id="addLoadDetailsButton"
                  onClick={() => {
                    setShowCont(!showCont);
                  }}
                >
                  Add container details
                  <img
                    src={unlock}
                    alt="Lock Icon"
                    id="addLoadDetailsIcon"
                    className="icon"
                  />
                </button>
                {showCont && (
                  <div>
                    <div className="order-inputs">
                      <div className="settings-group">
                        <label>Container type</label>
                        <select {...register("container_name")}>
                          <option value="" selected>
                            Select From Dropdown
                          </option>

                          {containerList?.map((ele) => (
                            <option value={ele}>{ele}</option>
                          ))}
                        </select>
                        {errors.container_name && (
                          <p className="error-order">
                            {errors.container_name.message}
                          </p>
                        )}
                      </div>
                      <div className="settings-group">
                        <label> Quantity</label>
                        <input
                          type="number"
                          style={{ marginTop: "0.5rem" }}
                          placeholder="Type here"
                          {...register("containerQuantity")}
                        />
                        {errors.containerQuantity && (
                          <p className="error-order">
                            {errors.containerQuantity.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="order-two-buttons">
                      <button
                        className="btn-apply"
                        onClick={handleSubmit(getContainer)}
                      >
                        Add Container
                      </button>
                      <button className="btn-cancel">Finish </button>
                    </div>
                  </div>
                )}
              </div>
              <div
                className="order-planner-details"
                style={{ background: "#F7F9FD" }}
              >
                <div
                  className="sku-list"
                  style={{
                    padding: orderData.length > 0 ? "2rem 2rem" : "0rem 0rem",
                  }}
                >
                  {orderData.length > 0 && (
                    <>
                      <div className="load-head">Orders</div>
                      <table className="planner-table">
                        <tr className="user-planner-head">
                          {heading.map((ele) => (
                            <th>
                              <h4>{ele}</h4>
                            </th>
                          ))}
                        </tr>
                        {orderData?.map((ele) => (
                          <tr>
                            <td>
                              <h4>{ele?.order_number}</h4>
                            </td>

                            <td>
                              <div>{ele?.planned_start_date}</div>
                            </td>

                            <td>
                              <div>{ele?.source_location}</div>
                            </td>
                            <td>
                              <div>{ele?.destination_location}</div>
                            </td>

                            <td>
                              <div>
                                <button
                                  className="small-btn"
                                  onClick={() =>
                                    handleDelOrder(ele?.order_number)
                                  }
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </table>
                    </>
                  )}
                </div>
                <div
                  className="sku-list"
                  style={{
                    padding:
                      containerData.length > 0 ? "2rem 2rem" : "0rem 0rem",
                  }}
                >
                  {containerData.length > 0 && (
                    <>
                      <div className="load-head">Container details</div>
                      <table className="planner-table">
                        <tr className="user-planner-head">
                          {heading2.map((ele) => (
                            <th>
                              <h4>{ele}</h4>
                            </th>
                          ))}
                        </tr>
                        {containerData?.map((ele) => (
                          <tr>
                            <td>
                              <h4>{ele?.container_name}</h4>
                            </td>
                            <td>
                              <div>
                                {editQuan[ele?.container_name] ? (
                                  <input
                                    type="number"
                                    autoFocus
                                    style={{ padding: "0.2rem" }}
                                    value={containerQuan[ele?.container_name]}
                                    onChange={(e) =>
                                      setContainerQuan((prev) => ({
                                        ...prev,
                                        [ele?.container_name]: e.target.value,
                                      }))
                                    }
                                  />
                                ) : (
                                  containerQuan[ele?.container_name]
                                )}
                              </div>
                            </td>

                            <td>
                              <div>{ele?.length}</div>
                            </td>
                            <td>
                              <div>{ele?.width}</div>
                            </td>
                            <td>
                              <div>{ele?.height}</div>
                            </td>

                            <td>
                              <div>
                                <button
                                  className="small-btn"
                                  onClick={() =>
                                    setEditQuan((prev) => ({
                                      ...prev,
                                      [ele?.container_name]:
                                        !prev[ele?.container_name],
                                    }))
                                  }
                                >
                                  Edit
                                </button>
                              </div>
                            </td>
                            <td>
                              <div>
                                <button
                                  className="small-btn"
                                  onClick={() =>
                                    handleDelCont(ele?.container_name)
                                  }
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </table>
                    </>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default NextOrder;
