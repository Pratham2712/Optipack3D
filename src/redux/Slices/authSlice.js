import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL, ERROR, IDLE, SUCCESS } from "../../constants/constants";
import axios from "axios";

axios.defaults.withCredentials = true;

export const signupThunk = createAsyncThunk(
  "/additionalInformationJson",
  async (data) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/additionalInformationJson`,
        data,
        {
          headers: {
            "Content-Type": "application/form-data",
          },
        }
      );
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
export const loginThunk = createAsyncThunk("/loginJson", async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/loginJson`, data, {
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
  isLogin: false,
  errorData: {
    message: "",
    type: "",
    errors: [],
  },
  successMsg: "",
  isError: false,
  data: {
    data: {},
  },
  status: {
    signupThunk: IDLE,
    loginThunk: IDLE,
  },
};

const authSlice = createSlice({
  name: "authSlice",
  initialState: initialState,
  reducers: {
    clearErrorSlice: (state, action) => {
      state.isError = false;
      state.errorData = {};
    },
  },
  extraReducers: (builders) => {
    builders
      .addCase(signupThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(signupThunk.fulfilled, (state, { payload }) => {
        switch (Object.keys(payload)[0]) {
          case SUCCESS:
            state.isLogin = true;
            state.loading = false;
            state.successMsg = payload[SUCCESS];
            break;
          case ERROR:
            state.isLogin = false;
            state.loading = false;
            state.isError = true;
            state.errorData.message = payload[ERROR];
          default:
            break;
        }
      })
      .addCase(signupThunk.rejected, (state, action) => {
        state.status.signupThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      })
      //loginThunk==============================================================================================================
      .addCase(loginThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        switch (Object.keys(payload)[0]) {
          case SUCCESS:
            state.isLogin = true;
            state.loading = false;
            state.successMsg = payload[SUCCESS];
            break;
          case ERROR:
            state.isLogin = false;
            state.loading = false;
            state.isError = true;
            state.errorData.message = payload[ERROR];
          default:
            break;
        }
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status.loginThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      });
  },
});

export default authSlice.reducer;
export const { clearErrorSlice } = authSlice.actions;
