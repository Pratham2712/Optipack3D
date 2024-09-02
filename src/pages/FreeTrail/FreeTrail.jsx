import React, { useEffect, useState } from "react";
import "./FreeTrail.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import unlock from "../../assests/unlock.png";
import lock from "../../assests/lock.png";
import tick from "../../assests/tick.png";
import DimensionInput from "../../components/DimensionInput/DimensionInput";
import ContainerDetails from "../../components/ContainerDetails/ContainerDetails";
import { autoFillerBox } from "../../Util/data";
import { getDataThunk } from "../../redux/Slices/mainSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { free_output } from "../../constants/links";
import Popup from "../../components/Popup/Popup";
import toast, { Toaster } from "react-hot-toast";

const FreeTrail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [premium, setPremium] = useState(false);
  const [is700, setIs700] = useState(window.innerWidth < 700);
  const [showInput, setShowInput] = useState(false);
  const [inputSuccess, setInputSuccess] = useState(false);
  const [contSuccess, setContSuccess] = useState(false);
  const [showCont, setShowCont] = useState(false);
  const [inputs, setInputs] = useState([0, 1, 2]);
  const [colors, setColors] = useState([
    "rgba(244, 67, 54, 1)", // Color 1
    "rgba(76, 175, 80, 1)", // Color 2
    "rgba(33, 150, 243, 1)", // Color 3
  ]);
  const [skuData, setSkuData] = useState({
    numTypes: inputs.length,
    totalContainers: 1,
    numContainers: 1,
    containerType0: "General Purpose container 20'",
    color0: colors[0],
    color1: colors[1],
    color2: colors[2],
    sku0: "Box1",
    sku1: "Box2",
    sku2: "Box3",
    grossWeight0: autoFillerBox[0]["Gross Weight"],
    grossWeight1: autoFillerBox[1]["Gross Weight"],
    grossWeight2: autoFillerBox[2]["Gross Weight"],
    length0: autoFillerBox[0].Length,
    length1: autoFillerBox[1].Length,
    length2: autoFillerBox[2].Length,
    width0: autoFillerBox[0].Width,
    width1: autoFillerBox[1].Width,
    width2: autoFillerBox[2].Width,
    height0: autoFillerBox[0].Height,
    height1: autoFillerBox[1].Height,
    height2: autoFillerBox[2].Height,
    numberOfCases0: autoFillerBox[0]["Number of Cases"],
    numberOfCases1: autoFillerBox[1]["Number of Cases"],
    numberOfCases2: autoFillerBox[2]["Number of Cases"],
    volume0: autoFillerBox[0].Volume,
    volume1: autoFillerBox[1].Volume,
    volume2: autoFillerBox[2].Volume,
    temperature0: autoFillerBox[0].Temperature,
    temperature1: autoFillerBox[1].Temperature,
    temperature2: autoFillerBox[2].Temperature,
    netWeight0: autoFillerBox[0]["Net Weight"],
    netWeight1: autoFillerBox[1]["Net Weight"],
    netWeight2: autoFillerBox[2]["Net Weight"],
    rotationAllowed0: autoFillerBox[0]["Rotation Allowed"] === 1 ? "on" : "off",
    rotationAllowed1: autoFillerBox[1]["Rotation Allowed"] === 1 ? "on" : "off",
    rotationAllowed2: autoFillerBox[2]["Rotation Allowed"] === 1 ? "on" : "off",
  });
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
      numContainers: 1,
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
      console.log("inputsuccess", inputSuccess);

      console.log("SKU Data is valid:", skuData);

      dispatch(getDataThunk(formData)).then((data) => {
        if (data?.payload) {
          setInputSuccess(true);
          navigate(free_output, { state: { filteredSkuData } });
        }
      });
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
    <div>
      <Toaster />

      <Breadcrumb />
      {!is700 ? <Sidebar className="hide-sidebar" /> : <></>}
      <div className="container-form">
        <h1>Container Builder (Trial Version)</h1>
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
                handleInputChange={handleInputChange}
                setContSuccess={setContSuccess}
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
  );
};

export default FreeTrail;
