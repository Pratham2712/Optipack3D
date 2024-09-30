import { combineReducers, configureStore } from "@reduxjs/toolkit";
import mainSlice from "../Slices/mainSlice";
import authSlice from "../Slices/authSlice";
import companyAdminSlice from "../Slices/companyAdminSlice";
import plannerSlice from "../Slices/plannerSlice";

const rootReducer = combineReducers({
  mainSlice: mainSlice,
  authSlice: authSlice,
  companyAdminSlice: companyAdminSlice,
  plannerSlice: plannerSlice,
});

export default configureStore({
  reducer: {
    rootReducer: rootReducer,
  },
});
