import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import FormInputText from '../components/FormInputText';
import CustomButton from '../components/CustomButton';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorMessage: '',
    };
  }

  _onUsernameChange = newTerm => {
    this.setState({
      username: newTerm,
    });
  };

  _onPasswordChange = newTerm => {
    this.setState({
      password: newTerm,
    });
  };

  _onPressButton = () => {
    this.props.navigation.navigate('Home');
    // if (this.state.username.trim() != '') {
    //   if (this.state.password.trim() != '') {
    //     if (this.state.username === user.username && this.state.password === user.password) {
    //       this._setErrorMessage('correct')
    //       this.props.navigation.navigate('Drawer')
    //     } else {s
    //       this._setErrorMessage('incorrect')
    //     }
    //   } else {
    //     this._setErrorMessage('password can not empty')
    //   }
    // } else {
    //   this._setErrorMessage('username can not empty')
    // }
  };

  _setErrorMessage(message) {
    this.setState({
      errorMessage: message,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <FormInputText
          term={this.state.username}
          placeHolder="username"
          isHidden={false}
          onTermChange={this._onUsernameChange}
        />
        <FormInputText
          term={this.state.password}
          placeHolder="password"
          isHidden={true}
          onTermChange={this._onPasswordChange}
        />
        <CustomButton buttonTitle="Login" pressButton={this._onPressButton} />
        {this.state.errorMessage ? (
          <Text style={styles.errorMessageStyle}>
            {this.state.errorMessage}
          </Text>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 50,
  },

  errorMessageStyle: {
    color: 'red',
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
});

const user = {
  username: 'abc',
  password: '123',
};
