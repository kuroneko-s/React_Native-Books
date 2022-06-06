import React from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// android에서만 동작시키고 IOS는 전용 컴포넌트 사용
function UploadModeModal({
  visible,
  onClose,
  onLaunchCamera,
  onLaunchImageLibrary,
}) {
  return (
    <Modal
      visible={visible} // Modal 컴포넌트 표시 유무
      transparent={true} // true = 배경을 투명하게, 설정이 없으면 배경이 흰색
      animationType="fade" // transition 효과 보여줌 [slide, fade, none]
      onRequestClose={onClose} // 안드로이드에서 뒤로가기 버튼 눌렀을 때 동작하는 함수
    >
      <Pressable style={styles.background} onPress={onClose}>
        <View style={styles.whiteBox}>
          <Pressable
            style={styles.actionButton}
            android_ripple={{color: '#eee'}}
            onPress={() => {
              onLaunchCamera();
              onClose();
            }}>
            <Icon
              name="camera-alt"
              size={24}
              color="#757575"
              style={styles.icon}
            />
            <Text style={styles.actionText}>카메라로 촬영하기</Text>
          </Pressable>
          <Pressable
            style={styles.actionButton}
            android_ripple={{color: '#eee'}}
            onPress={() => {
              onLaunchImageLibrary();
              onClose();
            }}>
            <Icon name="photo" size={24} color="#757575" style={styles.icon} />
            <Text style={styles.actionText}>사진 선택하기</Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteBox: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 4,
    elevation: 2,
  },
  actionButton: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  actionText: {
    fontSize: 16,
  },
});

export default UploadModeModal;
