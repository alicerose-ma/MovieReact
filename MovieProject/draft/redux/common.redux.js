export function finishAPI(state, res) {
    if (state && res){
        if (res.success === true) {
            return { ...state, loginStatus: true, session_id: res.data.session_id }
        } else {
            return { ...state, loginStatus: false, errMess: res.errMessage, session_id: '' }
        }
    }
}
