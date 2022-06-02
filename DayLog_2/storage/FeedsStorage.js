import React from 'react';
import {AsyncStorage} from '@react-native-community/async-storage';

/*
    1. key를 선언
    2. async await로 getter, setter 선언
    3. 선언한 함수 export
*/

const KEY = 'FEEDS';

const feedsStorage = {
  async get() {
    try {
      const result = await AsyncStorage.getItem(KEY);
      const feeds = JSON.parse(result);
      return feeds;
    } catch (e) {
      throw new Error('Failed to load feeds');
    }
  },
  async set(data) {
    try {
      await AsyncStorage.setItem(KEY, JSON.stringify(data));
    } catch (e) {
      throw new Error('Failed to save feeds');
    }
  },
};

export default feedsStorage;
