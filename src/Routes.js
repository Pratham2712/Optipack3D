import React from "react";
import { Route, Routes } from "react-router-dom";
import {
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

const Routess = () => {
  return (
    <Routes>
      <Route path={User_root} element={<Home />}></Route>
      <Route path={free_trail} element={<FreeTrail />}></Route>
      <Route path={free_output} element={<FreeOutput />}></Route>
      <Route path={join} element={<Join />}></Route>
      <Route path={loginurl} element={<Login />}></Route>
      <Route path={signupurl} element={<Signup />}></Route>
    </Routes>
  );
};

export default Routess;
