import auth from '@react-native-firebase/auth';
import movieDB from '../api/movieDB'
import {API_KEY} from '../api/movieDB'
// "session_id": "c9b8a305a3f99c94ce584d1a6082a768b6482a12"


import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED, 
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    SIGN_OUT
} from './types'

export const emailChanged = text => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    }
}

export const passwordChanged = text => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    }
}
export const signout = () => {
    return {
        type: SIGN_OUT,
        payload: false
    }
}


const processAPI = async (apiName, method)  => {
        switch (method) {
            case 'get':
                try {
                    const response = await movieDB.get(`${apiName}${API_KEY}`)
                    console.log(apiName)
                    console.log(response)
                } catch(err) {
                    console.log("get", err)
                }
            case 'post':
                const response2 = await movieDB.post(`${apiName}${API_KEY}`)
                // const result2 = response.data
                // console.log(result2)
                console.log(response2)
            default:
                console.log('default')
                return null
        }
    }


const checkLogin = async (dispatch, {email, password}) => {
    // processAPI('/authentication/token/new?', 'get')
    try {
        const response = await movieDB.get(`/authentication/token/new?${API_KEY}`)
        const request_token = response.data.request_token
        callUser(dispatch, {email, password}, request_token)
    } catch(err) {
        dispatch({type: LOGIN_FAIL, payload: err.message})
    }
}

const callUser = async (dispatch, {email, password}, request_token) => {
    try {
        const response = await movieDB.get(`/authentication/token/validate_with_login?${API_KEY}`, {
            params: {
                "username": email,
                "password": password,
                "request_token": request_token
              }
        })
        console.log(response)
        dispatch({type: LOGIN_SUCCESS})
    } catch(err) {
        console.log(err)
        dispatch({type: LOGIN_FAIL, payload: err.message})
    }
}

export const loginUser = (email, password) => {
    return (dispatch) => {
        checkLogin(dispatch,{email, password})
    }
}
