import React, {memo} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';

const CustomHeader = props => {
  const navigation = useNavigation();

  console.log("header rendered sss")
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => props.leftButtonName === 'bars' ? navigation.toggleDrawer() : navigation.goBack()}>
        <FontAwesome5Icon style={styles.iconStyle} name={props.leftButtonName}/>
      </TouchableOpacity>
      <Text style={styles.titleStyle}>{props.title}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Search')}>
        <FontAwesome5Icon style={styles.iconStyle} name={props.rightButtonName}/>
      </TouchableOpacity>
    </View>
  );
};
export default memo(CustomHeader);


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
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
});
