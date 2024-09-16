import React, { useEffect, useState } from "react";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import Sidebar from "../../../components/Sidebar/Sidebar";

const Setting = () => {
  const [is700, setIs700] = useState(window.innerWidth < 700);

  useEffect(() => {
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
      <Breadcrumb />
      {!is700 ? <Sidebar className="hide-sidebar" /> : <></>}

      <div className="container">
        <main id="settingsForm">
          <section className="settings-header-head">
            <h2>User Based Settings</h2>
            <div className="actions-head">
              <a className="btn-cancel">Add Users</a>
              <a href="" className="btn-apply">
                Manage Users
              </a>
            </div>
          </section>
          <section className="settings-header">
            <h2>Order and load plan based settings</h2>
            <div className="actions">
              <button className="btn-cancel">Cancel</button>
              <button className="btn-apply">Apply</button>
            </div>
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
          <section className="settings-section" id="dashboard">
            <h2>Dashboard permission settings</h2>
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
          </section>
        </main>
        <div>dfh</div>
      </div>
    </>
  );
};

export default Setting;
