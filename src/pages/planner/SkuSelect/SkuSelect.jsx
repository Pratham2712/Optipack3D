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
import toast from "react-hot-toast";
import * as XLSX from "xlsx";
import editIcon from "../../../assests/edit.png";

import {
  deleteSku,
  getSkuByCodeThunk,
  getSkuByOrderThunk,
  getSkuCodeNameThunk,
  saveSkuThunk,
} from "../../../redux/Slices/plannerSlice";
import "./SkuSelect.css";
import { getLoadPlanThunk } from "../../../redux/Slices/companyAdminSlice";
import OrderPopup from "../../../PlannerComponents/OrderPopup/OrderPopup";
import { planner_contSelection } from "../../../constants/links";

const schema = yup.object().shape({
  sku_code: yup.number().required("SKU code is required"),
  quantity: yup
    .number()
    .required("Quantity is required")
    .max(2000, "Quantity must not exceed 2000. For more SKUs Contact us")
    .min(1, "Quantity must be at least 1"),
});

const heading = ["Code", "Name", "Quantity", "Length", "Width", "Height"];

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
  const [codeArray, setCodeArray] = useState([]);

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
  const skuCodeName = useSelector(
    (state) => state.rootReducer.plannerSlice.skuCodeName
  );

  //function===============================================================================================================
  const getSku = (data) => {
    const info = {
      sku_code: [data.sku_code],
    };
    if (skuData?.length > 7) {
      toast("Upgrade to premium version for more SKUs", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
      });
      return;
    }
    if (
      `${data.sku_code}` in quan ||
      skuData?.some((item) => data.sku_code === item.sku_code)
    ) {
      toast.error("Already added, please edit on the right", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
      });
      return;
    }
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
  const saveSku = () => {
    const data = {
      order_number: result?.order_number,
      skus: [],
    };

    const skus_data = [];
    const seenSkuCodes = new Set();
    let duplicate = false;
    let allQuantitiesValid = true;
    skuData.forEach((ele) => {
      if (!seenSkuCodes.has(ele.sku_code)) {
        seenSkuCodes.add(ele.sku_code);

        const quantity = quan[ele.sku_code];
        if (!quantity || quantity <= 0) {
          // Validate quantity
          toast.error(`Quantity required for SKU: ${ele.sku_name}`, {
            style: {
              border: "1px solid #713200",
              padding: "16px",
              color: "#713200",
            },
          });
          allQuantitiesValid = false;
          return;
        }

        const obj = {
          sku_code: ele.sku_code,
          quantity: quantity,
        };

        skus_data.push(obj);
      } else {
        toast.error("No duplicate SKU", {
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#713200",
          },
        });
        duplicate = true;
      }
    });
    data.skus = skus_data;
    if (!duplicate && data.skus.length > 0) {
      dispatch(saveSkuThunk(data)).then((data) => {
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

          navigate(planner_contSelection);
        }
      });
    }
  };
  const handleFileUpload = (e) => {
    const file = e.target.files[0]; // Get the uploaded file
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = event.target.result;
      const workbook = XLSX.read(data, { type: "binary" });

      const sheetName = workbook.SheetNames[0]; // Get the first sheet
      const sheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(sheet); // Convert sheet to JSON
      const extractedCodes = jsonData
        .filter((row) => !Object.keys(quan).includes(`${row.sku_code}`))
        .map((row) => row.code);
      setCodeArray(extractedCodes);
      const info = {
        sku_code: extractedCodes,
      };
      const skuQuantities = jsonData.reduce((acc, row) => {
        if (row.code && row.quantity) {
          setQuan((prev) => ({
            ...prev,
            [row.code]: row.quantity,
          }));
        }
      }, {});
      dispatch(getSkuByCodeThunk(info));
    };

    reader.readAsBinaryString(file); // Read the file as binary
  };
  //useEffect=========================================================================================================
  useEffect(() => {
    dispatch(getLoadPlanThunk());
    dispatch(getSkuCodeNameThunk());
  }, []);
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    const data = {};
    queryParams.forEach((value, key) => {
      data[key] = value;
    });
    const info = {
      order_numbers: [data?.order_number],
    };
    dispatch(getSkuByOrderThunk(info));

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
                </button>

                <div style={{ marginTop: "2rem" }}>
                  <table>
                    <tr className="user-head">
                      <th>Order Number</th>
                      <th>Order Date</th>
                      <th>Source</th>
                      <th>Destination</th>
                    </tr>
                    <tr>
                      <td>#{result?.order_number}</td>
                      <td>{result?.planned_start_date}</td>
                      <td>{result?.source_location}</td>
                      <td> {result?.destination_location}</td>
                    </tr>
                  </table>
                  {/* <div className="order-data">
                    <div>Order Number: #{result?.order_number} </div>
                    <div>Order Date: {result?.planned_start_date} </div>
                    <div>Source: {result?.source_location} </div>
                    <div>Destination: {result?.destination_location} </div>
                  </div> */}
                  <div className="order-button">
                    <button className="btn-apply" onClick={() => setEdit(true)}>
                      Edit details
                    </button>
                  </div>
                  <section
                    style={{
                      background: "#F7F9FD",
                      padding: "1rem",
                      marginTop: "2rem",
                      borderRadius: "1rem",
                    }}
                  >
                    <div className="order-two-buttons">
                      <input
                        className="custom-file-input"
                        type="file"
                        accept=".xlsx, .xls"
                        onChange={handleFileUpload}
                      />
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
                            {/* <input
                            type="text"
                            style={{ marginTop: "0.5rem" }}
                            placeholder="Type here"
                            {...register("sku_code")}
                          /> */}
                            <select {...register("sku_code")}>
                              <option selected disabled>
                                Select SKU
                              </option>
                              {skuCodeName?.map((ele) => (
                                <option value={ele?.sku_code}>
                                  {ele?.sku_code} / {ele?.sku_name}
                                </option>
                              ))}
                            </select>
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
                        </div>
                      </div>
                    )}
                    <div style={{ textAlign: "center" }}>
                      <button
                        className="btn-cancel"
                        onClick={saveSku}
                        style={{ border: "2px solid black" }}
                      >
                        Save all SKUs
                      </button>
                    </div>
                  </section>
                </div>
              </div>
              <div
                className="order-planner-details"
                style={{ background: "#F7F9FD" }}
              >
                <div
                  className="sku-list"
                  style={{
                    padding: skuData?.length > 0 ? "2rem 2rem" : "0rem 0rem",
                  }}
                >
                  {skuData?.length > 0 && (
                    <>
                      <div className="load-head">
                        Order #{result?.order_number} details
                      </div>
                      <table className="planner-table">
                        <tr className="user-planner-head">
                          {heading.map((ele) => (
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
                        {skuData?.map((ele) => (
                          <tr>
                            <td>
                              <h4>{ele?.sku_code}</h4>
                            </td>

                            <td>
                              <div>{ele?.sku_name}</div>
                            </td>
                            <td>
                              <div>
                                {editQuan[ele?.sku_code] ? (
                                  <input
                                    type="number"
                                    autoFocus
                                    style={{ padding: "0.2rem" }}
                                    value={quan[ele?.sku_code] || ele?.quantity}
                                    onChange={(e) =>
                                      setQuan((prev) => ({
                                        ...prev,
                                        [ele?.sku_code]: e.target.value,
                                      }))
                                    }
                                  />
                                ) : (
                                  quan[ele?.sku_code] || ele?.quantity
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
                                  {editQuan[ele.sku_code] ? "Save" : "Edit"}
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
