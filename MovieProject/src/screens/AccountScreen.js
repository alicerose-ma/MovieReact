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
  }, []);

  return (
    <>
      <CustomStatusBar backgroundColor="#90CAF9" barStyle="dark-content" />
      <CustomHeader title="Account" leftButtonName="bars" />
      <View style={styles.container}>
        <Image style={styles.avatar} source={{uri: account.image_avatar}} />
        <ScrollView style={styles.scrollStyle}>
            <AccountTextDetail title="Name" isHidden={false} value={account.name} placeHolder="Your Name"/>
            <AccountTextDetail title="Password" isHidden={true} value={account.password} placeHolder="Password"/>
            <AccountTextDetail title="Address" isHidden={false} value={account.address} placeHolder="Address"/>
            <AccountTextDetail title="Phone" isHidden={false} value={account.phone} placeHolder="Your Phone"/>
        </ScrollView>
      </View>
    </>
  );
};

export default memo(AccountScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
    backgroundColor: '#d8d8d8',
  },

  scrollStyle: {
    marginBottom: 20,
    borderWidth: 4,
    borderColor: 'green',
  },

  detailStyle: {
    flex: 1,
    backgroundColor: 'pink',
  },

  avatar: {
    alignSelf: 'center',
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').width / 2,
    borderColor: 'red',
    borderWidth: 3,
    resizeMode: 'contain',
    marginBottom: 20,
    marginTop: 15,
  },
});
