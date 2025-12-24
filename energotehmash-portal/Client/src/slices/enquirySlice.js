// src/slices/enquirySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axiosClient';

export const createEnquiry = createAsyncThunk(
  'enquiries/create',
  async (payload, thunkAPI) => {
    try {
      const res = await api.post('/enquiries', payload);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || { message: 'Error' });
    }
  }
);

export const fetchEnquiries = createAsyncThunk(
  'enquiries/fetch',
  async (params = {}, thunkAPI) => {
    try {
      const res = await api.get('/enquiries', { params });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || { message: 'Error' });
    }
  }
);

const enquirySlice = createSlice({
  name: 'enquiries',
  initialState: {
    items: [],
    loading: false,
    error: null,
    lastCreated: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createEnquiry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEnquiry.fulfilled, (state, action) => {
        state.loading = false;
        state.lastCreated = action.payload;
      })
      .addCase(createEnquiry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Error';
      })
      .addCase(fetchEnquiries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEnquiries.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchEnquiries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Error';
      });
  },
});

export default enquirySlice.reducer;
