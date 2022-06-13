import { createAction } from '@reduxjs/toolkit'

export const registerStudent = '/auth/register';
export const loginStudent = '/auth/token'

export const apiCall = createAction('apiCall')


//crud api

export const apiStudent = '/student/list';
export const studentApi = '/student/get/'
export const apiStudentUpdate = '/student/update/';
export const apiStudentDelete = '/student/delete/';
export const apiStudentCreate = '/student/create';