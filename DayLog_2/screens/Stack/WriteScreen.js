import React, {useContext, useState, useEffect} from 'react';
import {feedsContext} from './../../context/FeedsContext';
import HeaderArrowComponent from '../../components/HeaderArrowComponent';
import {v4} from 'uuid';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  View,
} from 'react-native';

function WriteScreen() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const {feeds, onCreate, onModify} = useContext(feedsContext);
  const route = useRoute();
  const id = route.params?.id;

  useEffect(() => {
    if (id !== undefined) {
      const feed = feeds.filter(v => v.id === id)[0];
      setTitle(feed.title);
      setBody(feed.body);
    }
  }, [feeds, id]);

  const onSave = () => {
    if (id) {
      onModify({
        id,
        title,
        body,
      });
    } else {
      onCreate({
        id: v4(),
        title,
        body,
        date: new Date().getTime(),
      });
    }
  };

  return (
    <View style={{flex: 1}}>
      <HeaderArrowComponent title={title} body={body} onSave={onSave} />
      <KeyboardAvoidingView
        style={styles.block}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <TextInput
          placeholder="Title"
          autoComplete="off"
          multiline
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          placeholder="Context"
          autoComplete="off"
          multiline
          value={body}
          onChangeText={setBody}
        />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    paddingHorizontal: 7,
  },
});

export default WriteScreen;
