import React, { Component } from 'react';
import { Animated, Dimensions, Image, FlatList, StyleSheet } from 'react-native';

import * as constants from '../constants';
import { Button, Block, Text } from '../components';

const { width, height } = Dimensions.get('window');

class Welcome extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  scrollX = new Animated.Value(0);

  state = {};

  renderIllustrations() {
    const { illustrations } = this.props;
    return (
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToAlignmen="center"
        data={illustrations}
        extraData={this.state}
        keyExtractor={(item, index) => `${item.id}`}
        renderItem={({ item }) => (
          <Image
            source={item.source}
            resizeMode="contain"
            style={{ width, height: height / 2, overflow: 'visible' }}
          />
        )}
        onScroll={(event) =>
          Animated.event(
            [
              {
                nativeEvent: { contentOffset: { x: this.scrollX } },
              },
            ],
            {
              useNativeDriver: true,
              listener: ({ nativeEvent }) => this.scrollX.setValue(nativeEvent.contentOffset.x),
            },
          ).__getHandler()(event)
        }
      />
    );
  }

  renderSteps() {
    const { illustrations } = this.props;
    const stepPosition = Animated.divide(this.scrollX, width);
    return (
      <Block row center middle style={styles.stepsContainer}>
        {illustrations.map((item, index) => {
          const opacity = stepPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.4, 1, 0.4],
            extrapolate: 'clamp',
          });
          return (
            <Block
              animated
              flex={false}
              key={`step-${index}`}
              color="gray"
              style={[styles.steps, { opacity }]}
            />
          );
        })}
      </Block>
    );
  }

  render() {
    return (
      <Block white>
        <Block flex={0.5} center middle>
          <Text h1 center bold>
            Your Home.
            <Text h1 primary>
              Greener.
            </Text>
          </Text>
          <Text h3 gray2 style={{ marginTop: constants.theme.sizes.padding / 2 }}>
            Enjoy the experience.
          </Text>
        </Block>
        <Block center middle>
          {this.renderIllustrations()}
          {this.renderSteps()}
        </Block>
        {/* <Block middle flex={0.5} margin={[0, constants.theme.sizes.padding * 2]}>
          <Button gradient onPress={() => {}}>
            <Text center>Login</Text>
          </Button>

          <Button shadow onPress={() => {}}>
            <Text center>SignUp</Text>
          </Button>

          <Button onPress={() => {}}>
            <Text center caption gray>
              Terms of service
            </Text>
          </Button>
        </Block> */}
      </Block>
    );
  }
}

Welcome.defaultProps = {
  illustrations: [
    { id: 1, source: require('../assets/images/illustration_1.png') },
    { id: 2, source: require('../assets/images/illustration_2.png') },
    { id: 3, source: require('../assets/images/illustration_3.png') },
  ],
};

export default Welcome;

const styles = StyleSheet.create({
  stepsContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  steps: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 2.5,
  },
});
