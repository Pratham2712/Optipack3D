import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL, ERROR, IDLE, SUCCESS } from "../../constants/constants";
import axios from "axios";

axios.defaults.withCredentials = true;

export const permissionThunk = createAsyncThunk(
  "/add_permission",
  async (data) => {
    try {
      const res = await axios.post(`${BASE_URL}/add_permission`, data);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
export const getPermissionThunk = createAsyncThunk(
  "/get_permissions",
  async () => {
    try {
      const res = await axios.get(`${BASE_URL}/get_permissions`);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const loadPlanThunk = createAsyncThunk("/add_loadplan", async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/add_loadplan`, data);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
});

export const getLoadPlanThunk = createAsyncThunk("/get_loadplan", async () => {
  try {
    const res = await axios.get(`${BASE_URL}/get_loadplan`);
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
  successMsg: "",
  isError: false,
  data: {
    permission: [],
    loadplan: {},
  },
  status: {
    permissionThunk: IDLE,
    getPermissionThunk: IDLE,
    loadPlanThunk: IDLE,
    getLoadPlanThunk: IDLE,
  },
};

const companyAdminSlice = createSlice({
  name: "companyAdminSlice",
  initialState: initialState,
  reducers: {
    clearErrorSlice: (state, action) => {
      state.isError = false;
      state.errorData = {};
    },
  },
  extraReducers: (builders) => {
    builders
      .addCase(permissionThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(permissionThunk.fulfilled, (state, { payload }) => {
        switch (Object.keys(payload)[0]) {
          case SUCCESS:
            state.loading = false;
            state.successMsg = payload[SUCCESS]?.message;
            state.data.permission = payload[SUCCESS];
            state.updateDone = !state.updateDone;
            break;
          case ERROR:
            state.loading = false;
            state.isError = true;
            state.errorData.message = payload[ERROR];
            break;
          default:
            break;
        }
      })
      .addCase(permissionThunk.rejected, (state, action) => {
        state.status.permissionThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      })
      //getPermissionThunk==========================================================================================================
      .addCase(getPermissionThunk.pending, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(getPermissionThunk.fulfilled, (state, { payload }) => {
        switch (Object.keys(payload)[0]) {
          case SUCCESS:
            state.loading = false;
            state.successMsg = payload[SUCCESS]?.message;
            state.data.permission = payload[SUCCESS];
            state.updateDone = !state.updateDone;
            break;
          case ERROR:
            state.loading = false;
            state.isError = true;
            state.errorData.message = payload[ERROR];
            break;
          default:
            break;
        }
      })
      .addCase(getPermissionThunk.rejected, (state, action) => {
        state.status.getPermissionThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      })
      //loadPlanThunk=====================================================================================================
      .addCase(loadPlanThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(loadPlanThunk.fulfilled, (state, { payload }) => {
        switch (Object.keys(payload)[0]) {
          case SUCCESS:
            state.loading = false;
            state.successMsg = payload[SUCCESS]?.message;
            state.data.loadplan = payload[SUCCESS];
            state.updateDone = !state.updateDone;
            break;
          case ERROR:
            state.loading = false;
            state.isError = true;
            state.errorData.message = payload[ERROR];
            break;
          default:
            break;
        }
      })
      .addCase(loadPlanThunk.rejected, (state, action) => {
        state.status.loadPlanThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      })
      //getLoadPlanThunk==========================================================================================================
      .addCase(getLoadPlanThunk.pending, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(getLoadPlanThunk.fulfilled, (state, { payload }) => {
        switch (Object.keys(payload)[0]) {
          case SUCCESS:
            state.loading = false;
            state.successMsg = payload[SUCCESS]?.message;
            state.data.loadplan = payload[SUCCESS];
            state.updateDone = !state.updateDone;
            break;
          case ERROR:
            state.loading = false;
            state.isError = true;
            state.errorData.message = payload[ERROR];
            break;
          default:
            break;
        }
      })
      .addCase(getLoadPlanThunk.rejected, (state, action) => {
        state.status.getLoadPlanThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      });
  },
});

export default companyAdminSlice.reducer;
export const { clearErrorSlice } = companyAdminSlice.actions;
