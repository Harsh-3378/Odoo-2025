import API_URLS from "@/api/apiUrls";
import axiosClient from "@/api/axiosClient";

export const createProduct = async (data) => {
  return await axiosClient.post(API_URLS.product.create, data);
};

export const getAllProducts = async () => {
  return await axiosClient.get(API_URLS.product.getAll);
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
