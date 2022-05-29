import React, {useEffect, useRef} from 'react';
import {Animated, Platform, Pressable, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

/*
    Pressable == Touchable* 과 유사
    TouchableWithoutFeedback과 유사한데 기능이 더 많음
    android_ripple - 안드로이드 물결 효과 
    style에서 pressed 값을 인식해서 눌렸을 때의 효과를 동적으로 줄 수 있음
*/
function FloatingWriteButton({hidden}) {
  const navigation = useNavigation();
  const animated = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(animated, {
      toValue: hidden ? 1 : 0,
      useNativeDriver: true,
      duration: 350,
      tension: 45, // 강도
      friction: 5, // 감속
    }).start();
  }, [hidden, animated]);

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          transform: [
            {
              translateY: animated.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 88],
              }),
            },
          ],
          opacity: animated.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
          }),
        },
      ]}>
      <Pressable
        style={({pressed}) => [
          styles.button,
          Platform.OS === 'ios' && {
            opacity: pressed ? 0.6 : 1,
          },
        ]}
        android_ripple={{color: 'white'}}
        onPress={() => navigation.navigate('Write')}>
        <Icon name="add" size={24} style={styles.icon} />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,

    // IOS 전용 그림자 설정
    shadowColor: '#4d4d4d',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,

    // 안드로이드 전용 그림자 설정
    elevation: 5,

    // 안드로이드에서 물결 화가가 영역 밖으로 나가지 않도록 설정,
    // IOS에서는 overflow가 hidden일 경우 그림자가 보여지지 않음
    overflow: Platform.select({android: 'hidden'}),
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#009688',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: 'white',
  },
});

export default FloatingWriteButton;
