import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

function MainTab() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#6200ee',
      }}>
      {/* TODO: 화면 추가 */}
    </Tab.Navigator>
  );
}

export default MainTab;
