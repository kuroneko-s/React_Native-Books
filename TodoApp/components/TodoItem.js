import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

function TodoItem({title, done, id, onToggle, onDelete}) {
  const checkBoxCom = (
    <View style={[styles.circle, done && styles.filled]}>
      {done && (
        <Image source={require('../icons/check_white/check_white.png')} />
      )}
    </View>
  );

  const onRemove = () => {
    Alert.alert(
      '삭제', // title
      '정말로 삭제하시겠어요?', // content
      [
        // 버튼배열
        {text: '취소', onPress: () => {}, style: 'cancel'},
        {
          text: '삭제',
          onPress: () => {
            onDelete(id);
          },
          style: 'destructive',
        },
      ],
      {
        // 옵션
        cancelable: true, // 닫으면 아래의 함수가 동작함
        onDismiss: () => {
          Alert.alert('닫음', '안에 또있지롱', [
            {
              text: '닫기',
              onPress: () => {
                console.log('안에잇는 alert 닫음');
              },
              style: 'default',
            },
          ]);
        },
      },
    );
  };

  return (
    <View style={styles.item}>
      {Platform.select({
        ios: (
          <TouchableOpacity onPress={() => onToggle(id)} activeOpacity={0.5}>
            {checkBoxCom}
          </TouchableOpacity>
        ),
        android: (
          <TouchableNativeFeedback onPress={() => onToggle(id)}>
            {checkBoxCom}
          </TouchableNativeFeedback>
        ),
      })}
      <Text style={[styles.text, done && styles.lineThrough]}>{title}</Text>
      {done ? (
        Platform.select({
          ios: (
            <TouchableOpacity onPress={onRemove} activeOpacity={0.5}>
              <Icon name="delete" size={32} color="red" onPress={onRemove} />
            </TouchableOpacity>
          ),
          android: (
            <TouchableNativeFeedback onPress={onRemove}>
              <Icon name="delete" size={32} color="red" />
            </TouchableNativeFeedback>
          ),
        })
      ) : (
        <View style={styles.removePlaceholder} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderColor: '#26a69a',
    borderWidth: 1,
    marginRight: 16,
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: '#212121',
  },
  filled: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#26a69a',
  },
  lineThrough: {
    textDecorationLine: 'line-through',
    color: '#9e9e9e',
  },
  removePlaceholder: {
    width: 32,
    height: 32,
  },
});

export default TodoItem;
