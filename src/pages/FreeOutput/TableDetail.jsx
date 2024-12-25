import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { rgbaToHex } from "../../Util/util";
const TableDetail = ({
  mobileView,
  orderNumToSku,
  filled,
  skuData,
  numCases,
}) => {
  const [heading, setHeading] = useState([
    " ",
    "Name",
    "Length",
    "Width",
    "Height",
    "Number of boxes per strip",
    "Total cases",
    "Filled cases",
  ]);
  //useSelector===========================================================================================================================
  const num_skus = useSelector(
    (state) => state.rootReducer.mainSlice.data.data.num_skus
  );
  const sku_info = useSelector(
    (state) => state.rootReducer.mainSlice.data.data.sku_info
  );
  const colorsData = useSelector(
    (state) => state.rootReducer.mainSlice.data.data.colors
  );
  //useEffect ===================================================================================================================
  useEffect(() => {
    if (orderNumToSku) {
      setHeading((prevArray) => {
        const newArray = [...prevArray];
        newArray.splice(1, 0, "Order Number");
        return newArray;
      });
    }
  }, [orderNumToSku]);
  return (
    <>
      <div style={{ fontSize: "1.5rem", marginTop: "1rem" }}>
        {mobileView ? "Order Visualization :" : "Order Information :"}{" "}
      </div>
      {!mobileView && (
        <div className="table" style={{ display: "flex" }}>
          <div className="table-info">
            <table>
              <tr>
                {heading.map((ele) => (
                  <th>{ele}</th>
                ))}
              </tr>
              {num_skus?.map((_, index) => {
                const matchingSku = skuData.find(
                  (item) => rgbaToHex(item.color) == colorsData[index]
                );
                return (
                  <tr>
                    <td>{index + 1}</td>
                    {orderNumToSku ? (
                      <td>
                        {" "}
                        {orderNumToSku[matchingSku?.sku]?.map(
                          (item) => `#${item}`
                        )}{" "}
                      </td>
                    ) : (
                      <></>
                    )}
                    <td style={{ background: colorsData[index] }}>
                      {matchingSku?.sku}
                    </td>

                    <td>{sku_info?.[index]?.[1]}</td>
                    <td>{sku_info?.[index]?.[2]}</td>
                    <td>{sku_info?.[index]?.[3]}</td>
                    <td>{sku_info?.[index]?.[4]}</td>
                    <td>{numCases[index]}</td>
                    <td>{filled?.[index]}</td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default TableDetail;
