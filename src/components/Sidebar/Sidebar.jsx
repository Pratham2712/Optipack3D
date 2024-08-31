import React, { useState } from "react";
import "./Sidebar.css";
import logo from "../../assests/logo.png";
import path_outline from "../../assests/path_outline.png";
import home from "../../assests/home.png";
import optimization from "../../assests/optimization.png";
import setting from "../../assests/setting.png";
import support from "../../assests/support.png";
import Popup from "../Popup/Popup";

const Sidebar = () => {
  const [premium, setPremium] = useState(false);

  return (
    <div>
      <div class="navbar">
        <img src={logo} alt="User Image" class="user-image" />
        <a href="#" onClick={() => setPremium(!premium)}>
          <img src={path_outline} class="cta" />
        </a>
        <a href="#" onClick={() => setPremium(!premium)}>
          <img src={home} class="cta" />
        </a>
        <a href="#" onClick={() => setPremium(!premium)}>
          <img src={optimization} class="cta" />
        </a>
        <a href="#" onClick={() => setPremium(!premium)}>
          <img src={setting} class="cta" />
        </a>
        <a href="#" onClick={() => setPremium(!premium)}>
          <img src={support} class="cta" />
        </a>
      </div>
      {premium && <Popup premium={premium} setPremium={setPremium} />}
    </div>
  );
};

export default Sidebar;
