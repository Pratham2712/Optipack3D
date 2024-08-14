import React, { useEffect, useState } from "react";
import Pickr from "@simonwep/pickr";
import del from "../../assests/delete.png";
import "./DimensionInput.css";
import { autoFillerBox } from "../../Util/data";

const InputComp = ({
  inputs,
  setInputs,
  handleInputChange,
  setSkuData,
  skuData,
}) => {
  const [colors, setColors] = useState([
    "rgba(244, 67, 54, 1)", // Color 1
    "rgba(76, 175, 80, 1)", // Color 2
    "rgba(33, 150, 243, 1)", // Color 3
  ]);
  const handleDelete = (index) => {
    if (inputs.length <= 2) {
      alert("You need to keep at least 2 SKUs!");
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
    inputs.forEach((_, index) => {
      initializeColorPicker(`colorPicker${index}`, `colorInput${index}`, index);
    });
  }, [inputs]);

  return (
    <div>
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
            <label>Product {input + 1}:</label>
            <input
              type="text"
              name={`sku${input}`}
              required
              defaultValue={`Box${input + 1}`}
              onChange={(e) => handleInputChange(input, "sku", e.target.value)}
            />
          </div>
          <div className="input">
            <label>Gross Weight (KGs):</label>
            <input
              type="number"
              name={`grossWeight${input}`}
              required
              defaultValue={autoFillerBox[input]["Gross Weight"]}
              onChange={(e) =>
                handleInputChange(input, "grossWeight", e.target.value)
              }
            />
          </div>
          <div className="input">
            <label>Length (mm):</label>
            <input
              type="number"
              name={`length${input}`}
              required
              defaultValue={autoFillerBox[input]["Length"]}
              onChange={(e) =>
                handleInputChange(input, "length", e.target.value)
              }
            />
          </div>
          <div className="input">
            <label>Width (mm):</label>
            <input
              type="number"
              name={`width${input}`}
              required
              defaultValue={autoFillerBox[input]["Width"]}
              onChange={(e) =>
                handleInputChange(input, "width", e.target.value)
              }
            />
          </div>
          <div className="input">
            <label>Height (mm):</label>
            <input
              type="number"
              name={`height${input}`}
              required
              defaultValue={autoFillerBox[input]["Height"]}
              onChange={(e) =>
                handleInputChange(input, "height", e.target.value)
              }
            />
          </div>
          <div className="input">
            <label>Number of Cases:</label>
            <input
              type="number"
              name={`numberOfCases${input}`}
              required
              defaultValue={autoFillerBox[input]["Number of Cases"]}
              onChange={(e) =>
                handleInputChange(input, "numberOfCases", e.target.value)
              }
            />
          </div>
          <input
            type="hidden"
            name={`volume${input}`}
            defaultValue={autoFillerBox[input]["Volume"]}
          />
          <input
            type="hidden"
            name={`temperature${input}`}
            defaultValue={autoFillerBox[input]["Temperature"]}
          />
          <input
            type="hidden"
            name={`netWeight${input}`}
            defaultValue={autoFillerBox[input]["Net Weight"]}
          />
          <div className="input checkbox-label">
            <label for={`tilt${input}`}>Tilt Allowed:</label>
            <input
              type="checkbox"
              name={`rotationAllowed${input}`}
              defaultChecked={
                autoFillerBox[input]["Rotation Allowed"] === 1 ? true : false
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
