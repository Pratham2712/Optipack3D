import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  admin_manageuser,
  admin_setting,
  contact_us,
  free_output,
  free_trail,
  join,
  loginurl,
  new_user,
  planner_contSelection,
  planner_order,
  planner_skuSelection,
  privacy_policy,
  set_password,
  signupurl,
  stagewise_loading,
  term_condition,
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
import TermsNConditon from "./pages/TermsNCondition/TermsNConditon";
import Privacy from "./pages/Privacy/Privacy";
import StageLoading from "./pages/StageLoading/StageLoading";
import SetPassword from "./pages/SetPassword/SetPassword";
import Contact from "./pages/Contact/Contact";

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
      <Route path={set_password} element={<SetPassword />}></Route>
      <Route path={term_condition} element={<TermsNConditon />}></Route>
      <Route path={privacy_policy} element={<Privacy />}></Route>
      <Route path={contact_us} element={<Contact />}></Route>
      <Route path={stagewise_loading} element={<StageLoading />}></Route>
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
  const isPassword = useSelector(
    (state) => state.rootReducer.authSlice.data.user.isPassword
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

      {isPassword == false ? (
        <>
          <Route path={set_password} element={<SetPassword />}></Route>
        </>
      ) : (
        <Route path="*" element={<Navigate to={User_root} replace />} />
      )}

      <Route path={new_user} element={<NoneUser />}></Route>
      <Route path={term_condition} element={<TermsNConditon />}></Route>
      <Route path={privacy_policy} element={<Privacy />}></Route>
      <Route path={stagewise_loading} element={<StageLoading />}></Route>
      <Route path={contact_us} element={<Contact />}></Route>
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
