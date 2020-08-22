import React, { memo, useLayoutEffect } from 'react'
import { StyleSheet, Text, View, Button} from 'react-native'
import Loading from './Loading'
import { logoutUser } from '../actions/authActions'
import { LOGOUT } from '../actions/types'
import { connect } from 'react-redux'


const Home = (props) => {

    const _goBack = () => {
        // props.logoutUser(props.session_id)
        props._pressLogoutUser(props.session_id)
    }

    useLayoutEffect(() => {
        if (!props.loginStatus) {
            props.navigation.navigate('Login')
        }
    }, [props.loginStatus])

    return (
        <View style={{ flex: 1, justifyContent: 'center'}}>
            <Text>{`login status = ${props.loginStatus}`}</Text>
            <Text>{`isLoading = ${props.isLoading}`}</Text>
            <Text>{props.session_id}</Text>
            <Button title="Go Back" onPress={_goBack} />
            { props.isLoading ? <Loading /> : null}
            <Text>{`errorMessage = ${props.errMess}`}</Text>
            
        </View>
    )
}

const mapDispatchToProps = {
    logoutUser
};


const mapDispatchToProps2 = (dispatch) =>({
    _pressLogoutUser: (session_id) => {
        dispatch({type: LOGOUT, payload: {session_id}})
    }
});

const mapStateToProps = state => {
    return {
        loginStatus: state.auth.loginStatus,
        session_id: state.auth.session_id,
        isLoading: state.root.isLoading,
        errMess: state.auth.errMess,
    }
}

export default connect(mapStateToProps, mapDispatchToProps2)(memo(Home))

const styles = StyleSheet.create({})