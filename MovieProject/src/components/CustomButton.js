import React, {memo} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
;

const CustomButton = (props) => {
  console.log("buttom render");
  
  return (
    <View>
    <TouchableOpacity style={styles.buttonStyle} onPress={props.pressButton}>
      <Text style={styles.textStyle}>{props.buttonTitle}</Text>
    </TouchableOpacity>
    </View>
  )
};

export default memo(CustomButton);

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#90CAF9',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  }
});
