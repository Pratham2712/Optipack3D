import { Autocomplete, Chip, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  assignLoadplanThunk,
  getLoaderThunk,
} from "../../redux/Slices/plannerSlice";
import toast from "react-hot-toast";

const AssignPopup = ({ assignPopup, setAssignPopup }) => {
  const popupRef = useRef(null);
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState([]);
  const loader = useSelector(
    (state) => state.rootReducer.plannerSlice.data.loaderUser
  );
  const plan_id = useSelector(
    (state) => state.rootReducer.plannerSlice.data.loadplanId
  );

  const handleChange = (event, newValue) => {
    setSelectedUser((prev) => {
      if (!prev.includes(newValue)) {
        return [...prev, newValue];
      }
    });
  };
  const assignLoadplan = () => {
    const data = {
      plan_id: plan_id,
      assigned_users: selectedUser.flat(),
    };
    dispatch(assignLoadplanThunk(data)).then((data) => {
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
        setAssignPopup(false);
      }
    });
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
              onClick={assignLoadplan}
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
