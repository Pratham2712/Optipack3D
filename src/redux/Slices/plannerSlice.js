import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL, ERROR, IDLE, SUCCESS } from "../../constants/constants";
import axios from "axios";

axios.defaults.withCredentials = true;

export const addOrderThunk = createAsyncThunk("/add_order", async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/add_order`, data);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
});
export const getSkuByCodeThunk = createAsyncThunk(
  "/get_skuByCode",
  async (data) => {
    try {
      const res = await axios.post(`${BASE_URL}/get_skuByCode`, data);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
export const EditOrderThunk = createAsyncThunk(
  "/add_or_edit_order",
  async (data) => {
    try {
      const res = await axios.post(`${BASE_URL}/add_or_edit_order`, data);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
export const getContainerByNameThunk = createAsyncThunk(
  "/get_containerByName",
  async (data) => {
    try {
      const res = await axios.post(`${BASE_URL}/get_containerByName`, data);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
export const getOrderByNumberThunk = createAsyncThunk(
  "/get_orderByNumber",
  async (data) => {
    try {
      const res = await axios.post(`${BASE_URL}/get_orderByNumber`, data);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
export const saveSkuThunk = createAsyncThunk(
  "/attach_skus_to_order",
  async (data) => {
    try {
      const res = await axios.post(`${BASE_URL}/attach_skus_to_order`, data);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
export const getSkuByOrderThunk = createAsyncThunk(
  "/get_skus_by_order_numbers",
  async (data) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/get_skus_by_order_numbers`,
        data
      );
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
export const getSkuCodeNameThunk = createAsyncThunk(
  "/get_skuCodeAndName",
  async () => {
    try {
      const res = await axios.post(`${BASE_URL}/get_skuCodeAndName`);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const createLoadplanThunk = createAsyncThunk(
  "/create_load_plan",
  async (data) => {
    try {
      const res = await axios.post(`${BASE_URL}/create_load_plan`, data);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const getLoaderThunk = createAsyncThunk("/get_loaderUser", async () => {
  try {
    const res = await axios.get(`${BASE_URL}/get_loaderUser`);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
});

export const assignLoadplanThunk = createAsyncThunk(
  "/assign_load_plan",
  async (data) => {
    try {
      const res = await axios.post(`${BASE_URL}/assign_load_plan`, data);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const getOrderDataThunk = createAsyncThunk(
  "/get_order_data",
  async () => {
    try {
      const res = await axios.get(`${BASE_URL}/get_order_data`);
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const uploadImageThunk = createAsyncThunk(
  "/upload_user_image",
  async (data) => {
    try {
      const res = await axios.post(`${BASE_URL}/upload_user_image`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (error) {
      return error.response.data;
    }
  }
);
const initialState = {
  loading: false,
  updateDone: false,
  loadplanCreated: false,
  errorData: {
    message: "",
    type: "",
    errors: [],
  },
  successMsg: "",
  isError: false,
  data: {
    currentOrder: {},
    skuData: [],
    containerData: [],
    orderData: [],
    skuCodeName: [],
    loaderUser: [],
    allOrders: [],
  },
  status: {
    addOrderThunk: IDLE,
    getSkuByCodeThunk: IDLE,
    EditOrderThunk: IDLE,
    getContainerByNameThunk: IDLE,
    getOrderByNumberThunk: IDLE,
    saveSkuThunk: IDLE,
    getSkuByOrderThunk: IDLE,
    getSkuCodeNameThunk: IDLE,
    createLoadplanThunk: IDLE,
    getLoaderThunk: IDLE,
    assignLoadplanThunk: IDLE,
    getOrderDataThunk: IDLE,
    uploadImageThunk: IDLE,
  },
};

const plannerSlice = createSlice({
  name: "plannerSlice",
  initialState: initialState,
  reducers: {
    clearErrorSlice: (state, action) => {
      state.isError = false;
      state.errorData = {};
    },
    deleteSku: (state, action) => {
      const skuIdToDelete = action.payload;
      state.data.skuData = state.data.skuData.filter(
        (sku) => sku.sku_code !== skuIdToDelete
      );
    },
    deleteContainer: (state, action) => {
      const containerToDelete = action.payload;
      state.data.containerData = state.data.containerData.filter(
        (ele) => ele.container_name !== containerToDelete
      );
    },
    deleteOrder: (state, action) => {
      const orderToDelete = action.payload;
      state.data.orderData = state.data.orderData.filter(
        (ele) => ele.order_number !== orderToDelete
      );
    },
    clearOrderData: (state) => {
      state.data.orderData = []; // Empty the orderData array
    },
    clearContainerData: (state) => {
      state.data.containerData = []; // Empty the orderData array
    },
    clearSkuData: (state) => {
      state.data.skuData = []; // Empty the orderData array
    },
  },
  extraReducers: (builders) => {
    builders
      //getSkuByCodeThunk=========================================================================================================
      .addCase(getSkuByCodeThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(getSkuByCodeThunk.fulfilled, (state, { payload }) => {
        switch (Object.keys(payload)[0]) {
          case SUCCESS:
            state.loading = false;
            state.successMsg = payload[SUCCESS]?.message;
            if (Array.isArray(state.data.skuData)) {
              state.data.skuData = [
                ...state.data.skuData,
                ...payload[SUCCESS]?.result,
              ];
            } else {
              state.data.skuData = [...payload[SUCCESS]?.result];
            }
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
      .addCase(getSkuByCodeThunk.rejected, (state, action) => {
        state.status.getSkuByCodeThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      })
      //EditOrderThunk===========================================================================================
      .addCase(EditOrderThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(EditOrderThunk.fulfilled, (state, { payload }) => {
        switch (Object.keys(payload)[0]) {
          case SUCCESS:
            state.loading = false;
            state.successMsg = payload[SUCCESS]?.message;
            state.data.currentOrder = payload[SUCCESS]?.result;
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
      .addCase(EditOrderThunk.rejected, (state, action) => {
        state.status.addOrderThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      })
      //getContainerByNameThunk===========================================================================================
      .addCase(getContainerByNameThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(getContainerByNameThunk.fulfilled, (state, { payload }) => {
        switch (Object.keys(payload)[0]) {
          case SUCCESS:
            state.loading = false;
            state.successMsg = payload[SUCCESS]?.message;
            if (Array.isArray(state.data.containerData)) {
              state.data.containerData = [
                ...state.data.containerData,
                payload[SUCCESS]?.result,
              ];
            } else {
              state.data.containerData = [payload[SUCCESS]?.result];
            }
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
      .addCase(getContainerByNameThunk.rejected, (state, action) => {
        state.status.getContainerByNameThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      })
      //getOrderByNumberThunk===========================================================================================
      .addCase(getOrderByNumberThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(getOrderByNumberThunk.fulfilled, (state, { payload }) => {
        switch (Object.keys(payload)[0]) {
          case SUCCESS:
            state.loading = false;
            state.successMsg = payload[SUCCESS]?.message;
            if (Array.isArray(state.data.orderData)) {
              state.data.orderData = [
                ...state.data.orderData,
                payload[SUCCESS]?.result,
              ];
            } else {
              state.data.orderData = [payload[SUCCESS]?.result];
            }
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
      .addCase(getOrderByNumberThunk.rejected, (state, action) => {
        state.status.getOrderByNumberThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      })
      //saveSkuThunk===========================================================================================
      .addCase(saveSkuThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(saveSkuThunk.fulfilled, (state, { payload }) => {
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
      .addCase(saveSkuThunk.rejected, (state, action) => {
        state.status.saveSkuThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      })
      //getSkuByOrderThunk===========================================================================================
      .addCase(getSkuByOrderThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(getSkuByOrderThunk.fulfilled, (state, { payload }) => {
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
      .addCase(getSkuByOrderThunk.rejected, (state, action) => {
        state.status.saveSkuThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      })
      //getSkuCodeNameThunk===========================================================================================
      .addCase(getSkuCodeNameThunk.pending, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(getSkuCodeNameThunk.fulfilled, (state, { payload }) => {
        switch (Object.keys(payload)[0]) {
          case SUCCESS:
            state.loading = false;
            state.successMsg = payload[SUCCESS]?.message;
            state.skuCodeName = payload[SUCCESS]?.result;
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
      .addCase(getSkuCodeNameThunk.rejected, (state, action) => {
        state.status.getSkuCodeNameThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      })
      //createLoadplanThunk===========================================================================================
      .addCase(createLoadplanThunk.pending, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(createLoadplanThunk.fulfilled, (state, { payload }) => {
        switch (Object.keys(payload)[0]) {
          case SUCCESS:
            state.loading = false;
            state.successMsg = payload[SUCCESS]?.message;
            state.data.loadplanId = payload[SUCCESS]?.result;
            state.updateDone = !state.updateDone;
            state.loadplanCreated = true;
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
      .addCase(createLoadplanThunk.rejected, (state, action) => {
        state.status.createLoadplanThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      })
      //getLoaderThunk===========================================================================================
      .addCase(getLoaderThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(getLoaderThunk.fulfilled, (state, { payload }) => {
        switch (Object.keys(payload)[0]) {
          case SUCCESS:
            state.loading = false;
            state.successMsg = payload[SUCCESS]?.message;
            state.data.loaderUser = payload[SUCCESS]?.result;
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
      .addCase(getLoaderThunk.rejected, (state, action) => {
        state.status.getLoaderThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      })
      //assignLoadplanThunk===========================================================================================
      .addCase(assignLoadplanThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(assignLoadplanThunk.fulfilled, (state, { payload }) => {
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
      .addCase(assignLoadplanThunk.rejected, (state, action) => {
        state.status.assignLoadplanThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      })
      //getOrderDataThunk===========================================================================================
      .addCase(getOrderDataThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(getOrderDataThunk.fulfilled, (state, { payload }) => {
        switch (Object.keys(payload)[0]) {
          case SUCCESS:
            state.loading = false;
            state.successMsg = payload[SUCCESS]?.message;
            state.data.allOrders = payload[SUCCESS]?.result;
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
      .addCase(getOrderDataThunk.rejected, (state, action) => {
        state.status.getOrderDataThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      })
      //uploadImageThunk===========================================================================================
      .addCase(uploadImageThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(uploadImageThunk.fulfilled, (state, { payload }) => {
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
      .addCase(uploadImageThunk.rejected, (state, action) => {
        state.status.uploadImageThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      });
  },
});

export default plannerSlice.reducer;
export const {
  clearErrorSlice,
  deleteSku,
  deleteContainer,
  deleteOrder,
  clearContainerData,
  clearOrderData,
  clearSkuData,
} = plannerSlice.actions;
