import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Keyboard,
} from 'react-native';

function AddTodo({onInsert}) {
  const [text, setText] = useState('');

  const button = (
    <View style={styles.buttonStyle}>
      <Image source={require('../icons/add_white/add_white.png')} />
    </View>
  );

  const onPress = () => {
    onInsert(text);
    setText('');
    Keyboard.dismiss(); // 나타난 키보드를 닫는다.
  };

  return (
    <View style={styles.block}>
      <TextInput
        placeholder="할 일을 입력하세요."
        style={styles.input}
        value={text}
        onChangeText={setText}
        onSubmitEditing={onPress} // Enter 누를경우 동작
        returnKeyType="done" // Enter의 타입을 지정해줌. ( 키보드에 엔터 표시해주는 거 그거 말하는거 )
      />
      {Platform.select({
        ios: (
          <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
            {button}
          </TouchableOpacity>
        ),
        android: (
          <View style={styles.circleWrapper}>
            <TouchableNativeFeedback onPress={onPress}>
              {button}
            </TouchableNativeFeedback>
          </View>
        ),
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: 'white',
    height: 64,
    paddingHorizontal: 8, // left and right
    borderColor: '#bdbdbd',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8, // top and bottom
  },
  buttonStyle: {
    backgroundColor: '#26a69a',
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  circleWrapper: {
    overflow: 'hidden',
    borderRadius: 24,
  },
});

export default AddTodo;
