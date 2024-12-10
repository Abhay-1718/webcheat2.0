import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,  // This is where your state slices will go
  },
});
