import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getEmployeeReimbursement, getReviewReimbursement } from "../../ServerConnector/TRMS.api";
import { RootState } from "../../app/store";
import Reimbursment from '../../modules/Reimbursements';

export type ReimbursementState = Reimbursment[] | null;

export const getEmpWorkAsync = createAsyncThunk<Reimbursment[], unknown>(
  'employee/getWork/async',
  async (empty, thunkAPI) => {

    try {
      const response = await getEmployeeReimbursement();
      return response;
    } catch(error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getReviewWorkAsync = createAsyncThunk<Reimbursment[], unknown>(
  'employee/getReviewWork/async',
  async (empty, thunkAPI) => {

    try {
      const response = await getReviewReimbursement();
      return response;
    } catch(error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const reimbursementSlice = createSlice({
  name: 'reimbursements',
  initialState: null as ReimbursementState,
  reducers: {
    getWork: (state, action: PayloadAction<Reimbursment[]>) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmpWorkAsync.pending, (state) => {
        // return null;
      })
      .addCase(getEmpWorkAsync.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(getEmpWorkAsync.rejected, (state, action) => {
        console.log(action.error);
      })
      .addCase(getReviewWorkAsync.pending, (state) => {
        // return null;
      })
      .addCase(getReviewWorkAsync.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(getReviewWorkAsync.rejected, (state, action) => {
        console.log(action.error);
      })
  },
});

export const { getWork } = reimbursementSlice.actions;

export const selectReimbursements = (state: RootState) => state.reimburements;

export default reimbursementSlice.reducer;