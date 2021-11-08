import axios from "axios"

const BASE_URL = "http://localhost:3000"

export const getAllProducts = () => {
    return axios.get(BASE_URL+"/data")
}

export const postToCart = (product) => {
    return axios.post(BASE_URL+"/cart", product)
}

export const getCartProducts = () => {
    return axios.get(BASE_URL+"/cart")
}

export const updateCartProductById = (updatedProduct) => {
    return axios.put(BASE_URL+`/cart/${updatedProduct.id}`, updatedProduct)
}

export const deleteCartProduct = (productId) => {
    return axios.delete(BASE_URL+`/cart/${productId}`)
}