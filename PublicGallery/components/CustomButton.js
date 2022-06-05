import React from 'react';
import {View, Pressable, StyleSheet, Text, Platform} from 'react-native';

// primary랑 secondary를 구분해서 구현하는게 일반적이다.
function CustomButton({title, onPress, hasMarginBottom, theme}) {
  const isPrimary = theme === 'primary';

  return (
    <View style={[styles.overflow, hasMarginBottom && styles.margin]}>
      <Pressable
        onPress={onPress}
        style={({pressed}) => [
          styles.wrapper,
          isPrimary && styles.primaryWrapper,
          Platform.OS === 'ios' && pressed && {opacity: 0.5},
        ]}
        android_ripple={{color: isPrimary ? '#ffffff' : '#6200ee'}}>
        <Text
          style={[
            styles.text,
            isPrimary ? styles.primaryText : styles.secondaryText,
          ]}>
          {title}
        </Text>
      </Pressable>
    </View>
  );
}

CustomButton.defaultProps = {
  theme: 'primary',
};

const styles = StyleSheet.create({
  overflow: {
    overflow: 'hidden',
    borderRadius: 4,
  },
  margin: {
    marginBottom: 8,
  },
  wrapper: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'white',
  },
  primaryWrapper: {
    backgroundColor: '#6200ee',
  },
  primaryText: {
    color: 'white',
  },
  secondaryText: {
    color: '#6200ee',
  },
});

export default CustomButton;
