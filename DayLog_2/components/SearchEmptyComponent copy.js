import React, {useContext} from 'react';
import {View} from 'react-native';
import {searchContext} from './../context/SearchContext';

function SearchEmptyComponent() {
  return <View style={{flex: 1}}>검색을 해주세요.</View>;
}

export default SearchEmptyComponent;
