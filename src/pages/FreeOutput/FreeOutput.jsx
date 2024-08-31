import React, { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Sidebar from "../../components/Sidebar/Sidebar";
import infoIcon from "../../assests/info-icon.png";
import "./FreeOutput.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getDataThunk } from "../../redux/Slices/mainSlice";
import Loader from "../../components/Loader/Loader";
import premiumIcon from "../../assests/premium.png";
import Popup from "../../components/Popup/Popup";

const FreeOutput = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { filteredSkuData } = location.state || {};
  const [is700, setIs700] = useState(window.innerWidth < 700);
  const [premium, setPremium] = useState(false);

  //useSelector=========================================================================================================================
  const loading = useSelector((state) => state.rootReducer.mainSlice.loading);
  const tableData = useSelector(
    (state) => state.rootReducer.mainSlice.data.data.df
  );
  const container = useSelector(
    (state) => state.rootReducer.mainSlice.data.data.container_indices
  );
  const containerType = useSelector(
    (state) => state.rootReducer.mainSlice.data.data.container_type
  );
  const packaging_density = useSelector(
    (state) => state.rootReducer.mainSlice.data.data.packaging_density
  );
  const volume = useSelector(
    (state) => state.rootReducer.mainSlice.data.data.vol_occ_curr
  );
  const threedPaths = useSelector(
    (state) => state.rootReducer.mainSlice.data.data.threed_paths
  );
  const containerInf = useSelector(
    (state) => state.rootReducer.mainSlice.data.data.container_inf
  );
  localStorage.setItem("threed_paths", JSON.stringify(threedPaths?.[0]));
  localStorage.setItem("container_inf", JSON.stringify(containerInf?.[0]));
  const iframeSrc = `three_render.html`;
  // const iframeSrc = `public/three_render.html?threed_paths=${encodeURIComponent(
  //   threedPaths?.[0]
  // )}&container_inf=${encodeURIComponent(containerInf?.[0])}`;
  useEffect(() => {
    if (!containerType) {
      const formData = new FormData();
      Object.keys(filteredSkuData)?.forEach((key) => {
        formData.append(key, filteredSkuData[key]);
      });
      dispatch(getDataThunk(formData));
    }
    const handleResize = () => {
      setIs700(window.innerWidth < 700);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Breadcrumb />
          {!is700 ? <Sidebar className="hide-sidebar" /> : <></>}{" "}
          <div className="order-details">
            <div className="head">
              <h1>Loading Pattern</h1>
              <span className="info-icon">
                <img src={infoIcon} alt="Info Icon" />
                <span className="tooltip">
                  Our algorithm elegantly mirrors real-world constraints by
                  prioritizing the loading of homogeneous strips first,
                  seamlessly followed by the non-homogeneous strips, ensuring an
                  efficient and harmonious process.
                </span>
              </span>
            </div>
            <div
              className="table-info"
              dangerouslySetInnerHTML={{ __html: tableData }}
            ></div>
            <div className="container-tabs">
              {container?.map((ele, index) => (
                <button
                  className="btn"
                  style={{
                    marginTop: "2rem",
                    backgroundColor: "black",
                    color: "white",
                  }}
                >
                  container{index + 1}
                </button>
              ))}
            </div>
            <div className="container-info">
              <p>
                Container type: <span id="container-type">{containerType}</span>
              </p>
              <p>
                Container fill rate:{" "}
                <span id="vol-occ-curr">{volume?.[0]}%</span>
              </p>
              <p>
                Packaging Density:
                <span id="packaging-density">{packaging_density?.[0]}%</span>
              </p>
            </div>
            <div className="content-wrapper">
              <div className="contenter-view">
                <button id="fullscreen-button" className="btn-cancel">
                  Fullscreen View
                </button>
                <iframe
                  id="threejs-frame"
                  className="iframe"
                  src={iframeSrc}
                  style={{ alignSelf: "center" }}
                ></iframe>
              </div>
              <div className="block-elements">
                <div className="sku-heading"></div>
                <div className="sku-details"></div>
                <div className="features">
                  <h3 onClick={() => setPremium(!premium)}>
                    Edit Loading Pattern
                    <img className="premium-icon" src={premiumIcon} />
                  </h3>
                  <button
                    className="btn-apply"
                    id="edit-pattern"
                    onClick={() => setPremium(!premium)}
                  >
                    Edit Pattern
                  </button>
                </div>
                <div className="features">
                  <h3>
                    Share/Export Loading
                    <img className="premium-icon" src={premiumIcon} />
                  </h3>
                  <input
                    type="email"
                    className="features-input"
                    placeholder="Enter your email"
                  />
                  <br />
                  <button
                    className="btn-apply"
                    id="share-loading"
                    onClick={() => setPremium(!premium)}
                  >
                    Share
                  </button>
                </div>
                <div className="features">
                  <h3>
                    3d Loading Animation
                    <img className="premium-icon" src={premiumIcon} />
                  </h3>
                  <button
                    className="btn-apply"
                    id="Loading-Animation"
                    onClick={() => setPremium(!premium)}
                  >
                    See Loading Animation
                  </button>
                </div>
              </div>
            </div>
          </div>
          {premium && <Popup premium={premium} setPremium={setPremium} />}
        </div>
      )}
    </>
  );
};

export default FreeOutput;
