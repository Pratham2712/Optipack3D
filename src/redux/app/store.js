import { combineReducers, configureStore } from "@reduxjs/toolkit";
import mainSlice from "../Slices/mainSlice";
import authSlice from "../Slices/authSlice";
import companyAdminSlice from "../Slices/companyAdminSlice";

const rootReducer = combineReducers({
  mainSlice: mainSlice,
  authSlice: authSlice,
  companyAdminSlice: companyAdminSlice,
});

export default configureStore({
  reducer: {
    rootReducer: rootReducer,
  },
});
