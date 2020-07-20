// import 'react-native-gesture-handler';
// import React, {useState, useReducer} from 'react';
// import {StyleSheet, Image, View} from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
// import {MovieProvider} from './src/context/MovieContext';
// import {
//   createDrawerNavigator,
// } from '@react-navigation/drawer';
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


// import LoginScreen from './src/screens/LoginScreen';
// import AccountScreen from './src/screens/AccountScreen';
// import NowPlayingScreen from './src/screens/NowPlayingScreen';
// import Search from './src/screens/Search';
// import MovieScreen from './src/screens/Tab/MovieScreen';
// import FavoriteScreen from './src/screens/Tab/FavoriteScreen';
// import MovieDetail from './src/screens/MovieDetail';
// import CustomDrawerContent from './src/components/CustomDrawerContent'


// const Stack = createStackNavigator();
// const Tab = createMaterialBottomTabNavigator();
// const DrawerNav = createDrawerNavigator();


// const BottomTab = () => {
//   return (
//     <Tab.Navigator shifting={false} activeColor='navy' inactiveColor='gray'  barStyle={{ backgroundColor: 'white' }}>
//       <Tab.Screen name="Movies" component={MovieScreen} options={{
//           tabBarIcon: ({ color }) => (
//             <MaterialCommunityIcons name="filmstrip" color={color} size={26} />
//           ),
//         }} />
//       <Tab.Screen name="Favorite" component={FavoriteScreen} options={{
//           tabBarIcon: ({ color }) => (
//             <MaterialCommunityIcons name="heart" color={color} size={26} />
//           ),
//         }} />
//     </Tab.Navigator>
//   );
// };

// const Home = () => {
//   return (
//     <DrawerNav.Navigator
//       initialRouteName="BottomTab"
//       drawerContent={props => <CustomDrawerContent {...props} />}
//       screenOptions={{swipeEnabled: false}}>
//       <DrawerNav.Screen name="BottomTab" component={BottomTab} />
//       <DrawerNav.Screen name="Profile" component={AccountScreen} />
//       <DrawerNav.Screen name="NowPlaying" component={NowPlayingScreen} />
//     </DrawerNav.Navigator>
//   );
// };

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         initialRouteName="Login"
//         screenOptions={{headerShown: false}}>
//         <Stack.Screen name="Home" component={Home} />
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="MovieDetail" component={MovieDetail} />
//         <Stack.Screen name="Search" component={Search} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default () => {
//   return (
//     <MovieProvider>
//       <App />
//     </MovieProvider>
//   );
// };
