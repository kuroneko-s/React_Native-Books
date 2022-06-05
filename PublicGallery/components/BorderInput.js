import React from 'react';
import {TextInput, StyleSheet} from 'react-native';

// ... spread 연산자인데 이 경우에는 rest 연산자라고 부른다.
// ...연산자를 변수, 값에 사용하냐에 따라서 부르는 용어가 다름
function BorderInput({hasMarginBottom, ...rest}, ref) {
  return (
    <TextInput
      style={[styles.input, hasMarginBottom && styles.margin]}
      {...rest}
      ref={ref}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: '#bdbdbd',
    borderWidth: 1,
    height: 48,
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: 'white',
  },
  margin: {
    marginBottom: 16,
  },
});

export default React.forwardRef(BorderInput);
