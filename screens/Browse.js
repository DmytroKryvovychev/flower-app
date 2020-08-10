import React, { Component } from 'react';
import { Dimensions, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

import * as constants from '../constants';
import { Button, Block, Text, Card, Badge } from '../components';

const { width } = Dimensions.get('window');

class Browse extends Component {
  static navigationOptions = {
    title: '',
  };

  state = {
    active: 'Products',
    categories: [],
  };

  componentDidMount() {
    this.setState({ categories: this.props.categories });
  }

  handleTab = (tab) => {
    const { categories } = this.props;
    const filtered = categories.filter((category) => category.tags.includes(tab.toLowerCase()));

    this.setState({ active: tab, categories: filtered });
  };

  renderTab(tab) {
    const { active } = this.state;
    const isActive = active === tab;

    return (
      <TouchableOpacity
        key={`tab-${tab}`}
        onPress={() => this.handleTab(tab)}
        style={[styles.tab, isActive ? styles.active : null]}>
        <Text size={16} medium gray={!isActive} secondary={isActive}>
          {tab}
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    const { navigation, profile } = this.props;
    const { categories } = this.state;
    const tabs = ['Products', 'Inspirations', 'Shop'];

    return (
      <Block style={{ backgroundColor: 'white' }}>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>
            Browse
          </Text>
          <Button onPress={() => navigation.navigate('Settings', { profile })}>
            <Image source={profile.avatar} style={styles.avatar} />
          </Button>
        </Block>

        <Block flex={false} row style={styles.tabs}>
          {tabs.map((tab) => this.renderTab(tab))}
        </Block>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingVertical: constants.theme.sizes.base * 2 }}>
          <Block flex={false} row space="between" style={styles.categories}>
            {categories.map((category) => (
              <TouchableOpacity
                key={`category-${category.id}`}
                onPress={() => navigation.navigate('Explore', { category })}>
                <Card shadow center middle style={styles.category}>
                  <Badge margin={[0, 0, 15]} size={50} color="rgba(41,216,143,0.20)">
                    <Image source={category.image} />
                  </Badge>
                  <Text medium height={20}>
                    {category.name}
                  </Text>
                  <Text gray caption>
                    {category.count} products
                  </Text>
                </Card>
              </TouchableOpacity>
            ))}
          </Block>
        </ScrollView>
      </Block>
    );
  }
}

Browse.defaultProps = {
  profile: constants.mocks.profile,
  categories: constants.mocks.categories,
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
  category: {
    width: width / 2 - constants.theme.sizes.base * 3,
    height: 150,
  },
  categories: {
    flexWrap: 'wrap',
    paddingHorizontal: constants.theme.sizes.base * 2,
    marginBottom: constants.theme.sizes.base * 3.5,
  },
});
