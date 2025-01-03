import React from "react";
import truck from "../../assests/color-icon/truck.png";
import check from "../../assests/color-icon/check.png";
import share from "../../assests/color-icon/share.png";
import cube from "../../assests/color-icon/cube.png";
import arrow from "../../assests/color-icon/arrow.png";
import add from "../../assests/color-icon/add.png";
import page_tick from "../../assests/color-icon/page_tick.png";
import download from "../../assests/color-icon/download.png";
import list from "../../assests/color-icon/list.png";
import setting from "../../assests/color-icon/setting.png";
import animate from "../../assests/color-icon/animate.png";

const FeatureTab = () => {
  return (
    <div>
      <div className="tab_container">
        <div className="all_feat">
          {/* <div className="indi_feat">
            <div className="head">
              <img src={truck} alt="" />
              <p>Volume/Weight Load</p>
            </div>

            <div className="feature-card-inner">
              Maximize container utilization with 3D load planning
            </div>
          </div> */}
          <div className="indi_feat">
            <div className="head">
              <img src={cube} alt="" />
              <p>Intello Stack</p>
            </div>

            <div className="feature-card-inner">
              Auto-stack boxes with intelligent algorithms
            </div>
          </div>
          {/* <div className="indi_feat">
            <div className="head">
              <img src={check} alt="" />
              <p>Weight Check</p>
            </div>

            <div className="feature-card-inner">
              Ensure the container's weight limit is not exceeded
            </div>
          </div> */}
          <div className="indi_feat">
            <div className="head">
              <img src={arrow} alt="" />
              <p> Practical Load Plan</p>
            </div>

            <div className="feature-card-inner">
              Load plan considers practical labour constraints
            </div>
          </div>
          {/* <div className="indi_feat">
            <div className="head">
              <img src={share} alt="" />
              <p>Share Plan</p>
            </div>

            <div className="feature-card-inner">
              Share the load plan with your team or customers
            </div>
          </div> */}
          <div className="indi_feat">
            <div className="head">
              <img src={download} alt="" />
              <p>Export Report</p>
            </div>

            <div className="feature-card-inner">
              Export the load plan as a PDF, Excel, or 3D image and share with
              the team.
            </div>
          </div>
          <div className="indi_feat">
            <div className="head">
              <img src={add} alt="" />
              <p>Custom Container</p>
            </div>

            <div className="feature-card-inner">
              Add custom boxes to optimize the load plan
            </div>
          </div>
          <div className="indi_feat">
            <div className="head">
              <img src={animate} alt="" />
              <p>Loading Animation</p>
            </div>

            <div className="feature-card-inner">
              Experience a dynamic loading animation of boxes with adjustable
              speed.
            </div>
          </div>
          {/* <div className="indi_feat">
            <div className="head">
              <img src={list} alt="" />
              <p>Multi-Container</p>
            </div>

            <div className="feature-card-inner">
              Load boxes into multiple containers at once
            </div>
          </div> */}
          {/* <div className="indi_feat">
            <div className="head">
              <img src={page_tick} alt="" />
              <p> Choose Load</p>
            </div>

            <div className="feature-card-inner">
              Choose the optimum load from multiple selections
            </div>
          </div> */}
          {/* <div className="indi_feat">
            <div className="head">
              <img src={setting} alt="" />
              <p>User Defined Settings</p>
            </div>

            <div className="feature-card-inner">
              Multiple options for the user to define settings
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default FeatureTab;
