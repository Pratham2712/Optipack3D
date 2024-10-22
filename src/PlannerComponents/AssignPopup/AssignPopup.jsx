import { Autocomplete, Chip, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoaderThunk } from "../../redux/Slices/plannerSlice";

const AssignPopup = ({ assignPopup, setAssignPopup }) => {
  const popupRef = useRef(null);
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState([]);
  const loader = useSelector(
    (state) => state.rootReducer.plannerSlice.data.loaderUser
  );

  const handleChange = (event, newValue) => {
    setSelectedUser((prev) => [...prev, newValue]);
  };
  //useEffect====================================================================================================
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.tagName.toLowerCase() === "li") {
        return; // Do nothing if <li> is clicked
      }

      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setAssignPopup(false);
      }
    };

    if (assignPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setAssignPopup, assignPopup]);
  useEffect(() => {
    dispatch(getLoaderThunk());
  }, []);
  return (
    <div id="popup" className="popup-overlay">
      <div className="popup-user-content" ref={popupRef}>
        <div className="popup-input-text">
          <h2>Assign loadplan</h2>
          <Autocomplete
            multiple
            id="tags-filled"
            options={loader?.map((ele) => ele.email_id)}
            freeSolo
            onChange={handleChange}
            renderTags={(value, getTagProps) =>
              value.map((ele, index) => {
                const { key, ...tagProps } = getTagProps({ index });
                return (
                  <Chip
                    variant="outlined"
                    label={ele}
                    key={key}
                    {...tagProps}
                  />
                );
              })
            }
            renderInput={(params) => (
              <TextField
                sx={{ padding: "0" }}
                {...params}
                variant="filled"
                // label="Add Cities"
                placeholder="select loaders"
              />
            )}
          />
          <div className="popup-buttons">
            <button
              className="btn-apply"
              style={{ textDecoration: "none" }}
              //   onClick={submitLoadPlan}
            >
              Assign
            </button>
            <button
              className="btn-cancel"
              style={{ textDecoration: "none" }}
              onClick={() => setAssignPopup(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignPopup;
