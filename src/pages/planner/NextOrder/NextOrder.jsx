import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Loader from "../../../components/Loader/Loader";
import unlock from "../../../assests/unlock.png";
import { getOrderByNumberThunk } from "../../../redux/Slices/plannerSlice";

const heading = ["Number", "Date", "Source", "Destination"];

const NextOrder = () => {
  const [is700, setIs700] = useState(window.innerWidth < 700);
  const [showOrder, setShowOrder] = useState(false);
  const [orderNumber, setOrderNumber] = useState();
  const dispatch = useDispatch();
  //useselector
  const loading = useSelector((state) => state.rootReducer.mainSlice.loading);
  const orderData = useSelector(
    (state) => state.rootReducer.plannerSlice.data.orderData
  );
  //function=============================================================================================
  const getOrder = () => {
    if (orderNumber) {
      const data = {
        order_number: orderNumber,
      };
      dispatch(getOrderByNumberThunk(data));
    }
  };
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
                  <div className="order-two-buttons">
                    <div className="settings-group">
                      <label>Order Number</label>
                      <input
                        type="number"
                        style={{ marginTop: "0.5rem", width: "100%" }}
                        placeholder="Type here"
                        onChange={(e) => setOrderNumber(e.target.value)}
                      />
                    </div>
                    <button
                      className="btn-apply"
                      style={{ marginLeft: "1rem" }}
                      onClick={() => getOrder()}
                    >
                      Add order
                    </button>
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
                                <button className="small-btn">Delete</button>
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
