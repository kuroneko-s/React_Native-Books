import React, {useEffect} from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import PostCard from '../../components/PostCard';
import usePosts from './../../hooks/usePosts';
import SplashScreen from 'react-native-splash-screen';

function FeedScreen() {
  const {posts, noMorePost, refreshing, onLoadMore, onRefresh} = usePosts();

  const postsReady = posts !== null;

  useEffect(() => {
    if (postsReady) {
      SplashScreen.hide();
    }
  }, [postsReady]);

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
    id={item.id}
    user={item.user}
  />
);

export default FeedScreen;
