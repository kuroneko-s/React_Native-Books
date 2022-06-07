import React, {useMemo} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

// 필요한 값 - user, photoURL, description, createdAt, postId

function PostCard({user, photoURL, description, createdAt, postId}) {
  // createdAt 형식이 뭔데, useMemo - lazy 최적화 ( [] 값이 바뀌면 연산하고 안바뀌면 그냥 쓰던거 쓰고 )
  const date = useMemo(
    () => (createdAt ? new Date(createdAt._secondes * 1000) : new Date()),
    [createdAt],
  );

  const onOpenProfile = () => {
    // TODO: 사용자 프로필 화면 열기
  };

  return (
    <View style={styles.block}>
      <View style={[styles.head, styles.paddingBlock]}>
        <Pressable style={styles.profile} onPress={onOpenProfile}>
          <Image
            style={styles.avatar}
            source={
              user.photoURL
                ? {
                    uri: user.photoURL,
                  }
                : require('../assets/anya15.png')
            }
          />
          <Text style={styles.displayName}>{user.displayName}</Text>
        </Pressable>
      </View>
      <Image
        source={{uri: photoURL}}
        style={styles.image}
        resizeMethod="resize"
        resizeMode="cover"
      />
      <View style={styles.paddingBlock}>
        <Text style={styles.description}>{description}</Text>
        <Text date={date} style={styles.date}>
          {date.toLocaleString()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // 자신이 쓴 포스트면 우측에 ... 보여줄려고
    marginBottom: 16,
  },
  paddingBlock: {
    paddingHorizontal: 16,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  displayName: {
    lineHeight: 16,
    fontSize: 16,
    marginLeft: 8,
    fontWeight: 'bold',
  },
  image: {
    backgroundColor: '#bdbdbd',
    width: '100%',
    aspectRatio: 1, // 폭의 비율을 정함
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  date: {
    color: '#757575',
    fontSize: 12,
    lineHeight: 18,
  },
});

export default PostCard;
