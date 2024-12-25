import React, { useEffect, useRef, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Sidebar from "../../components/Sidebar/Sidebar";
import infoIcon from "../../assests/info-icon.png";
import "./FreeOutput.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getDataThunk } from "../../redux/Slices/mainSlice";
import Loader from "../../components/Loader/Loader";
import Popup from "../../components/Popup/Popup";
import ShareContent from "../../components/ShareContent/ShareContent";
import { planner_contSelection } from "../../constants/links";
import { stagewise_loading } from "../../constants/links";
import { createLoadplanThunk } from "../../redux/Slices/plannerSlice";
import AssignPopup from "../../PlannerComponents/AssignPopup/AssignPopup";
import toast from "react-hot-toast";
import { rgbaToHex } from "../../Util/util";

const FreeOutput = ({ containerQuan }) => {
  const modelRef = useRef(null);
  const location = useLocation();
  const orderNumToSku = location.state?.orderNum;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [is700, setIs700] = useState(window.innerWidth < 700);
  const [heading, setHeading] = useState([
    " ",
    "Name",
    "Length",
    "Width",
    "Height",
    "Number of boxes per strip",
    "Total cases",
    "Filled cases",
  ]);
  const [totalCasesSum, setTotalCasesSum] = useState(0);
  const [totalFilled, setTotalFilled] = useState(0);
  const [premium, setPremium] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [contIndex, setContIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [shareit, setShareit] = useState(false);
  const [assignPopup, setAssignPopup] = useState(false);
  const [skuData, setSkuData] = useState([]);
  const [numCases, setNumCases] = useState([]);
  const [inputData, setInputData] = useState({});
  const [mobileView, setMobileView] = useState(false);
  const [stagewiseData, setStagewiseData] = useState({});
  const [admin, setAdmin] = useState(false);
  //useSelector=========================================================================================================================
  const loading = useSelector((state) => state.rootReducer.mainSlice.loading);
  const tableData = useSelector(
    (state) => state.rootReducer.mainSlice.data.data.df
  );

  const [filled, setFilled] = useState([]);
  const boxInfo = useSelector(
    (state) => state.rootReducer.mainSlice.data.data.box_info
  );
  const container = useSelector(
    (state) => state.rootReducer.mainSlice.data.data.container_indices
  );
  const dimension = useSelector(
    (state) => state.rootReducer.mainSlice.data.data.container_inf
  );
  const num_skus = useSelector(
    (state) => state.rootReducer.mainSlice.data.data.num_skus
  );
  const sku_info = useSelector(
    (state) => state.rootReducer.mainSlice.data.data.sku_info
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
  const colorsData = useSelector(
    (state) => state.rootReducer.mainSlice.data.data.colors
  );
  const isLogin = useSelector((state) => state.rootReducer.authSlice.isLogin);
  const orderData = useSelector(
    (state) => state.rootReducer.plannerSlice.data.orderData
  );
  const loadplanCreated = useSelector(
    (state) => state.rootReducer.plannerSlice.loadplanCreated
  );
  const user = useSelector((state) => state.rootReducer.authSlice.data.user);

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

  const calUsedContainer = () => {
    let a = 0;
    volume?.forEach((item) => {
      if (item > 0) {
        a++;
      }
    });
    return a;
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
          JSON.stringify(data?.payload?.container_inf)
        );
      }
    });
  };
  const createLoadplan = () => {
    if (orderData.length > 0 && containerQuan) {
      const data = {
        order_numbers: [],
        containerData: containerQuan,
      };
      orderData?.forEach((ele) => {
        data.order_numbers.push(ele.order_number);
      });
      if (!loadplanCreated) {
        dispatch(createLoadplanThunk(data)).then((data) => {
          if (data.payload["ERROR"]) {
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
            setAssignPopup(true);
          }
        });
      } else {
        setAssignPopup(true);
      }
    } else {
      toast.error("Something went wrong, create load plan again", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
      });
    }
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

    if (data.numTypes) {
      const numType = parseInt(data.numTypes);
      const skuArray = [];
      for (let i = 0; i < numType; i++) {
        const skuKey = `sku${i}`;
        const colorKey = `color${i}`;
        const numberOfCases = `numberOfCases${i}`;

        if (data[skuKey] && data[colorKey]) {
          skuArray.push({
            color: data[colorKey],
            sku: data[skuKey],
          });
        }
        if (data[numberOfCases]) {
          numCases.push(data[numberOfCases]);
        }
      }
      setSkuData(skuArray);
    }
    setStagewiseData((prev) => ({ ...prev, skuLength: data.numTypes }));

    if (data.mobileView) {
      setMobileView(true);
    }
    if (data.admin) {
      setAdmin(true);
    }

    if (queryParams) {
      postData(data);
    }
    setInputData(data);
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

  useEffect(() => {
    if (orderNumToSku) {
      setHeading((prevArray) => {
        const newArray = [...prevArray];
        newArray.splice(1, 0, "Order Number");
        return newArray;
      });
    }
  }, [orderNumToSku]);

  const url = `${window.location.origin}${location.pathname}${location.search}`;
  const title = "Check out this amazing website!";

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {!mobileView && <Breadcrumb className="bread-nav" />}
          {!is700 && isLogin ? (
            <Sidebar className="hide-sidebar" />
          ) : (
            <></>
          )}{" "}
          <div
            className="order-details"
            style={{ paddingTop: mobileView ? "3rem" : "" }}
          >
            {!mobileView && (
              <div className="head">
                <h1>Loading Pattern</h1>
                <span className="info-icon">
                  <img src={infoIcon} alt="Info Icon" />
                  <span className="tooltip">
                    Our algorithm elegantly mirrors real-world constraints
                    ensuring an efficient and harmonious process to achieve
                    maximum container utilization basis the parameters provided.
                  </span>
                </span>
              </div>
            )}

            <div style={{ fontSize: "1.5rem", marginTop: "1rem" }}>
              {mobileView ? "Order Visualization :" : "Order Information :"}{" "}
            </div>
            {/* <div className="table" style={{ display: "flex" }}>
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
                    <div>
                <table className="table-info filled_table">
                <tr>
                <th>Info Cases</th>
                </tr>
                {colorsData?.map((ele, index) => {
                  const matchingSku = skuData.find(
                    (item) => rgbaToHex(item.color) == ele
                    );
                    return (
                      <tr
                      style={{
                        padding: "11.7px",
                        background: ele,
                        }}
                      >
                        {matchingSku ? (
                          <>{matchingSku.sku}</>
                          ) : (
                            <>No match found</>
                            )}
                            </tr>
                            );
                            })}
                            </table>
                            </div>
                            </div> */}
            {!mobileView && (
              <div className="table" style={{ display: "flex" }}>
                <div className="table-info">
                  <table>
                    <tr>
                      {heading.map((ele) => (
                        <th>{ele}</th>
                      ))}
                    </tr>
                    {num_skus?.map((_, index) => {
                      const matchingSku = skuData.find(
                        (item) => rgbaToHex(item.color) == colorsData[index]
                      );
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          {orderNumToSku ? (
                            <td>
                              {" "}
                              {orderNumToSku[matchingSku?.sku]?.map(
                                (item) => `#${item}`
                              )}{" "}
                            </td>
                          ) : (
                            <></>
                          )}
                          <td style={{ background: colorsData[index] }}>
                            {matchingSku?.sku}
                          </td>

                          <td>{sku_info?.[index]?.[1]}</td>
                          <td>{sku_info?.[index]?.[2]}</td>
                          <td>{sku_info?.[index]?.[3]}</td>
                          <td>{sku_info?.[index]?.[4]}</td>
                          <td>{numCases[index]}</td>
                          <td>{filled?.[index]}</td>
                        </tr>
                      );
                    })}
                  </table>
                </div>
              </div>
            )}
            {!mobileView && (
              <div
                className="note"
                style={{
                  display: totalFilled < totalCasesSum ? "block" : "none",
                }}
              >
                There are still boxes that need to be filled in the container.
                Recommend you to go back and change the number of container.
              </div>
            )}

            <div
              className="container-tabs"
              style={{ marginBottom: mobileView ? "1rem" : "" }}
            >
              {volume?.map((ele, index) => {
                if (ele > 0) {
                  return (
                    <button
                      className="cont_btn"
                      style={{
                        marginTop: "2rem",
                        backgroundColor:
                          index == contIndex ? "black" : "#F0F0F0",
                        color: index == contIndex ? "white" : "black",
                        padding: mobileView ? "9px 13px" : "",
                        fontSize: mobileView ? "0.8rem" : "",
                      }}
                      onClick={() => {
                        setContIndex(index);
                      }}
                    >
                      Container {index + 1}
                    </button>
                  );
                }
              })}
            </div>
            {!mobileView && (
              <div className="container-info">
                <p>
                  Container used:{" "}
                  <span id="container-type">{`${calUsedContainer()} / ${
                    volume?.length
                  }`}</span>
                </p>
                <p>
                  Container type:{" "}
                  <span id="container-type">{containerType}</span>
                </p>
                <p>
                  Dimension :{" "}
                  <span id="Dimension">
                    {dimension?.[contIndex]?.containerLength} x{" "}
                    {dimension?.[contIndex]?.containerWidth} x{" "}
                    {dimension?.[contIndex]?.containerHeight}
                  </span>
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
            )}

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
              {!mobileView && (
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
                    {/* <input
                    type="email"
                    className="features-input"
                    placeholder="Enter your email"
                  /> */}
                    <button
                      className="btn-apply"
                      id="share-loading"
                      onClick={share}
                    >
                      Share
                    </button>
                  </div>
                </div>
              )}

              {mobileView && (
                <>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <button
                      className="btn-apply"
                      style={{
                        backgroundColor: "#cc9c87",
                        marginTop: mobileView ? "2.5rem" : "",
                        padding: "10px 15px",
                      }}
                      onClick={() => {
                        const boxData = boxInfo?.[contIndex];
                        navigate(stagewise_loading, {
                          state: { inputData, filled, boxData },
                        });
                      }}
                    >
                      Stage wise loading
                    </button>
                  </div>
                </>
              )}
            </div>
            {(user?.userType == "Company_Admin" && admin) ||
            (user?.userType == "Company_planner" && admin) ? (
              <>
                <div
                  className="two-button"
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    marginTop: "4rem",
                  }}
                >
                  <button
                    className="btn-apply"
                    style={{ padding: "15px 28px" }}
                    onClick={createLoadplan}
                  >
                    Assign to loader
                  </button>
                  <button
                    className="btn-cancel"
                    style={{ padding: "15px 28px" }}
                    onClick={() => navigate(planner_contSelection)}
                  >
                    Edit loadplan
                  </button>
                </div>
              </>
            ) : (
              <></>
            )}
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
          {assignPopup ? (
            <AssignPopup assignPopup={true} setAssignPopup={setAssignPopup} />
          ) : (
            <></>
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

// if (inputData.numTypes) {
//   const numType = parseInt(inputData.numTypes);
//   for (let i = 0; i < numType; i++) {
//     const colorKey = `color${i}`;
//     setStagewiseData((prev) => ({
//       ...prev,
//       colorKey: {
//         filled: filled[i],
//         totalCases: `numberOfCases${i}`,
//         name: `sku${i}`,
//         length: `length${i}`,
//         width: `width${i}`,
//         height: `height${i}`,
//         rotationAllowed: `rotationAllowed${i}`,
//       },
//     }));
//   }
// }
