import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from './postscreen/SignInScreen';
import WelcomeScreen from './postscreen/WelcomeScreen';
import {useUserContext} from '../contexts/UserContext';
import MainTab from './root/MainTab';
import {subscribeAuth} from './../lib/auth';
import {getUser} from '../lib/users';
import UploadScreen from './postscreen/UploadScreen';
import ModifyScreen from './postscreen/ModifyScreen';
import SettingScreen from './postscreen/SettingScreen';
import SplashScreen from 'react-native-splash-screen';

const Stack = createNativeStackNavigator();

function RootStack() {
  const {user, setUser} = useUserContext();

  useEffect(() => {
    const unsubscribe = subscribeAuth(async currentUser => {
      // 사용자 정보가 바뀔때마다 호출될 함수

      unsubscribe(); // 이부분이 구독을 즉시 취소함
      if (!currentUser) {
        SplashScreen.hide();
        return;
      }

      const profile = await getUser(currentUser.uid);
      if (!profile) {
        return;
      }

      setUser(profile);
    });
  }, [setUser]);

  return (
    <Stack.Navigator initialRouteName="SignIn">
      {user ? (
        <>
          <Stack.Screen
            name="MainTab"
            component={MainTab}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Upload"
            component={UploadScreen}
            options={{
              title: '새 게시물',
              headerBackTitle: '뒤로가기',
            }}
          />
          <Stack.Screen
            name="Modify"
            component={ModifyScreen}
            options={{
              title: '설명 수정',
              headerBackTitle: '뒤로가기',
            }}
          />
          <Stack.Screen
            name="Setting"
            component={SettingScreen}
            options={{
              title: '설정',
              headerBackTitle: '뒤로가기',
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{
              headerShown: false,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default RootStack;
