import React from "react";
import truck from "../../assests/features_svg/truck.svg";
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

const FeatureTab = () => {
  return (
    <div>
      <div className="tab_container">
        <div className="all_feat">
          <div className="indi_feat">
            <div className="head">
              <img src={Volumeweightload} alt="" />
              <p>Volume/Weight Load</p>
            </div>

            <div className="feature-card-inner">
              Maximize container utilization with 3D load planning
            </div>
          </div>
          <div className="indi_feat">
            <div className="head">
              <img src={intellostack} alt="" />
              <p>Intello Stack</p>
            </div>

            <div className="feature-card-inner">
              Auto-stack boxes with intelligent algorithms
            </div>
          </div>
          <div className="indi_feat">
            <div className="head">
              <img src={weight_check} alt="" />
              <p>Weight Check</p>
            </div>

            <div className="feature-card-inner">
              Ensure the container's weight limit is not exceeded
            </div>
          </div>
          <div className="indi_feat">
            <div className="head">
              <img src={praticalloadplan} alt="" />
              <p> Practical Load Plan</p>
            </div>

            <div className="feature-card-inner">
              Load plan considers practical labour constraints
            </div>
          </div>
          <div className="indi_feat">
            <div className="head">
              <img src={shareplan} alt="" />
              <p>Share Plan</p>
            </div>

            <div className="feature-card-inner">
              Share the load plan with your team or customers
            </div>
          </div>
          <div className="indi_feat">
            <div className="head">
              <img src={exportreport} alt="" />
              <p>Export Report</p>
            </div>

            <div className="feature-card-inner">
              Export the load plan as a PDF, Excel, or 3D image
            </div>
          </div>
          <div className="indi_feat">
            <div className="head">
              <img src={customcontainer} alt="" />
              <p>Custom Container</p>
            </div>

            <div className="feature-card-inner">
              Add custom boxes to optimize the load plan
            </div>
          </div>
          <div className="indi_feat">
            <div className="head">
              <img src={multicontainer} alt="" />
              <p>Multi-Container</p>
            </div>

            <div className="feature-card-inner">
              Load boxes into multiple containers at once
            </div>
          </div>
          <div className="indi_feat">
            <div className="head">
              <img src={chooseload} alt="" />
              <p> Choose Load</p>
            </div>

            <div className="feature-card-inner">
              Choose the optimum load from multiple selections
            </div>
          </div>
          <div className="indi_feat">
            <div className="head">
              <img src={userdefinedsettings} alt="" />
              <p>User Defined Settings</p>
            </div>

            <div className="feature-card-inner">
              Multiple options for the user to define settings
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureTab;
