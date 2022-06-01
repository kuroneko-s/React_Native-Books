import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {View, StyleSheet, Pressable, Platform} from 'react-native';

function FloatingWirteButton() {
  const navigation = useNavigation();

  return (
    <View style={styles.block}>
      <Pressable
        style={({pressed}) => [
          styles.button,
          {
            opacity: Platform.select({ios: pressed ? 0.6 : 1}),
          },
        ]}
        android_ripple={{color: 'white'}} // android는 물결 이벤트가 있어서 opacity 값을 안줌
        onPress={() => navigation.navigate('Wirte')}>
        <Icon name="add" size={32} style={styles.icon} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    position: 'absolute',
    right: 25,
    bottom: 20,
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: Platform.select({android: 'hidden'}),

    // IOS 전용 그림자 설정
    shadowColor: '#4d4d4d',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,

    // 안드로이드 전용 그림자 설정
    elevation: 10,
  },
  button: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#009688',

    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: 'white',
  },
});

export default FloatingWirteButton;
