import React from 'react';
import {Text, View, StyleSheet, Platform} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

const AccountTextDetail = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.textDetailStyle}>{`${props.title} : `}</Text>
      <TextInput
        autoCapitalize="none"
        placeholder={props.placeHolder}
        secureTextEntry={props.isHidden}
        style={styles.textValueStyle}>
        {props.value}
      </TextInput>
    </View>
  );
};

export default AccountTextDetail;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 15 : 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderStyle: 'dotted',
  },

  textDetailStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
  },

  textValueStyle: {
    flex: 2,
    marginLeft: 20,
    fontSize: 18,
  },
});
