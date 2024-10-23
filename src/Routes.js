import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  admin_manageuser,
  admin_setting,
  free_output,
  free_trail,
  join,
  loginurl,
  new_user,
  planner_contSelection,
  planner_order,
  planner_skuSelection,
  signupurl,
  User_root,
} from "./constants/links";
import FreeTrail from "./pages/FreeTrail/FreeTrail";
import Home from "./pages/Home/Home";
import Join from "./pages/Join/Join";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import FreeOutput from "./pages/FreeOutput/FreeOutput";
import Setting from "./pages/admin/AdminSetting/Setting";
import ManageUser from "./pages/admin/ManageUser/ManageUser";
import PlannerOrder from "./pages/planner/order/PlannerOrder";
import SkuSelect from "./pages/planner/SkuSelect/SkuSelect";
import NextOrder from "./pages/planner/NextOrder/NextOrder";
import { useSelector } from "react-redux";
import NoneUser from "./pages/NoneUser/NoneUser";

export const UnAuthRoutes = ({ skuData, setSkuData, inputs, setInputs }) => {
  return (
    <Routes>
      <Route path={User_root} element={<Home />}></Route>
      <Route
        path={free_trail}
        element={
          <FreeTrail
            skuData={skuData}
            setSkuData={setSkuData}
            inputs={inputs}
            setInputs={setInputs}
          />
        }
      ></Route>
      <Route path={free_output} element={<FreeOutput />}></Route>
      <Route path={join} element={<Join />}></Route>
      <Route path={loginurl} element={<Login />}></Route>
      <Route path={signupurl} element={<Signup />}></Route>
      <Route path={"*"} element={<Navigate to="/" />}></Route>
    </Routes>
  );
};

export const AuthRoutes = ({
  skuData,
  setSkuData,
  inputs,
  setInputs,
  containerQuan,
  setContainerQuan,
}) => {
  //useSelector=================================================================================================================
  const userType = useSelector(
    (state) => state.rootReducer.authSlice.data.user.userType
  );
  return (
    <Routes>
      <Route path={User_root} element={<Home />}></Route>
      <Route
        path={free_trail}
        element={
          <FreeTrail
            skuData={skuData}
            setSkuData={setSkuData}
            inputs={inputs}
            setInputs={setInputs}
          />
        }
      ></Route>
      <Route
        path={free_output}
        element={<FreeOutput containerQuan={containerQuan} />}
      ></Route>
      <Route path={join} element={<Join />}></Route>
      <Route path={loginurl} element={<Login />}></Route>
      <Route path={signupurl} element={<Signup />}></Route>
      <Route path={new_user} element={<NoneUser />}></Route>
      {/* admin ====================================================================================================== */}
      {userType == "Company_Admin" ? (
        <>
          <Route path={admin_setting} element={<Setting />}></Route>
          <Route path={admin_manageuser} element={<ManageUser />}></Route>
        </>
      ) : (
        <Route path="*" element={<Navigate to={User_root} replace />} />
      )}

      {/* planner=============================================================================================================== */}
      {userType == "Company_Admin" || userType == "Company_planner" ? (
        <>
          <Route path={planner_order} element={<PlannerOrder />}></Route>
          <Route path={planner_skuSelection} element={<SkuSelect />}></Route>
          <Route
            path={planner_contSelection}
            element={
              <NextOrder
                setContainerQuan={setContainerQuan}
                containerQuan={containerQuan}
              />
            }
          ></Route>
        </>
      ) : (
        <Route path="*" element={<Navigate to={User_root} replace />} />
      )}
    </Routes>
  );
};
