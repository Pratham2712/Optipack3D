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

export const addContainerThunk = createAsyncThunk(
  "/add_container",
  async (data) => {
    try {
      const res = await axios.post(`${BASE_URL}/add_container`, data);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const getContainerThunk = createAsyncThunk(
  "/get_container",
  async () => {
    try {
      const res = await axios.get(`${BASE_URL}/get_container`);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const sendEmailThunk = createAsyncThunk("/send_email", async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/send_email`, data);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
});

export const getAllUsersThunk = createAsyncThunk("/get_allusers", async () => {
  try {
    const res = await axios.get(`${BASE_URL}/get_allusers`);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
});

export const getUsertypeThunk = createAsyncThunk("/get_usertype", async () => {
  try {
    const res = await axios.get(`${BASE_URL}/get_usertype`);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
});

export const updateUserTypeThunk = createAsyncThunk(
  "/update_usertype",
  async (data) => {
    try {
      const res = await axios.post(`${BASE_URL}/update_usertype`, data);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
export const removeUserThunk = createAsyncThunk(
  "/remove_user",
  async (data) => {
    try {
      const res = await axios.post(`${BASE_URL}/remove_user`, data);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const addSkuThunk = createAsyncThunk("/add_sku", async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/add_sku`, data);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
});

export const getSkuThunk = createAsyncThunk("/get_sku", async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/get_sku`, data);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
});

export const deleteSkuThunk = createAsyncThunk("/delete_sku", async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/delete_sku`, data);
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
    containerList: [],
    users: [],
    userType: [],
    sku: [],
    total_sku: 0,
  },
  status: {
    permissionThunk: IDLE,
    getPermissionThunk: IDLE,
    loadPlanThunk: IDLE,
    getLoadPlanThunk: IDLE,
    addContainerThunk: IDLE,
    getContainerThunk: IDLE,
    sendEmailThunk: IDLE,
    getAllUsersThunk: IDLE,
    getUsertypeThunk: IDLE,
    updateUserTypeThunk: IDLE,
    removeUserThunk: IDLE,
    addSkuThunk: IDLE,
    getSkuThunk: IDLE,
    deleteSkuThunk: IDLE,
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
      })
      //addContainerThunk=====================================================================================================
      .addCase(addContainerThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(addContainerThunk.fulfilled, (state, { payload }) => {
        switch (Object.keys(payload)[0]) {
          case SUCCESS:
            state.loading = false;
            state.successMsg = payload[SUCCESS]?.message;
            state.data.containerList = payload[SUCCESS]?.result;
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
      .addCase(addContainerThunk.rejected, (state, action) => {
        state.status.addContainerThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      })
      //getContainerThunk==========================================================================================================
      .addCase(getContainerThunk.pending, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(getContainerThunk.fulfilled, (state, { payload }) => {
        switch (Object.keys(payload)[0]) {
          case SUCCESS:
            state.loading = false;
            state.successMsg = payload[SUCCESS]?.message;
            state.data.containerList = payload[SUCCESS];
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
      .addCase(getContainerThunk.rejected, (state, action) => {
        state.status.getContainerThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      })
      //sendEmailThunk==========================================================================================================
      .addCase(sendEmailThunk.pending, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(sendEmailThunk.fulfilled, (state, { payload }) => {
        switch (Object.keys(payload)[0]) {
          case SUCCESS:
            state.loading = false;
            state.successMsg = payload[SUCCESS];
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
      .addCase(sendEmailThunk.rejected, (state, action) => {
        state.status.sendEmailThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      })
      //getAllUsersThunk==========================================================================================================
      .addCase(getAllUsersThunk.pending, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(getAllUsersThunk.fulfilled, (state, { payload }) => {
        switch (Object.keys(payload)[0]) {
          case SUCCESS:
            state.loading = false;
            state.successMsg = payload[SUCCESS]?.message;
            state.data.users = payload[SUCCESS]?.result;
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
      .addCase(getAllUsersThunk.rejected, (state, action) => {
        state.status.getAllUsersThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      })
      //getUsertypeThunk==========================================================================================================
      .addCase(getUsertypeThunk.pending, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(getUsertypeThunk.fulfilled, (state, { payload }) => {
        switch (Object.keys(payload)[0]) {
          case SUCCESS:
            state.loading = false;
            state.successMsg = payload[SUCCESS]?.message;
            state.data.userType = payload[SUCCESS]?.result;
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
      .addCase(getUsertypeThunk.rejected, (state, action) => {
        state.status.getUsertypeThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      })
      //updateUserTypeThunk=====================================================================================================
      .addCase(updateUserTypeThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(updateUserTypeThunk.fulfilled, (state, { payload }) => {
        switch (Object.keys(payload)[0]) {
          case SUCCESS:
            state.loading = false;
            state.successMsg = payload[SUCCESS]?.message;
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
      .addCase(updateUserTypeThunk.rejected, (state, action) => {
        state.status.updateUserTypeThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      })
      //removeUserThunk=====================================================================================================
      .addCase(removeUserThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(removeUserThunk.fulfilled, (state, { payload }) => {
        switch (Object.keys(payload)[0]) {
          case SUCCESS:
            state.loading = false;
            state.successMsg = payload[SUCCESS]?.message;
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
      .addCase(removeUserThunk.rejected, (state, action) => {
        state.status.removeUserThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      })
      //addSkuThunk=====================================================================================================
      .addCase(addSkuThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(addSkuThunk.fulfilled, (state, { payload }) => {
        switch (Object.keys(payload)[0]) {
          case SUCCESS:
            state.loading = false;
            state.successMsg = payload[SUCCESS]?.message;
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
      .addCase(addSkuThunk.rejected, (state, action) => {
        state.status.addSkuThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      })
      //getSkuThunk==========================================================================================================
      .addCase(getSkuThunk.pending, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(getSkuThunk.fulfilled, (state, { payload }) => {
        switch (Object.keys(payload)[0]) {
          case SUCCESS:
            state.loading = false;
            state.successMsg = payload[SUCCESS]?.message;
            state.data.sku = payload[SUCCESS]?.result;
            state.data.total_sku = payload[SUCCESS]?.total;
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
      .addCase(getSkuThunk.rejected, (state, action) => {
        state.status.getSkuThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      })
      //deleteSkuThunk=====================================================================================================
      .addCase(deleteSkuThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(deleteSkuThunk.fulfilled, (state, { payload }) => {
        switch (Object.keys(payload)[0]) {
          case SUCCESS:
            state.loading = false;
            state.successMsg = payload[SUCCESS]?.message;
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
      .addCase(deleteSkuThunk.rejected, (state, action) => {
        state.status.deleteSkuThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      });
  },
});

export default companyAdminSlice.reducer;
export const { clearErrorSlice } = companyAdminSlice.actions;
