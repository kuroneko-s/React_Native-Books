/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback} from 'react';
import {Button, StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

const Tab = createMaterialBottomTabNavigator();

function HomeScreen({navigation}) {
  return (
    <View>
      <Text>Home</Text>
      <OpenDetailButton />
    </View>
  );
}

function OpenDetailButton() {
  const navigation = useNavigation();

  return (
    <Button
      title="Detail 1 열기"
      onPress={() => navigation.push('Detail', {id: 1})}
    />
  );
}

function SearchScreen() {
  return (
    <View>
      <Text>Search</Text>
    </View>
  );
}

function NotificationScreen() {
  return (
    <View>
      <Text>Notification</Text>
    </View>
  );
}

function MessageScreen() {
  return (
    <View>
      <Text>Message</Text>
    </View>
  );
}

// icon 쓸려면 IOS랑 안드로이드에 설정해줘야함
const MainScreen = () => {
  const bf = false;
  const notifiBadge = bf ? 6 : 'new';
  const number = 5;

  useFocusEffect(
    useCallback(() => {
      console.log('화면을 보고 있다.');
      return () => {
        console.log('다른 화면으로 넘어감');
      };
    }, []),
  );

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#fb8c00',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: '홈',
          tabBarColor: 'black',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={24} />
          ),
          tabBarBadge: notifiBadge,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarColor: 'gray',
          tabBarIcon: ({color, size}) => (
            <Icon name="search" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          tabBarColor: 'green',
          tabBarIcon: ({color, size}) => (
            <Icon name="notifications" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Message"
        component={MessageScreen}
        options={{
          title: '메시지',
          tabBarColor: 'red',
          tabBarIcon: ({color, size, focused}) => (
            <Icon name="message" color={color} size={focused ? 24 : 24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});

export default MainScreen;
