import React, { useEffect } from "react";
import { getOrderDataThunk } from "../../redux/Slices/plannerSlice";
import { useDispatch, useSelector } from "react-redux";

const heading = [
  " ",
  "Order Number",
  "Order Date",
  "Source",
  "Destination",
  "Assigned User",
  "Delete",
];
const OrderTable = () => {
  const dispatch = useDispatch();
  const allOrders = useSelector(
    (state) => state.rootReducer.plannerSlice.data.allOrders
  );

  //fucntion ================================================================================================================
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

  useEffect(() => {
    dispatch(getOrderDataThunk());
  }, []);
  return (
    <div style={{ width: "82%", margin: "2rem auto" }}>
      <div className="user-content">
        <table>
          <tr className="user-head">
            {heading.map((ele) => (
              <th>
                <h4>{ele}</h4>
              </th>
            ))}
          </tr>
          {allOrders?.map((item, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>#{item?.order_number}</td>
              <td>{formatDate(item?.planned_start_date)}</td>
              <td>{item?.source_location}</td>
              <td>{item?.destination_location}</td>
              <td>
                {item?.assigned_users?.map((ele) => (
                  <div>{ele}</div>
                ))}
              </td>
              <td>
                <div>
                  <button className="btn-apply">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
