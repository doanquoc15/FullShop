import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    currentUser: null,
    isFetching: false,
    error: false
}

const usersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isFetching = true
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload
        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        }
    }
});

export const { loginStart, loginSuccess, loginFailure  } = usersSlice.actions;
export default usersSlice.reducers;
