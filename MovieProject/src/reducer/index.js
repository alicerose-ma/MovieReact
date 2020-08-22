import {combineReducers} from 'redux'
// import AuthReducer from './AuthReducer'
import RootReducer from './RootReducer'
import MovieReducer from './MovieReducer'

export default combineReducers({
    // auth: AuthReducer,
    root: RootReducer,
    movie: MovieReducer,
})

