import 'react-native-gesture-handler';
import React, {useState, useReducer, memo} from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import { connect, useDispatch } from 'react-redux'
import {
  createDrawerNavigator,
} from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import LoginScreen from './src/screens/LoginScreen';
import AccountScreen from './src/screens/AccountScreen';
import MovieListScreen from './src/screens/MovieListScreen';
import Search from './src/screens/Search';
import MovieScreen from './src/screens/Tab/MovieScreen';
import FavoriteScreen from './src/screens/Tab/FavoriteScreen';
import MovieDetail from './src/screens/MovieDetail';
import CustomDrawerContent from './src/components/CustomDrawerContent'
import AsyncStorage from '@react-native-community/async-storage';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from './src/reducer/index'
import sagas from './src/sagas/sagas'
import WatchListScreen from './src/screens/Tab/WatchListScreen';
import CreateNewList from './src/screens/CreateNewList';
import movieDB from './src/api/movieDB';
import MovieListDetail from './src/screens/MovieListDetail';
import AddMovieToList from './src/screens/AddMovieToList';
import Loading from './src/components/Loading';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const DrawerNav = createDrawerNavigator();


const BottomTab = () => {
  return (
    <Tab.Navigator shifting={false} activeColor='navy' inactiveColor='gray'  barStyle={{ backgroundColor: 'white' }}>
      <Tab.Screen name="Movies" component={MovieScreen} options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="filmstrip" color={color} size={26} />
          ),
        }} />
      <Tab.Screen name="Favorite" component={FavoriteScreen} options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="heart" color={color} size={26} />
          ),
        }} />
      <Tab.Screen name="Watchlist" component={WatchListScreen} options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bookmark" color={color} size={26} />
          ),
        }} />
    </Tab.Navigator>
  );
};

const ConnectedComponent = connect(mapStateToProps)(memo(Home))

const Home = () => {
  const [privateLoading, setprivateLoading] = useState(false)
  const action = (res) => {
    res === 'start' ? setprivateLoading(true) : setprivateLoading(false)
  }

  return (
    <View style={{flex: 1}}>
    <DrawerNav.Navigator
      initialRouteName="BottomTab"
      drawerContent={props => <CustomDrawerContent {...props} cb={action}/>}
      screenOptions={{swipeEnabled: false}}>
      <DrawerNav.Screen name="BottomTab" component={BottomTab} />
      <DrawerNav.Screen name="Profile" component={AccountScreen} /> 
      <DrawerNav.Screen name="MovieListScreen" component={MovieListScreen} />
    </DrawerNav.Navigator>
    {privateLoading ? <Loading /> : null}
    </View>
  );
};

const mapStateToProps = state => {
  return {
    isLoading: state.root.isLoading,
  }
}

export {ConnectedComponent as Home};



// const getLoginData = async () => {
//   const username = await AsyncStorage.getItem('username')
//   const password = await AsyncStorage.getItem('username')
//     try {
//     console.log("LOGIN", 'username', username, "  password = ", password);
//     if (username !== null && password !=null ){
//       return 'Home'
//     } else {
//       return 'Login'
//     }
//     } catch (e) {
//       console.log("can not get login data", e);
//     }
//   }

const App = () => { 
  return (
      <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'Login'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="MovieDetail" component={MovieDetail} />
       
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="CreateNewList" component={CreateNewList} options={{animationEnabled: false}} />
        <Stack.Screen name="MovieListDetail" component={MovieListDetail} />
        {/* <Stack.Screen name="AddMovieToList" component={AddMovieToList} />  */}
        </Stack.Navigator>
    </NavigationContainer>
  );
};


const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, {}, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(sagas)

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
