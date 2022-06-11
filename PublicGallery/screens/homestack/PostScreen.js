import React from 'react';
import {useRoute} from '@react-navigation/native';
import {StyleSheet, ScrollView} from 'react-native';
import PostCard from '../../components/PostCard';

function PostScreen() {
  const route = useRoute();
  const {post} = route.params;

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <PostCard
        user={post.user}
        photoURL={post.photoURL}
        description={post.description}
        createdAt={post.createAt}
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
