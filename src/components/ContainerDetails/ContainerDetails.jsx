import React, { useEffect, useState } from "react";
import container_20 from "../../assests/container_20.png";
import container_40 from "../../assests/container_40.png";
import high_container_40 from "../../assests/high_container_40.png";
import "./ContainerDetails.css";

const ContainerDetails = () => {
  const truckSpecs = {
    "General Purpose container 20'": {
      length_container: 5900,
      width_container: 2352,
      height_container: 2393,
      max_weight: 32500,
      image: container_20,
    },
    "General Purpose container 40'": {
      length_container: 12032,
      width_container: 2352,
      height_container: 2393,
      max_weight: 26500,
      image: container_40,
    },
    "High - Cube General Purpose container 40'": {
      length_container: 12032,
      width_container: 2352,
      height_container: 2698,
      max_weight: 26500,
      image: high_container_40,
    },
  };
  const [totalContainers, setTotalContainers] = useState(1);
  const [containerTypes, setContainerTypes] = useState([
    Object.keys(truckSpecs)[0],
  ]);
  useEffect(() => {
    setContainerTypes((prevTypes) => [
      ...prevTypes.slice(0, totalContainers),
      ...Array(totalContainers - prevTypes.length).fill(
        Object.keys(truckSpecs)[0]
      ),
    ]);
  }, [totalContainers]);

  const handleContainerTypeChange = (index, value) => {
    const newTypes = [...containerTypes];
    newTypes[index] = value;
    setContainerTypes(newTypes);
  };

  //   const addContainer = () => {
  //     if (totalContainers < 2) {
  //       setTotalContainers(totalContainers + 1);
  //     }
  //   };

  return (
    <div>
      <div id="containerDetails" class="container-details-container">
        <label for="numContainers" class="num">
          Number of Containers:
        </label>
        <input
          type="number"
          id="numContainers"
          name="numContainers"
          min="1"
          max="2"
          value={totalContainers}
          class="num-containers-input"
        />
        <div id="typeInputs" class="container-types">
          {Array.from({ length: totalContainers }).map((_, index) => (
            <div key={index} className="container-row">
              <label
                htmlFor={`containerType${index + 1}`}
                className="container-type-label"
              >
                Type of Container {index + 1}:
              </label>
              <select
                name={`containerType${index + 1}`}
                required
                className="container-type-select"
                value={containerTypes[index]}
                onChange={(e) =>
                  handleContainerTypeChange(index, e.target.value)
                }
              >
                {Object.keys(truckSpecs).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <div className="container-info" style={{ textAlign: "center" }}>
                <img
                  id={`containerImage${index + 1}`}
                  src={truckSpecs[containerTypes[index]]?.image}
                  alt={`Container Image ${index + 1}`}
                  className="container-image"
                />
              </div>
              <label
                id={`containerDimensions${index + 1}`}
                className="container-dimensions-label"
              >
                Dimensions (LxWxH):{" "}
                {`${truckSpecs[containerTypes[index]]?.length_container} x ${
                  truckSpecs[containerTypes[index]]?.width_container
                } x ${truckSpecs[containerTypes[index]]?.height_container}`}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div class="button-container">
        <button
          type="button"
          class="btn-apply"
          id="AddContainer"
          style={{ marginRight: "1rem" }}
        >
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
  );
};

export default ContainerDetails;
