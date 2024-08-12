import { combineReducers, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({});

export default configureStore({
  reducer: {
    rootReducer: rootReducer,
  },
});
