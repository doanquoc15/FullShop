import { loginStart, loginSuccess, loginFailure, updateSuccess, updateStart, updateFailure, } from './userSlice'
import { publicRequest, userRequest } from '../common/api'
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
    } catch (error) {
        console.log("error", error)
    }
}

export const update = async (dispatch, userUpdate) => {
    dispatch(updateStart());
    console.log('up',userUpdate)
    try {
        const res = await userRequest.put(`/users/${userUpdate._id}`, userUpdate);
        const userItem = JSON.parse(localStorage.getItem("userItems"))
        localStorage.setItem("userItems", JSON.stringify({ ...userItem,user : res.data}));
        dispatch(updateSuccess(userUpdate))

    } catch (error) {
        dispatch(updateFailure())
    }
}

