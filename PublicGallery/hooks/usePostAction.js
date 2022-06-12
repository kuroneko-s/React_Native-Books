import {useState} from 'react';
import {Platform, ActionSheetIOS} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {removePost} from './../lib/posts';
import events from '../lib/events';

export default function usePostAction({id, description}) {
  const [isSelecting, setIsSelecting] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  const edit = () => {
    navigation.navigate('Modify', {id, description});
  };

  const remove = async () => {
    await removePost(id);

    // TODO : 홈 및 프로필 화면의 목록 업데이트
    events.emit('removePost', id);

    // 현재 단일 포스트 조회 화면이면 뒤로가기
    if (route.name === 'Post') {
      navigation.pop(); // or goBack()
    }
  };

  const onPressMore = () => {
    if (Platform.OS === 'android') {
      setIsSelecting(true);
    } else {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['설명 수정', '게시물 삭제', '취소'],
          cancelButtonIndex: 2,
          destructiveButtonIndex: 1,
        },
        index => {
          if (index === 0) {
            edit();
          } else if (index === 1) {
            remove();
          }
        },
      );
    }
  };

  const actions = [
    {
      icon: 'edit',
      text: '설명 수정',
      onPress: edit,
    },
    {
      icon: 'delete',
      text: '게시물 삭제',
      onPress: remove,
    },
  ];

  const onClose = () => {
    setIsSelecting(false);
  };

  return {
    isSelecting,
    onPressMore,
    actions,
    onClose,
  };
}
