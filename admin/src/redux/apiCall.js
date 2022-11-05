import { loginStart, loginSuccess, loginFailure, logoutUser } from './authSlice'
import { publicRequest } from '../requestMethods'
import { toast } from "react-toastify";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post('/auth/login', user);
        if (res.data.user.isAdmin) {
            dispatch(loginSuccess(res.data))
            toast.success("Login successfully!", {
                position: "bottom-left",
            });
            localStorage.setItem("auth", JSON.stringify(res.data));
        }
        else {
            toast.warning("Login fail because this account don't is admin!", {
                position: "bottom-left",
            });
            dispatch(logoutUser(null))
        }

    } catch (error) {
        dispatch(loginFailure())
    }
}

