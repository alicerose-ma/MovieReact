import React, { memo, useLayoutEffect, useEffect } from 'react'
import { View, Text, StyleSheet , Keyboard} from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { connect } from 'react-redux'
import { emailChanged, passwordChanged, loginUser } from '../../../src/actions/authActions'
import { startLoading} from  '../../../src/actions/rootActions'
import { useNavigation } from '@react-navigation/native';
import { LOGIN } from '../actions/types'
import Loading from './Loading'

const LoginForm = props => {
    const { email, password } = props
    const navigation = useNavigation();

    const _onEmailChanged = text => {
        props.emailChanged(text)
    }

    const _onPasswordChanged = text => {
        props.passwordChanged(text)
    }

    const _onButtonPressed = () => {
        Keyboard.dismiss()
        props._pressLoginUser(email, password)
    }

    useLayoutEffect(() => {
        if (props.loginStatus) {
            navigation.navigate('Home', {
                session_id: props.session_id
            })
        }
    }, [props.loginStatus])


    const _onButtonPressed1 = () => {
        props._pressLoginUser1(email, password)
    }

    return (
        <View style={{flex: 1}} >
            <View style={styles.container}>
                <TextInput label="Username" value={props.email} placeholder="username" onChangeText={props._onEmail} />
                <TextInput secureTextEntry={true} value={props.password} label="Password" placeholder="password" onChangeText={props._onPassword} />
                <Button onPress={_onButtonPressed1}>Login</Button>
                {props.errMess ? <Text>{props.errMess}</Text> : null}
                {props.request_token ? <Text>{props.request_token}</Text> : null}
            </View>
            { props.isLoading ? <Loading /> : null}
            <Text>{`errorMessage = ${props.errMess}`}</Text>
        </View>
    )
}

const mapDispatchToProps = dispatch => ({
    _onEmail: text => dispatch(emailChanged(text)),
    _onPassword: text => dispatch(passwordChanged(text)),
    _pressLoginUser: (email, password) => {
        dispatch(startLoading())
        dispatch(loginUser(email, password))
    },
    // saga
    _pressLoginUser1: (email, password) => {
        dispatch(startLoading())
        dispatch({type: LOGIN, payload: {email, password}})
        // dispatch({type: LOGIN, payload: {email: "Alicerose19th", password: "Alicedep1"}})
    },
})

const mapDispatchToProps2 = {
    emailChanged,
    passwordChanged,
    loginUser
};


const mapStateToProps = state => {
    return {
        email: state.auth.email,
        password: state.auth.password,
        loginStatus: state.auth.loginStatus,
        errMess: state.auth.errMess,
        session_id: state.auth.session_id,
        isLoading: state.root.isLoading,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(LoginForm))

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20, 
        justifyContent: 'center',
    },

})
