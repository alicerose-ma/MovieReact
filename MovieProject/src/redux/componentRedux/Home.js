import React , {memo} from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { signout } from '../actions'
import { connect } from 'react-redux'


const Home = (props) => {
    const navigation = useNavigation()
  
    const _goBack = () => {
        navigation.navigate('Login')
        props.signout()
    }

    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text>This is home screen</Text>
        <Button title="Go Back" onPress={_goBack} />
        <Text>{`status = ${props.loginStatus}`}</Text>
      </View>
    )
}

const mapDispatchToProps = {
    signout
};
  

const mapStateToProps = state => {
    return {
        loginStatus: state.auth.loginStatus,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(Home))

const styles = StyleSheet.create({})