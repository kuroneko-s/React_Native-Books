import React, {useEffect} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {Dimensions} from 'react-native';

const width = Dimensions.get('window').width;

// push는 stack에 페이지를 쌓아가고 => native-stack-navigate에서만 사용가능
// navigate는 페이지가 같으면 파라미터 값만 바뀜. => native-stack-navigate외에도 다른 네비게이터에서도 있음
function DetailScreen({navigation, route}) {
  console.log('run');
  const {id} = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: `상세 정보 - ${id}`,
    });
  }, [navigation, id]);

  return (
    <View style={styles.block}>
      <Text style={styles.text}>Detail {id} Screen</Text>
      <View style={styles.buttons}>
        <Button
          style={styles.button}
          title="다음"
          onPress={() => navigation.push('Detail', {id: id + 1})}
        />
        <Button
          style={styles.button}
          title="이전"
          onPress={() => navigation.pop()}
        />
        <Button
          style={styles.button}
          title="처음으로"
          onPress={() => navigation.popToTop()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 48,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
  },
  button: {
    marginVertical: 50,
  },
});

export default DetailScreen;
