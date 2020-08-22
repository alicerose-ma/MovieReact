import React from 'react';
import {Text, View, StyleSheet, Image, Dimensions} from 'react-native';

const ResponseDefaultErr = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.errorMessageStyle}>
          {props.errMess}
      </Text>
    </View>
  );
};
export default ResponseDefaultErr;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  errorMessageStyle: {
    color: 'black',
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10, marginHorizontal: 30, textAlign: 'center' 
  },

});
