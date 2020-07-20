import React, { memo, useLayoutEffect, useRef } from 'react'
import { View, Text } from 'react-native'
import { TextInput, Button, ActivityIndicator } from 'react-native-paper'
import { connect } from 'react-redux'
import { emailChanged, passwordChanged, loginUser } from '../actions'
import {useNavigation} from '@react-navigation/native';
const LoginForm = props => {
    const {email, password} = props
    const navigation = useNavigation();

    const _onEmailChanged = text => {
        props.emailChanged(text)
    }

    const _onPasswordChanged = text => {
        props.passwordChanged(text)
    }

    const _onButtonPressed = () => {
       props._pressLoginUser(email,password)
    }


    useLayoutEffect(() => {
        if (props.loginStatus) {
            navigation.navigate('Home')
        }
        
    }, [props.loginStatus])
    return (
        <View style={{ margin: 20 }}>
             <Text>{`status= ${props.loginStatus}`}</Text>
            <TextInput label="Username" value={props.email} placeholder="username" onChangeText={props._onEmail} />
            <TextInput secureTextEntry={true} value={props.password} label="Password" placeholder="password" onChangeText={props._onPassword} />
            <Button onPress={_onButtonPressed}>Login</Button>
            <Text>{props.errMess}</Text>
        </View>
    )
}

// Not sure about props email & password
const mapDispatchToProps = dispatch => ({
    _onEmail: text => dispatch(emailChanged(text)),
    _onPassword: text => dispatch(passwordChanged(text)),
    _pressLoginUser: (email, password) => {
        dispatch(loginUser(email, password))
    }
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(LoginForm))

