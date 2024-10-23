import React, { useEffect, useState } from "react";
import "./SkuSetting.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { createSearchParams, useSearchParams } from "react-router-dom";

import {
  addSkuThunk,
  deleteSkuThunk,
  getSkuThunk,
} from "../../../redux/Slices/companyAdminSlice";
import toast from "react-hot-toast";
import ConfirmPopup from "../../../AdminComponents/ConfirmPopup/ConfirmPopup";

const validationSchema = yup.object().shape({
  sku_name: yup.string().required("SKU name is required"),
  sku_code: yup.number().required("SKU code is required"),
  gross_weight: yup
    .number()
    .typeError("Gross Weight must be a number")
    .required("Gross Weight is required"),
  length: yup
    .number()
    .typeError("Length must be a number")
    .required("Length is required")
    .integer("Length cannot have decimal values"),
  width: yup
    .number()
    .typeError("Width must be a number")
    .required("Width is required")
    .integer("Width cannot have decimal values"),
  height: yup
    .number()
    .typeError("Height must be a number")
    .required("Height is required")
    .integer("Height cannot have decimal values"),
  numberOfCases: yup
    .number()
    .typeError("Number of Cases must be a number")
    // .required("Number of Cases is required")
    .integer("Number of Cases cannot have decimal values"),
  tiltAllowed: yup.boolean(),
});

const heading = [
  "Code",
  "Name",
  "Gross weight",
  "Length",
  "Width",
  "Height",
  "Tilt allowed",
  "Delete",
];
const SkuSetting = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [confirm, setConfirm] = useState(false);
  const [code, setCode] = useState("");

  //useSelector============================================================================================================
  const sku = useSelector(
    (state) => state.rootReducer.companyAdminSlice.data.sku
  );
  const total = useSelector(
    (state) => state.rootReducer.companyAdminSlice.data.total_sku
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  //functon ====================================================================================================
  const pageParams = (page, pageSize) => {
    const params = Object.fromEntries(searchParams);
    params["page"] = page;
    params["pagesize"] = pageSize;
    setSearchParams(createSearchParams(params));
  };
  const pageSize = parseInt(searchParams.get("pagesize")) || 1; // Default to 1 if pagesize is invalid
  const totalPages = Math.ceil(total / pageSize);
  const onSubmit = (data) => {
    let exist = false;
    sku?.map((ele) => {
      if (ele.sku_code == data.sku_code) {
        exist = true;
        toast.error("SKU code already exist", {
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#713200",
          },
        });
        return;
      }
    });
    if (!exist) {
      dispatch(addSkuThunk(data)).then((data) => {
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
    }
  };
  const prevPage = () => {
    const currentPage = parseInt(searchParams.get("page")) || 1;
    const pageSize = parseInt(searchParams.get("pagesize")) || 3;

    if (currentPage > 1) {
      pageParams(currentPage - 1, pageSize);
    }
  };
  const nextPage = () => {
    const currentPage = parseInt(searchParams.get("page")) || 1;
    const pageSize = parseInt(searchParams.get("pagesize")) || 3;
    const totalPages = Math.ceil(total / pageSize);

    if (currentPage < totalPages) {
      pageParams(currentPage + 1, pageSize);
    }
  };
  const deleteSku = () => {
    const data = {
      sku_code: code,
    };
    dispatch(deleteSkuThunk(data));
  };
  //useEffect=================================================================================================================
  useEffect(() => {
    const data = {
      page: searchParams.get("page") - 1 || 0,
      pagesize: searchParams.get("pagesize") || 3,
    };
    dispatch(getSkuThunk(data));
  }, [searchParams.get("page")]);
  useEffect(() => {
    const params = Object.fromEntries(searchParams);
    params["page"] = 1;
    params["pagesize"] = 3;
    setSearchParams(createSearchParams(params));
  }, []);
  return (
    <section>
      <div style={{ margin: "2rem 0rem" }}>
        <h2>SKU settings</h2>
        <div className="input-admin-row">
          <div className="input">
            <label>SKU code</label>
            <input type="text" {...register("sku_code")} />
            <p>{errors.sku_code?.message}</p>
          </div>
          <div className="input">
            <label>SKU name</label>
            <input type="text" {...register("sku_name")} />
            <p>{errors.sku_name?.message}</p>
          </div>
          <div className="input">
            <label>Gross Weight (kg):</label>
            <input type="number" {...register("gross_weight")} />
            <p>{errors.gross_weight?.message}</p>
          </div>
          <div className="input">
            <label>Length (mm):</label>
            <input type="number" {...register("length")} />
            <p>{errors.length?.message}</p>
          </div>
          <div className="input">
            <label>Width (mm):</label>
            <input type="number" {...register("width")} />
            <p>{errors.width?.message}</p>
          </div>
          <div className="input">
            <label>Height (mm):</label>
            <input type="number" {...register("height")} />
            <p>{errors.height?.message}</p>
          </div>
          {/* <div className="input">
            <label>Number of Cases:</label>
            <input type="number" {...register("numberOfCases")} />
            <p>{errors.numberOfCases?.message}</p>
          </div> */}
          <div className="input checkbox-label">
            <label htmlFor="tilt">Tilt Allowed:</label>
            <input type="checkbox" id="tilt" {...register("tiltAllowed")} />
          </div>
          <div style={{ marginLeft: "1rem" }}>
            <button className="btn-apply" onClick={handleSubmit(onSubmit)}>
              Add
            </button>
          </div>
        </div>
      </div>
      <div className="sku-content">
        {confirm ? (
          <ConfirmPopup
            confirm={confirm}
            setConfirm={setConfirm}
            message={"delete SKU"}
            removeUser={deleteSku}
          />
        ) : (
          <></>
        )}
        <table>
          <tr className="user-head">
            {heading.map((ele) => (
              <th>
                <h4>{ele}</h4>
              </th>
            ))}
          </tr>
          {sku?.map((ele) => (
            <tr>
              <td>
                <h4>{ele?.sku_code}</h4>
              </td>
              <td>
                <h4>{ele?.sku_name}</h4>
              </td>
              <td>
                <div>{ele?.gross_weight}</div>
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
                <div>{ele?.tiltAllowed ? "Allowed" : "Not allowed"}</div>
              </td>
              <td>
                <div>
                  <button
                    className="btn-apply"
                    onClick={() => {
                      setConfirm(true);
                      setCode(ele?.sku_code);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </table>

        <div className="pagination">
          <i class="fa-solid fa-chevron-left" onClick={prevPage}></i>
          {[...Array(totalPages)]?.map((_, index) => (
            <button
              style={{
                background:
                  searchParams.get("page") - 1 == index ? "black" : "",
                color:
                  searchParams.get("page") - 1 == index ? "white" : "black",
              }}
              onClick={() =>
                pageParams(index + 1, searchParams.get("pagesize"))
              }
            >
              {index + 1}
            </button>
          ))}
          <i class="fa-solid fa-chevron-right" onClick={nextPage}></i>
        </div>
      </div>
    </section>
  );
};

export default SkuSetting;
