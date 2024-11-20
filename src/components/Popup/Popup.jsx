import React, { useEffect, useRef } from "react";
import proVersion from "../../assests/proVersion.png";
import cross from "../../assests/cross.png";
import "./Popup.css";
import { useNavigate } from "react-router-dom";
import { contact_us, User_root } from "../../constants/links";
import { useScroll } from "../../Util/ScrollContext";
const Popup = ({ premium, setPremium }) => {
  const popupRef = useRef(null);
  const navigate = useNavigate();
  const { scrollToFeatures } = useScroll();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setPremium(false);
      }
    };

    if (premium) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [premium, setPremium]);
  return (
    <div id="popup" className="popup-overlay">
      <div className="popup-content" ref={popupRef}>
        <div className="popup-text">
          <h1>Upgrade to the Premium Version</h1>
          <p style={{ fontSize: "16px" }}>
            Explore the premium features that can transform your workflow and
            productivity.
          </p>
          <div className="popup-buttons">
            <a
              href=""
              className="btn-apply"
              style={{ textDecoration: "none" }}
              onClick={() => navigate(contact_us)}
            >
              Upgrade Now
            </a>
            <a
              href=""
              className="btn-cancel"
              style={{ textDecoration: "none" }}
              onClick={scrollToFeatures}
            >
              Learn More
            </a>
          </div>
        </div>
        <div className="popup-image">
          <img src={proVersion} alt="Pro Version" />
        </div>
        <img
          src={cross}
          alt="Close"
          className="close-icon"
          onClick={() => setPremium(false)}
        />
      </div>
    </div>
  );
};

export default Popup;
