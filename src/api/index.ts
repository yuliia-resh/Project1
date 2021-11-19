import axios from "axios";
import { CartItemType, ProductType } from "../types/types";

// const BASE_URL = process.env.PORT;

export const getAllProductsApi = () => {
  return axios.get(`/data`);
};

export const postToCartApi = (product: ProductType) => {
  return axios.post(`/cart`, product);
};

export const getCartProductsApi = () => {
  return axios.get(`/cart`);
};

export const updateCartProductByIdApi = (updatedProduct: CartItemType) => {
  return axios.put(`/cart/${updatedProduct.id}`, updatedProduct);
};

export const deleteCartProductApi = (productId: number) => {
  return axios.delete(`/cart/${productId}`);
};
