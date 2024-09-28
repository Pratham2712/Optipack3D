import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import Loader from "../../../components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsersThunk,
  getUsertypeThunk,
  removeUserThunk,
  updateUserTypeThunk,
} from "../../../redux/Slices/companyAdminSlice";
import "./ManageUser.css";
import toast from "react-hot-toast";
import ConfirmPopup from "../../../AdminComponents/ConfirmPopup/ConfirmPopup";
import AddUser from "../../../AdminComponents/AddUser/AddUser";

const ManageUser = () => {
  const [is700, setIs700] = useState(window.innerWidth < 700);
  const [confirm, setConfirm] = useState(false);
  const [userData, setUserData] = useState({});
  const [user, setUser] = useState(false);

  const dispatch = useDispatch();

  const heading = [
    "Email",
    "Role",
    "Status",
    "Last Visited",
    "Date Added",
    "Remove",
  ];

  //useSelector====================================================================================================================
  const loading = useSelector(
    (state) => state.rootReducer.companyAdminSlice.loading
  );

  const users = useSelector(
    (state) => state.rootReducer.companyAdminSlice.data.users
  );
  const userType = useSelector(
    (state) => state.rootReducer.companyAdminSlice.data.userType
  );
  const loginUser = useSelector(
    (state) => state.rootReducer.authSlice.data.user
  );

  //function ==================================================================================================================
  const formatDate = (date) => {
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      // second: "2-digit",
      hour12: true, // for 12-hour format, set to false for 24-hour format
    });
    return formattedDate;
  };
  const updateRole = (user, user_type) => {
    const data = {
      email: user.email_id,
      userType: user_type,
    };
    dispatch(updateUserTypeThunk(data)).then((data) => {
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
        dispatch(getAllUsersThunk());
      }
    });
  };
  const removeUser = () => {
    const data = {
      email: userData.email_id,
    };
    dispatch(removeUserThunk(data)).then((data) => {
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
        dispatch(getAllUsersThunk());
      }
    });
    setConfirm(false);
  };
  //useEffect=====================================================================================================================
  useEffect(() => {
    const handleResize = () => {
      setIs700(window.innerWidth < 700);
    };
    window.addEventListener("resize", handleResize);
    dispatch(getAllUsersThunk());
    dispatch(getUsertypeThunk());
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
          {confirm ? (
            <ConfirmPopup
              confirm={confirm}
              setConfirm={setConfirm}
              message={"remove user"}
              removeUser={removeUser}
            />
          ) : (
            <></>
          )}
          <Breadcrumb />
          {!is700 ? <Sidebar className="hide-sidebar" /> : <></>}
          {user ? <AddUser setUser={setUser} user={user} /> : ""}
          <main className="container-form">
            <h1>Registered users</h1>
            <a
              className="btn-cancel"
              style={{
                marginBottom: "2rem",
                display: "inline-block",
              }}
              onClick={() => setUser(true)}
            >
              Add Users
            </a>
            <div className="user-content">
              <table>
                <tr className="user-head">
                  {heading.map((ele) => (
                    <th>
                      <h4>{ele}</h4>
                    </th>
                  ))}
                </tr>
                {users?.map((ele) => (
                  <tr>
                    <td>
                      <h4>{ele?.email_id}</h4>
                    </td>
                    <td>
                      <div>
                        <select
                          className="select"
                          id="select-box1"
                          onChange={(e) => updateRole(ele, e.target.value)}
                        >
                          <option
                            value=""
                            selected={ele?.user_type == "None"}
                            disabled
                          >
                            Select user type
                          </option>

                          {loginUser?.userType == "Company_Admin" &&
                          ele?.email_id === loginUser?.email ? (
                            <option>Admin</option>
                          ) : (
                            userType?.map((data) => (
                              <option selected={ele?.user_type == data}>
                                {data}
                              </option>
                            ))
                          )}
                        </select>
                      </div>
                    </td>
                    <td>
                      <div>{ele?.user_status}</div>
                    </td>
                    <td>
                      <div>
                        {ele?.last_login
                          ? formatDate(ele?.last_login)
                          : "Never"}
                      </div>
                    </td>
                    <td>
                      <div>{formatDate(ele?.first_login)}</div>
                    </td>
                    <td>
                      <div>
                        <button
                          className="btn-apply"
                          onClick={() => {
                            setConfirm(true);
                            setUserData(ele);
                          }}
                          disabled={
                            loginUser?.userType == "Company_Admin" &&
                            ele?.email_id === loginUser?.email
                              ? true
                              : false
                          }
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default ManageUser;
