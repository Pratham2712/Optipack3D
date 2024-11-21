import React, { useEffect, useState } from "react";
import Pickr from "@simonwep/pickr";
import del from "../../assests/delete.png";
import "./DimensionInput.css";
import toast, { Toaster } from "react-hot-toast";

const InputComp = ({
  inputs,
  setInputs,
  handleInputChange,
  setSkuData,
  skuData,
  errField,
}) => {
  const [colors, setColors] = useState([
    "rgba(244, 67, 54, 1)", // Color 1
    "rgba(76, 175, 80, 1)", // Color 2
    "rgba(33, 150, 243, 1)", // Color 3
  ]);

  const handleDelete = (index) => {
    if (inputs.length <= 2) {
      toast.error("You need to keep at least 2 SKUs!", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
      });
      return;
    }
    const newInputs = inputs.filter((_, i) => i !== index);
    setInputs(newInputs);
    const newSkuData = { ...skuData };
    delete newSkuData[`color${index}`];
    delete newSkuData[`sku${index}`];
    delete newSkuData[`grossWeight${index}`];
    delete newSkuData[`length${index}`];
    delete newSkuData[`width${index}`];
    delete newSkuData[`height${index}`];
    delete newSkuData[`numberOfCases${index}`];
    delete newSkuData[`volume${index}`];
    delete newSkuData[`temperature${index}`];
    delete newSkuData[`netWeight${index}`];
    delete newSkuData[`rotationAllowed${index}`];
    newSkuData.numTypes = newInputs.length;
    // Update the states
    setSkuData(newSkuData);
  };
  const initializeColorPicker = (pickerId, colorInputId, colorIndex) => {
    const colorPickerElement = document.getElementById(pickerId);
    const colorInputElement = document.getElementById(colorInputId);

    if (!colorPickerElement || !colorInputElement) return;
    const pickr = Pickr.create({
      el: "#" + pickerId,
      theme: "nano",
      swatches: [
        "rgba(244, 67, 54, 1)",
        "rgba(233, 30, 99, 1)",
        "rgba(156, 39, 176, 1)",
        "rgba(103, 58, 183, 1)",
        "rgba(63, 81, 181, 1)",
        "rgba(33, 150, 243, 1)",
        "rgba(3, 169, 244, 1)",
        "rgba(0, 188, 212, 1)",
        "rgba(0, 150, 136, 1)",
        "rgba(76, 175, 80, 1)",
        "rgba(139, 195, 74, 1)",
        "rgba(205, 220, 57, 1)",
        "rgba(255, 235, 59, 1)",
        "rgba(255, 193, 7, 1)",
        "rgba(255, 152, 0, 1)",
        "rgba(255, 87, 34, 1)",
        "rgba(121, 85, 72, 1)",
        "rgba(158, 158, 158, 1)",
        "rgba(96, 125, 139, 1)",
        "rgba(0, 0, 0, 1)",
      ],
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
    currColor.value = skuData[`color${colorIndex}`];

    pickr.on("save", (color, instance) => {
      const rgbaArray = color.toRGBA().map((val, index) => {
        return index < 3 ? Math.round(val) : val;
      });

      const rgbaColor = `rgba(${rgbaArray[0]}, ${rgbaArray[1]}, ${rgbaArray[2]}, ${rgbaArray[3]})`;
      setSkuData((prev) => ({ ...prev, [`color${colorIndex}`]: rgbaColor }));
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
    inputs.forEach((input, index) => {
      initializeColorPicker(`colorPicker${input}`, `colorInput${input}`, input);
    });
  }, [inputs]);

  return (
    <div className="all-inputs">
      <Toaster />
      {inputs.map((input, index) => (
        <div key={input} className="input-row">
          <div id={`colorPicker${input}`}></div>
          <input
            type="hidden"
            name={`color${input}`}
            id={`colorInput${input}`}
            onChange={(e) => handleInputChange(input, "color", e.target.value)}
          />
          <div className="input">
            <label>SKU {input + 1}:</label>
            <input
              type="text"
              name={`sku${input}`}
              required
              defaultValue={skuData[`sku${input}`]}
              onChange={(e) => handleInputChange(input, "sku", e.target.value)}
              style={{
                border:
                  errField[`sku${input}`] == input
                    ? "1px solid red"
                    : "1px solid #ccc",
                width: "68%",
              }}
            />
          </div>
          <div className="input">
            <label>Gross Weight (kg):</label>
            <input
              type="number"
              name={`grossWeight${input}`}
              required
              defaultValue={skuData[`grossWeight${input}`]}
              onChange={(e) =>
                handleInputChange(input, "grossWeight", e.target.value)
              }
              style={{
                border:
                  errField[`grossWeight${input}`] == input
                    ? "1px solid red"
                    : "1px solid #ccc",
                width: "68%",
              }}
            />
          </div>
          <div className="input">
            <label>Length (mm):</label>
            <input
              type="number"
              name={`length${input}`}
              required
              defaultValue={skuData[`length${input}`]}
              onChange={(e) =>
                handleInputChange(input, "length", e.target.value)
              }
              style={{
                border:
                  errField[`length${input}`] == input
                    ? "1px solid red"
                    : "1px solid #ccc",
                width: "68%",
              }}
            />
          </div>
          <div className="input">
            <label>Width (mm):</label>
            <input
              type="number"
              name={`width${input}`}
              required
              defaultValue={skuData[`width${input}`]}
              onChange={(e) =>
                handleInputChange(input, "width", e.target.value)
              }
              style={{
                border:
                  errField[`width${input}`] == input
                    ? "1px solid red"
                    : "1px solid #ccc",
                width: "68%",
              }}
            />
          </div>
          <div className="input">
            <label>Height (mm):</label>
            <input
              type="number"
              name={`height${input}`}
              required
              defaultValue={skuData[`height${input}`]}
              onChange={(e) =>
                handleInputChange(input, "height", e.target.value)
              }
              style={{
                border:
                  errField[`height${input}`] == input
                    ? "1px solid red"
                    : "1px solid #ccc",
                width: "68%",
              }}
            />
          </div>
          <div className="input">
            <label>Number of Cases:</label>
            <input
              type="number"
              name={`numberOfCases${input}`}
              required
              defaultValue={skuData[`numberOfCases${input}`]}
              onChange={(e) =>
                handleInputChange(input, "numberOfCases", e.target.value)
              }
              style={{
                border:
                  errField[`numberOfCases${input}`] == input
                    ? "1px solid red"
                    : "1px solid #ccc",
                width: "68%",
              }}
            />
          </div>
          <input
            type="hidden"
            name={`volume${input}`}
            defaultValue={skuData[`volume${input}`]}
          />
          <input
            type="hidden"
            name={`temperature${input}`}
            defaultValue={skuData[`temperature${input}`]}
          />
          <input
            type="hidden"
            name={`netWeight${input}`}
            defaultValue={skuData[`netWeight${input}`]}
          />
          <div className="input checkbox-label">
            <label htmlFor={`tilt${input}`}>Tilt Allowed:</label>
            <input
              type="checkbox"
              name={`rotationAllowed${input}`}
              defaultChecked={
                skuData[`rotationAllowed${input}`] == "on" ? true : false
              }
              id={`tilt${input}`}
              onClick={(e) => (e.target.value = !e.target.value)}
              onChange={(e) =>
                handleInputChange(
                  input,
                  "rotationAllowed",
                  e.target.checked ? "on" : "off"
                )
              }
            />
          </div>
          <img
            src={del}
            className="delete-img"
            onClick={() => handleDelete(input)}
            alt="Delete"
          />
        </div>
      ))}
    </div>
  );
};

export default InputComp;
