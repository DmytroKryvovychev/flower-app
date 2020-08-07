import React, { Component } from 'react';
import { Animated, Dimensions, Image, FlatList, StyleSheet, Modal, ScrollView } from 'react-native';

import * as constants from '../constants';
import { Button, Block, Text } from '../components';

const { width, height } = Dimensions.get('window');

class Welcome extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  scrollX = new Animated.Value(0);

  state = {
    showTerms: false,
  };

  renderTermsService() {
    return (
      <Modal animationType="slide" visible={this.state.showTerms}>
        <Block
          padding={(constants.theme.sizes.padding * 2, constants.theme.sizes.padding)}
          space="between">
          <Text h2 light>
            Terms of Service
          </Text>

          <ScrollView contentContainerStyle={{ paddingVertical: constants.theme.sizes.padding }}>
            <Text caption gray height={18}>
              You agree that by accessing the Site, you have read, understood, and agree to be bound
              by all of these Terms and Conditions. If you do not agree with all of these Terms and
              Conditions, then you are expressly prohibited from using the Site and you must
              discontinue use immediately.
            </Text>
            <Text caption gray height={18}>
              Supplemental terms and conditions or documents that may be posted on the Site from
              time to time are hereby expressly incorporated herein by reference. We reserve the
              right, in our sole discretion, to make changes or modifications to these Terms and
              Conditions at any time and for any reason.
            </Text>
            <Text caption gray height={18}>
              It is your responsibility to periodically review these Terms and Conditions to stay
              informed of updates. You will be subject to, and will be deemed to have been made
              aware of and to have accepted, the changes in any revised Terms and Conditions by your
              continued use of the Site after the date such revised Terms and Conditions are posted.
            </Text>
            <Text caption gray height={18}>
              You agree that by accessing the Site, you have read, understood, and agree to be bound
              by all of these Terms and Conditions. If you do not agree with all of these Terms and
              Conditions, then you are expressly prohibited from using the Site and you must
              discontinue use immediately.
            </Text>
            <Text caption gray height={18}>
              Supplemental terms and conditions or documents that may be posted on the Site from
              time to time are hereby expressly incorporated herein by reference. We reserve the
              right, in our sole discretion, to make changes or modifications to these Terms and
              Conditions at any time and for any reason.
            </Text>
            <Text caption gray height={18}>
              It is your responsibility to periodically review these Terms and Conditions to stay
              informed of updates. You will be subject to, and will be deemed to have been made
              aware of and to have accepted, the changes in any revised Terms and Conditions by your
              continued use of the Site after the date such revised Terms and Conditions are posted.
            </Text>
          </ScrollView>
          <Button gradient onPress={() => this.setState({ showTerms: false })}>
            <Text center white>
              I understand
            </Text>
          </Button>
        </Block>
      </Modal>
    );
  }

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
            style={{ width, height: height / 2.4, overflow: 'visible' }}
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
    const { navigation } = this.props;

    return (
      <Block style={{ backgroundColor: 'white' }} top>
        <Block flex={0.6} center bottom style={{ marginBottom: 20 }}>
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
        <Block flex={1.3} center middle>
          {this.renderIllustrations()}
          {this.renderSteps()}
        </Block>
        <Block middle flex={0.9} margin={[0, constants.theme.sizes.padding * 2]}>
          <Button gradient onPress={() => navigation.navigate('Login')}>
            <Text center>Login</Text>
          </Button>

          <Button shadow onPress={() => navigation.navigate('Signup')}>
            <Text center>SignUp</Text>
          </Button>

          <Button
            onPress={() => {
              this.setState({ showTerms: true });
            }}>
            <Text center caption gray>
              Terms of service
            </Text>
          </Button>
        </Block>
        {this.state.showTerms && this.renderTermsService()}
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
    bottom: constants.theme.sizes.base * 2.5,
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
