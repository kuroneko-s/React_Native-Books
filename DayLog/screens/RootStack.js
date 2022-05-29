import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTab from './rootTabs/MainTab';
import WriteScreen from './rootTabs/WriteScreen';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="MainTab"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="MainTab" component={MainTab} />
      <Stack.Screen name="Write" component={WriteScreen} />
    </Stack.Navigator>
  );
}

export default RootStack;
