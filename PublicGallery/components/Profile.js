import React, {useState, useEffect} from 'react';
import {getUser} from '../lib/users';
import {
  ActivityIndicator,
  StyleSheet,
  FlatList,
  View,
  Text,
  RefreshControl,
} from 'react-native';
import Avatar from './Avatar';
import PostGridItem from './PostGridItem';
import usePosts from './../hooks/usePosts';

function Profile({userId}) {
  const [user, setUser] = useState(null);
  const {posts, noMorePost, refreshing, onLoadMore, onRefresh} =
    usePosts(userId);

  useEffect(() => {
    getUser(userId).then(setUser);
  }, [userId]);

  if (!user || !posts) {
    return (
      <ActivityIndicator style={styles.spinner} size={32} color="#6200ee" />
    );
  }

  return (
    <FlatList
      style={styles.block}
      // ListHeaderComponent로 값을 FlatList 내부에 보이도록 설정한 이유가 스크롤 범위에 포함시킬려고
      ListHeaderComponent={
        <View style={styles.userInfo}>
          <Avatar source={user.photoURL && {uri: user.photoURL}} size={128} />
          <Text style={styles.username}>{user.displayName}</Text>
        </View>
      }
      numColumns={3} // numColumns Props 사용시 Grid로 동작함
      data={posts}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      onEndReached={onLoadMore} // handler
      onEndReachedThreshold={0.25} // 25%
      ListFooterComponent={
        !noMorePost && (
          <ActivityIndicator
            style={styles.bottomSpinner}
            size={32}
            color="#6200ee"
          />
        )
      }
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }
    />
  );
}

const renderItem = ({item}) => <PostGridItem post={item} />;

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
  },
  userInfo: {
    paddingTop: 80,
    paddingBottom: 64,
    alignItems: 'center',
  },
  username: {
    marginTop: 8,
    fontSize: 24,
    color: '#424242',
  },
  bottomSpinner: {
    height: 128,
  },
});

export default Profile;
