import { all, takeLatest } from 'redux-saga/effects';
import { LoginTypes } from '../redux/auth.redux';
import { loginRequest } from './connect-api'

export default function* root() {
    yield all([
        takeLatest(LoginTypes.LOGIN_REQUEST, loginRequest),
    ]);
}