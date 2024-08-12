import React from "react";
import "./Sidebar.css";
import logo from "../../assests/logo.png";
import path_outline from "../../assests/path_outline.png";
import home from "../../assests/home.png";
import optimization from "../../assests/optimization.png";
import setting from "../../assests/setting.png";
import support from "../../assests/support.png";

const Sidebar = () => {
  return (
    <div>
      <div class="navbar">
        <img src={logo} alt="User Image" class="user-image" />
        <a href="#">
          <img src={path_outline} class="cta" />
        </a>
        <a href="#">
          <img src={home} class="cta" />
        </a>
        <a href="#">
          <img src={optimization} class="cta" />
        </a>
        <a href="#">
          <img src={setting} class="cta" />
        </a>
        <a href="#">
          <img src={support} class="cta" />
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
