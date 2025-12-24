// src/slices/reportSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axiosClient';

export const fetchReportSummary = createAsyncThunk(
  'reports/summary',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('/reports/summary');
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || { message: 'Error' });
    }
  }
);

const reportSlice = createSlice({
  name: 'reports',
  initialState: {
    summary: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReportSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReportSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload;
      })
      .addCase(fetchReportSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Error';
      });
  },
});

export default reportSlice.reducer;
