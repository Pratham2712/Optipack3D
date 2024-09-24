import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import Loader from "../../../components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsersThunk,
  getUsertypeThunk,
} from "../../../redux/Slices/companyAdminSlice";
import "./ManageUser.css";
const ManageUser = () => {
  const [is700, setIs700] = useState(window.innerWidth < 700);
  const dispatch = useDispatch();

  const heading = [
    "Email",
    "User type",
    "Status",
    "Last Visited",
    "Date Added",
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
          <Breadcrumb />
          {!is700 ? <Sidebar className="hide-sidebar" /> : <></>}
          <main className="container-form">
            <h1>Registered users</h1>
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
                        <select>
                          <option selected={ele?.user_type == "None"}>
                            Select user type
                          </option>
                          {ele?.user_type != "Company_Admin" ? (
                            userType?.map((data) => (
                              <option value={ele?.user_type}>{data}</option>
                            ))
                          ) : (
                            <option
                              selected={ele?.user_type == "Company_Admin"}
                            >
                              Admin
                            </option>
                          )}
                        </select>
                      </div>
                    </td>
                    <td>
                      <div>{ele?.user_status}</div>
                    </td>
                    <td>
                      <div>{ele?.last_login ? ele?.last_login : "Never"}</div>
                    </td>
                    <td>
                      <div>{ele?.first_login}</div>
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
