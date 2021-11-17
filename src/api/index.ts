import axios from "axios";
import { CartItemType, ProductType } from "../shared/types/types";

const BASE_URL = "http://localhost:3000";

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

export const searchProductsApi = async (search: string) => {
  const { data } = await getAllProductsApi();

  return data.filter((product: ProductType) => {
    return (
      product.ingredients.find((ingerdient: string) =>
        ingerdient.toLowerCase().includes(search)
      ) || product.title.toLowerCase().includes(search)
    );
  });
};
