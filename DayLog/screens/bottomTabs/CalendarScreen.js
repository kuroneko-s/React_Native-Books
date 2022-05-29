import React, {useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, View, Text, Button} from 'react-native';

function FadeInAndOut() {
  const animation = useRef(new Animated.Value(1)).current; // init
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: hidden ? 0 : 1,
      useNativeDriver: true,
    }).start();
  }, [animation, hidden]);

  return (
    <View>
      <Animated.View style={[styles.rectangle, {opacity: animation}]} />
      {/* <Button
        title="Hidden"
        onPress={() => {
          Animated.timing(animation, {
            toValue: 1, // 이 값으로 변경할 것
            useNativeDriver: false, // 레이아웃과 관련된 값은 false로 줘야만 함, required
          }).start();
        }}
      /> */}
      <Button title="Toggle" onPress={() => setHidden(cur => !cur)} />
    </View>
  );
}

function SlideLeftAndRight() {
  const animation = useRef(new Animated.Value(0)).current;
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: enabled ? 1 : 0,
      useNativeDriver: true,
    }).start();
  }, [enabled, animation]);

  return (
    <View>
      <Animated.View
        style={[
          styles.rectangle,
          {
            transform: [
              {
                translateX: animation.interpolate({
                  inputRange: [0, 1], // 0:1 = 0:150
                  outputRange: [0, 150],
                }),
              },
            ],
            opacity: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
          },
        ]}
      />
      <Button title="Toggle" onPress={() => setEnabled(cur => !cur)} />
    </View>
  );
}

function CalendarScreen() {
  return (
    <View style={styles.block}>
      <SlideLeftAndRight />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {},
  rectangle: {
    width: 100,
    height: 100,
    backgroundColor: 'black',
  },
});

export default CalendarScreen;
