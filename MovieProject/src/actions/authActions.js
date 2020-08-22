// import {checkUserLogin, checkUserLogout} from '../../draft/redux/api/apiServices'

// import {
//     EMAIL_CHANGED,
//     PASSWORD_CHANGED,
//     LOGIN_SUCCESS,
//     LOGIN_FAIL,
//     LOGOUT_SUCCESS,
//     LOGOUT_FAIL,
//     FINISH_API
// } from '../../draft/redux/actions/types'

// export const emailChanged = text => {
//     return {
//         type: EMAIL_CHANGED,
//         payload: text
//     }
// }

// export const passwordChanged = text => {
//     return {
//         type: PASSWORD_CHANGED,
//         payload: text
//     }
// }

// export const finishAPI = data => {
//         return {
//         type: FINISH_API,
//         payload: data
//     }
// }

// export const loginSuccess = data => {
//     return {
//         type: LOGIN_SUCCESS,
//         payload: data
//     }
// }


// export const loginFail = data => {
//     return {
//         type: LOGIN_FAIL,
//         payload: data
//     }
// }

// export const logoutSuccess = () => {
//     return {
//         type: LOGOUT_SUCCESS,
//     }
// }

// export const logoutFail = data => {
//     return {
//         type: LOGOUT_FAIL,
//         payload: data
//     }
// }

// export const loginUser = (username, password) => {
//     return (dispatch) => {
//         checkUserLogin(username, password, dispatch)      
//     }
// }

// export const logoutUser = (session_id) => {
//     return (dispatch) => {
//         checkUserLogout(session_id, dispatch)   
//     }
// }

// // thunk
// // export const loginSuccess = data => {
// //     return {
// //         type: LOGIN_SUCCESS,
// //         payload: data
// //     }
// // }


// // export const loginFail = errMessage => {
// //     return {
// //         type: LOGIN_FAIL,
// //         payload: errMessage
// //     }
// // }
