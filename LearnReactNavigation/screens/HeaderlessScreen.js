import React from 'react';
import {View, Text, Button} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

function HeaderlessScreen({navigation}) {
  return (
    <SafeAreaView>
      <View>
        <Text>Header가 없어!</Text>
        <Button onPress={() => navigation.pop()} title="뒤로가기" />
      </View>
    </SafeAreaView>
  );
}

export default HeaderlessScreen;
