import axios from "axios";

const BASE_URL = 'http://localhost:8080/api/';
const TOKEN = localStorage.getItem("userItems") && JSON.parse(localStorage.getItem("userItems")).accessToken;
//request public
export const publicRequest = axios.create({
    baseURL: BASE_URL
});


//request user
export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${TOKEN}` }
});
