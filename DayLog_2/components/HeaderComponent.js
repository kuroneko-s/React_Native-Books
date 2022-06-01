import React from 'react';
import {View, Text, StyleSheet, useWindowDimensions} from 'react-native';
import {useRoute} from '@react-navigation/native';

function HeaderComponent({}) {
  const {width} = useWindowDimensions();
  const route = useRoute();

  return (
    <View style={[styles.block, {width: width}]}>
      <View style={styles.center}>
        <Text style={styles.title}>{route.name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    height: 38,
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  center: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default React.memo(HeaderComponent);
