import { loginStart, loginSuccess, loginFailure, updateSuccess, updateStart, updateFailure } from './userSlice'
import { publicRequest } from '../common/api'
import { toast } from 'react-toastify';
export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post('/auth/login', user);
        localStorage.setItem("userItems", JSON.stringify(res.data));
        dispatch(loginSuccess(res.data))

    } catch (error) {
        dispatch(loginFailure())
    }
}

export const register = async (user) => {
    try {
        const res = await publicRequest.post('/auth/register', user);
        if (res.data) {
            toast.success("Register successfully!", {
                position: "bottom-left",
            });
        }
        console.log(res.data)
    } catch (error) {
        console.log("error", error)
    }
}

export const update = async (dispatch, user) => {
    dispatch(updateStart());
    try {
        const res = await publicRequest.put(`/users/${user.id}`, user);
        // localStorage.setItem("userItems", JSON.stringify(res.data));
        dispatch(updateSuccess(res.data))

    } catch (error) {
        dispatch(updateFailure())
    }
}
