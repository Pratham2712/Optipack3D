import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Breadcrumb.css";
import notification from "../../assests/Notification.png";
import author from "../../assests/author-photo.png";
import reload from "../../assests/reload.png";
import { useSelector } from "react-redux";
const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const isLogin = useSelector((state) => state.rootReducer.authSlice.isLogin);

  const handleRefresh = () => {
    window.location.reload();
  };
  return (
    <div
      aria-label="breadcrumb"
      className="header"
      style={{
        marginLeft:
          pathnames.includes("freeTrial") ||
          (pathnames.includes("freeOutput") && !isLogin)
            ? 0
            : "",
        width:
          pathnames.includes("freeTrial") ||
          (pathnames.includes("freeOutput") && !isLogin)
            ? "100%"
            : "",
      }}
    >
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
      {pathnames.includes("freeTrial") == true ||
      (pathnames.includes("freeOutput") && !isLogin) ? (
        <></>
      ) : (
        <div className="user-info">
          <button
            type="button"
            id="reloadButton"
            className="reload-button"
            onClick={handleRefresh}
          >
            <img src={reload} alt="Reload" className="user-others" />
          </button>
          <img src={notification} alt="Notifications" />
          <img src={author} alt="User Image" className="user-image" />
        </div>
      )}
    </div>
  );
};

export default Breadcrumb;
