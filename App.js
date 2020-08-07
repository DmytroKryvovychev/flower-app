import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';

import Welcome from './screens/Welcome';
import Login from './screens/Login';
import Explore from './screens/Explore';
import Product from './screens/Product';
import Settings from './screens/Settings';
import Browse from './screens/Browse';
import Signup from './screens/Signup';
import Forgot from './screens/Forgot';
import * as constants from './constants';

const Stack = createStackNavigator();

const images = [
  require('./assets/icons/back.png'),
  require('./assets/icons/plants.png'),
  require('./assets/icons/seeds.png'),
  require('./assets/icons/flowers.png'),
  require('./assets/icons/sprayers.png'),
  require('./assets/icons/pots.png'),
  require('./assets/icons/fertilizers.png'),
  require('./assets/images/plants_1.png'),
  require('./assets/images/plants_2.png'),
  require('./assets/images/plants_3.png'),
  require('./assets/images/explore_1.png'),
  require('./assets/images/explore_2.png'),
  require('./assets/images/explore_3.png'),
  require('./assets/images/explore_4.png'),
  require('./assets/images/explore_5.png'),
  require('./assets/images/explore_6.png'),
  require('./assets/images/avatar.png'),
];

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  handleResourcesAsync = async () => {
    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });

    return Promise.all(cacheImages);
  };
  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.handleResourcesAsync}
          onError={(error) => console.warn(error)}
          onFinish={() => this.setState({ isLoadingComplete: true })}
        />
      );
    }

    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            headerStyle: {
              height: constants.theme.sizes.base * 4,
              backgroundColor: constants.theme.colors.white,
              elevation: 0,
              shadowOpacity: 0,
            },
            headerBackImage: () => <Image source={require('./assets/icons/back.png')} />,
            headerBackTitle: null,
            headerLeftContainerStyle: {
              alignItems: 'center',
              marginLeft: constants.theme.sizes.padding * 1.2,
              paddingRight: constants.theme.sizes.base,
            },
            headerRightContainerStyle: {
              alignItems: 'center',
              paddingRight: constants.theme.sizes.base,
            },
          }}>
          <Stack.Screen name="Welcome" component={Welcome} options={Welcome.navigationOptions} />
          <Stack.Screen
            name="Login"
            component={Login}
            options={Login.navigationOptions}></Stack.Screen>
          <Stack.Screen name="Explore" component={Explore}></Stack.Screen>
          <Stack.Screen name="Product" component={Product}></Stack.Screen>
          <Stack.Screen name="Settings" component={Settings}></Stack.Screen>
          <Stack.Screen
            name="Browse"
            component={Browse}
            options={Browse.navigationOptions}></Stack.Screen>
          <Stack.Screen name="Signup" component={Signup}></Stack.Screen>
          <Stack.Screen name="Forgot" component={Forgot}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
