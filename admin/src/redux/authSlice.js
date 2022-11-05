import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";



const authSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: localStorage.getItem("auth")
            ? JSON.parse(localStorage.getItem("auth")) : [],
        isFetching: false,
        error: false,
        isLoading: false
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
            state.isLoading = false

        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.error = false;
            state.currentUser = action.payload;
            state.isLoading = true
            toast.success("Login successfully!", {
                position: "bottom-left",
            });
        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.error = true;
            state.isLoading = false

        },

        //logout 
        logoutUser(state, action) {
            localStorage.removeItem('auth');;
            
            return {
                ...state,
                currentUser: '',
                isFetching: false,
                error: false,
                isLoading : false
            }
        }
    },
});

export const { loginStart, loginSuccess, loginFailure, logoutUser } = authSlice.actions;
export default authSlice.reducer;