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
  },
  status: {
    addOrderThunk: IDLE,
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
  },
  extraReducers: (builders) => {
    builders
      .addCase(addOrderThunk.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(addOrderThunk.fulfilled, (state, { payload }) => {
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
      .addCase(addOrderThunk.rejected, (state, action) => {
        state.status.addOrderThunk = ERROR;
        state.loading = false;
        state.errorData.message = action.error.message;
      });
  },
});

export default plannerSlice.reducer;
export const { clearErrorSlice } = plannerSlice.actions;
