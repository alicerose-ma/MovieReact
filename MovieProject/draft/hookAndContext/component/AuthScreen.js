import React, { memo, useLayoutEffect, useContext } from 'react'
import { View ,StyleSheet , Keyboard, Text} from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import {
    StateContext as AuthStateContext, 
    DispatchContext as AuthDispatchContext
} from '../../../src/context/AuthContext'

import Loading from '../../redux/componentRedux/Loading'


const AuthScreen = ({navigation}) =>  {
    // const {state , addBlogPost, deleteBlogPost} = useContext(BlogContext);
    const state = useContext(AuthStateContext)
    const {usernameChanged, passwordChanged, loginUser } = useContext(AuthDispatchContext)

    console.log("state" , state)

    useLayoutEffect(() => {
        if (state.loginStatus) {
            navigation.navigate('Home')
        }
    }, [state.loginStatus])

    return (
        <View style={{flex: 1}} >
        <View style={styles.container}>
            <TextInput label="Username" placeholder="username" onChangeText={usernameChanged} />
            <TextInput secureTextEntry={true} label="Password" placeholder="password" onChangeText={passwordChanged} />
            <Button onPress={() => loginUser(state.username, state.password)}>Login</Button>
            {state.errMess ? <Text>{state.errMess}</Text> : null}
            {state.request_token ? <Text>{state.request_token}</Text> : null}
        </View>
        { state.isLoading ? <Loading /> : null}
    </View>
    )
}

export default AuthScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20, 
        justifyContent: 'center',
    },

})
