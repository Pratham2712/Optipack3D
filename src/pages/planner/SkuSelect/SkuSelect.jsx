import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
import { getContainerThunk } from "../../../redux/Slices/companyAdminSlice";
import OrderPopup from "../../../PlannerComponents/OrderPopup/OrderPopup";

const schema = yup.object().shape({
  sku_code: yup.number().required("SKU code is required"),
  quantity: yup.number().required("Quantity is required"),
});

const heading = ["Code", "Quantity", "Length", "Width", "Height", " ", " "];

const SkuSelect = () => {
  const [manual, setManual] = useState(false);
  const location = useLocation();
  const { result } = location.state || {};
  const [is700, setIs700] = useState(window.innerWidth < 700);
  const dispatch = useDispatch();
  const [quan, setQuan] = useState({});
  const [load, setLoad] = useState(false);
  const [edit, setEdit] = useState(false);

  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  //useselector
  const loading = useSelector((state) => state.rootReducer.mainSlice.loading);
  const skuData = useSelector(
    (state) => state.rootReducer.plannerSlice.data.skuData
  );
  const containerList = useSelector(
    (state) => state.rootReducer.companyAdminSlice.data.containerList
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
    dispatch(getContainerThunk());
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {edit && <OrderPopup edit={edit} setEdit={setEdit} order={result} />}

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
              <div style={{ width: "100%" }}>
                <button
                  type="button"
                  className="collapsible"
                  id="addLoadDetailsButton"
                  onClick={() => setLoad(!load)}
                >
                  Add load details
                  <img
                    src={unlock}
                    alt="Lock Icon"
                    id="addLoadDetailsIcon"
                    className="icon"
                  />
                </button>
                {load && (
                  <div>
                    <div className="order-data">
                      <div>Order Number: #{result?.order_number} </div>
                      <div>Order Date: {result?.planned_start_date} </div>
                      <div>Source: {result?.source_location} </div>
                      <div>Destination: {result?.destination_location} </div>
                    </div>
                    <div className="order-button">
                      <button
                        className="btn-apply"
                        onClick={() => setEdit(true)}
                      >
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
                              <p
                                style={{ color: "red" }}
                                className="error-order"
                              >
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
                          <button
                            className="btn-apply"
                            onClick={handleSubmit(getSku)}
                          >
                            Add SKU
                          </button>
                          <button className="btn-cancel">Finish Adding</button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <button
                  type="button"
                  className="collapsible"
                  id="addLoadDetailsButton"
                >
                  Add container details
                  <img
                    src={unlock}
                    alt="Lock Icon"
                    id="addLoadDetailsIcon"
                    className="icon"
                  />
                </button>
                <div className="order-inputs">
                  <div className="settings-group">
                    <label>Container type</label>
                    <select>
                      <option value="" selected>
                        Select From Dropdown
                      </option>
                      <option value="">General Purpose container 20'</option>
                      <option value="">General Purpose container 40'</option>
                      <option value="">
                        High - Cube General Purpose container 40'
                      </option>
                      {containerList?.map((ele) => (
                        <option value={ele}>{ele}</option>
                      ))}
                    </select>
                  </div>
                  <div className="settings-group">
                    <label> Quantity</label>
                    <input
                      type="number"
                      style={{ marginTop: "0.5rem" }}
                      placeholder="Type here"
                    />
                  </div>
                </div>
                <div className="order-two-buttons">
                  <button className="btn-apply">Add Container</button>
                  <button className="btn-cancel">Finish </button>
                </div>
              </div>
              <div className="load-details" style={{ background: "#F7F9FD" }}>
                {skuData.length > 0 && (
                  <>
                    <div className="load-head">Load details</div>
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
                          {/* <td>
                          <h4>{ele?.sku_name}</h4>
                        </td> */}
                          <td>
                            <div>{quan[ele?.sku_code]}</div>
                          </td>
                          {/* <td>
                          <div>{ele?.gross_weight}</div>
                        </td> */}
                          <td>
                            <div>{ele?.length}</div>
                          </td>
                          <td>
                            <div>{ele?.width}</div>
                          </td>
                          <td>
                            <div>{ele?.height}</div>
                          </td>
                          {/* <td>
                          <div>
                            {ele?.tiltAllowed ? "Allowed" : "Not allowed"}
                          </div>
                        </td> */}
                          <td>
                            <div>
                              <button className="small-btn">Edit</button>
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
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default SkuSelect;
