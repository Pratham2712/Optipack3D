import React, { useEffect, useState } from "react";
import "./FreeTrail.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import unlock from "../../assests/unlock.png";
import lock from "../../assests/lock.png";
import tick from "../../assests/tick.png";
import DimensionInput from "../../components/DimensionInput/DimensionInput";
import ContainerDetails from "../../components/ContainerDetails/ContainerDetails";
import { getDataThunk } from "../../redux/Slices/mainSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { free_output } from "../../constants/links";
import Popup from "../../components/Popup/Popup";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../components/Loader/Loader";

const FreeTrail = ({ skuData, setSkuData, inputs, setInputs }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [premium, setPremium] = useState(false);
  const [is700, setIs700] = useState(window.innerWidth < 700);
  const [showInput, setShowInput] = useState(false);
  const [inputSuccess, setInputSuccess] = useState(false);
  const [contSuccess, setContSuccess] = useState(false);
  const [showCont, setShowCont] = useState(false);

  const loading = useSelector((state) => state.rootReducer.mainSlice.loading);

  const handleInputChange = (index, field, value) => {
    setSkuData((prevData) => ({
      ...prevData,
      [`${field}${index}`]: value,
    }));
  };
  //submit logic====================================================
  const onSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = [
      "length",
      "width",
      "height",
      "numberOfCases",
      "grossWeight",
      "sku",
      "color",
    ];

    const uniqueColors = new Set();
    let isValid = true;
    if (inputSuccess) {
      inputs.forEach((index) => {
        requiredFields.forEach((field) => {
          const key = `${field}${index}`;
          if (!skuData[key]) {
            alert(`Missing value for ${key}`);
            isValid = false;
          }
        });

        // Check if color is unique
        const colorKey = `color${index}`;
        const colorValue = skuData[colorKey];
        if (uniqueColors.has(colorValue)) {
          alert(`Color is duplicated!`);
          isValid = false;
        } else {
          uniqueColors.add(colorValue);
        }
      });
    }
    const filteredSkuData = {
      totalContainers: 1,
      numContainers0: skuData.numContainers0,
      sumContainers: skuData.numContainers0,
      numTypes: inputs.length,
    };
    inputs.forEach((index, i) => {
      Object.keys(skuData).forEach((key) => {
        if (key.endsWith(index)) {
          // Adjust the key to remove the index and replace with sequential index
          const newKey = key.replace(`${index}`, `${i}`);
          filteredSkuData[newKey] = skuData[key];
        }
      });
    });

    const queryParams = new URLSearchParams();
    Object.keys(filteredSkuData).forEach((key) => {
      queryParams.append(key, filteredSkuData[key]);
    });

    const formData = new FormData();
    Object.keys(filteredSkuData).forEach((key) => {
      formData.append(key, filteredSkuData[key]);
    });
    if (!inputSuccess) {
      toast.error("Confirmed the loading details", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
      });
    } else if (!contSuccess) {
      toast.error("Confirmed the container details", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
      });
    }
    if (isValid && inputSuccess && contSuccess) {
      console.log("SKU Data is valid:", filteredSkuData);

      // dispatch(getDataThunk(formData)).then((data) => {
      //   if (data?.payload) {
      //     setInputSuccess(true);
      const url = `/freeOutput?${queryParams.toString()}`;
      navigate(url);
      // navigate(free_output, { state: { filteredSkuData } });
      //   }
      // });
    } else {
      console.error("Validation failed. Please check the console for details.");
    }
  };
  useEffect(() => {
    const handleResize = () => {
      setIs700(window.innerWidth < 700);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Toaster />

          <Breadcrumb />
          {/* {!is700 ? <Sidebar className="hide-sidebar" /> : <></>} */}
          <div className="container-form">
            <h1>Load Builder (Trial Version)</h1>
            <div style={{ margin: "2rem 0", textAlign: "left" }}>
              <div
                style={{
                  background: "#f8f9fa",
                  borderLeft: "4px solid black",
                  padding: "1rem",
                  borderRadius: "5px",
                  fontSize: "1rem",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <strong>Note:</strong>
                <ol style={{ paddingLeft: "1.5rem" }}>
                  <li>Step 1: Add SKU dimensions detail.</li>
                  <li>Step 2: Select container and their quantity.</li>
                  <li>
                    Step 3: Click the "Optimize" button to optimize your load
                    plan.
                  </li>
                </ol>
              </div>
            </div>
            <form>
              <button
                type="button"
                className="collapsible"
                id="addLoadDetailsButton"
                onClick={() => {
                  setShowInput(!showInput);
                }}
                style={{ background: inputSuccess ? "#CFFBBF" : "" }}
              >
                Add load details
                <img
                  src={inputSuccess ? tick : unlock}
                  alt="Lock Icon"
                  id="addLoadDetailsIcon"
                  className="icon"
                />
              </button>
              <div class="content">
                <input type="hidden" id="numTypes" name="numTypes" value="3" />

                {/* <!-- Prefilled SKUs will be generated here --> */}
                {showInput && (
                  <DimensionInput
                    inputSuccess={inputSuccess}
                    setInputSuccess={setInputSuccess}
                    skuData={skuData}
                    setSkuData={setSkuData}
                    inputs={inputs}
                    setInputs={setInputs}
                    handleInputChange={handleInputChange}
                    setShowInput={setShowInput}
                  />
                )}
              </div>
              <button
                type="button"
                className="collapsible"
                id="addLoadDetailsButton"
                onClick={() => {
                  setShowCont(!showCont);
                }}
                style={{ background: contSuccess ? "#CFFBBF" : "" }}
              >
                Add Container details
                <img
                  src={
                    inputSuccess && contSuccess
                      ? tick
                      : inputSuccess
                      ? unlock
                      : lock
                  }
                  alt="Lock Icon"
                  id="addContainerDetails"
                  className="icon"
                />
              </button>
              <div class="content">
                {inputSuccess && showCont && (
                  <ContainerDetails
                    skuData={skuData}
                    setSkuData={setSkuData}
                    handleInputChange={handleInputChange}
                    setContSuccess={setContSuccess}
                    setShowCont={setShowCont}
                  />
                )}
              </div>

              <button
                type="button"
                className="collapsible"
                id="addLoadDetailsButton"
                onClick={() => setPremium(!premium)}
              >
                Add Optimization constraints
                <img src={lock} alt="Lock Icon" className="icon" />
              </button>
              <div class="content">
                {/* <!-- Add optimization constraints content here if needed --> */}
              </div>
              <div className="optimize">
                <button
                  type="submit"
                  id="final"
                  className="btn-apply"
                  onClick={onSubmit}
                >
                  Optimize
                </button>
              </div>
            </form>
          </div>
          {premium && <Popup premium={premium} setPremium={setPremium} />}
        </div>
      )}
    </>
  );
};

export default FreeTrail;
