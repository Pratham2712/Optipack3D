import React, { useState } from "react";
import "./FreeTrail.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import unlock from "../../assests/unlock.png";
import lock from "../../assests/lock.png";
import tick from "../../assests/tick.png";
import DimensionInput from "../../components/DimensionInput/DimensionInput";
import ContainerDetails from "../../components/ContainerDetails/ContainerDetails";

const FreeTrail = () => {
  const [showInput, setShowInput] = useState(false);
  const [inputSuccess, setInputSuccess] = useState(false);
  const [showCont, setShowCont] = useState(false);
  console.log(inputSuccess);

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
            style={{ background: inputSuccess ? "#CFFBBF" : "" }}
          >
            Add load details
            <img
              src={inputSuccess ? tick : unlock}
              alt="Lock Icon"
              id="addLoadDetailsIcon"
              className="icon"
            />
          </button>
          <div class="content">
            <input type="hidden" id="numTypes" name="numTypes" value="3" />

            {/* <!-- Prefilled SKUs will be generated here --> */}
            {showInput && (
              <DimensionInput
                inputSuccess={inputSuccess}
                setInputSuccess={setInputSuccess}
              />
            )}
          </div>
          <button
            type="button"
            className="collapsible"
            id="addContainerDetails"
            onClick={() => {
              setShowCont(!showCont);
            }}
          >
            Add Container details
            <img
              src={inputSuccess ? unlock : lock}
              alt="Lock Icon"
              id="addContainerDetailsIcon"
              className="icon"
            />
          </button>
          <div class="content">
            {inputSuccess && showCont && <ContainerDetails />}
          </div>

          <button type="button" className="collapsible" id="optimizeButton">
            Add Optimization constraints
            <img src={lock} alt="Lock Icon" className="icon" />
          </button>
          <div class="content">
            {/* <!-- Add optimization constraints content here if needed --> */}
          </div>
          <div className="optimize">
            <button type="submit" id="final" className="btn-apply">
              Optimize
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FreeTrail;
