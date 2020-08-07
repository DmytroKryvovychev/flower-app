import React, { Component } from 'react';
import {
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';

import * as constants from '../constants';
import { Button, Block, Input, Text } from '../components';

export default class Signup extends Component {
  static navigationOptions = {
    title: '',
  };

  state = {
    email: null,
    username: null,
    password: null,
    errors: [],
    loading: false,
  };

  handleSignup() {
    const { navigation } = this.props;
    const { email, username, password } = this.state;
    const errors = [];

    Keyboard.dismiss();

    this.setState({ loading: true });

    if (!email) {
      errors.push('email');
    }
    if (!username) {
      errors.push('username');
    }
    if (!password) {
      errors.push('password');
    }

    this.setState({ errors, loading: false });

    if (!errors.length) {
      Alert.alert(
        'Success!',
        'Your account has been created',
        [
          {
            text: 'Continue',
            onPress: () => {
              navigation.navigate('Browse');
            },
          },
        ],
        { cancelable: false },
      );
    }
  }

  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = (key) => (errors.includes(key) ? styles.hasErrors : null);

    return (
      <KeyboardAvoidingView style={styles.signup}>
        <Block padding={[0, constants.theme.sizes.base * 2]} style={{ backgroundColor: 'white' }}>
          <Text middle style={{ paddingBottom: 30 }} h1 bold>
            Sign Up
          </Text>
          <Block middle>
            <Input
              email
              error={hasErrors('email')}
              label="Email"
              style={[styles.input, hasErrors('email')]}
              defaultValue={this.state.email}
              onChangeText={(text) => this.setState({ email: text })}
            />

            <Input
              error={hasErrors('username')}
              label="Username"
              style={[styles.input, hasErrors('username')]}
              defaultValue={this.state.username}
              onChangeText={(text) => this.setState({ username: text })}
            />

            <Input
              secure
              error={hasErrors('password')}
              label="Password"
              style={[styles.input, hasErrors('password')]}
              defaultValue={this.state.password}
              onChangeText={(text) => this.setState({ password: text })}
            />

            <Button gradient onPress={() => this.handleSignup()}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>
                  Sign Up
                </Text>
              )}
            </Button>

            <Button
              onPress={() => {
                navigation.goBack();
              }}>
              <Text gray caprion center style={{ textDecorationLine: 'underline' }}>
                Back to Main screen
              </Text>
            </Button>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  signup: {
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
