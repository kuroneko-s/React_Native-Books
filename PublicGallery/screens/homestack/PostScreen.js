import React, {useEffect} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import {StyleSheet, ScrollView} from 'react-native';
import PostCard from '../../components/PostCard';
import events from '../../lib/events';

function PostScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const {post} = route.params;

  useEffect(() => {
    const handler = ({description}) => {
      navigation.setParams({post: {...post, description}});
    };

    events.addListener('updatePost', handler);
    return () => {
      events.removeListener('updatePost', handler);
    };
  }, [navigation, post]);

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <PostCard
        user={post.user}
        photoURL={post.photoURL}
        description={post.description}
        createAt={post.createAt}
        id={post.id}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 40, // 하단 Tab과 겹쳐질 수 있어서 설정
  },
});

export default PostScreen;
