import React from 'react';
import {View, Button} from 'react-native';

function HomeScreen({navigation, route}) {
  return (
    <View>
      <Button
        title="Detail 1 열기"
        onPress={() => navigation.push('Detail', {id: 1})}
      />
      <Button
        title="Detail 11 열기"
        onPress={() => navigation.push('Detail', {id: 11})}
      />
      <Button
        title="Detail 111 열기"
        onPress={() => navigation.push('Detail', {id: 111})}
      />
      <Button
        title="Headerless로 가기"
        onPress={() => navigation.push('Hederless')}
      />
    </View>
  );
}

export default HomeScreen;
