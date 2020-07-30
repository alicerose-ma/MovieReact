import {combineReducers} from 'redux'
import AuthReducer from './AuthReducer'
import RootReducer from './RootReducer'

export default combineReducers({
    auth: AuthReducer,
    root: RootReducer,
})

