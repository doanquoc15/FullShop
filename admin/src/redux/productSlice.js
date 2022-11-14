import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        isFetching: false,
        error: false,
    },

    reducers: {
        //get all product
        getAllProductStart: (state) => {
            state.isFetching = true;
            state.error = false
        },
        getAllProductSuccess: (state, action) => {
            state.products = action.payload;
            state.isFetching = false;
            state.error = false
        },
        getAllProductFailure: (state, action) => {
            state.isFetching = false;
            state.error = true
        },

        //delete product by id
        deleteProductStart: (state) => {
            state.isFetching = true;
            state.error = false
        },
        deleteProductSuccess: (state, action) => {
            state.products.splice(state.products.findIndex((item) => item._id === action.payload._id),1);
            state.isFetching = false;
            state.error = false
        },
        deleteProductFailure: (state, action) => {
            state.isFetching = false;
            state.error = true
        },

        //update product by id
        updateProductStart: (state) => {
            state.isFetching = true;
            state.error = false
        },
        updateProductSuccess: (state, action) => {
            const updatedProduct = state.products.map(product => {
                return product._id === action.payload._id ? action.payload : product
            })
            state.products = updatedProduct;
            state.isFetching = false;
            state.error = false
        },
        updateProductFailure: (state, action) => {
            state.isFetching = false;
            state.error = true
        },

        //add product
        addProductStart: (state) => {
            state.isFetching = true;
            state.error = false
        },
        addProductSuccess: (state, action) => {
            state.products.push(action.payload)
            state.isFetching = false;
            state.error = false
        },
        addProductFailure: (state, action) => {
            state.isFetching = false;
            state.error = true
        },
    }
})

export const {
    getAllProductStart,
    getAllProductSuccess,
    getAllProductFailure,

    deleteProductStart,
    deleteProductSuccess,
    deleteProductFailure,

    updateProductStart,
    updateProductSuccess,
    updateProductFailure,

    addProductStart,
    addProductSuccess,
    addProductFailure

} = productSlice.actions;
export default productSlice.reducer;