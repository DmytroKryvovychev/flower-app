import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import * as constants from '../constants';
import { Button, Block, Input, Text } from '../components';

export default class Browse extends Component {
  static navigationOptions = {
    title: '',
  };
  render() {
    return (
      <Block style={{ backgroundColor: 'white' }}>
        <Text h1> Browse window </Text>
      </Block>
    );
  }
}

const styles = StyleSheet.create({});
