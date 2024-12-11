import { createSlice } from '@reduxjs/toolkit';

// Initial state of the auth slice
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

// Create slice to handle authentication logic
// In authSlice.js

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { login, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
