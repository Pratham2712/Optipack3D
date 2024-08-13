import React, { useEffect, useState } from "react";
import Pickr from "@simonwep/pickr";
import del from "../../assests/delete.png";
import "./DimensionInput.css";

const DimensionInput = () => {
  const [inputs, setInputs] = useState([0, 1, 2]);
  const [colors, setColors] = useState([
    "rgba(244, 67, 54, 1)", // Color 1
    "rgba(76, 175, 80, 1)", // Color 2
    "rgba(33, 150, 243, 1)", // Color 3
  ]);
  let colorIndex = 0;
  const handleDelete = (index) => {
    if (inputs.length <= 2) {
      alert("You need to keep at least 2 SKUs!");
      return;
    }
    const updatedInputs = inputs.filter((_, i) => i !== index);
    setInputs(updatedInputs);
  };

  const handleInputChange = (index, name, value) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = { ...updatedInputs[index], [name]: value };
    setInputs(updatedInputs);
    console.log(updatedInputs);
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
      <div className="productFrom">
        {inputs.map((input, index) => (
          <div key={index} className="input-row">
            <div id={`colorPicker${index}`}></div>
            <input
              type="hidden"
              name={`color${index}`}
              id={`colorInput${index}`}
              value={input.color || ""}
            />
            <div className="input">
              <label>Product {index + 1}:</label>
              <input
                type="text"
                name={`sku${index}`}
                required
                value={input.sku || `Box${index + 1}`}
                onChange={(e) =>
                  handleInputChange(index, "sku", e.target.value)
                }
              />
            </div>
            <div className="input">
              <label>Gross Weight (KGs):</label>
              <input
                type="text"
                name={`grossWeight${index}`}
                value={
                  input.grossWeight || autoFillerBox[index]["Gross Weight"]
                }
                onChange={(e) =>
                  handleInputChange(index, "grossWeight", e.target.value)
                }
              />
            </div>
            <div className="input checkbox-label">
              <label>Tilt Allowed:</label>
              <input
                type="checkbox"
                name={`rotationAllowed${index}`}
                checked={
                  autoFillerBox[index]["Rotation Allowed"] === 1 ? true : false
                }
                onChange={(e) =>
                  handleInputChange(
                    index,
                    "rotationAllowed",
                    e.target.checked ? 1 : 0
                  )
                }
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
        <button type="button" className="btn-apply" onClick={addSku}>
          Add SKU
        </button>
        <button type="button" className="btn-apply" onclick="finishLoading()">
          Submit
        </button>
      </div>
    </div>
  );
};

export default DimensionInput;
