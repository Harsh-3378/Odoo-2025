import API_URLS from "@/api/apiUrls";
import axiosClient from "@/api/axiosClient";

export const postData = async (endpoint, data) => {
  return await axiosClient.post(endpoint, data);
};

export const getUserData = async () => {
  return await axiosClient.get(API_URLS.auth.getUser);
};
export const getUser = async () => {
  return await axiosClient.get(API_URLS.auth.getUserAll);
};

export const signupUser = async (data) => {
  return await axiosClient.post(API_URLS.auth.register, data);
};

export const updateUserProfile = async (data) => {
  return await axiosClient.put("/user/profile", data);
};
