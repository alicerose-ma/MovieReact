import React, {useState, memo, useEffect} from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import CustomStatusBar from '../components/CustomStatusBar';
import {ScrollView} from 'react-native-gesture-handler';
import AccountTextDetail from '../components/AccountTextDetail';

const ACCOUNT = {
  name: 'Alice',
  password: '123',
  address: 'ABC',
  phone: '09xxx',
  image_avatar:
    'https://happyflower.vn/app/uploads/2019/11/Dau_SnowWhite_2.jpg',
};

const AccountScreen = () => {
  const [account, setAccount] = useState({});

  useEffect(() => {
    setAccount(ACCOUNT);
  }, [account]);

  return (
    <>
      <CustomStatusBar backgroundColor="#90CAF9" barStyle="dark-content" />
      <CustomHeader title="Account" leftButtonName="bars" />
        <ScrollView style={styles.scrollStyle}>
            <Image style={styles.avatar} source={{uri: account.image_avatar}} />
            <AccountTextDetail title="Name" isHidden={false} value={account.name} placeHolder="Your Name"/>
            <AccountTextDetail title="Password" isHidden={true} value={account.password} placeHolder="Password"/>
            <AccountTextDetail title="Address" isHidden={false} value={account.address} placeHolder="Address"/>
            <AccountTextDetail title="Phone" isHidden={false} value={account.phone} placeHolder="Your Phone"/>
        </ScrollView>
    </>
  );
};

export default memo(AccountScreen);

const styles = StyleSheet.create({
  scrollStyle: {
    marginBottom: 20,
    backgroundColor: '#d8d8d8',
    marginBottom: 20,
  },

  detailStyle: {
    flex: 1,
    backgroundColor: 'pink',
  },

  avatar: {
    alignSelf: 'center',
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').width / 2,
    resizeMode: 'contain',
    marginBottom: 20,
    marginTop: 15,
  },
});
