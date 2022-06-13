import {configureStore} from '@reduxjs/toolkit'
import middleware from "./middleware";
import auth from '../redux/auth/auth';
import students from "./sudents/students";

export default configureStore({
    reducer: {auth, students},
    middleware: [middleware],
})