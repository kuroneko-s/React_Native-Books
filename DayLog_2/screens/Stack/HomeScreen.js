import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import FeedsTabScreen from './../Tab/FeedsTabScreen';
import CalendarTabScreen from './../Tab/CalendarTabScreen';
import SearchTabScreen from './../Tab/SearchTabScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HeaderComponent from '../../components/HeaderComponent';
import {Text, TextInput, View} from 'react-native';
import HeaderSearchComponent from '../../components/HeaderSearchComponent';

const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <Tab.Navigator
      initialRouteName="Feeds"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#a29bfe',
        headerShown: true,
        header: ({children}) => <HeaderComponent />,
      }}>
      <Tab.Screen
        name="Feeds"
        component={FeedsTabScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="view-stream" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarTabScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="event" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchTabScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="search" color={color} size={size} />
          ),
          header: ({children}) => <HeaderSearchComponent />,
        }}
      />
    </Tab.Navigator>
  );
}

export default HomeScreen;
