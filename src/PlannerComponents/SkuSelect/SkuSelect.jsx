import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { getSkuThunk } from "../../redux/Slices/companyAdminSlice";
import "./SkuSelect.css";

const heading = [
  "Select",
  "Name",
  "Gross weight",
  "Length",
  "Width",
  "Height",
  "Tilt allowed",
];
const SkuSelect = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  //useSelector============================================================================================================
  const sku = useSelector(
    (state) => state.rootReducer.companyAdminSlice.data.sku
  );
  const total = useSelector(
    (state) => state.rootReducer.companyAdminSlice.data.total_sku
  );
  //functon ====================================================================================================
  const pageParams = (page, pageSize) => {
    const params = Object.fromEntries(searchParams);
    params["page"] = page;
    params["pagesize"] = pageSize;
    setSearchParams(createSearchParams(params));
  };
  const pageSize = parseInt(searchParams.get("pagesize")) || 1; // Default to 1 if pagesize is invalid
  const totalPages = Math.ceil(total / pageSize);
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
    <div>
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
              <input type="checkbox" />
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
          </tr>
        ))}
      </table>

      <div className="pagination">
        <i class="fa-solid fa-chevron-left" onClick={prevPage}></i>
        {[...Array(totalPages)]?.map((_, index) => (
          <button
            style={{
              background: searchParams.get("page") - 1 == index ? "black" : "",
              color: searchParams.get("page") - 1 == index ? "white" : "black",
            }}
            onClick={() => pageParams(index + 1, searchParams.get("pagesize"))}
          >
            {index + 1}
          </button>
        ))}
        <i class="fa-solid fa-chevron-right" onClick={nextPage}></i>
      </div>
    </div>
  );
};

export default SkuSelect;
