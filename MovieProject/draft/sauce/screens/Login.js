import React , {memo, useState} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import LoginActions from '../redux/auth.redux';
import {LoginTypes} from '../redux/auth.redux';
import { TextInput, Button } from 'react-native-paper'

export const Login = (props) => {
    const [username, setUsername] = useState('')

    const usernameChanged = (text) => {
        setUsername(text)
    }
        return (
            <View style={styles.container}>
                <TextInput label="Username" placeholder="username" onChangeText={usernameChanged} />
                {/* <TextInput secureTextEntry={true} value={props.password} label="Password" placeholder="password" onChangeText={props._onPassword} /> */}
                <Button onPress={()=>props.loginRequest(username, 'xyz')}>Login</Button>
            </View>
        )
}

const mapStateToProps = (state) => ({
    fetching: state.auth.fetching,
    status: state.auth.status,
    error: state.auth.error,
    data: state.auth.data,
    currentRequestName: state.auth.currentRequestName,
})

const mapDispatchToProps = dispatch => ({
    loginRequest: (username, password) => dispatch({type: LoginTypes.LOGIN_REQUEST, payload: {username, password}})
    // loginRequest: (username, password) => dispatch(LoginActions.loginRequest(username, password))
})



export default connect(mapStateToProps, mapDispatchToProps)(memo(Login))

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20, 
        justifyContent: 'center'
    }
})

