import API_URLS from "@/api/apiUrls";
import axiosClient from "@/api/axiosClient";

export const createProduct = async (data) => {
  return await axiosClient.post(API_URLS.product.create, data);
};

export const getAllProducts = async () => {
  const res = await axiosClient.get(API_URLS.product.getAll);
  return res.data.products || [];
};

export const getProductById = async (id) => {
  return await axiosClient.get(`${API_URLS.product.getById}/${id}`);
};

export const updateProduct = async (id, data) => {
  return await axiosClient.put(`${API_URLS.product.update}/${id}`, data);
};

export const deleteProduct = async (id) => {
  return await axiosClient.delete(`${API_URLS.product.delete}/${id}`);
};

export const getProductsByCategory = async (category) => {
  const res = await axiosClient.get(`${API_URLS.product.getByCategory}/${category}`);
  return res.data.products || [];
};

export const requestPurchase = async (data) => {
  console.log("Requesting purchase with data:", data);
  return await axiosClient.post("/purchase/request", data);
};

export const getPurchaseRequests = async () => {
  const res = await axiosClient.get("/purchase/requests");
  return res.data.requests || [];
};

export const updatePurchaseRequestStatus = async (requestId, status) => {
  return await axiosClient.patch(`/purchase/request/${requestId}/status`, { status });
};

// Get all users
export const getAllUsers = async () => {
  const res = await axiosClient.get("/user");
  return res.data.users || [];
};
