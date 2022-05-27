import React from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import TodoItem from './TodoItem';

function TodoList({todos, onToggle, onDelete}) {
  const betweenComponent = <View style={styles.separator} />;

  return (
    <FlatList
      ItemSeparatorComponent={() => betweenComponent} // Item 사이에 컴포넌트를 넣을 수 있는 기능
      style={styles.list}
      data={todos}
      renderItem={({item}) => (
        <TodoItem
          id={item.id}
          title={item.text}
          done={item.done}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      )}
      keyExtractor={item => item.id.toString()}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  separator: {
    backgroundColor: '#e0e0e0',
    height: 1,
  },
});

export default TodoList;
