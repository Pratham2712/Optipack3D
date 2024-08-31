import React from "react";
import Volumeweightload from "../../assests/Volume-weightload.png";
import intellostack from "../../assests/intellostack.png";
import weight_check from "../../assests/weight_check.png";
import praticalloadplan from "../../assests/praticalloadplan.png";
import shareplan from "../../assests/shareplan.png";
import exportreport from "../../assests/exportreport.png";
import customcontainer from "../../assests/customcontainer.png";
import multicontainer from "../../assests/multicontainer.png";
import chooseload from "../../assests/chooseload.png";
import userdefinedsettings from "../../assests/userdefinedsettings.png";

const KeyFeature = () => {
  return (
    <div className="feature-container">
      <h2 class="main_headings">Key Features</h2>
      <div
        class="features-grid"
        style={{ fontSize: "16px", lineHeight: "20px", fontWeight: "700" }}
      >
        <div class="feature-card">
          <div className="heading">
            <img src={Volumeweightload} />
          </div>
          <p>Volume/Weight Load</p>

          <p className="feature-card-inner">
            Maximize container utilization with 3D load planning
          </p>
        </div>
        <div className="feature-card">
          <div className="heading">
            <img src={intellostack} />
          </div>
          <p>Intello Stack</p>

          <p className="feature-card-inner">
            Auto-stack boxes with intelligent algorithms
          </p>
        </div>
        <div className="feature-card">
          <div className="heading">
            <img src={weight_check} />
          </div>
          <p>Weight Check</p>

          <p className="feature-card-inner">
            Ensure the container's weight limit is not exceeded
          </p>
        </div>
        <div className="feature-card">
          <div className="heading">
            <img src={praticalloadplan} />
          </div>
          <p>Practical Load Plan</p>

          <p className="feature-card-inner">
            Load plan considers practical labour constraints
          </p>
        </div>
        <div className="feature-card">
          <div className="heading">
            <img src={shareplan} />
          </div>
          <p>Share Plan</p>

          <p className="feature-card-inner">
            Share the load plan with your team or customers
          </p>
        </div>
        <div className="feature-card">
          <div className="heading">
            <img src={exportreport} />
          </div>
          <p>Export Report</p>

          <p className="feature-card-inner">
            Export the load plan as a PDF, Excel, or 3D image
          </p>
        </div>
        <div className="feature-card">
          <div className="heading">
            <img src={customcontainer} />
          </div>
          <p>Custom Container</p>

          <p className="feature-card-inner">
            Add custom boxes to optimize the load plan
          </p>
        </div>
        <div className="feature-card">
          <div className="heading">
            <img src={multicontainer} />
          </div>
          <p>Multi-Container</p>

          <p className="feature-card-inner">
            Load boxes into multiple containers at once
          </p>
        </div>
        <div className="feature-card">
          <div className="heading">
            <img src={chooseload} />
          </div>
          <p>Choose Load</p>

          <p className="feature-card-inner">
            Choose the optimum load from multiple selections
          </p>
        </div>
        <div className="feature-card">
          <div className="heading">
            <img src={userdefinedsettings} />
          </div>
          <p>User Defined Settings</p>

          <p className="feature-card-inner">
            Multiple options for the user to define settings
          </p>
        </div>
      </div>
    </div>
  );
};

export default KeyFeature;
