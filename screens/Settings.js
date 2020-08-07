import React, { Component } from 'react';
import { StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Slider from 'react-native-slider';

import * as constants from '../constants';
import { Button, Block, Text, Divider, Switch } from '../components';

class Settings extends Component {
  static navigationOptions = {
    title: '',
  };

  state = {
    budget: 100,
    monthlyCap: 100,
    notifications: false,
    newsletter: false,
    editing: null,
    profile: {},
  };

  toggleEdit() {
    const { editing } = this.state;
    this.setState({ editing: !editing ? name : null });
  }

  renderEdit() {
    const { profile, editing } = this.state;
  }

  componentDidMount() {
    const { profile } = this.props.route.params;
    const { budget, monthlyCap, notifications, newsletter } = profile;
    this.setState({ budget, monthlyCap, notifications, newsletter, profile });
  }

  render() {
    const { profile } = this.state;

    return (
      <Block style={{ backgroundColor: 'white' }}>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text middle h1 bold>
            Settings
          </Text>
          <Button onPress={() => {}}>
            <Image source={profile.avatar} style={styles.avatar} />
          </Button>
        </Block>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Block style={styles.inputs}>
            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Text gray2 style={{ marginBottom: 10 }}>
                  Username
                </Text>
                {this.renderEdit('username')}
                <Text bold>{profile.username}</Text>
              </Block>
              <Text medium secondary onPress={() => this.toggleEdit('username')}>
                Edit
              </Text>
            </Block>

            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Text gray2 style={{ marginBottom: 10 }}>
                  Location
                </Text>
                <Text bold>{profile.location}</Text>
              </Block>
              <Text medium secondary>
                Edit
              </Text>
            </Block>

            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Block>
                <Text gray2 style={{ marginBottom: 10 }}>
                  Email
                </Text>
                <Text bold>{profile.email}</Text>
              </Block>
            </Block>
          </Block>

          <Divider margin={[constants.theme.sizes.base, constants.theme.sizes.base * 2]} />

          <Block style={styles.sliders}>
            <Block margin={[10, 0]}>
              <Text gray2 style={{ marginBottom: 10 }}>
                Budget
              </Text>
              <Slider
                minimumValue={0}
                maximumValue={1500}
                style={{ height: 19 }}
                thumbStyle={styles.thumb}
                trackStyle={{ height: 6, borderRadius: 6 }}
                minimumTrackTintColor={constants.theme.colors.secondary}
                maximumTrackTintColor="rgba(157, 163, 180, 0.10)"
                value={this.state.budget}
                onValueChange={(value) => this.setState({ budget: value })}
              />
              <Text caption gray right>
                ${this.state.budget.toFixed(0)}
              </Text>
            </Block>

            <Block margin={[10, 0]}>
              <Text gray2>Monthly Cap</Text>
              <Slider
                minimumValue={0}
                maximumValue={15000}
                style={{ height: 19 }}
                thumbStyle={styles.thumb}
                trackStyle={{ height: 6, borderRadius: 6 }}
                minimumTrackTintColor={constants.theme.colors.secondary}
                maximumTrackTintColor="rgba(157, 163, 180, 0.10)"
                value={this.state.monthlyCap}
                onValueChange={(value) => this.setState({ monthlyCap: value })}
              />
              <Text caption gray right>
                ${this.state.monthlyCap.toFixed(0)}
              </Text>
            </Block>
          </Block>

          <Divider />

          <Block style={styles.toggles}>
            <Block
              row
              cener
              space="between"
              style={{ marginBottom: constants.theme.sizes.base * 2 }}>
              <Text size={16} gray2>
                Notifications
              </Text>
              <Switch
                style={styles.toggle}
                value={this.state.notifications}
                onValueChange={(value) => this.setState({ notifications: value })}
              />
            </Block>

            <Block
              row
              cener
              space="between"
              style={{ marginBottom: constants.theme.sizes.base * 2 }}>
              <Text size={16} gray2>
                Newsletter
              </Text>
              <Switch
                style={styles.toggle}
                value={this.state.newsletter}
                onValueChange={(value) => this.setState({ newsletter: value })}
              />
            </Block>
          </Block>
        </ScrollView>
      </Block>
    );
  }
}

export default Settings;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: constants.theme.sizes.base * 2,
  },
  avatar: {
    height: constants.theme.sizes.base * 2.2,
    width: constants.theme.sizes.base * 2.2,
  },
  inputs: {
    marginTop: constants.theme.sizes.base * 0.7,
    paddingHorizontal: constants.theme.sizes.base * 2,
  },
  inputRow: {
    alignItems: 'flex-end',
  },
  sliders: {
    paddingHorizontal: constants.theme.sizes.base * 2,
  },
  thumb: {
    width: constants.theme.sizes.base,
    height: constants.theme.sizes.base,
    borderRadius: constants.theme.sizes.base,
    borderColor: 'white',
    borderWidth: 3,
    backgroundColor: constants.theme.colors.secondary,
  },
  toggles: {
    paddingHorizontal: constants.theme.sizes.base * 2,
  },
  toggle: {
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
  },
});
