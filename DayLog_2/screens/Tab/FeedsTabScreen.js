import React from 'react';
import {View, StyleSheet} from 'react-native';
import FloatingWirteButton from '../../components/FloatingWirteButton';
import FeedsListComponent from './../../components/FeedsListComponent';

function FeedsTabScreen() {
  return (
    <View style={styles.block}>
      <FeedsListComponent />
      <FloatingWirteButton />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
});

export default FeedsTabScreen;
