import React, { useState, memo, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import CustomStatusBar from '../components/CustomStatusBar';
import { ScrollView } from 'react-native-gesture-handler';
import AccountTextDetail from '../components/AccountTextDetail';
import { connect, useDispatch } from 'react-redux'
import DefaultError from '../components/DefaultError';
import { loadHomeDependsOnNetwork } from '../commons/commonAction'



const AccountScreen = (props) => {
  const getAvatar = () => {
    if (props.account.avatar) {
      return `https://secure.gravatar.com/avatar/${props.account.avatar.gravatar.hash}?s=600`
    }
    return 'https://i.stack.imgur.com/l60Hf.png'
  }

  const handleErr = () => {
    return (
      <ScrollView style={styles.scrollStyle}>
        <Image style={styles.avatar} source={{ uri: getAvatar() }} />
        <View style={styles.detailStyle}>
          <AccountTextDetail title="ID" isHidden={false} value={props.account.id} placeHolder="ID" />
          <AccountTextDetail title="Name" isHidden={false} value={props.account.name} placeHolder="Name" />
          <AccountTextDetail title="Username" isHidden={false} value={props.account.username} placeHolder="Username" />
        </View>
      </ScrollView>
    )
  }

  return (
    <>
      <CustomStatusBar backgroundColor="#90CAF9" barStyle="dark-content" />
      <CustomHeader title="Account" leftButtonName="bars" />
      {loadHomeDependsOnNetwork(props.availableNetwork, loadHomeDependsOnNetwork, handleErr)}
    </>
  );
};
const mapStateToProps = state => {
  return {
    account: state.root.account,
    availableNetwork: state.root.availableNetwork,
  }
}
export default connect(mapStateToProps)(memo(AccountScreen));


const styles = StyleSheet.create({
  scrollStyle: {
    marginBottom: 20,
    backgroundColor: '#d8d8d8',
    marginBottom: 20,
  },

  detailStyle: {
    flex: 1,
    margin: 10,
  },

  avatar: {
    alignSelf: 'center',
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').width / 2,
    resizeMode: 'contain',
    marginBottom: 15,
    marginTop: 15,
    borderRadius: 200
  },
});
