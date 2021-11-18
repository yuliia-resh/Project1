import axios from "axios";
import { CartItemType, ProductType } from "../types/types";

const BASE_URL = process.env.PORT;

export const getAllProductsApi = () => {
  return axios.get(`${BASE_URL}/data`);
};

export const postToCartApi = (product: ProductType) => {
  return axios.post(`${BASE_URL}/cart`, product);
};

export const getCartProductsApi = () => {
  return axios.get(`${BASE_URL}/cart`);
};

export const updateCartProductByIdApi = (updatedProduct: CartItemType) => {
  return axios.put(`${BASE_URL}/cart/${updatedProduct.id}`, updatedProduct);
};

export const deleteCartProductApi = (productId: number) => {
  return axios.delete(`${BASE_URL}/cart/${productId}`);
};
