import React from "react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Sidebar from "../../components/Sidebar/Sidebar";
import infoIcon from "../../assests/info-icon.png";
import "./FreeOutput.css";
import { useSelector } from "react-redux";

const FreeOutput = () => {
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
  const iframeSrc = `public/three_render.html`;
  // const iframeSrc = `public/three_render.html?threed_paths=${encodeURIComponent(
  //   threedPaths?.[0]
  // )}&container_inf=${encodeURIComponent(containerInf?.[0])}`;

  return (
    <div>
      <Breadcrumb />
      <Sidebar />
      <div className="order-details">
        <div class="head">
          <h1>Loading Pattern</h1>
          <span class="info-icon">
            <img src={infoIcon} alt="Info Icon" />
            <span className="tooltip">
              Our algorithm elegantly mirrors real-world constraints by
              prioritizing the loading of homogeneous strips first, seamlessly
              followed by the non-homogeneous strips, ensuring an efficient and
              harmonious process.
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
                width: "16%",
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
            Container fill rate: <span id="vol-occ-curr">{volume?.[0]}%</span>
          </p>
          <p>
            Packaging Density:
            <span id="packaging-density">{packaging_density?.[0]}%</span>
          </p>
        </div>
        <div className="content-wrapper">
          <div className="contenter-view">
            <button id="fullscreen-button" class="btn-cancel">
              Fullscreen View
            </button>
            <iframe
              id="threejs-frame"
              src={iframeSrc}
              width="800"
              height="600"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeOutput;
