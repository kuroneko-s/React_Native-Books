import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ActionSheetIOS,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import UploadModeModal from './UploadModeModal';

const TABBAR_HEIGHT = 49;

// launchImageLibrary options 매개변수
const imagePickerOption = {
  mediaType: 'photo',
  maxWidth: 768,
  maxHeight: 768,
  includeBase64: Platform.OS === 'android',
};

function CameraButton() {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets(); // 단말기의 SafeArea에 대한 값을 받아옴

  const bottom = Platform.select({
    android: TABBAR_HEIGHT / 2,
    ios: TABBAR_HEIGHT / 2 + insets.bottom - 4,
  });

  // launchImageLibrary callback 매개변수
  const onPickImage = res => {
    if (res.didCancel || !res) {
      return;
    }
    navigation.push('Upload', {res});
  };

  const onLaunchCamera = () => {
    launchCamera(imagePickerOption, onPickImage);
  };

  const onLaunchImageLibrary = () => {
    launchImageLibrary(imagePickerOption, onPickImage);
  };

  const onPress = () => {
    if (Platform.OS === 'android') {
      setModalVisible(true);
      return;
    }

    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['카메라로 촬영하기', '사진 선택하기', '취소'],
        cancelButtonIndex: 2, // 취소에 대해선 기본 값을 넣을 수 있나봄
      },
      buttonIndex => {
        // 선택한 버튼의 index 값을 받아올 수 있음
        if (buttonIndex === 0) {
          onLaunchCamera();
        } else if (buttonIndex === 1) {
          onLaunchImageLibrary();
        }
      },
    );
  };

  return (
    <>
      <View style={[styles.wrapper, {bottom}]}>
        <Pressable
          android_ripple={{
            color: '#ffffff',
          }}
          style={styles.circle}
          onPress={onPress}>
          <Icon name="camera-alt" size={24} color={'white'} />
        </Pressable>
      </View>
      <UploadModeModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onLaunchCamera={onLaunchCamera}
        onLaunchImageLibrary={onLaunchImageLibrary}
      />
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 5,
    borderRadius: 27,
    height: 54,
    width: 54,
    position: 'absolute',
    left: '50%',
    transform: [
      {
        translateX: -27,
      },
    ],
    ...Platform.select({
      ios: {
        shadowColor: '#4d4d4d',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
        overflow: 'hidden',
      },
    }),
  },
  circle: {
    backgroundColor: '#6200ee',
    borderRadius: 27,
    height: 54,
    width: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CameraButton;
