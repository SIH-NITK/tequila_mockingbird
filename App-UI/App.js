import React, { useState } from 'react';
import { createAppContainer } from 'react-navigation';
import { StyleSheet, Text, View, Button } from 'react-native';
// import {stackNavigator} from './navigation/navigation';
import StackNavigator from './navigation/navigation';

export default class App extends React.Component {

  render() {
    
   

    return (
      <StackNavigator />

    )
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
