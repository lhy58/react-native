/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import TabbarView from './app/views/Tabbar';

export default class maoyan extends Component {
  render() {
    return (
        <TabbarView />
    );
  }
}



AppRegistry.registerComponent('maoyan', () => maoyan);
