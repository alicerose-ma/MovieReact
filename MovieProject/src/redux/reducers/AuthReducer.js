import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, LOGOUT_FAIL, FINISH_API } from '../actions/types'
import { finishAPI } from '../common.redux'
import { successResponse } from '../api/apiMethods'

const INITIAL_STATE = {
    email: '',
    password: '',
    loginStatus: false,
    errMess: '',
    isLoading: false,
    session_id: '',
}

export default (state = INITIAL_STATE, action) => {
    // console.log(action)
    switch (action.type) {
        case EMAIL_CHANGED:
            return { ...state, email: action.payload }
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload }
        case FINISH_API:
            console.log("[finishAPI]",finishAPI(state, action.payload))
            return finishAPI(state, action.payload)
            // const data = action.payload
            // if (data.success === true) {
            //     return { ...state, loginStatus: true, session_id: data.session_id }
            // } else {
            //     return { ...state, loginStatus: false, errMess: data.errMessage, session_id: '' }
            // }
        case LOGIN_SUCCESS:
            return {...state, loginStatus: true, session_id: action.payload.session_id}
        case LOGIN_FAIL: 
            return {...state, loginStatus: false,  errMess: action.payload.errMessage, session_id: ''}
        case LOGOUT_SUCCESS:
            return { ...state, loginStatus: false, session_id: '' }
        case LOGOUT_FAIL:
            return { ...state, loginStatus: true, errMess: action.payload.errMessage }
        default:
            return state
    }
} 