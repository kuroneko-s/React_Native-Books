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
        name="Wirte"
        component={WriteScreen}
        options={{
          headerShown: true,
          headerBackVisible: false,
          header: ({children}) => <HeaderArrowComponent />,
        }}
      />
    </Stack.Navigator>
  );
}

export default RootStackScreen;
