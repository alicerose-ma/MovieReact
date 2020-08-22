import { ROOT_TYPE } from '../commons/types'

const INITIAL_STATE = {
    isLoading: false,
    availableNetwork: undefined,
    sessionId: undefined,
    account: {},
}

export default RootReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ROOT_TYPE.START_LOADING:
            // console.log('start loading movie');
            return { ...state, isLoading: true }
        case ROOT_TYPE.STOP_LOADING:
            // console.log('stop loading movie');
            return { ...state, isLoading: false }
        case ROOT_TYPE.NETWORK_TOGGLE:
            // console.log(action.payload.availableNetwork)
            return { ...state, availableNetwork: action.payload.availableNetwork }
        case ROOT_TYPE.CREATE_SESSION_ID:
            // console.log("[session ID]",action.payload.sessionId)
            return { ...state, sessionId: action.payload.sessionId }
        case ROOT_TYPE.DELETE_SESSION_ID:
            return { ...state, sessionId:  ''}
            case ROOT_TYPE.UPDATE_ACCOUNT_DETAIL:
                return { ...state, account: action.payload.account}
        default:
            return state;
    }
};
