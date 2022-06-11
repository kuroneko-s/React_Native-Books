import React, {useEffect} from 'react';
import Profile from '../../components/Profile';
import {useRoute, useNavigation} from '@react-navigation/native';

function ProfileScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const {userId, displayName} = route.params ?? {};

  useEffect(() => {
    navigation.setOptions({
      title: displayName,
    });
  }, [displayName, navigation]);

  return <Profile userId={userId} />;
}

export default ProfileScreen;
