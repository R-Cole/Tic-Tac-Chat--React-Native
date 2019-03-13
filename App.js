
// Import the screen
import React, { Component } from 'react';
import Main from './components/Main';
import Chat from './components/Chat';
import Setup from './components/Setup';
import { TextInput, Button, TouchableWithoutFeedback, Image, Animated, AppRegistry, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";

class HomeScreen extends React.Component {

  render() {

    return(

      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Home Screen!</Text> 
      </View>

    )

  }

}

// Create the navigator
const navigator = createStackNavigator({
  Main: {screen: Main},
  Chat: {screen: Chat},
  Setup: {screen: Setup}
});

export default createAppContainer(navigator);
