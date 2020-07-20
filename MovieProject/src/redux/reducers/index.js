import {combineReducers} from 'redux'
import LibraryReducer from './LibraryReducer'
import AuthReducer from './AuthReducer'

export default combineReducers({
    auth: AuthReducer
})

//console.log(store.getState())
// {libraries: []}