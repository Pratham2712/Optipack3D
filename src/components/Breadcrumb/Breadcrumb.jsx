import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Breadcrumb.css";
import notification from "../../assests/Notification.png";
import author from "../../assests/user-circle.png";
import reload from "../../assests/reload.png";
import { useDispatch, useSelector } from "react-redux";
import { logoutThunk } from "../../redux/Slices/authSlice";
import toast from "react-hot-toast";
import UploadImagePop from "../../AdminComponents/UploadImagePop/UploadImagePop";
const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const [showPop, setShowPop] = useState(false);
  const [uploadPop, setUploadPop] = useState(false);
  const dispatch = useDispatch();
  const divRef = useRef(null);

  const isLogin = useSelector((state) => state.rootReducer.authSlice.isLogin);
  const imageUrl = useSelector(
    (state) => state.rootReducer.authSlice.data.user.image_url
  );

  const handleRefresh = () => {
    window.location.reload();
  };
  const logout = () => {
    setShowPop(false);
    dispatch(logoutThunk({})).then((data) => {
      if (data?.payload["ERROR"]) {
        toast.error(data.payload["ERROR"], {
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#713200",
          },
        });
      }
      if (data.payload["SUCCESS"]?.message) {
        toast.success(data.payload["SUCCESS"]?.message, {
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#713200",
          },
        });
      }
    });
  };
  const handleClickOutside = (event) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      setShowPop(false); // Set state to false if clicking outside
    }
  };
  //useEffect ===================================================================================================================
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
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
          <div style={{ position: "relative" }}>
            <img
              src={imageUrl || author}
              alt="User Image"
              className="user-image"
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                setShowPop(!showPop);
              }}
            />
            {showPop && (
              <div
                style={{ position: "absolute", cursor: "pointer" }}
                className="show"
                ref={divRef}
              >
                <div onClick={logout}>
                  {" "}
                  <i class="fa-solid fa-arrow-right-from-bracket"></i>Logout
                </div>
                <div onClick={() => setUploadPop(!uploadPop)}>
                  {" "}
                  <i class="fa-solid fa-upload"></i>
                  {imageUrl ? "Update image" : "Upload image"}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {uploadPop && (
        <UploadImagePop
          uploadPop={uploadPop}
          setUploadPop={setUploadPop}
          imageUrl={imageUrl}
        />
      )}
    </div>
  );
};

export default Breadcrumb;
