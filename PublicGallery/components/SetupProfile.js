import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useUserContext} from '../contexts/UserContext';
import {signOut} from '../lib/auth';
import {createUser} from '../lib/users';
import BorderInput from './BorderInput';
import CustomButton from './CustomButton';
import storage from '@react-native-firebase/storage';
import Avatar from './Avatar';

function SetupProfile() {
  const [displayName, setDisplayName] = useState('');
  const navigation = useNavigation();
  const {setUser} = useUserContext();
  const {params} = useRoute();
  const {uid} = params || {};
  const [imageRes, setImageRes] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    let photoURL = null;

    if (imageRes) {
      const asset = imageRes.assets[0];
      const extension = asset.fileName.split('.').pop();
      const reference = storage().ref(`/profile/${uid}.${extension}`); // 업로드 경로 지정

      try {
        if (Platform.OS === 'android') {
          // 파일 저장
          await reference.putString(asset.base64, 'base64', {
            contentType: asset.type,
          });
        } else {
          // 파일 저장
          await reference.putFile(asset.uri);
        }

        // 다운로드할 수 있는 (Image를 통해 보여줄 수 있는) URL 생성
        photoURL = imageRes ? await reference.getDownloadURL() : null;
      } catch (e) {
        console.log('storage error - ', e);
        return;
      }
    }

    const user = {
      id: uid,
      displayName,
      photoURL,
    };
    createUser(user);
    setUser(user);
    setLoading(false);
  };

  const onCancel = () => {
    signOut();
    navigation.goBack();
  };

  const onSelectImage = () => {
    launchImageLibrary(
      // 사진에서 가져오는 함수
      {
        mediaType: 'photo',
        maxWidth: 512,
        maxHeight: 512,
        includeBase64: Platform.OS === 'android', // 안드는 BASE64로 가져옴
      },
      res => {
        if (res.didCancel) {
          // 취소했을 경우
          return;
        }
        console.log('save res!');
        setImageRes(res);
      },
    );
  };

  return (
    <View style={styles.block}>
      <Pressable onPress={onSelectImage}>
        <Avatar
          source={imageRes && {uri: imageRes?.assets[0].uri}}
          size={128}
        />
      </Pressable>
      <View style={styles.form}>
        <BorderInput
          placeholder="닉네임"
          value={displayName}
          onChangeText={setDisplayName}
          onSubmitEditing={onSubmit}
          returnKeyType="next"
        />
        {loading ? (
          <ActivityIndicator size={32} color="#6200ee" style={styles.spinner} />
        ) : (
          <View style={styles.buttons}>
            <CustomButton title="다음" onPress={onSubmit} hasMarginBottom />
            <CustomButton title="취소" onPress={onCancel} theme="secondary" />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    width: '100%',
    alignItems: 'center',
    marginTop: 24,
    paddingHorizontal: 16,
  },
  form: {
    marginTop: 16,
    width: '100%',
  },
  buttons: {
    marginTop: 48,
  },
});

export default SetupProfile;
