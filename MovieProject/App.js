import 'react-native-gesture-handler';
import React, {useState, useReducer} from 'react';
import {StyleSheet, Image, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import {MovieProvider} from './src/context/MovieContext';
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomDrawerItem from './src/components/CustomDrawerItem';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const DrawerNav = createDrawerNavigator();

const CustomDrawerContent = props => {
  const [drawerArr, setDrawerArr] = useState([
    {
      id: 1,
      icon: 'home',
      label: 'Home2',
      naviTo: 'BottomTab',
      status: true,
    },
    {
      id: 2,
      icon: 'account',
      label: 'Account2',
      naviTo: 'Profile',
      status: false,
    },
    {
      id: 3,
      icon: 'filmstrip',
      label: 'Now Playing 2',
      naviTo: 'NowPlaying',
      status: false,
    },
  ]);

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={{marginBottom: 20}}>
          <View style={styles.userContent}>
            <Avatar.Image
              source={{
                uri:
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQTdCoprhau34VQywFn96jHOVdaIbprk6neww&usqp=CAU',
              }}
              size={50}
            />
            <View style={styles.userInfo}>
              <Title>Emily</Title>
              <Caption>Alien</Caption>
            </View>
          </View>
          <View style={styles.memberShip}>
            <Caption style={styles.caption}> Member Card ID</Caption>
            <Paragraph style={styles.paragraph}>09090909090909090</Paragraph>
          </View>
        </View>
        <Drawer.Section>
          {drawerArr.map(drawerItem => {
            return (
              <CustomDrawerItem
                id={drawerItem.id}
                label={drawerItem.label}
                icon={drawerItem.icon}
                navigation={props.navigation}
                naviTo={drawerItem.naviTo}
              />
            );
          })}
        </Drawer.Section>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => props.navigation.popToTop()}
        />
      </Drawer.Section>
    </View>
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
    <DrawerNav.Navigator
      initialRouteName="BottomTab"
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{swipeEnabled: false}}>
      <DrawerNav.Screen name="BottomTab" component={BottomTab} />
      <DrawerNav.Screen name="Profile" component={AccountScreen} />
      <DrawerNav.Screen name="NowPlaying" component={NowPlayingScreen} />
      <DrawerNav.Screen name="Search" component={Search} />
    </DrawerNav.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MovieDetail" component={MovieDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default () => {
  return (
    <MovieProvider>
      <App />
    </MovieProvider>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    marginBottom: 40,
    marginLeft: 10,
  },

  drawerItemStyle: {
    position: 'absolute',
    bottom: 30,
  },

  drawerIcon: {
    width: 25,
    height: 25,
  },

  drawerSection: {
    marginTop: 15,
  },

  userContent: {
    paddingLeft: 30,
    flexDirection: 'row',
  },

  userInfo: {
    paddingLeft: 20,
  },

  bottomDrawerSection: {
    marginBottom: 15,
    marginLeft: 10,
  },

  caption: {
    fontSize: 16,
  },

  paragraph: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 3,
  },

  memberShip: {
    alignItems: 'center',
    marginTop: 10,
  },
});



// updateDrawerStatus={id => {
//   drawerArr.map(eachDrawerItem => {
//     if (eachDrawerItem.id === id) {
//       eachDrawerItem.status = true;
//     } else {
//       eachDrawerItem.status = false;
//     }
//   });
// }}
// status={drawerItem.status}




// const [state, dispatch] = useReducer(reducer, {
//   home: true,
//   profile: false,
//   nowplaying: false,
// });

// const {home, profile, nowplaying} = state;

// function _mapDrawerItem() {
//   console.log("mapping");
//   drawerArr.map(drawerItem => {
//     return (
//       <CustomDrawerItem
//         id={drawerItem.id}
//         label={drawerItem.label}
//         icon={drawerItem.icon}
//         navigation={props.navigation}
//         naviTo={drawerItem.naviTo}
//       />
//     );
//   });
// }

{
  /* <DrawerItem
icon={({color, size}) => (
  <Icon name="home" color={color} size={size} />
)}
label="Home"
onPress={() => {
  dispatch({type: 'choose_home'});
  props.navigation.navigate('BottomTab');
}}
focused={home}
activeBackgroundColor="pink"
inactiveBackgroundColor="white"
activeTintColor="black"
inactiveTintColor="gray"
/>
<DrawerItem
icon={({color, size}) => (
  <Icon name="account" color={color} size={size} />
)}
label="Profile"
onPress={() => {
  dispatch({type: 'choose_profile'});
  props.navigation.navigate('Profile');
}}
focused={profile}
activeBackgroundColor="pink"
inactiveBackgroundColor="white"
activeTintColor="black"
inactiveTintColor="gray"
/>
<DrawerItem
icon={({color, size}) => (
  <Icon name="filmstrip" color={color} size={size} />
)}
label="Now Playing"
onPress={() => {
  dispatch({type: 'choose_nowplaying'});
  props.navigation.navigate('NowPlaying');
}}
focused={nowplaying}
activeBackgroundColor="pink"
inactiveBackgroundColor="white"
activeTintColor="black"
inactiveTintColor="gray"
/> */
}

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'choose_home': {
//       return {
//         ...state,
//         home: true,
//         profile: false,
//         nowplaying: false,
//       };
//     }
//     case 'choose_profile': {
//       return {
//         ...state,
//         home: false,
//         profile: true,
//         nowplaying: false,
//       };
//     }
//     case 'choose_nowplaying': {
//       return {
//         ...state,
//         home: false,
//         profile: false,
//         nowplaying: true,
//       };
//     }
//     default: {
//       return {
//         ...state,
//         home: true,
//         profile: false,
//         nowplaying: false,
//       };
//     }
//   }
// };
