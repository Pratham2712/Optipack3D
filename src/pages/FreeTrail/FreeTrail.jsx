import React, { useState } from "react";
import "./FreeTrail.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import unlock from "../../assests/unlock.png";
import lock from "../../assests/lock.png";
import DimensionInput from "../../components/DimensionInput/DimensionInput";

const FreeTrail = () => {
  const [showInput, setShowInput] = useState(false);

  return (
    <div>
      <Breadcrumb />
      <Sidebar />
      <div className="container-form">
        <h1>Container Builder (Trial Version)</h1>
        <form>
          <button
            type="button"
            className="collapsible"
            id="addLoadDetailsButton"
            onClick={() => {
              setShowInput(!showInput);
            }}
          >
            Add load details
            <img
              src={unlock}
              alt="Lock Icon"
              id="addLoadDetailsIcon"
              className="icon"
            />
          </button>
          <div class="content">
            <input type="hidden" id="numTypes" name="numTypes" value="3" />

            {/* <!-- Prefilled SKUs will be generated here --> */}
            {showInput && <DimensionInput />}
          </div>
          <button type="button" class="collapsible" id="addContainerDetails">
            Add Container details
            <img
              src={lock}
              alt="Lock Icon"
              id="addContainerDetailsIcon"
              class="icon"
            />
          </button>
          <div class="content">
            <div id="containerDetails" class="container-details-container">
              <input
                type="hidden"
                id="totalContainers"
                name="totalContainers"
                value="1"
              />
              <label for="numContainers" class="num">
                Number of Containers:
              </label>
              <input
                type="number"
                id="numContainers"
                name="numContainers"
                min="1"
                max="2"
                value="1"
                class="num-containers-input"
              />
              <div id="typeInputs" class="container-types">
                {/* <!-- Dynamic inputs for the container type will be generated here --> */}
              </div>
            </div>
            <div class="button-container">
              <button type="button" class="btn-apply" id="AddContainer">
                Add Container
              </button>
              <button
                type="button"
                class="btn-apply"
                onclick="finishLoadingContainer()"
              >
                Submit
              </button>
            </div>
          </div>

          <button type="button" class="collapsible" id="optimizeButton">
            Add Optimization constraints
            <img src={lock} alt="Lock Icon" class="icon" />
          </button>
          <div class="content">
            {/* <!-- Add optimization constraints content here if needed --> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default FreeTrail;
