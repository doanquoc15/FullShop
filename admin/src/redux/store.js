import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import productReducer from "./productSlice";

export const store = configureStore({
    reducer: {
        user: authReducer,
        product: productReducer
    },
})