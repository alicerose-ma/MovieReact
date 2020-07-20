import React, { Component } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import reducers from './src/redux/reducers/index'
import LoginForm from './src/redux/componentRedux/LoginForm'
import HomeScreen from './src/redux/componentRedux/Home'
import { View, Text } from 'react-native';
import ReduxThunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import { Button } from 'react-native-paper';
// import rootSaga from

const Stack = createStackNavigator();
const sagaMiddleware = createSagaMiddleware();

// sagaMiddleware.run()

const Redux = () => {
  const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))
  // const store = createStore(reducers, {}, applyMiddleware(sagaMiddleware))

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};


const LoginScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <LoginForm />
    </View>
  )
}


export default Redux;

