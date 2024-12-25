import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { free_trail } from "../../constants/links";

const Note = ({ mobileView, setFilled }) => {
  const [totalCasesSum, setTotalCasesSum] = useState(0);
  const [totalFilled, setTotalFilled] = useState(0);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(free_trail);
  };

  const tableData = useSelector(
    (state) => state.rootReducer.mainSlice.data.data.df
  );

  const boxInfo = useSelector(
    (state) => state.rootReducer.mainSlice.data.data.box_info
  );

  useEffect(() => {
    const sums = boxInfo?.[0]?.map((_, index) =>
      boxInfo.reduce((sum, arr) => sum + arr[index], 0)
    );
    setFilled(sums);
    setTotalFilled(sums?.reduce((sum, curr) => sum + curr));
    const parser = new DOMParser();
    const doc = parser.parseFromString(tableData, "text/html");
    const totalCasesElements = doc.querySelectorAll("tbody tr td:nth-child(6)");
    const totalSum = Array.from(totalCasesElements).reduce((sum, td) => {
      const value = parseFloat(td.textContent);
      return sum + (isNaN(value) ? 0 : value);
    }, 0);
    setTotalCasesSum(totalSum);
  }, [boxInfo, tableData]);
  return (
    <div>
      {!mobileView && (
        <div
          className="note"
          style={{
            display: totalFilled < totalCasesSum ? "block" : "none",
          }}
        >
          There are still boxes that need to be filled in the container.
          Recommend you to go back and change the number of containers.
          <div style={{ marginTop: "1rem" }}>
            <button className="btn-cancel" onClick={handleGoBack}>
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Note;
