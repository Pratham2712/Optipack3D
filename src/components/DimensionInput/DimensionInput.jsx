import React, { useEffect, useState } from "react";
import Pickr from "@simonwep/pickr";
import del from "../../assests/delete.png";
import "./DimensionInput.css";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { autoFillerBox } from "../../Util/data";

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
    unregister(`sku${index}`);
    unregister(`grossWeight${index}`);
    unregister(`netWeight${index}`);
    unregister(`volume${index}`);
    unregister(`temperature${index}`);
    unregister(`length${index}`);
    unregister(`width${index}`);
    unregister(`height${index}`);
    unregister(`numberOfCases${index}`);
    unregister(`rotationAllowed${index}`);
    unregister(`color${index}`);
    const updatedInputs = inputs.filter((_, i) => i !== index);
    setInputs(updatedInputs);
    reset(createDefaultValues(updatedInputs));
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
    const newInputs = [...inputs, newIndex];
    setInputs(newInputs);
    setValue(`sku${newIndex}`, `Box${newIndex + 1}`);
    setValue(`grossWeight${newIndex}`, autoFillerBox[newIndex]["Gross Weight"]);
    setValue(`netWeight${newIndex}`, autoFillerBox[newIndex]["Net Weight"]);
    setValue(`volume${newIndex}`, autoFillerBox[newIndex].Volume);
    setValue(`temperature${newIndex}`, autoFillerBox[newIndex].Temperature);
    setValue(`length${newIndex}`, autoFillerBox[newIndex].Length);
    setValue(`width${newIndex}`, autoFillerBox[newIndex].Width);
    setValue(`height${newIndex}`, autoFillerBox[newIndex].Height);
    setValue(
      `numberOfCases${newIndex}`,
      autoFillerBox[newIndex]["Number of Cases"]
    );
    setValue(
      `rotationAllowed${newIndex}`,
      autoFillerBox[newIndex]["Rotation Allowed"] === 1
    );
    setValue(`color${newIndex}`, colors[newIndex]);
    initializeColorPicker(
      `colorPicker${newIndex}`,
      `colorInput${newIndex}`,
      newIndex
    );
  };

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
    console.log("actuall", data);

    const filteredData = Object.keys(data)
      .filter((key) => inputs.some((index) => key.includes(index)))
      .reduce((obj, key) => {
        obj[key] = data[key];
        return obj;
      }, {});
    console.log(filteredData);
  };
  //schema and validation==================================
  const createDefaultValues = (inputs) => {
    const defaultValues = {};
    inputs?.forEach((index) => {
      defaultValues[`sku${index}`] = `Box${index + 1}`;
      defaultValues[`grossWeight${index}`] =
        autoFillerBox[index]["Gross Weight"];
      defaultValues[`length${index}`] = autoFillerBox[index]["Length"];
      defaultValues[`width${index}`] = autoFillerBox[index]["Width"];
      defaultValues[`height${index}`] = autoFillerBox[index]["Height"];
      defaultValues[`numberOfCases${index}`] =
        autoFillerBox[index]["Number of Cases"];
      defaultValues[`volume${index}`] = autoFillerBox[index]["Volume"];
      defaultValues[`temperature${index}`] =
        autoFillerBox[index]["Temperature"];
      defaultValues[`netWeight${index}`] = autoFillerBox[index]["Net Weight"];
      defaultValues[`rotationAllowed${index}`] =
        autoFillerBox[index]["Rotation Allowed"] === 1;
      defaultValues[`color${index}`] = colors[index];
    });
    return defaultValues;
  };
  const schema = yup.object().shape({});
  const { control, handleSubmit, setValue, register, unregister, reset } =
    useForm({
      resolver: yupResolver(schema),
      defaultValues: createDefaultValues(inputs),
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
                {...register(`color${index}`)}
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
            />
            <div className="input">
              <label>Product {index + 1}:</label>
              <input
                type="text"
                name={`sku${index}`}
                required
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
                {...register(`numberOfCases${index}`)}
                onChange={(e) =>
                  handleInputChange(index, "numberOfCases", e.target.value)
                }
              />
            </div>
            <input
              type="hidden"
              name={`volume${index}`}
              {...register(`volume${index}`)}
            />
            <input
              type="hidden"
              name={`temperature${index}`}
              {...register(`temperature${index}`)}
            />
            <input
              type="hidden"
              name={`netWeight${index}`}
              {...register(`netWeight${index}`)}
            />
            <div className="input checkbox-label">
              <label for={`tilt${index}`}>Tilt Allowed:</label>
              <input
                type="checkbox"
                name={`rotationAllowed${index}`}
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
