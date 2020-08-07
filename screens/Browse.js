import React, { Component } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';

import * as constants from '../constants';
import { Button, Block, Text } from '../components';

class Browse extends Component {
  static navigationOptions = {
    title: '',
  };

  state = {
    active: 'Products',
  };

  renderTab(tab) {
    const { active } = this.state;
    const isActive = active === tab;

    return (
      <TouchableOpacity
        key={`tab-${tab}`}
        onPress={() => this.setState({ active: tab })}
        style={[styles.tab, isActive ? styles.active : null]}>
        <Text title medium gray={!isActive} secondary={isActive}>
          {tab}
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    const { profile } = this.props;
    const tabs = ['Products', 'Inspirations', 'Shop'];
    return (
      <Block style={{ backgroundColor: 'white' }}>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>
            Browse
          </Text>
          <Button>
            <Image source={profile.avatar} style={styles.avatar} />
          </Button>
        </Block>

        <Block flex={false} row style={styles.tabs}>
          {tabs.map((tab) => this.renderTab(tab))}
        </Block>
      </Block>
    );
  }
}

Browse.defaultProps = {
  profile: constants.mocks.profile,
};

export default Browse;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: constants.theme.sizes.base * 2,
  },
  avatar: {
    height: constants.theme.sizes.base * 2.2,
    width: constants.theme.sizes.base * 2.2,
  },
  tabs: {
    borderBottomColor: constants.theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: constants.theme.sizes.base,
    marginHorizontal: constants.theme.sizes.base * 2,
  },
  tab: {
    marginRight: constants.theme.sizes.base * 2,
    paddingBottom: constants.theme.sizes.base,
  },
  active: {
    borderBottomColor: constants.theme.colors.secondary,
    borderBottomWidth: 3,
  },
});
