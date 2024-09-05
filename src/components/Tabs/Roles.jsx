import React from "react";
import loadingteam from "../../assests/loadingteam.jpg";

const Roles = () => {
  return (
    <div>
      <div className="tab_container">
        <div className="role_content">
          <div className="role_image">
            <img src={loadingteam} alt="loadingteam" />
          </div>
          <div className="role_text">
            <div className="role">
              <h5>Loading team</h5>
              <p>Final set of loaders responsible for executing load plans</p>
            </div>
            <div className="role">
              <h5>Shipping Coordinator</h5>
              <p>End -to-End management of freight </p>
            </div>
            <div className="role">
              <h5>Load Planner</h5>
              <p>
                Set of user responsible for creating right loads to dispatch;
              </p>
            </div>
            <div className="role">
              <h5>Leadership team</h5>
              <p>Track key performance metrics and drive productivity agenda</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roles;
