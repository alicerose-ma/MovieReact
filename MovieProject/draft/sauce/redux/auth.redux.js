import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable';
 

const { Types, Creators } = createActions({
    loginRequest: ['username', 'password'],
    finishLoginRequest: ['state', 'error', 'data', 'requestName', 'nextScreen']
})
export const LoginTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
    fetching: "none",
    status: null,
    data: null,
    error: null,
    currentRequestName: '',
})

export const loginRequest = (state) => state.merge({fetching: 'fetching'})
 
export const finishLoginRequest = (state, {status, error, data, requestName}) => {
    console.log("DATA TO FORMAT",data);

    return state.merge({
        fetching: 'none',
        status: status,
        error: error,
        data: data,
        currentRequestName: requestName,
    })
}

export const successResponse = (apiName, response) => {
    return {
        "apiName": apiName,
        "success": response.data.success || false,
        "status": response.status,
        "errMessage": response.data.status_message || '',
        "data": response.data,
    }
}

export const reducer =  createReducer(INITIAL_STATE, {
    [Types.LOGIN_REQUEST]: loginRequest,
    [Types.FINISH_LOGIN_REQUEST]: finishLoginRequest,
})