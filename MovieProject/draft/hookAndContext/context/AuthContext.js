import React, { useReducer } from 'react'
import {Text, Keyboard} from 'react-native'
import createDataContext from './createDataContext'
import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, LOGOUT_FAIL, LOADING } from '../../redux/actions/types'
import {processAPI} from '../../redux/api/apiMethods'
import authReducer from '../../draft/hookAndContext/reducer/authReducer'


const usernameChanged = (dispatch) => {
    return (text) => (
        dispatch({ type: EMAIL_CHANGED, payload: text })
    )
}

const passwordChanged = (dispatch) => {
    return (text) => (
        dispatch({ type: PASSWORD_CHANGED, payload: text })
    )
}

const successLoginCallback = (dispatch, result) => {
    if (result.status == 200) {
        console.log("success")
        dispatch({type: LOGIN_SUCCESS, payload: result.data.session_id})
    } else {
        console.log("fail")
        dispatch({type: LOGIN_FAIL, payload: result.errMessage})

    }
}

const validCallBack = (dispatch, result) => {
    if(result.status === 200) {
        processAPI('/authentication/session/new?', 'post', {
            request_token: result.data.request_token
        }, result => successLoginCallback(dispatch, result))
    } else {
        console.log(result.errMessage)
        dispatch({type: LOGIN_FAIL, payload: result.errMessage})
    }
}


const tokenCallBack = (dispatch, result, username, password) => {
    if (result.status === 200) {
        processAPI('/authentication/token/validate_with_login?', 'post', {
            username: username,
            password: password,
            request_token: result.data.request_token}, result => validCallBack(dispatch, result))
    } else {
        console.log(result.errMessage)
        dispatch({type: LOGIN_FAIL, payload: result.errMessage})

    }
 }

const loginUser = (dispatch) => {
    return (username, password) => {
        Keyboard.dismiss()
        dispatch({type: LOADING})
        processAPI('/authentication/token/new?', 'get', null, result => tokenCallBack(dispatch,result, username, password))
    }
}

const logoutCallBack = (dispatch, result) => {
    if (result.status === 200 && result.success) {
        dispatch({type: LOGOUT_SUCCESS})
    } else {
        dispatch({type: LOGOUT_FAIL, payload: result.errMessage})
    }
}

export const logoutUser = (dispatch) => {
    return (session_id) => {
        dispatch({type: LOADING})
        processAPI('authentication/session?', 'delete', {
            session_id: session_id
        }, result => logoutCallBack(dispatch, result))
    }
}



const INITIAL_STATE = {
    username: '',
    password: '', 
    loginStatus: false,
    loginStatus: false,
    errMess: '', 
    isLoading: false,
    session_id: '',
}

export const { StateContext, DispatchContext, Provider } =
 createDataContext(authReducer, { usernameChanged, passwordChanged, loginUser, logoutUser }, INITIAL_STATE);




