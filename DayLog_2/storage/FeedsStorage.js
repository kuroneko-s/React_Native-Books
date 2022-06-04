import AsyncStorage from '@react-native-community/async-storage';

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
      console.log('storage result - ', result);
      const feeds = JSON.parse(result);
      console.log('storage feeds - ', feeds);
      return feeds;
    } catch (e) {
      throw new Error('Failed to load feeds');
    }
  },
  async set(data) {
    console.log('setter is run ?');
    console.log('setter - ', data);
    try {
      await AsyncStorage.setItem(KEY, JSON.stringify(data));
    } catch (e) {
      throw new Error('Failed to save feeds');
    }
  },
};

export default feedsStorage;
