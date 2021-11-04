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

export const updateCartProductWithId = (updatedProduct) => {
    return axios.put(BASE_URL+`/cart/${updatedProduct.id}`, updatedProduct)
}