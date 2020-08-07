import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import * as constants from '../constants';
import { Button, Block, Text, Card, Badge } from '../components';

export default class Settings extends Component {
  static navigationOptions = {
    title: '',
  };

  render() {
    return (
      <Block style={{ backgroundColor: 'white' }}>
        <Text h1 bold>
          Settings
        </Text>
      </Block>
    );
  }
}

const styles = StyleSheet.create({});
