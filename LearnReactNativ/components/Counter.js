import React, {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <View style={styles.wrapper}>
      <View style={styles.numberArea}>
        <Text style={styles.number}>{number}</Text>
      </View>
      <Button title="+1" onPress={() => setNumber(cur => cur + 1)} />
      <Button title="-1" onPress={() => setNumber(cur => cur - 1)} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  numberArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    fontSize: 72,
    fontWeight: 'bold',
  },
});

export default Counter;
