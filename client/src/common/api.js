import axios from "axios";

const BASE_URL = 'http://localhost:8080/api';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNGQ2M2U2NzRkYjc2Mjg0MmNlZjJhNiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2NjE2OTI3NiwiZXhwIjoxNjY2NDI4NDc2fQ.1gU5QPbrltaflIC4z0-Hy77RLB61lhufcb3rJYUXYCM'

//request public
export const publicRequest = axios.create({
    baseURL: BASE_URL
});


//request user
export const userRequest = axios.create({
    baseURL: BASE_URL,
    header : {token : `Bearer ${TOKEN}`}
});
