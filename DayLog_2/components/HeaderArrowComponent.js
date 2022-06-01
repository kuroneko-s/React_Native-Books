import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Pressable,
  Platform,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function HeaderComponent({}) {
  const {width} = useWindowDimensions();
  const route = useRoute();
  const navigation = useNavigation();

  return (
    <View style={[styles.block, {width: width}]}>
      <View style={[styles.arrowBlock, styles.boxSize]}>
        <Pressable
          style={[styles.arrow, styles.boxSize]}
          android_ripple={{color: '#b2bec3'}}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={26} color={'black'} />
        </Pressable>
      </View>

      <View style={styles.buttons}>
        <View style={[styles.button, styles.boxSize]}>
          <Pressable
            style={[styles.arrow, styles.boxSize]}
            android_ripple={{color: '#b2bec3'}}>
            <Icon name="delete-forever" size={28} color={'red'} />
          </Pressable>
        </View>
        <View style={[styles.button, styles.boxSize]}>
          <Pressable
            style={[styles.arrow, styles.boxSize]}
            android_ripple={{color: '#b2bec3'}}>
            <Icon name="check-box" size={28} color={'green'} />
          </Pressable>
        </View>
      </View>

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
    justifyContent: 'space-between',
  },
  boxSize: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  arrowBlock: {
    marginLeft: 5,
    overflow: Platform.select({android: 'hidden'}),
  },
  buttons: {
    flexDirection: 'row',
    height: 38,
  },
  button: {
    overflow: Platform.select({android: 'hidden'}),
  },
  arrow: {
    alignItems: 'center',
    justifyContent: 'center',
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
