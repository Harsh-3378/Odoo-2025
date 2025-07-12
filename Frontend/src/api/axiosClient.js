import { logoutUser } from "@/state/authSlice";
import {
  setDetailsLoading,
  setListLoading,
  setLoading,
  setModifyLoading,
  setOptionsLoading,
} from "@/state/loadingSlice";
import store from "@/store/store";
import axios from "axios";

const axiosClient = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "http://192.168.1.30:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// A counter to track the number of ongoing requests
let ongoingRequests = 0;
const getLoadingType = (method, url) => {
  // MongoDB ObjectId regex pattern (24-character hexadecimal string)
  const mongoIdRegex = /^[a-f\d]{24}$/i;

  if (method === "GET") {
    const parts = url.split("/"); // Split URL into parts
    const lastSegment = parts[parts.length - 1]; // Get the last segment

    // Check if the last segment is a MongoDB ObjectId
    if (mongoIdRegex.test(lastSegment)) return "detailsLoading";

    // Check for dropdown-related URLs
    if (url.includes("common") || url.includes("option")) return "optionsLoading";

    // Default to list loading for other GET requests
    return "listLoading";
  }

  // Non-GET requests default to modifyLoading
  return "modifyLoading";
};

// Interceptors
axiosClient.interceptors.request.use(
  (config) => {
    // Increment ongoing requests counter
    ongoingRequests += 1;

    // Only set loading to true if it's the first request
    if (ongoingRequests === 1) {
      store.dispatch(setLoading(true));
    }
    const method = config.method?.toUpperCase() || "";
    const url = config.url || "";
    const loadingType = getLoadingType(method, url);
    // Dispatch appropriate loading actions
    if (loadingType === "listLoading") store.dispatch(setListLoading(true));
    if (loadingType === "detailsLoading") store.dispatch(setDetailsLoading(true));
    if (loadingType === "optionsLoading") store.dispatch(setOptionsLoading(true));
    if (loadingType === "modifyLoading") store.dispatch(setModifyLoading(true));

    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    // Decrement ongoing requests counter
    ongoingRequests -= 1;

    // Only set loading to false if all requests are complete
    if (ongoingRequests === 0) {
      store.dispatch(setLoading(false));
    }
    const method = response.config.method?.toUpperCase() || "";
    const url = response.config.url || "";
    const loadingType = getLoadingType(method, url);

    // Reset appropriate loading actions
    if (loadingType === "listLoading") store.dispatch(setListLoading(false));
    if (loadingType === "detailsLoading") store.dispatch(setDetailsLoading(false));
    if (loadingType === "optionsLoading") store.dispatch(setOptionsLoading(false));
    if (loadingType === "modifyLoading") store.dispatch(setModifyLoading(false));

    return response;
  },
  function (error) {
    ongoingRequests -= 1;

    // Only set loading to false if all requests are complete
    if (ongoingRequests === 0) {
      store.dispatch(setLoading(false));
    }
    const method = error.config?.method?.toUpperCase() || "";
    const url = error.config?.url || "";
    const loadingType = getLoadingType(method, url);

    // Reset appropriate loading actions on error
    if (loadingType === "listLoading") store.dispatch(setListLoading(false));
    if (loadingType === "detailsLoading") store.dispatch(setDetailsLoading(false));
    if (loadingType === "optionsLoading") store.dispatch(setOptionsLoading(false));
    if (loadingType === "modifyLoading") store.dispatch(setModifyLoading(false));

    if (error.response && error.response.status === 401) {
      // Clear token and logout user
      localStorage.removeItem("token");
      store.dispatch(logoutUser());

      // Redirect to login page
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
