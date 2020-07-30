import {EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, LOGOUT_FAIL, LOADING} from '../../redux/actions/types'

export default authReducer = (state, action) => {
    console.log(action)
    switch (action.type) {
        case EMAIL_CHANGED:
            return {...state, username: action.payload}
        case PASSWORD_CHANGED:
            return {...state, password: action.payload}
        case LOGIN_SUCCESS:
            return {...state, isLoading: false,loginStatus: true, session_id: action.payload}
        case LOGIN_FAIL: 
            return {...state, isLoading: false, loginStatus: false,  errMess: action.payload, session_id: ''}
        case LOGOUT_SUCCESS:
            return {...state, isLoading: false, loginStatus: false, session_id: ''}
        case LOGOUT_FAIL:
            return {...state, isLoading: false, loginStatus: true, errMess: action.payload}
        case LOADING: 
            return {...state, isLoading: true}
        default:
            return state;
    }
};
