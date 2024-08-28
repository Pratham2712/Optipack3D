import React, { useEffect, useState } from "react";
import InputComp from "./InputComp";
import Loader from "../Loader/Loader";

const DimensionInput = ({
  setInputSuccess,
  skuData,
  setSkuData,
  inputs,
  setInputs,
  handleInputChange,
}) => {
  const [colors, setColors] = useState([
    "rgba(244, 67, 54, 1)", // Color 1
    "rgba(76, 175, 80, 1)", // Color 2
    "rgba(33, 150, 243, 1)", // Color 3
  ]);

  const validate = () => {
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
    if (isValid) {
      setInputSuccess(true);
    }
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <form className="productFrom">
            <InputComp
              inputs={inputs}
              setInputs={setInputs}
              skuData={skuData}
              handleInputChange={handleInputChange}
              setSkuData={setSkuData}
            />
          </form>
          <div class="SKU-cta">
            <button
              type="button"
              className="btn-apply"
              onClick={() => addSku()}
              style={{ marginRight: "1rem" }}
            >
              Add SKU
            </button>
            <button type="button" className="btn-apply" onClick={validate}>
              Submit
            </button>
          </div>
        </div>
      )}
    </>
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
