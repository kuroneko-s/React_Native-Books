import React from 'react';
import {
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

function WriteScreen() {
  return (
    <KeyboardAvoidingView
      style={styles.block}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <TextInput placeholder="Title" autoComplete="off" multiline autoFocus />
      <TextInput placeholder="Context" autoComplete="off" multiline />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    paddingHorizontal: 7,
  },
});

export default WriteScreen;
