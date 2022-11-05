import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: localStorage.getItem("userItems")
            ? JSON.parse(localStorage.getItem("userItems")) : [],
        isFetching: false,
        error: false,
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
            toast.success("Login successfully!", {
                position: "bottom-left",
            });
        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },

        //logout 
        logoutUser(state, action) {
            localStorage.removeItem('userItems');
            toast.success("Logout successfully!", {
                position: "bottom-left",
            });
            return {
                ...state,
                currentUser: '',
                isFetching: false,
                error : false
            }
        },

        //update
        updateStart: (state) => {
            state.isFetching = true;
        },
        updateSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
            toast.info("User Updated Successfully!");
        },
        updateFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logoutUser ,updateStart,updateSuccess, updateFailure} = userSlice.actions;
export default userSlice.reducer;