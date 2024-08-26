import { combineReducers, configureStore } from "@reduxjs/toolkit";
import mainSlice from "../Slices/mainSlice";

const rootReducer = combineReducers({
  mainSlice: mainSlice,
});

export default configureStore({
  reducer: {
    rootReducer: rootReducer,
  },
});
