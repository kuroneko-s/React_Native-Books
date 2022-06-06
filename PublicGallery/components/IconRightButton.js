import React from 'react';
import {Platform, Pressable, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function IconRightButton({name, color, onPress}) {
  return (
    <View style={styles.block}>
      <Pressable
        onPress={onPress}
        style={({pressed}) => [
          styles.circle,
          Platform.OS === 'ios' && pressed && {opacity: 0.3},
        ]}
        android_ripple={{color: '#eee'}}>
        <Icon name={name} size={24} color={color} />
      </Pressable>
    </View>
  );
}

IconRightButton.defaultProps = {
  color: '#6200ee',
};

const styles = StyleSheet.create({
  block: {
    overflow: 'hidden',
    marginRight: -8, // 여백이 안생기고 컴포넌트가 이동하게 됨
    borderRadius: 24,
  },
  circle: {
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default IconRightButton;
