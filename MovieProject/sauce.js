import 'react-native-gesture-handler';
import React from 'react'
import { View, Text } from 'react-native'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import LoginScreen from './src/sauce/screens/Login'
import HomeScreen from './src/sauce/screens/Home'

import configStore from './src/sauce/redux'

const Stack = createStackNavigator();
const store = configStore()

const Sauce = () => {
    return (
        <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator 
            initialRouteName="Login"
            screenOptions={{headerShown: false}} >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
       </Provider>
    );
  };

export default Sauce;