import React, { Component } from 'react';
import { StyleSheet, Keyboard, KeyboardAvoidingView, ActivityIndicator, Alert } from 'react-native';

import * as constants from '../constants';
import { Button, Block, Input, Text } from '../components';

const VALID_EMAIL = 'contact@jhonny.com';

export default class Forgot extends Component {
  static navigationOptions = {
    title: '',
  };

  state = {
    email: VALID_EMAIL,
    errors: [],
    loading: false,
  };

  handleForgot() {
    const { navigation } = this.props;
    const { email } = this.state;
    const errors = [];

    Keyboard.dismiss();

    this.setState({ loading: true });

    if (email !== VALID_EMAIL) {
      errors.push('email');
    }

    this.setState({ errors, loading: false });

    if (!errors.length) {
      Alert.alert(
        'Password sent!',
        'Please check your email',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('Login');
            },
          },
        ],
        { cancelable: false },
      );
    } else {
      Alert.alert(
        'Error',
        'Please check your Email address',
        [
          {
            text: 'Try again',
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
      <KeyboardAvoidingView style={styles.forgot}>
        <Block padding={[0, constants.theme.sizes.base * 2]} style={{ backgroundColor: 'white' }}>
          <Text middle style={{ paddingBottom: 30 }} h1 bold>
            Forgot screen
          </Text>
          <Block middle>
            <Input
              error={hasErrors('email')}
              label="Email"
              style={[styles.input, hasErrors('email')]}
              defaultValue={this.state.email}
              onChangeText={(text) => this.setState({ email: text })}
            />

            <Button gradient onPress={() => this.handleForgot()}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>
                  Forgot
                </Text>
              )}
            </Button>

            <Button
              onPress={() => {
                navigation.goBack();
              }}>
              <Text gray caprion center style={{ textDecorationLine: 'underline' }}>
                Back to Login
              </Text>
            </Button>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  forgot: {
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
