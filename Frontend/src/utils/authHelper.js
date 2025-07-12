// src/utils/authHelpers.js
import API_URLS from "@/api/apiUrls";
import { postData } from "@/services/authApi";
import { loginUser } from "@/state/authSlice";

export const setupUser = (response, dispatch, navigate) => {
  const { success, data: payload } = response?.data || {};
  const userData = payload?.user ?? payload;
  const authToken = payload?.token;

  if (success === true && authToken) {
    localStorage.setItem("token", authToken);
    dispatch(
      loginUser({
        data: {
          data: userData,
          auth_token: authToken,
          email: userData.email,
        },
      }),
    );
    navigate("/", { replace: true });
  } else {
    // Clear any existing token if login fails
    localStorage.removeItem("token");
    throw new Error("Login failed. Please try again.");
  }
};

export const signupUser = async (payload) => {
  return await postData(API_URLS.auth.signup, payload);
};
