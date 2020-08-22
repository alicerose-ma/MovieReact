import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const MovieTextDetail = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.textDetailStyle}>{`${props.title} : `}</Text>
      <Text style={styles.textValueStyle}>{props.value}</Text>
    </View>
  );
};

export default MovieTextDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    // alignItems: 'center',
    padding: 5,
    marginHorizontal: 15,
  },

  textDetailStyle: {
    flex: 3,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
  },

  textValueStyle: {
    flex: 4,
    marginLeft: 20,
    fontSize: 16,
  },
});
