import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import PostCard from '../../components/PostCard';
import { getPosts } from '../../lib/posts';

function FeedScreen() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    // useEffect에서 state에 대한 값은 받아올 수 있나봄
    getPosts().then(setPosts)
  }, []);

  const renderItem = ({ item }) => (
    <PostCard
      createdAt={item.createdAt}
      description={item.description}
      photoURL={item.photoURL}
      postId={item.id}
      user={item.user}
    />
  )

  return <FlatList
    data={posts}
    renderItem={renderItem}
    keyExtractor={(item) => item.id}
  />
}

export default FeedScreen;
