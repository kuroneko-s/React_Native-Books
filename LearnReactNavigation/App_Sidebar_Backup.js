/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Button, StyleSheet, Text, View, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HeaderlessScreen from './screens/HeaderlessScreen';
import {SafeAreaView} from 'react-native-safe-area-context';

function HomeScreen({navigation}) {
  return (
    <View>
      <Text>Home</Text>
      <Button title="Drawer 열기" onPress={() => navigation.openDrawer()} />
      <Button
        title="Setting 열기"
        onPress={() => navigation.navigate('Setting')}
      />
    </View>
  );
}

function SettingScreen({navigation}) {
  return (
    <View>
      <Text>Setting</Text>
      <Button title="뒤로가기" onPress={() => navigation.goBack()} />
    </View>
  );
}

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerPosition="left"
        backBehavior="none"
        drawerContent={({navigation}) => (
          <SafeAreaView>
            <Text>A Custom Drawer</Text>
            <Button
              title="Drawer 닫기"
              onPress={() => navigation.closeDrawer()}
            />
            <View>
              <Text>Hello</Text>
              <Button
                title="WOW"
                onPress={() =>
                  Alert.alert('Hello', 'WOW', [
                    {
                      text: '닫기',
                      onPress: () => {
                        console.log('안에잇는 alert 닫음');
                      },
                      style: 'default',
                    },
                  ])
                }
              />
            </View>
          </SafeAreaView>
        )}
        // screenOptions={{
        //   drawerActiveBackgroundColor: '#fb8c00',
        //   drawerActiveTintColor: 'white',
        //   drawerStyle: {
        //     backgroundColor: '#c6cbef',
        //     width: 240,
        //   },
        //   drawerLabelStyle: {
        //     fontWeight: 'bold',
        //   },
        //   drawerContentContainerStyle: {
        //     backgroundColor: 'red',
        //   },
        // }}
      >
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{title: '홈'}}
        />
        <Drawer.Screen
          name="Setting"
          component={SettingScreen}
          options={{title: '설정'}}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
