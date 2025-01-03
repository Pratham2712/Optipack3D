import React, { useState } from "react";
import "./Sidebar.css";
import logo from "../../assests/logo.png";
import path_outline from "../../assests/path_outline.png";
import home from "../../assests/home.png";
import optimization from "../../assests/optimization.png";
import setting from "../../assests/features_svg/icons8-settings.svg";
import support from "../../assests/support.png";
import orders from "../../assests/order.png";
import Popup from "../Popup/Popup";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  admin_setting,
  planner_contSelection,
  planner_order,
} from "../../constants/links";

const Sidebar = () => {
  const [premium, setPremium] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  //useSelector=================================================================================================================
  const userType = useSelector(
    (state) => state.rootReducer.authSlice.data.user.userType
  );

  //function=======================================================================================================================
  const navigateToUrl = (action) => {
    if (userType == "Company_Admin") {
      if (action == "home") {
        navigate(admin_setting);
      } else if (action == "setting") {
        navigate(planner_order);
      } else if (action == "order_detail") {
        navigate(planner_contSelection);
      }
    } else if (userType == "Company_planner" || userType == "Company_Admin") {
      if (action == "setting") {
        navigate(planner_order);
      } else if (action == "order_detail") {
        navigate(planner_contSelection);
      }
    } else {
      setPremium(!premium);
    }
  };

  return (
    <div>
      <div class="navbar">
        <img src={logo} alt="User Image" class="user-image" />

        <a
          href="#"
          onClick={() => navigateToUrl("setting")}
          style={{
            background: location.pathname == planner_order ? "black" : "",
          }}
        >
          <img
            src={orders}
            class="cta"
            style={{
              filter:
                location.pathname == planner_order
                  ? "invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)"
                  : "",
            }}
          />
          <span class="tooltip" style={{ width: "fit-content" }}>
            Go to orders
          </span>
        </a>
        <a
          href="#"
          onClick={() => navigateToUrl("order_detail")}
          style={{
            background:
              location.pathname == planner_contSelection ? "black" : "",
          }}
        >
          <img
            src={optimization}
            class="cta"
            style={{
              filter:
                location.pathname == planner_contSelection
                  ? "invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)"
                  : "",
            }}
          />
          <span class="tooltip" style={{ width: "fit-content" }}>
            Create load plan
          </span>
        </a>
        <a href="#" onClick={() => setPremium(!premium)}>
          <img src={path_outline} class="cta" />
        </a>
        <a
          href="#"
          onClick={() => navigateToUrl("home")}
          style={{
            background: location.pathname == admin_setting ? "black" : "",
          }}
        >
          <img
            src={setting}
            class="cta"
            style={{
              filter:
                location.pathname == admin_setting
                  ? "invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)"
                  : "",
            }}
          />
          <span class="tooltip" style={{ width: "fit-content" }}>
            Setting
          </span>
        </a>

        <a href="#" onClick={() => setPremium(!premium)}>
          <img src={support} class="cta" />
          <span class="tooltip" style={{ width: "fit-content" }}>
            Support
          </span>
        </a>
      </div>
      {premium && <Popup premium={premium} setPremium={setPremium} />}
    </div>
  );
};

export default Sidebar;
