import 'react-native-gesture-handler';
import * as React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import LoginScreen from './src/screens/LoginScreen';
import AccountScreen from './src/screens/AccountScreen';
import NowPlayingScreen from './src/screens/NowPlayingScreen';
import Search from './src/screens/Search';
import MovieScreen from './src/screens/Tab/MovieScreen';
import FavoriteScreen from './src/screens/Tab/FavoriteScreen';
import MovieDetail from './src/screens/MovieDetail';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const DrawerWithLogoutButton = props => {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.contentStyle}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={() => props.navigation.popToTop()}
        style={styles.drawerItemStyle}
      />
    </DrawerContentScrollView>
  );
};

const BottomTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Movie" component={MovieScreen} />
      <Tab.Screen name="Favorite" component={FavoriteScreen} />
    </Tab.Navigator>
  );
};

const Home = () => {
  return (
    <Drawer.Navigator
      initialRouteName="BottomTab"
      drawerContent={props => <DrawerWithLogoutButton {...props} />}
      screenOptions={{swipeEnabled: false}}>
      <Drawer.Screen name="Account" component={AccountScreen} />
      <Drawer.Screen
        name="BottomTab"
        component={BottomTab}
        options={{title: 'Home'}}
      />
      <Drawer.Screen name="Now Playing" component={NowPlayingScreen} />
    </Drawer.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="MovieDetail" component={MovieDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    marginBottom: 40,
    marginLeft: 10,
  },

  contentStyle: {
    flex: 1,
  },

  drawerItemStyle: {
    position: 'absolute',
    bottom: 30,
  },
});
