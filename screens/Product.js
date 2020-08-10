import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';

import * as constants from '../constants';
import { Button, Divider, Block, Text, Input } from '../components';
import { products } from '../constants/mocks';

const { width, height } = Dimensions.get('window');

class Product extends Component {
  static navigationOptions = {
    title: '',
    headerRight: () => (
      <Button onPress={() => {}}>
        <Entypo name="dots-three-horizontal" color={constants.theme.colors.gray} />
      </Button>
    ),
  };

  renderGallery() {
    const { product } = this.props;

    return (
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        data={product.images}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item }) => (
          <Image source={item} resizeMode="contain" style={{ width, height: height / 2.8 }} />
        )}
      />
    );
  }

  render() {
    const { product } = this.props;

    return (
      <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: 'white' }}>
        {this.renderGallery()}

        <Block style={styles.product}>
          <Text h2 bold>
            {product.name}
          </Text>
          <Block row flex={false} margin={[constants.theme.sizes.base, 0]}>
            {product.tags.map((tag) => (
              <Text gray key={`tag-${tag}`} caption style={styles.tag}>
                {tag}
              </Text>
            ))}
          </Block>
          <Text gray light height={22} align="justify">
            {product.description}
          </Text>
          <Divider margin={[constants.theme.sizes.padding * 0.9, 0]} />

          <Block>
            <Text semibold>Gallery</Text>
            <Block row margin={[constants.theme.sizes.padding * 0.9, 0]}>
              {product.images.slice(1, 3).map((image, index) => (
                <Image source={image} style={styles.image} key={`gallery-${index}`}></Image>
              ))}
              <Block
                flex={false}
                center
                middle
                card
                color="rgba(197,204,214,0.20)"
                style={styles.more}>
                <Text gray>+{product.images.slice(3).length}</Text>
              </Block>
            </Block>
          </Block>
        </Block>
      </ScrollView>
    );
  }
}

Product.defaultProps = {
  product: constants.mocks.products[0],
};

export default Product;

const styles = StyleSheet.create({
  product: {
    paddingHorizontal: constants.theme.sizes.base * 2,
    paddingVertical: constants.theme.sizes.padding,
  },
  tag: {
    borderColor: constants.theme.colors.gray2,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: constants.theme.sizes.base,
    paddingHorizontal: constants.theme.sizes.base,
    paddingVertical: constants.theme.sizes.base / 2.8,
    marginRight: constants.theme.sizes.base * 0.625,
  },
  image: {
    width: width / 3.26,
    height: width / 3.26,
    marginRight: constants.theme.sizes.base,
  },
  more: {
    width: 50,
    height: 50,
  },
});
