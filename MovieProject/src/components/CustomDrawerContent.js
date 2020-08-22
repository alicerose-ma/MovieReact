import React, {memo, useState} from 'react';
import { View, StyleSheet, Platform} from 'react-native';
import { connect, useDispatch } from 'react-redux'
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
} from 'react-native-paper';
import {
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { ROOT_TYPE, ACCOUNT_TYPE } from '../commons/types';
import { runSaga } from 'redux-saga';
import { startLoading, stopLoading, toggleNetwork } from '../actions/rootActions'
import Loading from './Loading';
import AsyncStorage from '@react-native-community/async-storage';

const CustomDrawerContent = props => {

  // console.log("props", props.cb());
  const dispatch = useDispatch()
  const drawerArr = [
    {
      key: 'home',
      icon: 'home',
      label: 'Home',
      naviTo: 'BottomTab',
    },
    {
      key: 'account',
      icon: 'account',
      label: 'Account',
      naviTo: 'Profile',
    },
    {
      key: 'movieList',
      icon: 'filmstrip',
      label: 'Movie List',
      naviTo: 'MovieListScreen',
    },
  ];

  const [active, setActive] = useState('home');

  const drawerItems = drawerArr.map(drawerItem => {
    return (
      <CustomDrawerItem
        key={drawerItem.key}
        tag={drawerItem.key}
        label={drawerItem.label}
        icon={drawerItem.icon}
        navigation={props.navigation}
        naviTo={drawerItem.naviTo}
        active={active}
        updateActive={(newActive) => setActive(newActive)}
      />
    );
  });

  const logout = () => {
    props.cb("start")
    // dispatch(startLoading())
    dispatch({type: ACCOUNT_TYPE.LOGOUT, payload: {
      sessionId: props.sessionId, 
      cb: (res) => {
        // console.log("RES", res);
        // dispatch(stopLoading())
        if (res.success) {
          props.cb("stop")
          // console.log("nav", props.navigation);
          props.navigation.popToTop()

        }
    }}})
  }

  const getAvatar = () => {
    if (props.account.avatar) {
      return `https://secure.gravatar.com/avatar/${props.account.avatar.gravatar.hash}`
    }
    return 'https://i.stack.imgur.com/l60Hf.png'
  }

  return (
    <>
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={{marginBottom: 20}}>
          <View style={styles.userContent}>
            <Avatar.Image
            source={{
              uri: getAvatar()
            }}
            size={50}
            />
            <View style={styles.userInfo}>
            <Title>{props.account.name ? props.account.name : '' }</Title>
              <Caption>{props.account.username ? props.account.username : ''}</Caption>
            </View>
          </View>
          <View style={styles.memberShip}>
            <Caption style={styles.caption}>Member ID</Caption>
            <Paragraph style={styles.paragraph}>{props.account.id}</Paragraph>
          </View>
        </View>
        <Drawer.Section>
          {drawerItems}
        </Drawer.Section>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() =>  { 
            AsyncStorage.clear();
            logout() 
          }}
        />
      </Drawer.Section>
    </View>
 
    </>
  );
};


const CustomDrawerItem = ({tag, label, icon, navigation, naviTo, active, updateActive}) => {
  return (
    <View>
      <Drawer.Item
        icon={({color, size}) => <Icon name={icon} color={color} size={size} />}
        label={label}
        onPress={() => {
          navigation.navigate(`${naviTo}`);
          updateActive(tag)
        }}
        active={active == tag}
        theme={{colors: {primary: "#1F75FE"}}}
      />
    </View>
  );
};

const mapStateToProps = state => {
  return {
    sessionId: state.root.sessionId,
    isLoading: state.root.isLoading,
    account: state.root.account,
  }
}
export default connect(mapStateToProps)(memo(CustomDrawerContent));



const styles = StyleSheet.create({
  drawerSection: {
    marginTop: 15,
  },

  userContent: {
    paddingLeft: 30,
    flexDirection: 'row',
  },

  userInfo: {
    paddingLeft: 20,
    paddingRight: 80,
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
    marginLeft: 20
  },

  memberShip: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
  },
});