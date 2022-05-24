import React from 'react';
import {View, StyleSheet} from 'react-native';

Box.defaultProps = {
  size: 'medium',
  color: 'black',
};

const styled = StyleSheet.create({
  box: {
    marginTop: 20,
    marginLeft: 30,
    width: 64,
    height: 64,
    backgroundColor: 'black',
  },
  rounded: {
    borderRadius: 5,
  },
  small: {
    width: 32,
    height: 32,
  },
  medium: {
    width: 64,
    height: 64,
  },
  large: {
    width: 128,
    height: 128,
  },
});

const sizes = {
  small: styled.small,
  medium: styled.medium,
  large: styled.large,
};

function Box({rounded, size, color}) {
  return (
    <View
      style={[
        styled.box,
        rounded ? styled.rounded : null,
        sizes[size],
        {
          backgroundColor: color,
        },
      ]}
    />
  );
}

export default Box;
