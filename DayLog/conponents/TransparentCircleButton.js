import React from 'react';
import {StyleSheet, View, Platform, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function TransparentCircleButton({name, color, hasMarginRight, onPress}) {
  return (
    <View
      style={[styes.iconButtonWrapper, hasMarginRight && styes.marginRight]}>
      <Pressable
        style={({pressed}) => [
          styes.iconButton,
          Platform.OS === 'ios' &&
            pressed && {
              backgroundColor: '#efefef',
            },
        ]}
        onPress={onPress}
        android_ripple={{
          color: '#ededed', // color ?? 물결 효과일텐데 .. => 물결 효과 날때의 색상
        }}>
        <Icon name={name} size={24} color={color} />
      </Pressable>
    </View>
  );
}

const styes = StyleSheet.create({
  iconButtonWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  marginRight: {
    marginRight: 8,
  },
});

export default TransparentCircleButton;
