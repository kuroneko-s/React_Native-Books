import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {format, formatDistanceToNow} from 'date-fns';
import {ko} from 'date-fns/locale';
import {useNavigation} from '@react-navigation/native';

function FeedsItemComponent({feed}) {
  const {date, title, body, id} = feed;
  const sliceContext = text => {
    if (text.length < 100) return text;
    return text.slice(0, 100) + '...';
  };

  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('Write', {id});
  };

  return (
    <Pressable android_ripple={{color: '#b2bec3'}} onPress={onPress}>
      <View style={styles.block}>
        <Text style={styles.date}>
          {format(new Date(date), 'PPP kk:mm:ss ccc', {locale: ko})}
        </Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.context}>{sliceContext(body)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  block: {
    padding: 10,
  },
  date: {
    opacity: 0.8,
    fontSize: 14,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  context: {
    fontSize: 16,
  },
});

export default FeedsItemComponent;
