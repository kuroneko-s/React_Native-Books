import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {searchContext} from './../context/SearchContext';

function SearchEmptyComponent({type}) {
  return (
    <View style={styles.block}>
      <Text style={{fontSize: 22, fontWeight: 'bold'}}>
        {type === 'EMPTY' ? '검색을 해주세요.' : '찾을 수 없습니다.'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SearchEmptyComponent;
