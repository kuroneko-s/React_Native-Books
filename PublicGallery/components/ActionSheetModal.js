import React from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// android에서만 동작시키고 IOS는 전용 컴포넌트 사용
function ActionSheetModal({visible, onClose, actions}) {
  return (
    <Modal
      visible={visible} // Modal 컴포넌트 표시 유무
      transparent={true} // true = 배경을 투명하게, 설정이 없으면 배경이 흰색
      animationType="fade" // transition 효과 보여줌 [slide, fade, none]
      onRequestClose={onClose} // 안드로이드에서 뒤로가기 버튼 눌렀을 때 동작하는 함수
    >
      <Pressable style={styles.background} onPress={onClose}>
        <View style={styles.whiteBox}>
          {actions.map(action => (
            <Pressable
              style={styles.actionButton}
              android_ripple={{color: '#eee'}}
              onPress={() => {
                action.onPress();
                onClose();
              }}
              key={action.text}>
              <Icon
                name={action.icon}
                size={24}
                style={styles.icon}
                color={'#757575'}
              />
              <Text style={styles.actionText}>{action.text}</Text>
            </Pressable>
          ))}
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

export default ActionSheetModal;
