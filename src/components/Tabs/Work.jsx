import React from "react";
import userdefinedsettings from "../../assests/userdefinedsettings.png";
import box from "../../assests/color-icon/box.png";
import container from "../../assests/color-icon/contianer.png";
import stack from "../../assests/color-icon/stack.png";
import optimize from "../../assests/color-icon/optimize.png";
import expor from "../../assests/color-icon/export.png";

const Work = () => {
  return (
    <div>
      <div className="tab_container">
        <div className="all_feat">
          <div className="indi_feat">
            <div className="head">
              <img src={box} alt="" />
              <p>1. Upload Boxes</p>
            </div>

            <div className="feature-card-inner">
              Upload the box list in CSV or Excel format
            </div>
          </div>
          <div className="indi_feat">
            <div className="head">
              <img src={container} alt="" />
              <p>2. Set Container</p>
            </div>

            <div className="feature-card-inner">
              Select the container type and define the weight limit
            </div>
          </div>
          <div className="indi_feat">
            <div className="head">
              <img src={stack} alt="" />
              <p>3. Auto-Stack</p>
            </div>

            <div className="feature-card-inner">
              Use the auto-stack function to stack boxes in layers
            </div>
          </div>
          <div className="indi_feat">
            <div className="head">
              <img src={optimize} alt="" />
              <p>4. Optimize</p>
            </div>

            <div className="feature-card-inner">
              Optimize the load plan based on your requirements
            </div>
          </div>
          <div className="indi_feat">
            <div className="head">
              <img src={expor} alt="" />
              <p>5. Visualize and export</p>
            </div>

            <div className="feature-card-inner">
              Review the load plan in 3D view and export the report
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
