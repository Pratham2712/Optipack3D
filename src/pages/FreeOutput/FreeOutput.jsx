import React, { useEffect, useRef, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Sidebar from "../../components/Sidebar/Sidebar";
import infoIcon from "../../assests/info-icon.png";
import "./FreeOutput.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getDataThunk } from "../../redux/Slices/mainSlice";
import Loader from "../../components/Loader/Loader";
import Popup from "../../components/Popup/Popup";
import ShareContent from "../../components/ShareContent/ShareContent";

const FreeOutput = () => {
  const modelRef = useRef(null);
  const location = useLocation();
  const dispatch = useDispatch();
  // const { filteredSkuData } = location.state || {};
  const [is700, setIs700] = useState(window.innerWidth < 700);
  const [totalCasesSum, setTotalCasesSum] = useState(0);
  const [totalFilled, setTotalFilled] = useState(0);
  const [premium, setPremium] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [contIndex, setContIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [shareit, setShareit] = useState(false);
  const [filteredSkuData, setFilteredSkuData] = useState({});
  //useSelector=========================================================================================================================
  const loading = useSelector((state) => state.rootReducer.mainSlice.loading);
  const tableData = useSelector(
    (state) => state.rootReducer.mainSlice.data.data.df
  );
  const [updatedTableData, setUpdatedTableData] = useState("");
  const [filled, setFilled] = useState([]);
  const boxInfo = useSelector(
    (state) => state.rootReducer.mainSlice.data.data.box_info
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
  const isLogin = useSelector((state) => state.rootReducer.authSlice.isLogin);

  localStorage.setItem("threed_paths", JSON.stringify(threedPaths));
  localStorage.setItem("container_inf", JSON.stringify(containerInf?.[0]));

  const iframeSrc = `three_render.html?container=${encodeURIComponent(
    contIndex
  )}&animation=${encodeURIComponent(animate)}&isLogin=${encodeURIComponent(
    isLogin
  )}`;
  //function===============================================================================================================
  const setAnimation = () => {
    setAnimate(!animate);
  };
  const share = () => {
    setShareit(!shareit);
  };

  const postData = (data) => {
    const formData = new FormData();
    Object.keys(data)?.forEach((key) => {
      formData.append(key, data[key]);
    });
    dispatch(getDataThunk(formData)).then((data) => {
      if (data.payload) {
        localStorage.setItem(
          "threed_paths",
          JSON.stringify(data?.payload?.threed_paths)
        );
        localStorage.setItem(
          "container_inf",
          JSON.stringify(data?.payload?.container_inf?.[0])
        );
      }
    });
  };
  //useEffect=================================================================================================================
  useEffect(() => {
    const handleResize = () => {
      setIs700(window.innerWidth < 700);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modelRef.current && !modelRef.current.contains(event.target)) {
        setFullscreen(false);
      }
    };

    if (fullscreen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [fullscreen, setFullscreen]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const data = {};
    queryParams.forEach((value, key) => {
      data[key] = value;
    });

    setFilteredSkuData(data);
    if (queryParams) {
      postData(data);
    }
  }, [location.search]);

  useEffect(() => {
    const sums = boxInfo?.[0]?.map((_, index) =>
      boxInfo.reduce((sum, arr) => sum + arr[index], 0)
    );
    setFilled(sums);
    setTotalFilled(sums?.reduce((sum, curr) => sum + curr));
    const parser = new DOMParser();
    const doc = parser.parseFromString(tableData, "text/html");
    const totalCasesElements = doc.querySelectorAll("tbody tr td:nth-child(6)");
    const totalSum = Array.from(totalCasesElements).reduce((sum, td) => {
      const value = parseFloat(td.textContent);
      return sum + (isNaN(value) ? 0 : value);
    }, 0);

    setTotalCasesSum(totalSum);
  }, [boxInfo, tableData]);

  const url = `${window.location.origin}${location.pathname}${location.search}`;
  const title = "Check out this amazing website!";

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
            <div className="table" style={{ display: "flex" }}>
              <div
                className="table-info"
                dangerouslySetInnerHTML={{ __html: tableData }}
              ></div>
              <div>
                <table className="table-info filled_table">
                  <tr>
                    <th>Filled cases</th>
                  </tr>
                  {filled?.map((ele) => (
                    <tr style={{ padding: "11.7px" }}>{ele}</tr>
                  ))}
                  <tbody></tbody>
                </table>
              </div>
            </div>
            <div
              className="note"
              style={{
                display: totalFilled < totalCasesSum ? "block" : "none",
              }}
            >
              There are still boxes that need to be filled in the container.
              Recommend you to go back and change the number of container.
            </div>
            <div className="container-tabs">
              {container?.map((ele, index) => (
                <button
                  className="cont_btn"
                  style={{
                    marginTop: "2rem",
                    backgroundColor: index == contIndex ? "black" : "#F0F0F0",
                    color: index == contIndex ? "white" : "black",
                  }}
                  onClick={() => {
                    setContIndex(index);
                  }}
                >
                  Container {index + 1}
                </button>
              ))}
            </div>
            <div className="container-info">
              <p>
                Container type: <span id="container-type">{containerType}</span>
              </p>
              <p>
                Container fill rate:{" "}
                <span id="vol-occ-curr">{volume?.[contIndex]}%</span>
              </p>
              <p>
                Packaging Density:
                <span id="packaging-density">
                  {packaging_density?.[contIndex]}%
                </span>
              </p>
            </div>
            <div className="content-wrapper">
              <div
                className={`contenter-view ${fullscreen ? "full_view" : ""}`}
              >
                <i
                  class="fas fa-expand btn-cancel"
                  id="fullscreen-button"
                  onClick={() => setFullscreen(!fullscreen)}
                ></i>
                <iframe
                  ref={modelRef}
                  id="threejs-frame"
                  className="iframe"
                  src={iframeSrc}
                  style={{
                    alignSelf: "center",
                    width: fullscreen ? "90%" : "",
                    height: fullscreen ? "95%" : "",
                  }}
                ></iframe>
              </div>
              <div className="block-elements">
                <div className="sku-heading"></div>
                <div className="sku-details"></div>
                <div className="features">
                  <h3>
                    3d Loading Animation
                    {/* <img className="premium-icon" src={premiumIcon} /> */}
                    {/* <i class="fa-solid fa-lock premium-icon"></i> */}
                  </h3>
                  <button
                    className="btn-apply"
                    id="Loading-Animation"
                    onClick={setAnimation}
                  >
                    See Loading Animation
                  </button>
                </div>
                <div className="features">
                  <h3 onClick={() => setPremium(!premium)}>
                    Edit Loading Pattern
                    {/* <img className="premium-icon" src={premiumIcon} /> */}
                    <i class="fa-solid fa-lock premium-icon"></i>
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
                    {/* <img className="premium-icon" src={premiumIcon} /> */}
                    {/* <i class="fa-solid fa-lock premium-icon"></i> */}
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
                    onClick={share}
                  >
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
          {premium && <Popup premium={premium} setPremium={setPremium} />}
          {shareit && (
            <ShareContent
              url={url}
              title={title}
              setShareit={setShareit}
              shareit={shareit}
            />
          )}
        </div>
      )}
    </>
  );
};

export default FreeOutput;

// useEffect(() => {
//   const sums = boxInfo[0].map((_, index) =>
//     boxInfo.reduce((sum, arr) => sum + arr[index], 0)
//   );
//   // Add the new header cell for "Filled cases"
//   let updatedData = tableData?.replace(
//     /<\/tr>/,
//     "<th>Filled cases</th></tr>"
//   );
//   // Modify each row in the tbody
//   const modify = updatedData.replace(
//     /(<tr>\s*<th[^>]*>.*?<\/th>\s*(<td[^>]*>[\s\S]*?<\/td>)+<\/tr>)/g,
//     (match, content, offset) => {
//       const rowIndex =
//         (updatedData.slice(0, offset).match(/<tr>/g) || []).length - 1;
//       if (rowIndex < sums.length) {
//         return match.replace(/<\/tr>$/, `<td>${sums[rowIndex]}</td></tr>`);
//       }
//       return match;
//     }
//   );
//   console.log(boxInfo);
//   console.log(modify, sums);
//   setUpdatedTableData(modify);
// }, [tableData, boxInfo]);
