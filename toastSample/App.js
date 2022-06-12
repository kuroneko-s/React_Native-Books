/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Button,
  ToastAndroid,
  NativeModules,
  requireNativeComponent,
} from 'react-native';

const {ToastModule} = NativeModules;
const Counter = requireNativeComponent('Counter');

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Counter
        style={{
          flex: 1,
        }}
        value={1}
        rightButtonText={'-1'}
        leftButtonText={'+1'}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default App;
