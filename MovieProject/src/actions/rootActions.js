import {
     ROOT_TYPE
} from '../commons/types'
import { acc } from 'react-native-reanimated'


export const startLoading = () => {
    return {
        type: ROOT_TYPE.START_LOADING
    }
}

export const stopLoading = () => {
    return {
        type: ROOT_TYPE.STOP_LOADING
    }
}

export const toggleNetwork = (isConnected) => {
    return {
        type: ROOT_TYPE.NETWORK_TOGGLE,
        payload: {availableNetwork: isConnected}
    }
}

export const createSessionId = (sessionId) => {
    return {
        type: ROOT_TYPE.CREATE_SESSION_ID,
        payload: {sessionId: sessionId}
    }
}

export const deleteSessionId = () => {
    return {
        type: ROOT_TYPE.DELETE_SESSION_ID
    }
}

export const updateAccountDetail = (result) => {
    return {
        type: ROOT_TYPE.UPDATE_ACCOUNT_DETAIL, 
        payload: {account: result.data}
    }
}





