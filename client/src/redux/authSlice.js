import { createSlice } from '@reduxjs/toolkit';

// Initial state for authentication
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
  
  },
});

export const { loginSuccess, logout } = authSlice.actions;


export default authSlice.reducer;
