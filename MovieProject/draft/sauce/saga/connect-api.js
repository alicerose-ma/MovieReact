import { call, put } from 'redux-saga/effects'
import LoginActions from '../redux/auth.redux';
import AuthApi from '../api/AuthApi'

export function* loginRequest(action) {
    console.log('[payload]', action.payload.username)
    let requestName = 'get token'
    const response = yield call(AuthApi.getToken().send);
    console.log('[response]', response)
    
    yield put(LoginActions.finishLoginRequest(true, '', response.data, requestName))
}