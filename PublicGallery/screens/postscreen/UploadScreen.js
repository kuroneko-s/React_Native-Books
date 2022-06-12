import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import IconRightButton from './../../components/IconRightButton';
import {
  Animated,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import {useUserContext} from '../../contexts/UserContext';
import storage from '@react-native-firebase/storage';
import {v4} from 'uuid';
import {createPost} from '../../lib/posts';
import events from '../../lib/events';

function UploadScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const {user} = useUserContext();

  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [description, setDescription] = useState('');

  const {res} = route.params || {};
  const {width} = useWindowDimensions(); // 화면의 값
  const animation = useRef(new Animated.Value(width)).current;

  // storage에 image 저장하기 위해서 async/await 사용
  const onSubmit = useCallback(async () => {
    navigation.pop(); // === goBack()
    const asset = res.assets[0]; // image value

    const extension = asset.fileName.split('.').pop(); // 확장자
    const reference = storage().ref(`/photo/${user.id}/${v4()}.${extension}`); // 파일 저장할 위치 정함
    if (Platform.OS === 'android') {
      await reference.putString(asset.base64, 'base64', {
        contentType: asset.type,
      });
    } else {
      await reference.putFile(asset.uri);
    }

    const photoURL = await reference.getDownloadURL(); // storage로 부터 저장한 이미지 값을 불러올 수 있는 URL 값을 받아옴
    await createPost({
      user,
      photoURL,
      description,
    });

    events.emit('refresh');
  }, [res, user, navigation, description]);

  useEffect(() => {
    const didShow = Keyboard.addListener('keyboardDidShow', () =>
      setIsKeyboardOpen(true),
    );
    const didHide = Keyboard.addListener('keyboardDidHide', () =>
      setIsKeyboardOpen(false),
    );

    return () => {
      didShow.remove();
      didHide.remove();
    };
  }, []);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isKeyboardOpen ? 0 : width,
      useNativeDriver: false,
      duration: 150,
      delay: 50,
    }).start();
  }, [isKeyboardOpen, width, animation]);

  useEffect(() => {
    // header에 무슨 값 추가할 때 쓰는 듯 ? 별에 별 옵션이 다 있음
    navigation.setOptions({
      headerRight: () => <IconRightButton name={'send'} onPress={onSubmit} />,
    });
  }, [navigation, onSubmit]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ios: 'height'})} // 여기선 padding이 아니라 height 준듯?
      style={styles.block}
      keyboardVerticalOffset={Platform.select({
        ios: 180,
      })}>
      <View style={styles.block}>
        <Animated.Image
          source={{
            uri: res.assets[0]?.uri,
          }}
          style={[styles.image, {height: animation}]}
          resizeMode="cover"
        />
        <TextInput
          style={styles.input}
          multiline={true}
          placeholder="이 사진에 대한 설명을 입력하세요..."
          textAlignVertical="top" // 세로기준으로 어디에 정렬할꺼냐 ( top - 맨위 )
          value={description}
          onChangeText={setDescription}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  image: {
    width: '100%',
  },
  input: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    flex: 1,
    fontSize: 16,
  },
});

export default UploadScreen;
