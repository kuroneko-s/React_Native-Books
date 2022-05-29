import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, StyleSheet} from 'react-native';
import TransparentCircleButton from './TransparentCircleButton';

function WriteHeader({onSave}) {
  const navigation = useNavigation();
  const onGoBack = () => navigation.pop(); // Stack 이라서

  return (
    <View style={styles.block}>
      {/* 책에는 여기에 View가 하나 더 들어가는데 코드상으로 없어도 될거같아서 내가 지움 */}
      <TransparentCircleButton
        name="arrow-back"
        color="#424242"
        onPress={onGoBack}
      />
      <View style={styles.buttons}>
        <TransparentCircleButton
          name="delete-forever"
          color="#ef5350"
          hasMarginRight={true}
        />
        <TransparentCircleButton
          name="check"
          color="#009688"
          hasMarginRight={true}
          onPress={onSave}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    height: 48,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default WriteHeader;
