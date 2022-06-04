import React, {useContext} from 'react';
import {View, TextInput, StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {searchContext} from '../context/SearchContext';

function HeaderSearchComponent() {
  const {search, setSearch} = useContext(searchContext);
  return (
    <View style={styles.block}>
      <TextInput
        style={styles.input}
        placeholder="검색어를 입력하세요."
        clearButtonMode="always"
        value={search}
        onChangeText={setSearch}
      />
      <Pressable
        android_ripple={{color: 'white'}}
        onPress={() => setSearch('')}>
        <Icon style={styles.icon} name="cancel" size={22} color={'black'} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    backgroundColor: 'white',
    height: 38,
  },
  input: {
    flex: 1,
  },
});

export default HeaderSearchComponent;
