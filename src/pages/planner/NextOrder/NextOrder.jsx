import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Loader from "../../../components/Loader/Loader";
import unlock from "../../../assests/unlock.png";
import editIcon from "../../../assests/edit.png";
import toast from "react-hot-toast";

import {
  deleteContainer,
  deleteOrder,
  getContainerByNameThunk,
  getOrderByNumberThunk,
  getOrderDataThunk,
  getSkuByOrderThunk,
} from "../../../redux/Slices/plannerSlice";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getContainerThunk } from "../../../redux/Slices/companyAdminSlice";
import { Link, useNavigate } from "react-router-dom";
import tick from "../../../assests/tick.png";
import { contact_us } from "../../../constants/links";
import { rgbaToHex } from "../../../Util/util";

const heading = ["Number", "Date", "Source", "Destination"];
const heading2 = ["Name", "Quantity", "Length", "Width", "Height"];
const schema = yup.object().shape({
  container_name: yup.string().required("Container name is required"),
  containerQuantity: yup
    .number()
    .required("Quantity is required")
    .min(1, "Quantity must be at least 1")
    .max(5, "For more than 5 container. Contact us"),
});

const NextOrder = ({ containerQuan, setContainerQuan }) => {
  const [colors, setColors] = useState([
    "rgba(244, 67, 54, 1)", // Color 1
    "rgba(76, 175, 80, 1)", // Color 2
    "rgba(33, 150, 243, 1)", // Color 3
    "rgba(255, 181, 181,1)",
    "rgba(255, 111, 60,1)",
    "rgba(247, 7, 118,1)",
    "rgba(239, 213, 16,1)",
  ]);
  const [is700, setIs700] = useState(window.innerWidth < 700);
  const [showOrder, setShowOrder] = useState(false);
  const [orderNumber, setOrderNumber] = useState();
  const [showCont, setShowCont] = useState(false);
  const [editQuan, setEditQuan] = useState({});
  const [addOrderFinish, setAddOrderFinish] = useState(false);
  const [addContFinish, setAddContFinish] = useState(false);
  const [orderColorData, setOrderColorData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  const allOrderNumber = useSelector(
    (state) => state.rootReducer.plannerSlice.data.allOrders
  );
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
    if (`${data.container_name}` in containerQuan) {
      toast.error(`${data.container_name} is already added`, {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
      });
      return;
    }
    setContainerQuan((prev) => ({
      ...prev,
      [data.container_name]: data.containerQuantity,
    }));
    dispatch(getContainerByNameThunk(info));
    setValue("container_name", "");
    setValue("containerQuantity", 1);
  };

  const tempOrderColorData = {};
  const finalObject = (input) => {
    // Initialize the output object
    const output = {
      numTypes: input.length,
      totalContainers: containerData.length,
      sumContainers: 0,
    };

    // Loop through each SKU and populate the output object
    input.forEach((sku, index) => {
      // Add SKU name and related properties to the output
      output[`sku${index}`] = sku.sku_name; // SKU name
      output[`grossWeight${index}`] = sku.gross_weight; // Gross weight
      output[`length${index}`] = sku.length; // Length
      output[`width${index}`] = sku.width; // Width
      output[`height${index}`] = sku.height; // Height
      output[`numberOfCases${index}`] = sku.quantity; // Quantity
      output[`volume${index}`] = sku.volume; // Volume
      output[`netWeight${index}`] = sku.netWeight; // Net weight
      output[`rotationAllowed${index}`] = sku.rotationAllowed ? "on" : "off"; // Rotation allowed

      // Add color if available
      if (colors[index]) {
        output[`color${index}`] = colors[index];
        tempOrderColorData[rgbaToHex(colors[index])] = sku.orderNumber;
      }
    });

    containerData.forEach((ele, ind) => {
      output[`containerType${ind}`] = ele.container_name;
      output[`numContainers${ind}`] = containerQuan[ele.container_name];
      output["sumContainers"] += parseInt(containerQuan[ele.container_name]);
    });

    return output;
  };

  const onSubmit = () => {
    if (orderData.length > 0 && containerData.length > 0) {
      const data = {
        order_numbers: [],
      };
      orderData?.forEach((ele) => {
        data.order_numbers.push(ele.order_number);
      });

      dispatch(getSkuByOrderThunk(data)).then((data) => {
        let isEmpty = true;
        if (data.payload["SUCCESS"]) {
          if (isEmpty) {
            const sku = data.payload["SUCCESS"]?.result;

            for (const [key, skuList] of Object.entries(sku)) {
              if (skuList.length > 0) {
                isEmpty = false;
              }
            }
            if (isEmpty) {
              toast.error(`SKUs is not added to order`, {
                style: {
                  border: "1px solid #713200",
                  padding: "16px",
                  color: "#713200",
                },
              });
              return;
            }
          }
        }
        if (data.payload["SUCCESS"]?.message && !isEmpty) {
          const result = data.payload["SUCCESS"]?.result;
          let skuArray = [];
          skuArray = Object.entries(result).flatMap(([orderNumber, items]) =>
            items?.map((item) => ({
              ...item,
              orderNumber,
            }))
          );

          const final = finalObject(skuArray);
          console.log(final);

          const queryParams = new URLSearchParams();
          Object.keys(final).forEach((key) => {
            queryParams.append(key, final[key]);
          });
          queryParams.append("admin", true);
          const url = `/freeOutput?${queryParams.toString()}`;
          console.log(tempOrderColorData);
          navigate(url, {
            state: {
              orderColorData: tempOrderColorData,
            },
          });
        }
      });
    }
  };

  //function=============================================================================================
  const getOrder = () => {
    if (
      orderNumber &&
      !orderData?.find((val) => val.order_number == orderNumber)
    ) {
      const data = {
        order_number: orderNumber,
      };
      dispatch(getOrderByNumberThunk(data)).then((data) => {
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
        }
      });
    } else {
      toast.error(`Order #${orderNumber} is already added`, {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
      });
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
  const FinishAddOrder = () => {
    if (orderData.length > 0) {
      setShowOrder(!showOrder);
      setAddOrderFinish(true);
    } else {
      toast.error("Order can't be empty", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
      });
      setAddOrderFinish(false);
    }
  };
  const FinishAddCont = () => {
    if (containerData.length > 0) {
      setShowCont(!showCont);
      setAddContFinish(true);
    } else {
      toast.error("Container can't be empty", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
      });
      setAddContFinish(false);
    }
  };

  const formatDate = (date) => {
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      //   hour: "2-digit",
      //   minute: "2-digit",
      // second: "2-digit",
      hour12: true, // for 12-hour format, set to false for 24-hour format
    });
    return formattedDate;
  };
  //useEffect=-================================================================================================
  useEffect(() => {
    dispatch(getContainerThunk());
    dispatch(getOrderDataThunk());
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
                  style={{ background: addOrderFinish ? "#CFFBBF" : "" }}
                >
                  Create load
                  <img
                    src={addOrderFinish ? tick : unlock}
                    alt="Lock Icon"
                    id="addLoadDetailsIcon"
                    className="icon"
                  />
                </button>
                {showOrder && (
                  <>
                    <div
                      className="order-two-buttons"
                      style={{ alignItems: "center" }}
                    >
                      <div className="settings-group">
                        <label>Order Number</label>
                        {/* <input
                          type="number"
                          style={{ marginTop: "0.5rem", width: "100%" }}
                          placeholder="Type here"
                          value={orderNumber}
                          onChange={(e) => setOrderNumber(e.target.value)}
                        /> */}
                        <select
                          onChange={(e) => setOrderNumber(e.target.value)}
                          style={{ width: "400px", display: "block" }}
                        >
                          <option value="" selected>
                            Select order
                          </option>

                          {allOrderNumber?.map((ele) => {
                            if (ele?.assigned_users.length === 0) {
                              return (
                                <option value={ele?.order_number}>
                                  <div>
                                    #{ele?.order_number} -{" "}
                                    {formatDate(ele?.planned_start_date)}
                                  </div>
                                </option>
                              );
                            }
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="order-two-buttons">
                      <button className="btn-apply" onClick={() => getOrder()}>
                        Add order
                      </button>
                      <button className="btn-cancel" onClick={FinishAddOrder}>
                        Finish{" "}
                      </button>
                    </div>
                  </>
                )}
                <button
                  type="button"
                  className="collapsible"
                  id="addLoadDetailsButton"
                  onClick={() => {
                    setShowCont(!showCont);
                  }}
                  style={{ background: addContFinish ? "#CFFBBF" : "" }}
                >
                  Add container details
                  <img
                    src={addContFinish ? tick : unlock}
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
                        {/* <input
                          type="number"
                          style={{ marginTop: "0.5rem" }}
                          placeholder="Type here"
                          {...register("containerQuantity")}
                          max={5}
                          min={1}
                        /> */}
                        <select
                          {...register("containerQuantity")}
                          style={{ marginTop: "0.5rem" }}
                        >
                          {[...Array(5)].map((_, index) => {
                            return (
                              <option value={index + 1}>{index + 1}</option>
                            );
                          })}
                        </select>
                        {errors.containerQuantity && (
                          <p className="error-order">
                            {errors.containerQuantity.message}
                          </p>
                        )}
                        <p
                          style={{
                            fontSize: "0.8rem",
                            color: "skyblue",
                            marginTop: "1rem",
                          }}
                        >
                          If you wish to add more than 5, please{" "}
                          <Link to={contact_us}> contact us </Link>or upgrade to
                          premium
                        </p>
                      </div>
                    </div>
                    <div className="order-two-buttons">
                      <button
                        className="btn-apply"
                        onClick={handleSubmit(getContainer)}
                      >
                        Add Container
                      </button>
                      <button className="btn-cancel" onClick={FinishAddCont}>
                        Finish{" "}
                      </button>
                    </div>
                  </div>
                )}
                <div className="optimize">
                  <button className="btn-apply" onClick={onSubmit}>
                    Optimize
                  </button>
                </div>
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
                              <div style={{ width: "72px" }}>
                                {ele?.planned_start_date}
                              </div>
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
                            <th
                              style={{
                                display: ele === "Quantity" ? "flex" : "",
                              }}
                            >
                              <h4>{ele}</h4>
                              {ele === "Quantity" ? (
                                <img
                                  src={editIcon}
                                  alt=""
                                  style={{ marginLeft: "0.3rem" }}
                                />
                              ) : (
                                <></>
                              )}
                            </th>
                          ))}
                        </tr>
                        {containerData?.map((ele) => (
                          <tr>
                            <td>
                              <h4 style={{ width: "155px" }}>
                                {ele?.container_name}
                              </h4>
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
                                  {editQuan[ele.container_name]
                                    ? "Save"
                                    : "Edit"}
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
