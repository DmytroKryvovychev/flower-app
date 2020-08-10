import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import * as constants from '../constants';
import { Button, Block, Text, Input } from '../components';

const { width, height } = Dimensions.get('window');

class Explore extends Component {
  static navigationOptions = {
    title: '',
  };

  state = {
    searchFocus: new Animated.Value(0.6),
    searchString: null,
  };

  handleSearchFocus(state) {
    Animated.timing(this.state.searchFocus, {
      toValue: state ? 0.8 : 0.6,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }

  renderSearch() {
    const { searchString, searchFocus } = this.state;
    const isEditing = searchFocus && searchString;

    return (
      <Block animated middle flex={searchFocus} style={styles.search}>
        <Input
          placeholder="Search"
          placeholderTextColor={constants.theme.colors.gray2}
          style={styles.searchInput}
          onFocus={() => this.handleSearchFocus(true)}
          onBlur={() => this.handleSearchFocus(false)}
          onChangeText={(text) => this.setState({ searchString: text })}
          value={searchString}
          onRightPress={() => (isEditing ? this.setState({ searchString: null }) : null)}
          rightStyle={styles.searchRight}
          rightLabel={
            <FontAwesome
              name={isEditing ? 'close' : 'search'}
              size={constants.theme.sizes.base / 1.6}
              color={constants.theme.colors.gray2}
              style={styles.searchIcon}
            />
          }
        />
      </Block>
    );
  }

  renderImage(img, index) {
    const { navigation } = this.props;
    const sizes = Image.resolveAssetSource(img);
    const fullWidth = width - constants.theme.sizes.padding * 2;
    const resize = (sizes.width * 100) / fullWidth;
    const imgWidth = resize > 75 ? fullWidth : sizes.width * 0.95;

    return (
      <TouchableOpacity key={`img-${index}`} onPress={() => navigation.navigate('Product')}>
        <Image
          source={img}
          style={[styles.image, { minWidth: imgWidth, maxWidth: imgWidth }]}></Image>
      </TouchableOpacity>
    );
  }

  renderExplore() {
    const { images, navigation } = this.props;
    const mainImage = images[0];

    return (
      <Block style={{ marginBottom: height / 2.5 }}>
        <TouchableOpacity
          style={[styles.image, styles.mainImage]}
          onPress={() => navigation.navigate('Product')}>
          <Image source={mainImage} style={[styles.image, styles.mainImage]}></Image>
        </TouchableOpacity>
        <Block row space="between" wrap>
          {images.slice(1).map((img, index) => this.renderImage(img, index))}
        </Block>
      </Block>
    );
  }

  renderFooter() {
    return (
      <LinearGradient
        locations={[0.5, 1]}
        style={styles.footer}
        colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.6)']}>
        <Button gradient style={{ width: width / 2.678 }}>
          <Text bold white center>
            Filter
          </Text>
        </Button>
      </LinearGradient>
    );
  }

  render() {
    return (
      <Block style={{ backgroundColor: 'white' }}>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h1 bold>
            Explore
          </Text>
          {this.renderSearch()}
        </Block>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.explore}>
          {this.renderExplore()}
        </ScrollView>

        {this.renderFooter()}
      </Block>
    );
  }
}

Explore.defaultProps = {
  images: constants.mocks.explore,
};

export default Explore;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: constants.theme.sizes.base * 2,
    paddingBottom: constants.theme.sizes.base * 2,
  },
  search: {
    height: constants.theme.sizes.base * 2,
    width: width - constants.theme.sizes.base * 2,
  },
  searchInput: {
    fontSize: constants.theme.sizes.caption,
    height: constants.theme.sizes.base * 2,
    backgroundColor: 'rgba(142,142,147,0.06)',
    borderColor: 'rgba(142,142,147,0.06)',
    paddingLeft: constants.theme.sizes.base / 1.333,
    paddingRight: constants.theme.sizes.base * 1.5,
  },
  searchRight: {
    top: 0,
    marginVertical: 0,
    backgroundColor: 'transparent',
  },
  searchIcon: {
    position: 'absolute',
    right: constants.theme.sizes.base / 1.333,
    top: constants.theme.sizes.base / 1.6,
  },
  explore: {
    marginHorizontal: constants.theme.sizes.padding * 1.25,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    overflow: 'visible',
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.1,
    width,
    paddingBottom: constants.theme.sizes.base * 4,
  },
  image: {
    minHeight: 100,
    maxHeight: 130,
    maxWidth: width - constants.theme.sizes.padding * 2.5,
    marginBottom: constants.theme.sizes.base,
    borderRadius: 4,
  },
  mainImage: {
    minWidth: width - constants.theme.sizes.padding * 2.5,
    minHeight: width - constants.theme.sizes.padding * 2.5,
  },
});
