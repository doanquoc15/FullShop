import { loginStart, loginSuccess, loginFailure, logoutUser } from './authSlice'
import {
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
} from './productSlice'
import { publicRequest, userRequest } from '../requestMethods'
import { toast } from "react-toastify";

//login
export const login = async (dispatch, user, navigate) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post('/auth/login', user);
        if (res.data.user.isAdmin) {
            dispatch(loginSuccess(res.data))
            toast.success("Login successfully!", {
                position: "bottom-left",
            });
            localStorage.setItem("auth", JSON.stringify(res.data));
            navigate('/')
        }
        else {
            toast.error("Login fail because this account don't is admin!", {
                position: "bottom-left",
            });
            dispatch(logoutUser(null))
        }

    } catch (error) {
        dispatch(loginFailure())
    }
};

//get all products from
export const getAllProduct = async (dispatch) => {
    dispatch(getAllProductStart());
    try {
        const res = await userRequest.get(`/products`);
        dispatch(getAllProductSuccess(res.data))
    } catch (error) {
        dispatch(getAllProductFailure());
    }
}


//delete product by id
export const deleteProduct = async (dispatch, id) => {
    dispatch(deleteProductStart());
    try {
        const res = await userRequest.delete(`/products/${id}`);
        dispatch(deleteProductSuccess(res.data))
        toast.success('Deleted product successfully!', {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    } catch (error) {
        dispatch(deleteProductFailure());
        toast.error('Updated product fail !', {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }
}

//update product by id
export const updateProduct = async (dispatch, id, product) => {
    dispatch(updateProductStart());
    try {
        const res = await userRequest.put(`/products/${id}`, product);
        dispatch(updateProductSuccess(res.data))
        toast.success('Updated product successfully!', {
            position: toast.POSITION.TOP_RIGHT
        });
    } catch (error) {
        dispatch(updateProductFailure());
        toast.error('Updated product fail !', {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }
};


//add product
export const addProduct = (dispatch,product) => {
    dispatch(addProductStart())
    try {
        const res = userRequest.post('/products', product)
        dispatch(addProductSuccess(res.data))
        toast.success('Added product successfully!', {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    } catch (error) {
        dispatch(addProductFailure());
        toast.error('Added product fail !', {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }
}