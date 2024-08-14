import React, { useState } from "react";

import InputComp from "./InputComp";
import { autoFillerBox } from "../../Util/data";

const DimensionInput = ({ inputSuccess, setInputSuccess }) => {
  const [inputs, setInputs] = useState([0, 1, 2]);
  const [colors, setColors] = useState([
    "rgba(244, 67, 54, 1)", // Color 1
    "rgba(76, 175, 80, 1)", // Color 2
    "rgba(33, 150, 243, 1)", // Color 3
  ]);
  const [skuData, setSkuData] = useState({
    numTypes: inputs.length,
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
  console.log(skuData);

  //functions===================================================================================
  const handleInputChange = (index, field, value) => {
    setSkuData((prevData) => ({
      ...prevData,
      [`${field}${index}`]: value,
    }));
  };
  const addSku = () => {
    if (inputs.length >= 3) {
      alert("You cannot add more than 3 SKUs!");
      return;
    }
    let newIndex = 0;
    while (inputs.includes(newIndex)) {
      newIndex++;
    }
    setInputs([...inputs, newIndex]);
  };

  //submit logic====================================================
  const onSubmit = () => {
    console.log(skuData);
  };

  return (
    <div>
      <form className="productFrom">
        <InputComp
          inputs={inputs}
          setInputs={setInputs}
          skuData={skuData}
          handleInputChange={handleInputChange}
        />
      </form>
      <div class="SKU-cta">
        <button type="button" className="btn-apply" onClick={() => addSku()}>
          Add SKU
        </button>
        <button type="button" className="btn-apply" onClick={() => onSubmit()}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default DimensionInput;

// defaultValues: {
//   sku0: "Box1",
//   grossWeight0: autoFillerBox[0]["Gross Weight"],
//   length0: autoFillerBox[0]["Length"],
//   width0: autoFillerBox[0]["Width"],
//   height0: autoFillerBox[0]["Height"],
//   numberOfCases0: autoFillerBox[0]["Number of Cases"],
//   volume0: autoFillerBox[0]["Volume"],
//   temperature0: autoFillerBox[0]["Temperature"],
//   netWeight0: autoFillerBox[0]["Net Weight"],
//   rotationAllowed0: true,
//   color0: colors[0],
//   sku1: "Box2",
//   grossWeight1: autoFillerBox[1]["Gross Weight"],
//   length1: autoFillerBox[1]["Length"],
//   width1: autoFillerBox[1]["Width"],
//   height1: autoFillerBox[1]["Height"],
//   numberOfCases1: autoFillerBox[1]["Number of Cases"],
//   volume1: autoFillerBox[1]["Volume"],
//   temperature1: autoFillerBox[1]["Temperature"],
//   netWeight1: autoFillerBox[1]["Net Weight"],
//   rotationAllowed1: true,
//   color1: colors[1],
//   sku2: "Box3",
//   grossWeight2: autoFillerBox[2]["Gross Weight"],
//   length2: autoFillerBox[2]["Length"],
//   width2: autoFillerBox[2]["Width"],
//   height2: autoFillerBox[2]["Height"],
//   numberOfCases2: autoFillerBox[2]["Number of Cases"],
//   volume2: autoFillerBox[2]["Volume"],
//   temperature2: autoFillerBox[2]["Temperature"],
//   netWeight2: autoFillerBox[2]["Net Weight"],
//   rotationAllowed2: true,
//   color2: colors[2],
// },

// sku0: yup.string().required("SKU is required"),
// grossWeight0: yup
//   .number()
//   .required("Gross Weight is required")
//   .typeError("Gross Weight must be a number"),
// rotationAllowed0: yup.boolean().required(),
// color0: yup.string().required("Color is required"),
// sku1: yup.string().required("SKU is required"),
// grossWeight1: yup
//   .number()
//   .required("Gross Weight is required")
//   .typeError("Gross Weight must be a number"),
// rotationAllowed1: yup.boolean().required(),
// color1: yup.string().required("Color is required"),
// sku2: yup.string().required("SKU is required"),
// grossWeight2: yup
//   .number()
//   .required("Gross Weight is required")
//   .typeError("Gross Weight must be a number"),
// rotationAllowed2: yup.boolean().required(),
// color2: yup.string().required("Color is required"),
