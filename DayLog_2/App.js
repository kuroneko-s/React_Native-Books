/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import RootStackScreen from './screens/RootStackScreen';
import FeedsContextProvider from './context/FeedsContext';
import SearchContextProvider from './context/SearchContext';

const App = () => {
  return (
    <NavigationContainer>
      <FeedsContextProvider>
        <SearchContextProvider>
          <RootStackScreen />
        </SearchContextProvider>
      </FeedsContextProvider>
    </NavigationContainer>
  );
};

export default App;
