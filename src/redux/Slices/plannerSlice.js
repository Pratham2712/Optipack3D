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
    currentOrder: {},
    skuData: [],
    containerData: [],
    orderData: [],
  },
  status: {
    addOrderThunk: IDLE,
    getSkuByCodeThunk: IDLE,
    EditOrderThunk: IDLE,
    getContainerByNameThunk: IDLE,
    getOrderByNumberThunk: IDLE,
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
                payload[SUCCESS]?.result,
              ];
            } else {
              state.data.skuData = [payload[SUCCESS]?.result];
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
      });
  },
});

export default plannerSlice.reducer;
export const { clearErrorSlice, deleteSku, deleteContainer, deleteOrder } =
  plannerSlice.actions;
