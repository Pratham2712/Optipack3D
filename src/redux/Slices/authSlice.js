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

export const checkEmailThunk = createAsyncThunk(
  "/check_email",
  async (data) => {
    try {
      const res = await axios.post(`${BASE_URL}/check_email`, data, {
        headers: {
          "Content-Type": "application/form-data",
        },
      });
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
export const sendOtpThunk = createAsyncThunk(
  "/send_otp_to_email",
  async (data) => {
    try {
      const res = await axios.post(`${BASE_URL}/send_otp_to_email`, data, {
        headers: {
          "Content-Type": "application/form-data",
        },
      });
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
export const verifyOtpThunk = createAsyncThunk("/verify_otp", async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/verify_otp`, data, {
      headers: {
        "Content-Type": "application/form-data",
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
});
export const verifyLoginThunk = createAsyncThunk(
  "/verify_login",
  async (data) => {
    try {
      const res = await axios.post(`${BASE_URL}/verify_login`, data, {
        headers: {
          "Content-Type": "application/form-data",
        },
      });
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
export const checkLoginThunk = createAsyncThunk("/check_login", async () => {
  try {
    const res = await axios.get(`${BASE_URL}/check_login`);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
});

const initialState = {
  loading: false,
  updateDone: false,
  isLogin: false,
  otpSend: false,
  errorData: {
    message: "",
    type: "",
    errors: [],
  },
  successMsg: "",
  isError: false,
  data: {
    user: {},
  },
  status: {
    signupThunk: IDLE,
    loginThunk: IDLE,
    sendOtpThunk: IDLE,
    verifyOtpThunk: IDLE,
    verifyLoginThunk: IDLE,
    checkEmailThunk: IDLE,
    checkLoginThunk: IDLE,
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
            break;
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
            break;
          default:
            break;
        }
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status.loginThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      })
      //sendOtpThunk==============================================================================================================
      .addCase(sendOtpThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(sendOtpThunk.fulfilled, (state, { payload }) => {
        switch (Object.keys(payload)[0]) {
          case SUCCESS:
            state.successMsg = "";
            state.otpSend = true;
            state.loading = false;
            state.successMsg = payload[SUCCESS];
            state.errorData.message = "";
            break;
          case ERROR:
            state.errorData.message = "";
            state.loading = false;
            state.isError = true;
            state.errorData.message = payload[ERROR];
            state.successMsg = "";
            state.otpSend = false;
            break;
          default:
            break;
        }
      })
      .addCase(sendOtpThunk.rejected, (state, action) => {
        state.status.sendOtpThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      })
      //verifyOtpThunk==============================================================================================================
      .addCase(verifyOtpThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(verifyOtpThunk.fulfilled, (state, { payload }) => {
        switch (Object.keys(payload)[0]) {
          case SUCCESS:
            state.successMsg = "";
            state.loading = false;
            state.successMsg = payload[SUCCESS]?.message;
            state.errorData.message = "";
            state.isLogin = true;
            state.data.user = payload[SUCCESS];
            break;
          case ERROR:
            state.errorData.message = "";
            state.loading = false;
            state.isError = true;
            state.errorData.message = payload[ERROR];
            state.successMsg = "";
            break;
          default:
            break;
        }
      })
      .addCase(verifyOtpThunk.rejected, (state, action) => {
        state.status.verifyOtpThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      })
      //verifyLoginThunk==============================================================================================================
      .addCase(verifyLoginThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(verifyLoginThunk.fulfilled, (state, { payload }) => {
        switch (Object.keys(payload)[0]) {
          case SUCCESS:
            state.successMsg = "";
            state.loading = false;
            state.successMsg = payload[SUCCESS]?.message;
            state.errorData.message = "";
            state.isLogin = true;
            state.data.user = payload[SUCCESS];
            break;
          case ERROR:
            state.errorData.message = "";
            state.loading = false;
            state.isError = true;
            state.errorData.message = payload[ERROR];
            state.successMsg = "";
            break;
          default:
            break;
        }
      })
      .addCase(verifyLoginThunk.rejected, (state, action) => {
        state.status.verifyLoginThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      })
      //checkEmailThunk==============================================================================================================
      .addCase(checkEmailThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(checkEmailThunk.fulfilled, (state, { payload }) => {
        switch (Object.keys(payload)[0]) {
          case SUCCESS:
            state.successMsg = "";
            state.loading = false;
            state.successMsg = payload[SUCCESS];
            state.errorData.message = "";
            break;
          case ERROR:
            state.errorData.message = "";
            state.loading = false;
            state.isError = true;
            state.errorData.message = payload[ERROR];
            state.successMsg = "";
            break;
          default:
            break;
        }
      })
      .addCase(checkEmailThunk.rejected, (state, action) => {
        state.status.checkEmailThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      })
      //checkLoginThunk==============================================================================================================
      .addCase(checkLoginThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(checkLoginThunk.fulfilled, (state, { payload }) => {
        switch (Object.keys(payload)[0]) {
          case SUCCESS:
            state.successMsg = "";
            state.loading = false;
            state.successMsg = payload[SUCCESS]?.message;
            state.data.user = payload[SUCCESS];
            state.errorData.message = "";
            state.isLogin = true;
            break;
          case ERROR:
            state.errorData.message = "";
            state.loading = false;
            state.isError = true;
            state.errorData.message = payload[ERROR];
            state.successMsg = "";
            state.isLogin = false;
            break;
          default:
            break;
        }
      })
      .addCase(checkLoginThunk.rejected, (state, action) => {
        state.status.checkLoginThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      });
  },
});

export default authSlice.reducer;
export const { clearErrorSlice } = authSlice.actions;
