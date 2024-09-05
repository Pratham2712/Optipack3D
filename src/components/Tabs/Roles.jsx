import React from "react";
import load from "../../assests/color-icon/load.png";
import loading from "../../assests/color-icon/loading.png";
import leader from "../../assests/color-icon/leader.png";
import planner from "../../assests/color-icon/planner.png";

const Roles = () => {
  return (
    <div>
      <div className="tab_container">
        <div className="all_feat" style={{ paddingTop: "2rem" }}>
          <div className="indi_feat">
            <div className="head">
              <img src={load} alt="" />
              <p>Loading team</p>
            </div>

            <div className="feature-card-inner">
              Final set of loaders responsible for executing load plans
            </div>
          </div>
          <div className="indi_feat">
            <div className="head">
              <img src={loading} alt="" />
              <p>Shipping Coordinator</p>
            </div>

            <div className="feature-card-inner">
              End -to-End management of freight
            </div>
          </div>
          <div className="indi_feat">
            <div className="head">
              <img src={planner} alt="" />
              <p>Load Planner</p>
            </div>

            <div className="feature-card-inner">
              Set of user responsible for creating right loads to dispatch
            </div>
          </div>
          <div className="indi_feat">
            <div className="head">
              <img src={leader} alt="" />
              <p>Leadership team</p>
            </div>

            <div className="feature-card-inner">
              Track key performance metrics and drive productivity agenda
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roles;
