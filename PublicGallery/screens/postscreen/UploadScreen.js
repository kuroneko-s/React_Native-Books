import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import IconRightButton from './../../components/IconRightButton';
import {
  Animated,
  Image,
  Keyboard,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';

function UploadScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [description, setDescription] = useState('');

  const {res} = route.params || {};
  const {width} = useWindowDimensions(); // 화면의 값
  const animation = useRef(new Animated.Value(width)).current;

  const onSubmit = useCallback(() => {
    // TODO: 포스트 작성 로직
  }, []);

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
    navigation.setOptions({
      headerRight: () => <IconRightButton name={'send'} onPress={onSubmit} />,
    });
  }, [navigation, onSubmit]);

  return (
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
