import { all, call, put, takeEvery, takeLatest, take } from 'redux-saga/effects'
import { callSagaAPI, successResponse, failResponse } from '../api/sagaApi'
import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    LOGIN, LOGOUT
} from '../actions/types'
import { stopLoading , startLoading} from '../actions/rootActions'
import {loginSuccess, loginFail, logoutSuccess, logoutFail, finishAPI} from '../actions/authActions'
import { act } from 'react-test-renderer'

function* login(action) {
    try {
        const tokenResponse = yield call(callSagaAPI('/authentication/token/new?', 'get', null))
        const tokenDataAfterFormat = successResponse('/authentication/token/new?', tokenResponse)
        // console.log('[login tokenResponse]', tokenResponse, tokenDataAfterFormat, action.payload.email, action.payload.password)
        if (tokenDataAfterFormat.success === true) {
            try {
                const validResponse = yield call(callSagaAPI('/authentication/token/validate_with_login?', 'post', {
                    username: action.payload.email,
                    password: action.payload.password,
                    request_token: tokenDataAfterFormat.data.request_token
                }))
                const validDataAfterFormat = successResponse('/authentication/token/validate_with_login?', validResponse)
                if (validDataAfterFormat.success === true) {
                    try {
                        const sessionID = yield call(callSagaAPI('/authentication/session/new?', 'post', {
                            request_token: tokenDataAfterFormat.data.request_token
                        }))
                        const sessionDataAfterFormat = successResponse('/authentication/session/new?', sessionID)
                        yield put(stopLoading())
                        if (sessionDataAfterFormat.success === true) {
                            yield put(loginSuccess(sessionDataAfterFormat.data))
                        } else {
                            yield put(loginFail(sessionDataAfterFormat))
                        }
                        // yield put(finishAPI(sessionDataAfterFormat))
                    } catch (error) {
                        yield put(stopLoading())
                        const sessionDataAfterFormat = failResponse('/authentication/session/new?', error)
                        yield put(loginFail(sessionDataAfterFormat))
                    }
                } else {
                    yield put(stopLoading())
                    yield put(loginFail(validDataAfterFormat))
                }
            } catch (error) {
                yield put(stopLoading())
                const validDataAfterFormat = failResponse('/authentication/token/validate_with_login?', error)
                yield put(loginFail(validDataAfterFormat))
            }
        } else {
            yield put(stopLoading())
            yield put(loginFail(tokenDataAfterFormat))
        }
    } catch (error) {
        const tokenDataAfterFormat = failResponse('/authentication/token/new?', error)
        yield put(stopLoading())
        yield put(loginFail(tokenDataAfterFormat))
    }
}


function* logout(action) {
    try {
        const response = yield call(callSagaAPI('authentication/session?', 'delete', {session_id: action.payload.session_id}))
        const responseAfterFormat = successResponse('authentication/session?', response)
        if (responseAfterFormat.success === true) {
            yield put(stopLoading())
            yield put(logoutSuccess());
        } else {
            yield put(stopLoading())
            yield put(logoutFail(responseAfterFormat))
        }
    } catch (error) {
        yield put(stopLoading())
        const responseAfterFormat = failResponse('authentication/session?', error)
        yield put(logoutFail(responseAfterFormat))
    }
}

function* authSaga() {
    yield all([
        yield takeLatest(LOGIN, login),
        yield takeLatest(LOGOUT, logout)
    ])
}

export default authSaga;