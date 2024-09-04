import React, { useState } from "react";
import "./Tabs.css";
import FeatureTab from "./FeatureTab";
import Work from "./Work";
import Roles from "./Roles";
const Tabs = () => {
  const [active, setActive] = useState("features");
  return (
    <div>
      <div className="tabbar">
        <span
          className={active == "features" ? "tab active" : "tab"}
          onClick={() => setActive("features")}
        >
          Features
        </span>
        <span
          className={active == "works" ? "tab active" : "tab"}
          onClick={() => setActive("works")}
        >
          How it works
        </span>
        <span
          className={active == "roles" ? "tab active" : "tab"}
          onClick={() => setActive("roles")}
        >
          Roles
        </span>
      </div>
      <div>
        {active == "features" ? <FeatureTab /> : <></>}
        {active == "works" ? <Work /> : <></>}
        {active == "roles" ? <Roles /> : <></>}
      </div>
    </div>
  );
};

export default Tabs;
