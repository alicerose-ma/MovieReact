import React, { useReducer } from 'react'
import {Text, Keyboard} from 'react-native'
import createDataContext from './createDataContext'
import { ROOT_TYPE } from './types'
import {processAPI} from '../../draft/redux/api/apiMethods'
import authReducer from '../../draft/hookAndContext/reducer/authReducer'


export const startLoading = (dispatch) => {
    return () => {
        Keyboard.dismiss()
        dispatch({type: ROOT_TYPE.START_LOADING})
    }
}

export const stopLoading = (dispatch) => {
    return () => {
        dispatch({type: ROOT_TYPE.STOP_LOADING})
    }
}


const INITIAL_STATE = {
    errMess: '', 
    isLoading: false,
    session_id: '',
}

export const { StateContext, DispatchContext, Provider } =
 createDataContext(rootReducer, { startLoading, stopLoading }, INITIAL_STATE);




