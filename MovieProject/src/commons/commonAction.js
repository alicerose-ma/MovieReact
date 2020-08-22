import React from 'react';
import DefaultError from '../components/DefaultError';
import { View, TextInput, StyleSheet} from 'react-native';

import Loading from '../components/Loading';

export const loadHomeDependsOnNetwork = (availableNetwork, checkNetworkAndCallApi, handleErr) => {
  switch (availableNetwork) {
    case true:
      return (
        handleErr()
      )
    case false:
      console.log("FALSSSSS");
      return (
        <DefaultError mess="Can not find the network" checkNetworkAndCallApi={checkNetworkAndCallApi} />
      )
    default:
      return null
  }
}

export const showViewAfterLoading = (isLoading, mainView) => {
  // console.log(mainView);
  return (
    <View style={{ flex: 1 }}>
      {!isLoading ? mainView() : <View style={{ flex: 1, backgroundColor: 'white' }}></View>}
      {isLoading ? <Loading /> : null}
    </View>
  )
}

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback 
  onPress={() => Keyboard.dismiss()}> {children}
  </TouchableWithoutFeedback>
  );

