import {createSlice} from '@reduxjs/toolkit'
import {encode} from 'js-base64'
import {apiCall, registerStudent, loginStudent} from '../api';

const auth = createSlice({
    name: 'auth',
    initialState: {
        isLoading: false,
        isError: false,
        code: '',
        err_msg: '',
        success: '',
        regSuccess: ""
    },
    reducers: {
        onStart: state => {
            state.isLoading = true
            state.isError = false
        },
        onSuccess: (state, {payload}) => {
            localStorage.setItem('token', encode(payload.data.data.accessToken))
            state.success = payload.data.success
            state.isLoading = false
            state.isError = false
            state.code = payload.code
        },
        userProfile: (state, {payload}) => {
            state.regSuccess = payload.data.success
            state.isLoading = false
            state.isError = false
            state.err_msg = payload.message
            state.code = ''
        },
        onFail: (state, {payload}) => {
            state.isLoading = false
            state.isError = true
            // state.err_msg = { ...payload.response.data.message }
        },
    },
})

export const userLogin = data =>
    apiCall({
        url: loginStudent,
        method: 'post',
        data,
        onStart: auth.actions.onStart.type,
        onSuccess: auth.actions.onSuccess.type,
        onFail: auth.actions.onFail.type,
    })

export const userRegister = (data) =>
    apiCall({
        url: registerStudent,
        data,
        method: 'post',
        onStart: auth.actions.onStart.type,
        onSuccess: auth.actions.userProfile.type,
        onFail: auth.actions.onFail.type,
    })


export default auth.reducer
