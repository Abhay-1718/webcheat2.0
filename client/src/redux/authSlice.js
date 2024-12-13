// Import the createSlice function from Redux Toolkit to define a slice of state
import { createSlice } from '@reduxjs/toolkit';

// Initial state structure for authentication (default is user not logged in)
const initialState = {
  // 'isAuthenticated' flag to track if the user is logged in or not
  isAuthenticated: false,

  // 'user' stores the user details once they are logged in (otherwise null)
  user: null,

  // 'token' stores the authentication token retrieved from localStorage if available
  token: localStorage.getItem('token') || null,
};

// Create the authentication slice using Redux Toolkit's createSlice function
const authSlice = createSlice({
  // Name the slice 'auth' to identify the part of the state this slice handles
  name: 'auth',

  // Set the initial state (as defined above)
  initialState,

  // Reducers define how the state updates when actions are dispatched
  reducers: {

    // Reducer for user login
    // Action is expected to have user details and a token in payload
    login(state, action) {
      // When login is successful, mark the user as authenticated
      state.isAuthenticated = true;

      // Set the user details and token in the state from the action payload
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    // Reducer for user logout
    // Clears the user's authentication data and removes the token from localStorage
    logout(state) {
      // Set 'isAuthenticated' to false as the user is logged out
      state.isAuthenticated = false;

      // Clear user details and token
      state.user = null;
      state.token = null;

      // Remove the authentication token from localStorage to ensure no persistent login
      localStorage.removeItem('token');
    },

    // Reducer to set user details directly (useful for situations like fetching user data)
    // This is useful when we need to manually set the user after they log in or are fetched from an API
    setUser(state, action) {
      // Directly update the user data from the action payload
      state.user = action.payload;
    },
  },
});

// Export the action creators so they can be used elsewhere in the app (e.g., in components or thunk actions)
export const { login, logout, setUser } = authSlice.actions;

// Export the reducer to be used in the Redux store to manage authentication-related state
export default authSlice.reducer;
