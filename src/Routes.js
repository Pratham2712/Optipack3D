import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { free_output, free_trail, User_root } from "./constants/links";
import FreeTrail from "./pages/FreeTrail/FreeTrail";
import FreeOutput from "./pages/FreeOutput";
import Home from "./pages/Home/Home";

const Routess = () => {
  return (
    <Routes>
      <Route path={User_root} element={<Home />}></Route>
      <Route path={free_trail} element={<FreeTrail />}></Route>
      <Route path={free_output} element={<FreeOutput />}></Route>
    </Routes>
  );
};

export default Routess;
