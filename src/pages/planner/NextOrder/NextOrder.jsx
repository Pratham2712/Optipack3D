import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Loader from "../../../components/Loader/Loader";
import unlock from "../../../assests/unlock.png";
import toast from "react-hot-toast";

import {
  deleteContainer,
  deleteOrder,
  getContainerByNameThunk,
  getOrderByNumberThunk,
  getSkuByOrderThunk,
} from "../../../redux/Slices/plannerSlice";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getContainerThunk } from "../../../redux/Slices/companyAdminSlice";
import { useNavigate } from "react-router-dom";

const heading = ["Number", "Date", "Source", "Destination"];
const heading2 = ["Name", "Quantity", "Length", "Width", "Height"];
const schema = yup.object().shape({
  container_name: yup.string().required("Container name is required"),
  containerQuantity: yup.number().required("Quantity is required"),
});

const NextOrder = () => {
  const [colors, setColors] = useState([
    "rgba(244, 67, 54, 1)", // Color 1
    "rgba(76, 175, 80, 1)", // Color 2
    "rgba(33, 150, 243, 1)", // Color 3
  ]);
  const [is700, setIs700] = useState(window.innerWidth < 700);
  const [showOrder, setShowOrder] = useState(false);
  const [orderNumber, setOrderNumber] = useState();
  const [showCont, setShowCont] = useState(false);
  const [containerQuan, setContainerQuan] = useState({});
  const [editQuan, setEditQuan] = useState({});
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
  console.log(containerData);

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
        output[`color${index}`] = colors[index]; // Color
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
        if (data.payload["SUCCESS"]?.message) {
          const result = data.payload["SUCCESS"]?.result;
          let skuArray = [];
          skuArray = Object.values(result).flat();
          const final = finalObject(skuArray);
          console.log(final);
          const queryParams = new URLSearchParams();
          Object.keys(final).forEach((key) => {
            queryParams.append(key, final[key]);
          });
          const url = `/freeOutput?${queryParams.toString()}`;
          navigate(url);
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
                  <>
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
                    </div>
                    <div className="order-two-buttons">
                      <button className="btn-apply" onClick={() => getOrder()}>
                        Add order
                      </button>
                      <button
                        className="btn-cancel"
                        onClick={() => setShowOrder(!showOrder)}
                      >
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
                      <button
                        className="btn-cancel"
                        onClick={() => {
                          setShowCont(!showCont);
                        }}
                      >
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