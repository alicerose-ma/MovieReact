
import React, { useEffect, useLayoutEffect, useState, memo } from 'react';
import { connect, useDispatch } from 'react-redux'


import { Text, StyleSheet, View, StatusBar, Keyboard, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import FormInputText from '../components/FormInputText';
import CustomButton from '../components/CustomButton';
import { startLoading, stopLoading, toggleNetwork, createSessionId } from '../actions/rootActions'
import Loading from '../components/Loading';
import DefaultError from '../components/DefaultError';
import NetInfo from "@react-native-community/netinfo";
import { ACCOUNT_TYPE } from '../commons/types'
import { loadHomeDependsOnNetwork } from '../commons/commonAction'
import CustomStatusBar from '../components/CustomStatusBar';
// import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import DismissKeyboard from '../components/DismissKeyboard';

const LoginScreen = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errMess, setErrMess] = useState('')
  const dispatch = useDispatch()
  const [privateLoading, setprivateLoading] = useState(false)

  // register login
  useEffect(() => {
    const registerNetwork = NetInfo.addEventListener(state => {
      dispatch(toggleNetwork(state.isConnected))
      // console.log(("is Connected", state.isConnected));
    });
    return () => {
      registerNetwork()
    }
  }, []);

  useEffect(() => {
    if (props.availableNetwork) {
      // dispatch(startLoading())
      getLoginData()
    }
  }, [props.availableNetwork])

  const login = () => {
    Keyboard.dismiss()
    setprivateLoading(true)
    dispatch(startLoading())
    dispatch({
      type: ACCOUNT_TYPE.LOGIN, payload: {
        username: username,
        password: password,
        cb: (res) => {
          dispatch(stopLoading())
          setprivateLoading(false)
          if (!res.success) {
            setErrMess(res.errMessage)
          } else {
            setErrMess(false)
            setValue(username, password, res.data.session_id)
            // dispatch(createSessionId(sessionId))
          }
        }
      }
    })
  }

  // console.log("SESSION ID", props.sessionId);

  const setValue = async (username, password, sessionId) => {
    try {
      await AsyncStorage.setItem('username', username);
      await AsyncStorage.setItem('password', password);
      await AsyncStorage.setItem('sessionId', sessionId);
      await props.navigation.navigate("Home")
    } catch (e) {
      console.log("can not store login data", e);
    }
  }

  const getLoginData = async () => {
    try {
      const username = await AsyncStorage.getItem('username')
      const password = await AsyncStorage.getItem('password')
      const sessionId = await AsyncStorage.getItem('sessionId')
      // const username = null
      // const password = null
      // console.log("LOGIN", username, password, sessionId);
      dispatch(stopLoading())
      if (username !== null && password != null) {
        // console.log("LOGIN", props.sessionId);
        props.navigation.navigate("Home")

      }
    } catch (e) {
      console.log("can not get login data", e);
    }
  }

  const handleErr = () => {
    return (
      <TouchableWithoutFeedback
          onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        <CustomStatusBar backgroundColor="#90CAF9" />
        <StatusBar barStyle="dark-content" />
        
          <View style={styles.container}>
            <FormInputText
              placeHolder="username"
              isHidden={false}
              onTermChange={text => setUsername(text)}
            />
            <FormInputText
              placeHolder="password"
              isHidden={true}
              onTermChange={text => setPassword(text)}
            />
            <CustomButton buttonTitle="Login" pressButton={() => login()} />
            {errMess ? (
              <Text style={styles.errorMessageStyle}>
                {errMess}
              </Text>
            ) : null}
          </View>
     
      </View>
         </TouchableWithoutFeedback>
    )
  }


  return (
    <>
      {loadHomeDependsOnNetwork(props.availableNetwork, loadHomeDependsOnNetwork, handleErr)}
      {props.isLoading ? <Loading /> : null}
    </>
  );
}

const mapStateToProps = state => {
  return {
    isLoading: state.root.isLoading,
    availableNetwork: state.root.availableNetwork,
    sessionId: state.root.sessionId
  }
}

export default connect(mapStateToProps)(memo(LoginScreen));


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 50,
  },

  errorMessageStyle: {
    color: 'red',
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
});


