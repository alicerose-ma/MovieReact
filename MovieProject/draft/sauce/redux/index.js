import {combineReducers} from 'redux'
import configStore from '../../sauce/redux/store'
import { reducer as authReducer } from './auth.redux'
import rootSaga from '../saga'


export default () => {
    const appReducer = combineReducers({
        auth: authReducer ,
    })   

    const rootReducer = (state, action) => {
        return appReducer(state, action)
    }

    return configStore(rootReducer, rootSaga)
}


