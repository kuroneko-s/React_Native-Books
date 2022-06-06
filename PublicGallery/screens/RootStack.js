import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from './postscreen/SignInScreen';
import WelcomeScreen from './postscreen/WelcomeScreen';
import {useUserContext} from '../contexts/UserContext';
import MainTab from './root/MainTab';
import {subscribeAuth, signOut} from './../lib/auth';
import {getUser} from '../lib/users';
import UploadScreen from './postscreen/UploadScreen';

const Stack = createNativeStackNavigator();

function RootStack() {
  const {user, setUser} = useUserContext();

  useEffect(() => {
    const unsubscribe = subscribeAuth(async currentUser => {
      // 사용자 정보가 바뀔때마다 호출될 함수

      unsubscribe(); // 이부분이 구독을 즉시 취소함
      if (!currentUser) {
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
