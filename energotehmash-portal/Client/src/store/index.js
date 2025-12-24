// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import productReducer from '../slices/productSlice';
import enquiryReducer from '../slices/enquirySlice';
import reportReducer from '../slices/reportSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    enquiries: enquiryReducer,
    reports: reportReducer,
  },
});

export default store;
