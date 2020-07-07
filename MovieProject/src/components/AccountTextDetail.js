import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
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
    backgroundColor: 'white',
    padding: 15,
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
