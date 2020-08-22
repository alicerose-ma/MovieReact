import React, { memo, useLayoutEffect, useContext } from 'react'
import { StyleSheet, Text, View, Button} from 'react-native'
import Loading from '../../redux/componentRedux/Loading'
import {
    StateContext as AuthStateContext, 
    DispatchContext as AuthDispatchContext
} from '../../../src/context/AuthContext'


const Home = (props) => {
    // const { session_id } = props.route.params
    const state = useContext(AuthStateContext)
    const {logoutUser} = useContext(AuthDispatchContext)

    useLayoutEffect(() => {   
        if (!state.loginStatus) {
            props.navigation.navigate('Auth')
        }
    }, [state.loginStatus])

    console.log("home state", state)
    return (
        <View style={{ flex: 1, justifyContent: 'center'}}>
            <Text>HOME</Text>
            <Text>{state.session_id}</Text>
            <Button title="Go Back" onPress={()=>logoutUser(state.session_id)} />
            { state.isLoading ? <Loading /> : null}
        </View>
    )
}




export default memo(Home)

const styles = StyleSheet.create({})