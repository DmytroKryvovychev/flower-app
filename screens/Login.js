import React, { Component } from 'react';
import { StyleSheet, Keyboard, KeyboardAvoidingView, ActivityIndicator } from 'react-native';

import * as constants from '../constants';
import { Button, Block, Input, Text } from '../components';

const VALID_EMAIL = 'contact@jhonny.com';
const VALID_PASSWORD = 'youtube';

class Login extends Component {
  static navigationOptions = {
    title: '',
  };

  state = {
    email: VALID_EMAIL,
    password: VALID_PASSWORD,
    errors: [],
    loading: false,
  };

  handleLogin() {
    const { navigation } = this.props;
    const { email, password } = this.state;
    const errors = [];

    Keyboard.dismiss();

    this.setState({ loading: true });

    if (email !== VALID_EMAIL) {
      errors.push('email');
    }
    if (password !== VALID_PASSWORD) {
      errors.push('password');
    }

    this.setState({ errors, loading: false });

    if (!errors.length) {
      navigation.navigate('Browse');
    }
  }

  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = (key) => (errors.includes(key) ? styles.hasErrors : null);

    return (
      <KeyboardAvoidingView style={styles.login}>
        <Block
          padding={[0, constants.theme.sizes.padding * 2]}
          style={{ backgroundColor: 'white' }}>
          <Text middle style={{ paddingBottom: 30 }} h1 bold>
            Login
          </Text>
          <Block middle>
            <Input
              error={hasErrors('email')}
              label="Email"
              style={[styles.input, hasErrors('email')]}
              defaultValue={this.state.email}
              onChangeText={(text) => this.setState({ email: text })}
            />
            <Input
              error={hasErrors('password')}
              secure
              label="Password"
              style={[styles.input, hasErrors('password')]}
              defaultValue={this.state.password}
              onChangeText={(text) => this.setState({ password: text })}
            />
            <Button gradient onPress={() => this.handleLogin()}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>
                  Login
                </Text>
              )}
            </Button>

            <Button
              onPress={() => {
                navigation.navigate('Forgot');
              }}>
              <Text gray caprion center style={{ textDecorationLine: 'underline' }}>
                Forgot your password?
              </Text>
            </Button>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    );
  }
}

export default Login;

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: constants.theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  hasErrors: {
    borderBottomColor: constants.theme.colors.accent,
    borderBottomWidth: 1,
  },
});
