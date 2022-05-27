import React from 'react';
import {View, Text, StatusBar, StyleSheet} from 'react-native';

function DateHead() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  return (
    <>
      <StatusBar backgroundColor={'#26a69a'} barStyle="default" />
      <View style={styles.block}>
        <Text style={styles.dateText}>{`${year}년 ${month}월 ${date}일`}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  block: {
    padding: 16,
    backgroundColor: '#26a69a',
  },
  dateText: {
    fontSize: 24,
    color: 'white',
  },
});

export default DateHead;
