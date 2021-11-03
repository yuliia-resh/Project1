import axios from "axios"

const BASE_URL = "http://localhost:3000"

export const getAllProducts = () => {
    return axios.get(BASE_URL+"/data")
}


export const postToCart = () => {
    return axios.post(BASE_URL+"/cart")
}