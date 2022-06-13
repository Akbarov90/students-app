import axios from 'axios'
import {decode} from "js-base64";

const middleware =
    ({dispatch}) =>
        next =>
            action => {

                if (action.type !== 'apiCall') {
                    next(action)
                    return
                }

                next(action)


                const {method, url, params, data, onStart, onSuccess, onFail} = action.payload

                const token = localStorage.getItem('token')

                const headers = token ? {Authorization: `Bearer ${decode(token)}`} : null

                dispatch({type: onStart})
                // debugger
                axios({
                    baseURL: 'https://online-excel-heroku.herokuapp.com',
                    method,
                    data,
                    url,
                    params,
                    headers,
                })
                    .then(res => {
                        if (res.status === 200 || res.status === 201) {
                            // console.log(res)
                            dispatch({
                                type: onSuccess,
                                payload: res.data,
                            })
                        } else {
                            dispatch({
                                type: onFail,
                                payload: res,
                            })
                        }
                    })
                    .catch(error => {
                        console.log(error, 12)
                        dispatch({
                            type: onFail,
                            payload: error,
                        })
                    })
            }

export default middleware
