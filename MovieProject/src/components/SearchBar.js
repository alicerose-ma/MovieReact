import React, {memo} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const searchBar = props => {
  return (
    <View style={styles.container}>
      <FontAwesome5Icon name="search" style={styles.searchIcon} />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.inputStyle}
        placeholder={props.placeHolder}
        returnKeyType="search"
        value={props.term}
        onChangeText={props.onTermChange}
        onEndEditing={props.onSubmit}
      />
      {props.textInputStatus === 'touched' && props.term !== '' ? (
        <FontAwesome5Icon
          name="times-circle"
          style={styles.cancelButton}
          onPress={props.onCancel}
        />
      ) : null}
    </View>
  );
};

export default memo(searchBar);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomColor: '#D3D3D3',
    borderBottomWidth: 2,
    borderRadius: 5,
    height: 50,
  },

  searchIcon: {
    fontSize: 30,
    color: 'black',
    marginHorizontal: 10,
    alignSelf: 'center',
  },

  cancelButton: {
    fontSize: 25,
    opacity: 0.6,
    alignSelf: 'center',
  },

  inputStyle: {
    fontSize: 18,
    flex: 1,
    color: 'black'
  },
});
