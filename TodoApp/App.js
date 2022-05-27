/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AddTodo from './components/AddTodo';
import DateHead from './components/DateHead';
import Empty from './components/Empty';
import {useState} from 'react';
import TodoList from './components/TodoList';
import todosStorage from './storages/todosStorage';

const App = () => {
  // Platform.OS === 'ios' ? 'padding' : undefined

  const [todos, setTodos] = useState([
    {
      id: 1,
      text: '작업환경 설정',
      done: true,
    },
    {
      id: 2,
      text: '기초',
      done: false,
    },
    {
      id: 3,
      text: '심화',
      done: false,
    },
  ]);

  const onInsert = text => {
    const nextId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
    const newTodo = {
      id: nextId,
      text,
      done: false,
    };

    setTodos(todos.concat(newTodo));
  };

  const onToggle = id => {
    setTodos(
      todos.map(todo => (todo.id === id ? {...todo, done: !todo.done} : todo)),
    );
  };

  const onDelete = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  useEffect(() => {
    todosStorage.get().then(setTodos).catch(console.error);
  }, []);

  useEffect(() => {
    todosStorage.set(todos).catch(console.error);
  }, [todos]);

  return (
    <SafeAreaView style={styles.block} edges={['bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.select({ios: 'padding'})} // 작동방식을 정의할 수 있음. 안드는 안쓰는게, ios는 적용하는게 정상동작 함
        style={styles.avoid}>
        <DateHead />
        {todos.length === 0 ? (
          <Empty />
        ) : (
          <TodoList todos={todos} onToggle={onToggle} onDelete={onDelete} />
        )}
        <AddTodo onInsert={onInsert} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'white',
  },
  avoid: {
    flex: 1,
  },
});

export default App;
