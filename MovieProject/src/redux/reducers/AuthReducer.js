import {EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_SUCCESS, LOGIN_FAIL, SIGN_OUT} from '../actions/types'

const INITIAL_STATE = { 
    email: '',
    password: '', 
    loginStatus: false,
    errMess: '', 
    isLoading: false,
}

export default (state = INITIAL_STATE, action)  => {
    console.log(action)
    switch (action.type) {
        case EMAIL_CHANGED:
            return {...state, email: action.payload}
        case PASSWORD_CHANGED:
            return {...state, password: action.payload}
        case LOGIN_SUCCESS:
            return {...state, loginStatus: true, errMess: ''}
        case LOGIN_FAIL: 
            return {...state, loginStatus: false, errMess: action.payload}
        case SIGN_OUT:
            return {...state, loginStatus: action.payload}
        default: 
            return state
    }
} 