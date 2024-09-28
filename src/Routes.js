import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  admin_manageuser,
  admin_setting,
  free_output,
  free_trail,
  join,
  loginurl,
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

export const AuthRoutes = ({ skuData, setSkuData, inputs, setInputs }) => {
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
      {/* admin ====================================================================================================== */}
      <Route path={admin_setting} element={<Setting />}></Route>
      <Route path={admin_manageuser} element={<ManageUser />}></Route>
    </Routes>
  );
};
