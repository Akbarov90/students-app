import {createSlice} from "@reduxjs/toolkit";
import {apiCall, apiStudent, apiStudentCreate, studentApi, apiStudentDelete, apiStudentUpdate} from "../api";


const students = createSlice({
    name: 'students',
    initialState: {
        loading: false,
        students: [],
        student: [],
        dataStudents: '',
        updateSuccess: '',
    },
    reducers: {
        onGetStart: (state) => {
            state.loading = true
            state.updateSuccess = false
        },
        onFail: (state, action) => {
            state.loading = false
            state.dataStudents = action.payload
        },
        getStudentSuccess: (state, action) => {
            state.loading = false
            state.students = action.payload.data.data
            console.log(action.payload.data)
            state.students.sort((a, b) => {
                if (a.id > b.id) return 1
                if (a.id < b.id) return -1
                return 0
            })
        },
        addStudentsSuccess: (state, {payload}) => {
            state.loading = false
            state.dataStudents = payload.data.success
        },

        getStudent: (state, action) => {
            state.loading = false
            state.student = action.payload.data.data
            console.log(action.payload.data)
        },
        updateStudentSuccess: (state, {payload}) => {
            state.loading = false
            // state.updateSuccess = false
            state.updateSuccess = payload.data.success
            console.log(payload.data.success)
        },

        deleteStudentSuccess: (state, {payload}) => {
            state.loading = false
            state.dataStudents = payload.data.success
            console.log(payload.data.success)
        }


    }
})

export const getStudents = () => apiCall({
    url: apiStudent,
    method: 'post',
    onStart: students.actions.onGetStart.type,
    onSuccess: students.actions.getStudentSuccess.type,
    onFail: students.actions.onFail.type
})

export const getStudent = (id) => apiCall({
    url: studentApi + id,
    method: 'get',
    onStart: students.actions.onGetStart.type,
    onSuccess: students.actions.getStudent.type,
    onFail: students.actions.onFail.type
})

export const addStudent = (data) => apiCall({
    url: apiStudentCreate,
    method: 'post',
    data,
    onStart: students.actions.onGetStart.type,
    onSuccess: students.actions.addStudentsSuccess.type,
    onFail: students.actions.onFail.type
})


export const updateStudentSuccess = (data) => apiCall({
    url: apiStudentUpdate,
    data,
    method: "post",
    onStart: students.actions.onGetStart.type,
    onSuccess: students.actions.updateStudentSuccess.type,
    onFail: students.actions.onFail.type
})

export const deleteStudent = (id) => apiCall({
    url: apiStudentDelete + id,
    method: 'delete',
    onStart: students.actions.onGetStart.type,
    onSuccess: students.actions.deleteStudentSuccess.type,
    onFail: students.actions.onFail.type
})


export default students.reducer