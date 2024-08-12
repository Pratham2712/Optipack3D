import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Breadcrumb.css";
import notification from "../../assests/Notification.png";
import author from "../../assests/author-photo.png";
import reload from "../../assests/reload.png";
const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  return (
    <div aria-label="breadcrumb" className="header">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return isLast ? (
            <li key={to} className="breadcrumb-item active" aria-current="page">
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </li>
          ) : (
            <li key={to} className="breadcrumb-item">
              <Link to={to}>
                {value.charAt(0).toUpperCase() + value.slice(1)}
              </Link>
            </li>
          );
        })}
      </ol>
      <div className="user-info">
        <button type="button" id="reloadButton" className="reload-button">
          <img src={reload} alt="Reload" className="user-others" />
        </button>
        <img src={notification} alt="Notifications" />
        <img src={author} alt="User Image" className="user-image" />
      </div>
    </div>
  );
};

export default Breadcrumb;
