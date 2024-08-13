import React, { useEffect, useState } from "react";
import Pickr from "@simonwep/pickr";
import del from "../../assests/delete.png";
import "./DimensionInput.css";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const DimensionInput = ({ inputSuccess, setInputSuccess }) => {
  const [inputs, setInputs] = useState([0, 1, 2]);
  const [colors, setColors] = useState([
    "rgba(244, 67, 54, 1)", // Color 1
    "rgba(76, 175, 80, 1)", // Color 2
    "rgba(33, 150, 243, 1)", // Color 3
  ]);
  //functions===================================================================================
  let colorIndex = 0;
  const handleDelete = (index) => {
    if (inputs.length <= 2) {
      alert("You need to keep at least 2 SKUs!");
      return;
    }
    const updatedInputs = inputs.filter((_, i) => i !== index);
    setInputs(updatedInputs);
    unregister(`sku${index}`);
    unregister(`grossWeight${index}`);
    unregister(`rotationAllowed${index}`);
    unregister(`color${index}`);
  };

  const handleInputChange = (index, name, value) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = { ...updatedInputs[index], [name]: value };
    setInputs(updatedInputs);
  };
  const addSku = () => {
    if (inputs.length >= 3) {
      alert("You cannot add more than 3 SKUs!");
      return;
    }

    const newIndex = inputs.length;
    const newInput = {
      sku: `Box${newIndex + 1}`,
      grossWeight: autoFillerBox[newIndex]["Gross Weight"],
      netWeight: autoFillerBox[newIndex]["Net Weight"],
      volume: autoFillerBox[newIndex].Volume,
      temperature: autoFillerBox[newIndex].Temperature,
      length: autoFillerBox[newIndex].Length,
      width: autoFillerBox[newIndex].Width,
      height: autoFillerBox[newIndex].Height,
      numberOfCases: autoFillerBox[newIndex]["Number of Cases"],
      rotationAllowed: autoFillerBox[newIndex]["Rotation Allowed"],
      color: colors[newIndex], // Automatically assign the next color
    };

    setInputs([...inputs, newInput]);
  };
  let autoFillerBox = [
    {
      "Gross Weight": 0.78,
      "Net Weight": 0.58,
      Volume: 0.023,
      Temperature: 1,
      Length: 396,
      Width: 199,
      Height: 287,
      "Number of Cases": 600,
      "Rotation Allowed": 1,
    },
    {
      "Gross Weight": 1.5,
      "Net Weight": 1.2,
      Volume: 0.05,
      Temperature: 2,
      Length: 400,
      Width: 200,
      Height: 300,
      "Number of Cases": 400,
      "Rotation Allowed": 1,
    },
    {
      "Gross Weight": 2.0,
      "Net Weight": 1.6,
      Volume: 0.075,
      Temperature: 3,
      Length: 450,
      Width: 250,
      Height: 350,
      "Number of Cases": 500,
      "Rotation Allowed": 1,
    },
  ];
  const initializeColorPicker = (pickerId, colorInputId, colorIndex) => {
    const colorPickerElement = document.getElementById(pickerId);
    const colorInputElement = document.getElementById(colorInputId);

    if (!colorPickerElement || !colorInputElement) return;
    const pickr = Pickr.create({
      el: "#" + pickerId,
      theme: "nano",
      swatches: ["rgba(244, 67, 54, 1)"],
      default: colors[colorIndex],
      components: {
        preview: true,
        hue: true,
        interaction: {
          save: true,
          cancel: true,
        },
      },
    });

    const currColor = document.getElementById(colorInputId);
    currColor.value = colors[colorIndex];

    pickr.on("save", (color, instance) => {
      const rgbaColor = color.toRGBA().toString();
      setValue(`color${colorIndex}`, rgbaColor);
      currColor.value = rgbaColor;
      currColor.style.border = "1px solid #000";
      currColor.style.backgroundColor = rgbaColor;
      pickr.hide();
    });

    pickr.on("cancel", (instance) => {
      pickr.hide();
    });
  };

  useEffect(() => {
    inputs.forEach((_, index) => {
      initializeColorPicker(`colorPicker${index}`, `colorInput${index}`, index);
    });
  }, [inputs]);
  //submit logic====================================================
  const onSubmit = (data) => {
    console.log("submit");

    console.log(data);
  };
  //schema and validation==================================
  const createDefaultValues = () => {
    const defaultValues = {};
    autoFillerBox.forEach((box, index) => {
      defaultValues[`sku${index}`] = `Box${index + 1}`;
      defaultValues[`grossWeight${index}`] = box["Gross Weight"];
      defaultValues[`length${index}`] = box["Length"];
      defaultValues[`width${index}`] = box["Width"];
      defaultValues[`height${index}`] = box["Height"];
      defaultValues[`numberOfCases${index}`] = box["Number of Cases"];
      defaultValues[`volume${index}`] = box["Volume"];
      defaultValues[`temperature${index}`] = box["Temperature"];
      defaultValues[`netWeight${index}`] = box["Net Weight"];
      defaultValues[`rotationAllowed${index}`] = box["Rotation Allowed"] === 1;
      defaultValues[`color${index}`] = colors[index];
    });
    return defaultValues;
  };
  const schema = yup.object().shape({
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
  });
  const { control, handleSubmit, setValue, getValues, register, unregister } =
    useForm({
      resolver: yupResolver(schema),
      defaultValues: createDefaultValues(),
    });

  return (
    <div>
      <div className="productFrom">
        {inputs.map((input, index) => (
          <div key={index} className="input-row">
            <div id={`colorPicker${index}`}>
              <Controller
                name={`color${index}`}
                control={control}
                defaultValue={colors[index]}
                render={({ field }) => (
                  <input
                    type="hidden"
                    id={`colorInput${index}`}
                    defaultValue={field.value}
                  />
                )}
              />
            </div>
            <input
              type="hidden"
              name={`color${index}`}
              {...register(`color${index}`)}
              id={`colorInput${index}`}
              defaultValue={input.color || ""}
            />
            <div className="input">
              <label>Product {index + 1}:</label>
              <input
                type="text"
                name={`sku${index}`}
                required
                defaultValue={input.sku || `Box${index + 1}`}
                {...register(`sku${index}`)}
                onChange={(e) =>
                  handleInputChange(index, "sku", e.target.value)
                }
              />
            </div>
            <div className="input">
              <label>Gross Weight (KGs):</label>
              <input
                type="number"
                name={`grossWeight${index}`}
                defaultValue={
                  input.grossWeight || autoFillerBox[index]["Gross Weight"]
                }
                {...register(`grossWeight${index}`)}
                onChange={(e) =>
                  handleInputChange(index, "grossWeight", e.target.value)
                }
              />
            </div>
            <div className="input">
              <label>Length (mm):</label>
              <input
                type="number"
                name={`length${index}`}
                defaultValue={input.length || autoFillerBox[index]["Length"]}
                {...register(`length${index}`)}
                onChange={(e) =>
                  handleInputChange(index, "length", e.target.value)
                }
              />
            </div>
            <div className="input">
              <label>Width (mm):</label>
              <input
                type="number"
                name={`width${index}`}
                defaultValue={input.width || autoFillerBox[index]["Width"]}
                {...register(`width${index}`)}
                onChange={(e) =>
                  handleInputChange(index, "width", e.target.value)
                }
              />
            </div>
            <div className="input">
              <label>Height (mm):</label>
              <input
                type="number"
                name={`height${index}`}
                defaultValue={input.height || autoFillerBox[index]["Height"]}
                {...register(`height${index}`)}
                onChange={(e) =>
                  handleInputChange(index, "height", e.target.value)
                }
              />
            </div>
            <div className="input">
              <label>Number of Cases:</label>
              <input
                type="number"
                name={`numberOfCases${index}`}
                defaultValue={
                  input.numberOfCases || autoFillerBox[index]["Number of Cases"]
                }
                {...register(`numberOfCases${index}`)}
                onChange={(e) =>
                  handleInputChange(index, "numberOfCases", e.target.value)
                }
              />
            </div>
            <input
              type="hidden"
              name={`volume${index}`}
              defaultValue={autoFillerBox[index]["Volume"]}
              {...register(`volume${index}`)}
            />
            <input
              type="hidden"
              name={`temperature${index}`}
              defaultValue={autoFillerBox[index]["Temperature"]}
              {...register(`temperature${index}`)}
            />
            <input
              type="hidden"
              name={`netWeight${index}`}
              defaultValue={autoFillerBox[index]["Net Weight"]}
              {...register(`netWeight${index}`)}
            />
            <div className="input checkbox-label">
              <label for={`tilt${index}`}>Tilt Allowed:</label>
              <input
                type="checkbox"
                name={`rotationAllowed${index}`}
                defaultChecked={
                  autoFillerBox[index]["Rotation Allowed"] === 1 ? true : false
                }
                id={`tilt${index}`}
                {...register(`rotationAllowed${index}`)}
                onClick={(e) => (e.target.value = !e.target.value)}
              />
            </div>
            <img
              src={del}
              className="delete-img"
              onClick={() => handleDelete(index)}
              alt="Delete"
            />
          </div>
        ))}
      </div>
      <div class="SKU-cta">
        <button type="button" className="btn-apply" onClick={() => addSku()}>
          Add SKU
        </button>
        <button
          type="button"
          className="btn-apply"
          onClick={handleSubmit(onSubmit)}
        >
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
