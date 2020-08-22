import React from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'
import { Button } from 'react-native-paper';

const DefaultError = (props) => {
  return (
    <View style={styles.defaultScreen} >
      <Image style={styles.errImage} source={require('../../asset/icon/error-100.png')} />
      <Text style={styles.errMessStyle}>{props.mess}</Text>
      <Button color="blue" onPress={() => props.checkNetworkAndCallApi()}>Retry</Button>
    </View>
  )
}

export default DefaultError

const styles = StyleSheet.create({
  defaultScreen: {
    flex: 1,
    backgroundColor: '#d3d3d3',
    justifyContent: 'center',
    alignItems: 'center'
  },

  errImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },

  errMessStyle: { fontSize: 16, marginBottom: 10, marginHorizontal: 30, textAlign: 'center' }
})
