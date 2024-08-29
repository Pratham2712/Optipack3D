import { combineReducers, configureStore } from "@reduxjs/toolkit";
import mainSlice from "../Slices/mainSlice";
import authSlice from "../Slices/authSlice";

const rootReducer = combineReducers({
  mainSlice: mainSlice,
  authSlice: authSlice,
});

export default configureStore({
  reducer: {
    rootReducer: rootReducer,
  },
});
