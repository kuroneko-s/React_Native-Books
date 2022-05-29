import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import WriteHeader from '../../conponents/WriteHeader';
import WriteEdior from './../../conponents/WriteEditor';
import {useNavigation} from '@react-navigation/native';
import LogContext from '../../context/LogContext';

function WriteScreen() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigation = useNavigation();
  const {onCreate} = useContext(LogContext);

  const onSave = () => {
    onCreate({
      title,
      body,
      date: new Date().toISOString(),
    });
    navigation.pop();
  };

  return (
    <SafeAreaView
      style={styles.block} // View => SafeAreaView로 변경
    >
      <KeyboardAvoidingView // IOS에서 키보드로 인해서 내용이 길어질때 짤리는 문제 해결해줘야함
        style={styles.avoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <WriteHeader onSave={onSave} />
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
