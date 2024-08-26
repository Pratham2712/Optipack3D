import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  BASE_URL,
  SUCCESS,
  ERROR,
  IDLE,
  FULFILLED,
} from "../../constants/constants";
import axios from "axios";

axios.defaults.withCredentials = true;

export const getDataThunk = createAsyncThunk("/freeOutput", async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/freeOutput`, data, {
      headers: {
        "Content-Type": "application/form-data",
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
});

const initialState = {
  loading: false,
  updateDone: false,
  errorData: {
    message: "",
    type: "",
    errors: [],
  },
  isError: false,
  data: {
    data: {},
  },
  status: {
    getDataThunk: IDLE,
  },
};

const mainSlice = createSlice({
  name: "mainSlice",
  initialState: initialState,
  reducers: {
    clearErrorSlice: (state, action) => {
      state.isError = false;
      state.errorData = {};
    },
  },
  extraReducers: (builders) => {
    builders
      .addCase(getDataThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(getDataThunk.fulfilled, (state, { payload }) => {
        console.log("suces", payload);
        if (payload) {
          state.data.data = payload;
          state.loading = false;
          state.status.getDataThunk = FULFILLED;
        } else {
          state.loading = false;
        }
      })
      .addCase(getDataThunk.rejected, (state, action) => {
        state.status.getDataThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      });
  },
});

export default mainSlice.reducer;
export const { clearErrorSlice } = mainSlice.actions;
