import React from 'react'
import { View, Text } from 'react-native'
import movieDB from './movieDB'
import { API_KEY } from './movieDB'
import { processAPI } from '../api/apiMethods'
import {loginSuccess, loginFail, logoutSuccess, logoutFail} from '../actions/authActions'
import { stopLoading} from '../actions/rootActions'

export const checkUserLogin = (username, password, dispatch) => {
    processAPI('/authentication/token/new?', 'get', null, result => tokenCallBack(dispatch, result, username, password))
}

export const checkUserLogout = (session_id, dispatch) => {
    processAPI('authentication/session?', 'delete', { session_id: session_id}, result => logoutCallBack(dispatch, result))
}


const successLoginCallback = (dispatch, result) => {
    dispatch(stopLoading())
    if (result.status == 200) {
        dispatch(loginSuccess(result.data))
    } else {
        dispatch(loginFail(result.errMessage))

    }
}

const validCallBack = (dispatch, result) => {
    if(result.status === 200) {
        processAPI('/authentication/session/new?', 'post', {
            request_token: result.data.request_token
        }, result => successLoginCallback(dispatch, result))
    } else {
        console.log(result.errMessage)
        dispatch(stopLoading())
        dispatch(loginFail(result.errMessage))
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
        dispatch(stopLoading())
        dispatch(loginFail(result.errMessage))

    }
 }

 const logoutCallBack = (dispatch, result) => {
    dispatch(stopLoading())
    if (result.status === 200 && result.success) {
        dispatch(logoutSuccess())
    } else {
        dispatch(logoutFail(result.errMessage))
    }
}

 