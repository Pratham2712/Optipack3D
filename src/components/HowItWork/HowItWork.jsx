import React from "react";
import userdefinedsettings from "../../assests/userdefinedsettings.png";
import "./HowItWork.css";

const HowItWork = () => {
  return (
    <div>
      {" "}
      <h2 class="main_headings">How It Works</h2>
      <div class="steps">
        <div class="step">
          <img
            src={userdefinedsettings}
            alt="Upload Boxes"
            style={{ height: "40px", width: "40px" }}
          />
          <p>1. Upload Boxes</p>
          <p>Upload the box list in CSV or Excel format</p>
        </div>
        <div class="step">
          <img
            src={userdefinedsettings}
            alt="Set Container"
            style={{ height: "40px", width: "40px" }}
          />
          <p>2. Set Container</p>
          <p>Select the container type and define the weight limit</p>
        </div>
        <div class="step">
          <img
            src={userdefinedsettings}
            alt="Auto-Stack"
            style={{ height: "40px", width: "40px" }}
          />
          <p>3. Auto-Stack</p>
          <p>Use the auto-stack function to stack boxes in layers</p>
        </div>
        <div class="step">
          <img
            src={userdefinedsettings}
            alt="Optimize"
            style={{ height: "40px", width: "40px" }}
          />
          <p>4. Optimize</p>
          <p>Optimize the load plan based on your requirements</p>
        </div>
        <div class="step">
          <img
            src={userdefinedsettings}
            alt="Visualize and Export"
            style={{ height: "40px", width: "40px" }}
          />
          <p>5. Visualize and export</p>
          <p>Review the load plan in 3D view and export the report</p>
        </div>
      </div>
    </div>
  );
};

export default HowItWork;
