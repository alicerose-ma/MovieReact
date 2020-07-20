import React, {memo, useState} from 'react';
import { View, StyleSheet} from 'react-native';
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

const CustomDrawerContent = props => {
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
      key: 'nowPlaying',
      icon: 'filmstrip',
      label: 'Now Playing',
      naviTo: 'NowPlaying',
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
          {drawerItems}
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

export default memo(CustomDrawerContent);


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