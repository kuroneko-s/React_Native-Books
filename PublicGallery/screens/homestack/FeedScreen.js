import React, {useEffect, useState} from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import PostCard from '../../components/PostCard';
import {
  getNewerPosts,
  getOlderPosts,
  getPosts,
  PAGE_SIZE,
} from '../../lib/posts';

function FeedScreen() {
  const [posts, setPosts] = useState(null);
  // 더이상 Post가 있니 없니
  const [noMorePost, setNoMorePost] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // useEffect에서 state에 대한 값은 받아올 수 있나봄
    getPosts().then(setPosts);
  }, []);

  const onLoadMore = async () => {
    if (noMorePost || !posts || posts.length < PAGE_SIZE) {
      return;
    }

    const lastPost = posts[posts.length - 1];
    const oldPosts = await getOlderPosts(lastPost.id);
    if (oldPosts.length < PAGE_SIZE) {
      // 포스트 있는거를 새롭게 받았는데 길이가 짧으면
      setNoMorePost(true); // 더이상 포스트가 없다.
    }

    setPosts([...posts, ...oldPosts]);
  };

  const onRefresh = async () => {
    if (!posts || posts.length === 0 || refreshing) {
      return;
    }

    const firstPost = posts[0];
    setRefreshing(true);
    const newerPosts = await getNewerPosts(firstPost.id);
    setRefreshing(false);

    if (newerPosts.length === 0) {
      return;
    }

    setPosts([...newerPosts, ...posts]);
  };

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.75} // 스크롤이 75% 이상 아래로 내려왔다면 onEndReached 실행
      ListFooterComponent={
        !noMorePost && (
          <ActivityIndicator
            style={styles.spinner}
            size={32}
            color={'#6200ee'}
          />
        )
      }
      refreshControl={
        <RefreshControl
          onRefresh={onRefresh} // 맨위에서 아래로 땡겼을때 호출할 함수
          refreshing={refreshing} // 새로 고침 해야하는지에 대한 여부 (required)
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 18,
  },
  spinner: {
    height: 64,
  },
});

// 밖에 선언 안하면 useMemo 쓰는 방법도 있다.
const renderItem = ({item}) => (
  <PostCard
    createdAt={item.createdAt}
    description={item.description}
    photoURL={item.photoURL}
    postId={item.id}
    user={item.user}
  />
);

export default FeedScreen;
