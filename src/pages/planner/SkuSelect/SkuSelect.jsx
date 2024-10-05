import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Loader from "../../../components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import unlock from "../../../assests/unlock.png";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  deleteSku,
  getSkuByCodeThunk,
} from "../../../redux/Slices/plannerSlice";
import "./SkuSelect.css";
import {
  getLoadPlanThunk,
} from "../../../redux/Slices/companyAdminSlice";
import OrderPopup from "../../../PlannerComponents/OrderPopup/OrderPopup";
import { planner_contSelection } from "../../../constants/links";

const schema = yup.object().shape({
  sku_code: yup.number().required("SKU code is required"),
  quantity: yup.number().required("Quantity is required"),
});

const heading = ["Code", "Quantity", "Length", "Width", "Height"];

const SkuSelect = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [manual, setManual] = useState(false);
  const [result, setResult] = useState();
  const [is700, setIs700] = useState(window.innerWidth < 700);
  const dispatch = useDispatch();
  const [quan, setQuan] = useState({});
  const [edit, setEdit] = useState(false);
  const [editQuan, setEditQuan] = useState({});

  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
 
  //useselector========================================================================================================
  const loading = useSelector((state) => state.rootReducer.mainSlice.loading);
  const skuData = useSelector(
    (state) => state.rootReducer.plannerSlice.data.skuData
  );
  
  const loadplanData = useSelector(
    (state) => state.rootReducer.companyAdminSlice.data.loadplan
  );

  
  //function===============================================================================================================
  const getSku = (data) => {
    const info = {
      sku_code: data.sku_code,
    };
    if (`${data.sku_code}` in quan) return;
    setQuan((prev) => ({ ...prev, [data.sku_code]: data.quantity }));
    dispatch(getSkuByCodeThunk(info));
    setValue("sku_code", "");
    setValue("quantity", "");
  };
 
  const handleDelSku = (data) => {
    dispatch(deleteSku(data));
    const newquan = { ...quan };
    delete newquan[data];
    setQuan(newquan);
  };
  //useEffect=========================================================================================================
  useEffect(() => {
    dispatch(getLoadPlanThunk());
  }, []);
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    const data = {};
    queryParams.forEach((value, key) => {
      data[key] = value;
    });

    setResult(data);
  }, [location.search]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {edit && (
            <OrderPopup
              edit={edit}
              setEdit={setEdit}
              order={result}
              loadplanData={loadplanData}
            />
          )}

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
                >
                  Add order details
                  <img
                    src={unlock}
                    alt="Lock Icon"
                    id="addLoadDetailsIcon"
                    className="icon"
                  />
                </button>

                <div>
                  <div className="order-data">
                    <div>Order Number: #{result?.order_number} </div>
                    <div>Order Date: {result?.planned_start_date} </div>
                    <div>Source: {result?.source_location} </div>
                    <div>Destination: {result?.destination_location} </div>
                  </div>
                  <div className="order-button">
                    <button className="btn-apply" onClick={() => setEdit(true)}>
                      Edit details
                    </button>
                  </div>
                  <div className="order-two-buttons">
                    <button className="btn-apply">Upload SKU excel</button>
                    <button
                      className="btn-apply"
                      onClick={() => setManual(!manual)}
                    >
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
                            <p className="error-order">
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
                          {errors.quantity && (
                            <p className="error-order">
                              {errors.quantity.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="order-two-buttons">
                        <button
                          className="btn-apply"
                          onClick={handleSubmit(getSku)}
                        >
                          Add SKU
                        </button>
                        <button
                          className="btn-cancel"
                          onClick={() => navigate(planner_contSelection)}
                        >
                          Finish Adding
                        </button>
                      </div>
                    </div>
                  )}
                </div>

              
              </div>
              <div
                className="order-planner-details"
                style={{ background: "#F7F9FD" }}
              >
                <div
                  className="sku-list"
                  style={{
                    padding: skuData.length > 0 ? "2rem 2rem" : "0rem 0rem",
                  }}
                >
                  {skuData.length > 0 && (
                    <>
                      <div className="load-head">
                        Order #{result?.order_number} details
                      </div>
                      <table className="planner-table">
                        <tr className="user-planner-head">
                          {heading.map((ele) => (
                            <th>
                              <h4>{ele}</h4>
                            </th>
                          ))}
                        </tr>
                        {skuData?.map((ele) => (
                          <tr>
                            <td>
                              <h4>{ele?.sku_code}</h4>
                            </td>

                            <td>
                              <div>
                                {editQuan[ele?.sku_code] ? (
                                  <input
                                    type="number"
                                    autoFocus
                                    style={{ padding: "0.2rem" }}
                                    value={quan[ele?.sku_code]}
                                    onChange={(e) =>
                                      setQuan((prev) => ({
                                        ...prev,
                                        [ele?.sku_code]: e.target.value,
                                      }))
                                    }
                                  />
                                ) : (
                                  quan[ele?.sku_code]
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
                                      [ele?.sku_code]: !prev[ele?.sku_code],
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
                                  onClick={() => {
                                    handleDelSku(ele?.sku_code);
                                  }}
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

export default SkuSelect;
