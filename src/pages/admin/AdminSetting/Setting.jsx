import React, { useEffect, useState } from "react";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import Sidebar from "../../../components/Sidebar/Sidebar";
import "./Setting.css";
import {
  defaultSettingThunk,
  getContainerThunk,
  getDefaultSettingThunk,
  getLoadPlanThunk,
  getPermissionThunk,
  permissionThunk,
} from "../../../redux/Slices/companyAdminSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader/Loader";
import InputPopup from "../../../AdminComponents/InputPopup/InputPopup";
import AddUser from "../../../AdminComponents/AddUser/AddUser";
import { admin_manageuser } from "../../../constants/links";
import { useNavigate } from "react-router-dom";
import SkuSetting from "../SkuSetting/SkuSetting";
import toast from "react-hot-toast";
import Joyride from "react-joyride";

const Setting = () => {
  const [is700, setIs700] = useState(window.innerWidth < 700);
  const dispatch = useDispatch();
  const [user, setUser] = useState(false);
  const navigate = useNavigate();
  const [tour, setTour] = useState({
    run: true,
    steps: [
      {
        target: ".actions-head",
        content: "Manage user like add, delete and change role of user",
        placement: "top",
        disableScrolling: true,
      },
      {
        target: ".settings-section",
        content: "Add data for order and load plan",
        placement: "top",
        disableScrolling: true,
      },
      {
        target: ".permission-container",
        content: "Update dashboard premission of user.",
        placement: "top",
      },
      {
        target: ".sku-container",
        content: "Add SKU data.",
        placement: "top",
      },
    ],
  });

  const permission = [
    "CFR",
    "One time rate",
    "Location Wise Performance",
    "Source Destination Combinations Loss",
    "Planning volume loss",
  ];

  const [permData, setPermData] = useState([]);
  const [inputPop, setInputPop] = useState({
    action: false,
    name: "",
    head: "",
  });
  const [loadData, setLoadData] = useState({
    shipping_location: [],
    destination_location: [],
    container_type: "",
  });
  const [defaultSetting, setDefaultSetting] = useState({
    standard_container_type: "",
    standard_source: "",
    standard_destination: "",
    standard_utilization: "",
    standard_delivery_horizon: "",
  });
  //useSelector====================================================================================================================
  const permissionData = useSelector(
    (state) => state.rootReducer.companyAdminSlice.data.permission
  );
  const loading = useSelector(
    (state) => state.rootReducer.companyAdminSlice.loading
  );
  const loadplanData = useSelector(
    (state) => state.rootReducer.companyAdminSlice.data.loadplan
  );
  const containerList = useSelector(
    (state) => state.rootReducer.companyAdminSlice.data.containerList
  );
  const defSetting = useSelector(
    (state) => state.rootReducer.companyAdminSlice.data.default
  );
  const company = useSelector(
    (state) => state.rootReducer.authSlice.data.user.company
  );
  //function ==================================================================================================================================
  const handleChange = (dash, userType, value) => {
    const info = {
      company: company,
      user_type: userType,
      dashboard: dash,
      allowed: value === "allowed" ? true : false,
    };
    setPermData((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.dashboard === dash && item.user_type === userType
      );

      if (existingIndex !== -1) {
        const updatedPermData = [...prev];
        updatedPermData[existingIndex] = {
          ...updatedPermData[existingIndex],
          allowed: info.allowed,
        };
        return updatedPermData;
      }

      return [...prev, info];
    });
  };

  const submitPermission = () => {
    if (permissionData.length == 0) {
      if (permData.length == 20) {
        dispatch(permissionThunk(permData));
      } else {
        toast.error("Select all permissions", {
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#713200",
          },
        });
      }
    } else {
      if (permData.length > 0) {
        dispatch(permissionThunk(permData));
      }
    }
  };

  const checkVal = (dashboard, user_type) => {
    const found = permissionData.find(
      (item) => item.dashboard === dashboard && item.user_type === user_type
    );

    return found ? found.allowed : null;
  };
  const handleTourCallback = (data) => {
    const { status } = data;
    if (status === "finished" || status === "skipped") {
      setTour((prevTour) => ({ ...prevTour, run: false }));
    }
  };
  const addDefaultSetting = () => {
    dispatch(defaultSettingThunk(defaultSetting)).then((data) => {
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
      }
    });
  };
  //useEffect===========================================================================================================================
  useEffect(() => {
    const handleResize = () => {
      setIs700(window.innerWidth < 700);
    };
    dispatch(getPermissionThunk());
    dispatch(getLoadPlanThunk());
    dispatch(getContainerThunk());
    dispatch(getDefaultSettingThunk());
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
          {!is700 ? <Sidebar className="hide-sidebar" /> : <></>}
          <Joyride
            steps={tour.steps}
            continuous={true}
            showSkipButton={true}
            showProgress={true}
            callback={handleTourCallback}
            styles={{
              options: {
                zIndex: 10000, // Ensure the tour is above other elements
              },
              buttonNext: {
                backgroundColor: "#cc9c87", // Change to your desired color
                color: "white", // Text color
                border: "none", // Remove border
                padding: "10px 20px", // Add padding
                borderRadius: "5px", // Rounded corners
                cursor: "pointer", // Pointer cursor
              },
              buttonBack: {
                color: "#cc9c87",
              },
            }}
          />
          <div>
            {inputPop.action ? (
              <InputPopup
                loadData={loadData}
                setLoadData={setLoadData}
                inputPop={inputPop}
                setInputPop={setInputPop}
              />
            ) : (
              ""
            )}
            {user ? <AddUser setUser={setUser} user={user} /> : ""}
            <main className="container-setting-form">
              <section className="settings-header-head">
                <h2>User Based Settings</h2>
                <div className="actions-head">
                  <a
                    className="btn-cancel"
                    style={{ padding: "0.6rem 6rem" }}
                    onClick={() => setUser(true)}
                  >
                    Add Users
                  </a>
                  <a
                    href=""
                    className="btn-apply"
                    style={{ padding: "0.6rem 6rem" }}
                    onClick={() => navigate(admin_manageuser)}
                  >
                    Manage Users
                  </a>
                </div>
              </section>
              <section className="settings-header">
                <h2>Order and load plan based settings</h2>
              </section>

              <section className="settings-section">
                <div className="settings-group">
                  <label for="standard-container-types">
                    Standard container types
                  </label>
                  <select
                    id="standard-container-types"
                    className="styled-select"
                    value={defSetting["standard_container_type"]}
                    onChange={(e) => {
                      if (e.target.value === "add-new-container") {
                        setInputPop((prev) => ({
                          ...prev,
                          action: true,
                          name: "container_type",
                          head: "Add Container Type",
                        }));
                      } else {
                        setDefaultSetting((prev) => ({
                          ...prev,
                          standard_container_type: e.target.value,
                        }));
                      }
                    }}
                  >
                    <option value="" selected>
                      Select From Dropdown
                    </option>
                    <option value="">General Purpose container 20'</option>
                    <option value="">General Purpose container 40'</option>
                    <option value="">
                      High - Cube General Purpose container 40'
                    </option>
                    {containerList?.map((ele) => (
                      <option value={ele}>{ele}</option>
                    ))}
                    <option value="add-new-container">Add New Container</option>
                  </select>
                </div>
                <div className="settings-group">
                  <label for="standard-shipping-location">
                    Standard Shipping location
                  </label>
                  <select
                    id="standard-shipping-location"
                    className="styled-select"
                    value={defSetting["standard_source"]}
                    onChange={(e) => {
                      if (e.target.value === "add-new-location") {
                        setInputPop((prev) => ({
                          ...prev,
                          action: true,
                          name: "shipping_location",
                          head: "Add shipping location",
                        }));
                      } else {
                        setDefaultSetting((prev) => ({
                          ...prev,
                          standard_source: e.target.value,
                        }));
                      }
                    }}
                  >
                    <option selected>Select From Dropdown</option>
                    {loadplanData?.["shipping_location"]?.map((ele) => (
                      <option value={ele}>{ele}</option>
                    ))}
                    <option value="add-new-location">
                      Add New Shipping Location
                    </option>
                  </select>
                </div>
                <div className="settings-group">
                  <label for="standard-destination-location">
                    Standard destination location
                  </label>
                  <select
                    id="standard-destination-location"
                    className="styled-select"
                    value={defSetting["standard_destination"]}
                    onChange={(e) => {
                      if (e.target.value === "add-new-destination") {
                        setInputPop((prev) => ({
                          ...prev,
                          action: true,
                          name: "destination_location",
                          head: "Add destination location",
                        }));
                      } else {
                        setDefaultSetting((prev) => ({
                          ...prev,
                          standard_destination: e.target.value,
                        }));
                      }
                    }}
                  >
                    <option selected>Select From Dropdown</option>
                    {loadplanData?.["destination_location"]?.map((ele) => (
                      <option value={ele}>{ele}</option>
                    ))}
                    <option value="add-new-destination">
                      Add New Destination Location
                    </option>
                  </select>
                </div>
                <div className="settings-group">
                  <label for="minimum-utilization-details">
                    Minimum Utilization Details
                  </label>
                  <select
                    id="minimum-utilization-details"
                    className="styled-select"
                    value={defSetting["standard_utilization"]}
                    onChange={(e) => {
                      setDefaultSetting((prev) => ({
                        ...prev,
                        standard_utilization: e.target.value,
                      }));
                    }}
                  >
                    <option>Select From Dropdown</option>
                    <option>60%</option>
                    <option>70%</option>
                    <option>80%</option>
                    <option>90%</option>
                    <option>95%</option>
                  </select>
                </div>
                <div className="settings-group">
                  <label for="maximum-delivery-horizon">
                    Maximum possible delivery horizon
                  </label>
                  <select
                    id="maximum-delivery-horizon"
                    className="styled-select"
                    value={defSetting["standard_delivery_horizon"]}
                    onChange={(e) => {
                      setDefaultSetting((prev) => ({
                        ...prev,
                        standard_delivery_horizon: e.target.value,
                      }));
                    }}
                  >
                    <option>Select From Dropdown</option>
                    {[...Array(30)].map((_, index) => (
                      <option>{index + 1} days</option>
                    ))}
                  </select>
                </div>
              </section>
              <div className="actions">
                <button className="btn-cancel">Cancel</button>
                <button className="btn-apply" onClick={addDefaultSetting}>
                  Apply
                </button>
              </div>
              <div style={{ margin: "2rem 0rem" }}>
                <h2>Dashboard permission settings</h2>
              </div>
              <section
                style={{
                  display: "flex",
                  width: "100%",
                }}
                className="permission-container"
              >
                <div className="dashboards">
                  <h4>CFR</h4>
                  <h4>One time rate</h4>
                  <h4>Location Wise Performance</h4>
                  <h4>Source Destination Combinations Loss</h4>
                  <h4>Planning volume loss</h4>
                </div>
                <div className="dashboard-permission">
                  <div className="permissions-column">
                    <h4>Loading team</h4>
                    {permission?.map((ele) => (
                      <select
                        name="Company_loader"
                        onChange={(e) =>
                          handleChange(ele, e.target.name, e.target.value)
                        }
                        style={{
                          border:
                            checkVal(ele, "Company_loader") === false
                              ? "2px solid red"
                              : checkVal(ele, "Company_loader") === true
                              ? "2px solid green"
                              : "",
                        }}
                      >
                        <option disabled selected>
                          Select from Dropdown
                        </option>
                        <option
                          value="not_allowed"
                          selected={checkVal(ele, "Company_loader") === false}
                        >
                          Not Allowed
                        </option>
                        <option
                          value="allowed"
                          selected={checkVal(ele, "Company_loader") === true}
                        >
                          Allowed
                        </option>
                      </select>
                    ))}
                  </div>
                  <div className="permissions-column">
                    <h4>Load planner</h4>
                    {permission?.map((ele) => (
                      <select
                        name="Company_planner"
                        onChange={(e) =>
                          handleChange(ele, e.target.name, e.target.value)
                        }
                        style={{
                          border:
                            checkVal(ele, "Company_planner") === false
                              ? "2px solid red"
                              : checkVal(ele, "Company_planner") === true
                              ? "2px solid green"
                              : "",
                        }}
                      >
                        <option disabled selected>
                          Select from Dropdown
                        </option>
                        <option
                          value="not_allowed"
                          selected={checkVal(ele, "Company_planner") === false}
                        >
                          Not Allowed
                        </option>
                        <option
                          value="allowed"
                          selected={checkVal(ele, "Company_planner") === true}
                        >
                          Allowed
                        </option>
                      </select>
                    ))}
                  </div>
                  <div className="permissions-column">
                    <h4>Shipping coordinator</h4>
                    {permission?.map((ele) => (
                      <select
                        name="Shipping coordinator"
                        onChange={(e) =>
                          handleChange(ele, e.target.name, e.target.value)
                        }
                        style={{
                          border:
                            checkVal(ele, "Shipping coordinator") === false
                              ? "2px solid red"
                              : checkVal(ele, "Shipping coordinator") === true
                              ? "2px solid green"
                              : "",
                        }}
                      >
                        <option selected disabled>
                          Select from Dropdown
                        </option>
                        <option
                          value="not_allowed"
                          selected={
                            checkVal(ele, "Shipping coordinator") === false
                          }
                        >
                          Not Allowed
                        </option>
                        <option
                          value="allowed"
                          selected={
                            checkVal(ele, "Shipping coordinator") === true
                          }
                        >
                          Allowed
                        </option>
                      </select>
                    ))}
                  </div>
                  <div className="permissions-column">
                    <h4>Leadership team</h4>
                    {permission?.map((ele) => (
                      <select
                        name="Leadership team"
                        onChange={(e) =>
                          handleChange(ele, e.target.name, e.target.value)
                        }
                        style={{
                          border:
                            checkVal(ele, "Leadership team") === false
                              ? "2px solid red"
                              : checkVal(ele, "Leadership team") === true
                              ? "2px solid green"
                              : "",
                        }}
                      >
                        <option disabled selected>
                          Select from Dropdown
                        </option>
                        <option
                          value="not_allowed"
                          selected={checkVal(ele, "Leadership team") === false}
                        >
                          Not Allowed
                        </option>
                        <option
                          value="allowed"
                          selected={checkVal(ele, "Leadership team") === true}
                        >
                          Allowed
                        </option>
                      </select>
                    ))}
                  </div>
                </div>
              </section>
              <div className="actions">
                <button className="btn-cancel">Cancel</button>
                <button className="btn-apply" onClick={submitPermission}>
                  Apply
                </button>
              </div>
              <SkuSetting />
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default Setting;
