import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import WriteScreen from './Stack/WriteScreen';
import HomeScreen from './Stack/HomeScreen';
import HeaderArrowComponent from '../components/HeaderArrowComponent';

const Stack = createNativeStackNavigator();

function RootStackScreen() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{}}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Write"
        component={WriteScreen}
        options={{
          headerShown: false,
          headerBackVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default RootStackScreen;
