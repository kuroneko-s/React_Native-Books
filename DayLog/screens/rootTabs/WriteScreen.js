import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import WriteHeader from '../../conponents/WriteHeader';
import WriteEdior from './../../conponents/WriteEditor';
import {useNavigation, useRoute} from '@react-navigation/native';
import LogContext from '../../context/LogContext';

function WriteScreen() {
  const navigation = useNavigation();
  const {onCreate, onModify, onRemove} = useContext(LogContext);
  const route = useRoute();

  const log = route.params?.log;
  const [title, setTitle] = useState(log?.title ?? '');
  const [body, setBody] = useState(log?.body ?? '');
  const [date, setDate] = useState(log ? new Date(log.date) : new Date());

  const onSave = () => {
    if (log) {
      onModify({
        id: log.id,
        title,
        body,
        date: date.toISOString(),
      });
    } else {
      onCreate({
        title,
        body,
        date: date.toISOString(),
      });
    }
    navigation.pop();
  };

  const onAskRemove = () => {
    Alert.alert(
      '삭제',
      '정말로 삭제하시겠어요?',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '삭제',
          style: 'destructive',
          onPress: () => {
            onRemove(log?.id);
            navigation.pop();
          },
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  return (
    <SafeAreaView
      style={styles.block} // View => SafeAreaView로 변경
    >
      <KeyboardAvoidingView // IOS에서 키보드로 인해서 내용이 길어질때 짤리는 문제 해결해줘야함
        style={styles.avoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <WriteHeader
          onSave={onSave}
          onAskRemove={onAskRemove}
          isEditing={!!log}
          date={date}
          onChangeDate={setDate}
        />
        <WriteEdior
          title={title}
          onChangeBody={setBody}
          onChangeTitle={setTitle}
          body={body}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'white',
  },
  avoidingView: {
    flex: 1,
  },
});

export default WriteScreen;
