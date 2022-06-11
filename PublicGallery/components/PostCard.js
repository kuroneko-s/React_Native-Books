import React, {useMemo} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import Avatar from './Avatar';
import {useNavigation, useNavigationState} from '@react-navigation/native';
import {useUserContext} from '../contexts/UserContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

// 필요한 값 - user, photoURL, description, createdAt, postId

function PostCard({user, photoURL, description, createdAt, postId}) {
  // 셀렉터 함수 -> 상태에서 어떤 값을 조회할지 정하는 함수, ex) state=>state = 상태 전체 상태 조회, state=> state.routeNames = 현재 라우터에 등록된 화면들의 이름을 배열로 조회
  const routeNames = useNavigationState(state => state.routeNames);
  const {user: me} = useUserContext(); // 로그인한 user 정보
  const isMyPost = me.id === user.id;

  // createdAt 형식이 뭔데, useMemo - lazy 최적화 ( [] 값이 바뀌면 연산하고 안바뀌면 그냥 쓰던거 쓰고 )
  const date = useMemo(
    () => (createdAt ? new Date(createdAt._secondes * 1000) : new Date()),
    [createdAt],
  );

  const navigation = useNavigation();

  const onOpenProfile = () => {
    // TODO: 사용자 프로필 화면 열기

    if (routeNames.includes('MyProfile')) {
      navigation.navigate('MyProfile');
    } else {
      navigation.navigate('Profile', {
        userId: user.id,
        displayName: user.displayName,
      });
    }
  };

  return (
    <View style={styles.block}>
      <View style={[styles.head, styles.paddingBlock]}>
        <Pressable style={styles.profile} onPress={onOpenProfile}>
          <Avatar source={user.photoURL && {uri: user.photoURL}} />
          <Text style={styles.displayName}>{user.displayName}</Text>
        </Pressable>
        {isMyPost && (
          <Pressable
            // hitSlop={10} // 이게 전방향으로 10씩 늘려주는 방법
            hitSlop={{
              // 이게 Rect 타입
              bottom: 10,
              left: 10,
              right: 10,
              top: 10,
            }} // hitSlop을 설정해주면 컴포넌트가 차지하는 영역은 그대로인데 터치할 수 있는 영역만 각 방향으로 8씩 늘려주게된다. Rect 타입의 객체를 넣을 수도 있음
            onPress={() => console.log('click')}>
            <Icon name="more-vert" size={20} />
          </Pressable>
        )}
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
