import API_URLS from "@/api/apiUrls";
import axiosClient from "@/api/axiosClient";

export const postData = async (endpoint, data) => {
  return await axiosClient.post(endpoint, data);
};

export const getUserData = async () => {
  return await axiosClient.get(API_URLS.auth.getUser);
};

export const signupUser = async (data) => {
  return await axiosClient.post(API_URLS.auth.register, data);
};
