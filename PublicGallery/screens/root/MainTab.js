import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from '../maintab/HomeStack';
import MyProfileStack from './../maintab/MyProfileStack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {StyleSheet, View} from 'react-native';
import CameraButton from '../../components/CameraButton';

function MainTab() {
  const Tab = createBottomTabNavigator();

  return (
    <>
      <View style={styles.block}>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#6200ee',
          }}>
          <Tab.Screen
            name="HomeStack"
            component={HomeStack}
            options={{
              tabBarIcon: ({color}) => (
                <Icon name="home" size={24} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="MyProfileStack"
            component={MyProfileStack}
            options={{
              tabBarIcon: ({color}) => (
                <Icon name="person" size={24} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </View>
      <CameraButton />
    </>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    zIndex: 0,
  },
});

export default MainTab;
