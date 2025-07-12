import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  currentUser: null,
  token: null,
  email: null,
  otp: null,
  profilePending: true, // add this
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser(state, action) {
      state.currentUser = action.payload.data?.data;
      state.token = action.payload.data?.auth_token;
      state.email = action.payload.data?.email;
      state.isLoggedIn = true;
      state.profilePending = !!action.payload.data?.profilePending;
    },
    logoutUser(state) {
      state.currentUser = null;
      state.token = null;
      state.email = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    },
    updateEmail(state, action) {
      state.email = action.payload;
    },
    otpSend(state, action) {
      state.otp = action.payload;
    },
    updateProfile(state, action) {
      // Expecting action.payload to possibly include an 'avatar' property (URL)
      state.currentUser = {
        ...state.currentUser,
        ...action.payload,
        ...(action.payload.avatar && { avatar: action.payload.avatar }),
      };
      state.profilePending = false;
    },
  },
});

export const { loginUser, logoutUser, updateEmail, otpSend, updateProfile } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectCurrentUser = (state) => state.auth.currentUser;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectToken = (state) => state.auth.token;
export const selectEmail = (state) => state.auth.email;
export const selectProfilePending = (state) => state.auth.profilePending;
