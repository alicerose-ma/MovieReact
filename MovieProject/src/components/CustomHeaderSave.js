
import React, {memo} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';

const CustomHeaderSave = props => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={() =>  navigation.pop()}> */}
      <TouchableOpacity onPress={props.leftAction}>
        <FontAwesome5Icon style={styles.iconStyle} name={props.leftButtonName}/>
      </TouchableOpacity>
      <Text style={styles.titleStyle}>{props.title}</Text>
      <TouchableOpacity onPress={props.rightAction}>
      <Text style={styles.rightButtonStyle}>{props.rightButtonName}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default memo(CustomHeaderSave);


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 40,
    backgroundColor: '#90CAF9',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  titleStyle: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  iconStyle: {
    fontSize: 25,
    marginHorizontal: 20,
  },

  rightButtonStyle: {
    fontWeight: 'bold',
    marginRight: 20
  }
});
