import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AuthRoutes, UnAuthRoutes } from "./Routes";
import { useLayoutEffect, useState } from "react";
import { autoFillerBox } from "./Util/data";
import { checkLoginThunk } from "./redux/Slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./components/Loader/Loader";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const isAuthenticated = useSelector(
    (state) => state.rootReducer.authSlice.isLogin
  );
  const loading = useSelector(
    (state) => state.rootReducer.authSlice.initialLoad
  );
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState([0, 1, 2]);
  const [colors, setColors] = useState([
    "rgba(244, 67, 54, 1)", // Color 1
    "rgba(76, 175, 80, 1)", // Color 2
    "rgba(33, 150, 243, 1)", // Color 3
  ]);
  const [skuData, setSkuData] = useState({
    numTypes: inputs.length,
    totalContainers: 1,
    numContainers0: 1,
    containerType0: "General Purpose container 20'",
    color0: colors[0],
    color1: colors[1],
    color2: colors[2],
    sku0: "Box1",
    sku1: "Box2",
    sku2: "Box3",
    grossWeight0: autoFillerBox[0]["Gross Weight"],
    grossWeight1: autoFillerBox[1]["Gross Weight"],
    grossWeight2: autoFillerBox[2]["Gross Weight"],
    length0: autoFillerBox[0].Length,
    length1: autoFillerBox[1].Length,
    length2: autoFillerBox[2].Length,
    width0: autoFillerBox[0].Width,
    width1: autoFillerBox[1].Width,
    width2: autoFillerBox[2].Width,
    height0: autoFillerBox[0].Height,
    height1: autoFillerBox[1].Height,
    height2: autoFillerBox[2].Height,
    numberOfCases0: autoFillerBox[0]["Number of Cases"],
    numberOfCases1: autoFillerBox[1]["Number of Cases"],
    numberOfCases2: autoFillerBox[2]["Number of Cases"],
    volume0: autoFillerBox[0].Volume,
    volume1: autoFillerBox[1].Volume,
    volume2: autoFillerBox[2].Volume,
    // temperature0: autoFillerBox[0].Temperature,
    // temperature1: autoFillerBox[1].Temperature,
    // temperature2: autoFillerBox[2].Temperature,
    // netWeight0: autoFillerBox[0]["Net Weight"],
    // netWeight1: autoFillerBox[1]["Net Weight"],
    // netWeight2: autoFillerBox[2]["Net Weight"],
    rotationAllowed0: autoFillerBox[0]["Rotation Allowed"] === 1 ? "on" : "off",
    rotationAllowed1: autoFillerBox[1]["Rotation Allowed"] === 1 ? "on" : "off",
    rotationAllowed2: autoFillerBox[2]["Rotation Allowed"] === 1 ? "on" : "off",
  });

  useLayoutEffect(() => {
    dispatch(checkLoginThunk());
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Toaster />
      <div className="App">
        {isAuthenticated ? (
          <AuthRoutes
            skuData={skuData}
            setSkuData={setSkuData}
            inputs={inputs}
            setInputs={setInputs}
          />
        ) : (
          <UnAuthRoutes
            skuData={skuData}
            setSkuData={setSkuData}
            inputs={inputs}
            setInputs={setInputs}
          />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
