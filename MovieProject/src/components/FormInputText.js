import React, {PureComponent} from 'react';
import {TextInput, StyleSheet, View, Text} from 'react-native';

export default class FormInputText extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <TextInput 
          autoCapitalize= 'none'
          autoCorrect={false}
          style={styles.inputStyle}  
          placeholder={this.props.placeHolder}
          secureTextEntry={this.props.isHidden}
          value={this.props.term}
          onChangeText={this.props.onTermChange}>
        </TextInput>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: '#D3D3D3',
    borderBottomWidth: 2,
    borderRadius: 5,
    height: 50,
    marginBottom: 10
  },

  inputStyle: {
    fontSize: 18,
    flex: 1,
  },
});
