import React, { useEffect, useState } from "react";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import Sidebar from "../../../components/Sidebar/Sidebar";
import "./Setting.css";
import {
  getPermissionThunk,
  permissionThunk,
} from "../../../redux/Slices/companyAdminSlice";
import { useDispatch, useSelector } from "react-redux";

const Setting = () => {
  const [is700, setIs700] = useState(window.innerWidth < 700);
  const dispatch = useDispatch();

  const permission = [
    "CFR",
    "One time rate",
    "Location Wise Performance",
    "Source Destination Combinations Loss",
    "Planning volume loss",
  ];

  const [permData, setPermData] = useState([]);

  const permissionData = useSelector(
    (state) => state.rootReducer.companyAdminSlice.data.permission
  );
  console.log(permissionData);

  const handleChange = (dash, userType, value) => {
    const info = {
      company: "gmail",
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
    dispatch(permissionThunk(permData));
  };

  useEffect(() => {
    const handleResize = () => {
      setIs700(window.innerWidth < 700);
    };

    window.addEventListener("resize", handleResize);
    dispatch(getPermissionThunk());

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <Breadcrumb />
      {!is700 ? <Sidebar className="hide-sidebar" /> : <></>}

      <div>
        <main className="container-form">
          <section className="settings-header-head">
            <h2>User Based Settings</h2>
            <div className="actions-head">
              <a className="btn-cancel" style={{ padding: "0.6rem 6rem" }}>
                Add Users
              </a>
              <a
                href=""
                className="btn-apply"
                style={{ padding: "0.6rem 6rem" }}
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
              <select id="standard-container-types" className="styled-select">
                <option>Select From Dropdown</option>
                <option>20' dry container</option>
                <option>40' dry container</option>
                <option>40' high cube container</option>
                <option value="add-new-container">Add New Container</option>
              </select>
            </div>
            <div className="settings-group">
              <label for="standard-shipping-location">
                Standard Shipping location
              </label>
              <select id="standard-shipping-location" className="styled-select">
                <option>Select From Dropdown</option>
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
              >
                <option>Select From Dropdown</option>
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
              >
                <option>Select From Dropdown</option>
              </select>
            </div>
            <div className="settings-group">
              <label for="maximum-delivery-horizon">
                Maximum possible delivery horizon
              </label>
              <select id="maximum-delivery-horizon" className="styled-select">
                <option>Select From Dropdown</option>
              </select>
            </div>
          </section>
          <div className="actions">
            <button className="btn-cancel">Cancel</button>
            <button className="btn-apply">Apply</button>
          </div>
          <div style={{ margin: "2rem 0rem" }}>
            <h2>Dashboard permission settings</h2>
          </div>
          {/* <section className="settings-section2" id="dashboard">
            <div className="permissions-table">
              <div className="permissions-header">
                <span className="permission-type"></span>
                <span className="permission-role">Loading team</span>
                <span className="permission-role">Load planner</span>
                <span className="permission-role">Shipping coordinator</span>
                <span className="permission-role">Leadership team</span>
              </div>

              <div className="permissions-row">
                <span className="permission-type">CFR</span>
                <select>
                  <option>Select from Dropdown</option>
                  <option value="allowed">Allowed</option>
                  <option value="not_allowed">Not Allowed</option>
                </select>
                <select>
                  <option>Select from Dropdown</option>
                  <option value="allowed">Allowed</option>
                  <option value="not_allowed">Not Allowed</option>
                </select>
                <select>
                  <option>Select from Dropdown</option>
                  <option value="allowed">Allowed</option>
                  <option value="not_allowed">Not Allowed</option>
                </select>
                <select>
                  <option>Select from Dropdown</option>
                  <option value="allowed">Allowed</option>
                  <option value="not_allowed">Not Allowed</option>
                </select>
              </div>

              <div className="permissions-row">
                <span className="permission-type">One time rate</span>
                <select>
                  <option>Select from Dropdown</option>
                  <option value="allowed">Allowed</option>
                  <option value="not_allowed">Not Allowed</option>
                </select>
                <select>
                  <option>Select from Dropdown</option>
                  <option value="allowed">Allowed</option>
                  <option value="not_allowed">Not Allowed</option>
                </select>
                <select>
                  <option>Select from Dropdown</option>
                  <option value="allowed">Allowed</option>
                  <option value="not_allowed">Not Allowed</option>
                </select>
                <select>
                  <option>Select from Dropdown</option>
                  <option value="allowed">Allowed</option>
                  <option value="not_allowed">Not Allowed</option>
                </select>
              </div>

              <div className="permissions-row">
                <span className="permission-type">
                  Location Wise Performance
                </span>
                <select>
                  <option>Select from Dropdown</option>
                  <option value="allowed">Allowed</option>
                  <option value="not_allowed">Not Allowed</option>
                </select>
                <select>
                  <option>Select from Dropdown</option>
                  <option value="allowed">Allowed</option>
                  <option value="not_allowed">Not Allowed</option>
                </select>
                <select>
                  <option>Select from Dropdown</option>
                  <option value="allowed">Allowed</option>
                  <option value="not_allowed">Not Allowed</option>
                </select>
                <select>
                  <option>Select from Dropdown</option>
                  <option value="allowed">Allowed</option>
                  <option value="not_allowed">Not Allowed</option>
                </select>
              </div>

              <div className="permissions-row">
                <span className="permission-type">
                  Source Destination Combinations Loss
                </span>
                <select>
                  <option>Select from Dropdown</option>
                  <option value="allowed">Allowed</option>
                  <option value="not_allowed">Not Allowed</option>
                </select>
                <select>
                  <option>Select from Dropdown</option>
                  <option value="allowed">Allowed</option>
                  <option value="not_allowed">Not Allowed</option>
                </select>
                <select>
                  <option>Select from Dropdown</option>
                  <option value="allowed">Allowed</option>
                  <option value="not_allowed">Not Allowed</option>
                </select>
                <select>
                  <option>Select from Dropdown</option>
                  <option value="allowed">Allowed</option>
                  <option value="not_allowed">Not Allowed</option>
                </select>
              </div>

              <div className="permissions-row">
                <span className="permission-type">Planning volume loss</span>
                <select>
                  <option>Select from Dropdown</option>
                  <option value="allowed">Allowed</option>
                  <option value="not_allowed">Not Allowed</option>
                </select>
                <select>
                  <option>Select from Dropdown</option>
                  <option value="allowed">Allowed</option>
                  <option value="not_allowed">Not Allowed</option>
                </select>
                <select>
                  <option>Select from Dropdown</option>
                  <option value="allowed">Allowed</option>
                  <option value="not_allowed">Not Allowed</option>
                </select>
                <select>
                  <option>Select from Dropdown</option>
                  <option value="allowed">Allowed</option>
                  <option value="not_allowed">Not Allowed</option>
                </select>
              </div>
            </div>
          </section> */}
          <section
            style={{
              display: "flex",
              width: "100%",
            }}
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
                {permission.map((ele) => (
                  <select
                    name="Company_loader"
                    onChange={(e) =>
                      handleChange(ele, e.target.name, e.target.value)
                    }
                  >
                    <option disabled>Select from Dropdown</option>
                    <option value="not_allowed">Not Allowed</option>
                    <option value="allowed">Allowed</option>
                  </select>
                ))}
              </div>
              <div className="permissions-column">
                <h4>Load planner</h4>
                {permission.map((ele) => (
                  <select
                    name="Company_planner"
                    onChange={(e) =>
                      handleChange(ele, e.target.name, e.target.value)
                    }
                  >
                    <option disabled>Select from Dropdown</option>
                    <option value="not_allowed">Not Allowed</option>
                    <option value="allowed">Allowed</option>
                  </select>
                ))}
              </div>
              <div className="permissions-column">
                <h4>Shipping coordinator</h4>
                {permission.map((ele) => (
                  <select
                    name="Shipping coordinator"
                    onChange={(e) =>
                      handleChange(ele, e.target.name, e.target.value)
                    }
                  >
                    <option disabled>Select from Dropdown</option>
                    <option value="not_allowed">Not Allowed</option>
                    <option value="allowed">Allowed</option>
                  </select>
                ))}
              </div>
              <div className="permissions-column">
                <h4>Leadership team</h4>
                {permission.map((ele) => (
                  <select
                    name="Leadership team"
                    onChange={(e) =>
                      handleChange(ele, e.target.name, e.target.value)
                    }
                  >
                    <option disabled>Select from Dropdown</option>
                    <option value="not_allowed">Not Allowed</option>
                    <option value="allowed">Allowed</option>
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
        </main>
        <div>dfh</div>
      </div>
    </>
  );
};

export default Setting;
