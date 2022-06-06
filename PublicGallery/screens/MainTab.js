import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useUserContext} from '../contexts/UserContext';

function MainTab() {
  const {user} = useUserContext();
  console.log('maintab - ', user);

  return (
    <View style={styles.block}>
      <Image
        style={{
          width: 128,
          height: 128,
          marginBottom: 16,
        }}
        resizeMode="cover"
        source={
          user.photoURL ? {uri: user.photoURL} : require('../assets/anya15.png')
        }
      />

      <Text style={styles.text}>{`Hello, ${user.displayName}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
  },
});

export default MainTab;
