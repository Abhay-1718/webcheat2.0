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
    // You can add more actions for errors, user updates, etc.
  },
});

// Export actions to dispatch in your components
export const { loginSuccess, logout } = authSlice.actions;

// Export the reducer to be used in the store
export default authSlice.reducer;
