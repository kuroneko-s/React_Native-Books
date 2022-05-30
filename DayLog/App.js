/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import RootStack from './screens/RootStack';
import {LogContextProvider} from './context/LogContext';
import {SearchContextProvider} from './context/SearchContext';

const App = () => {
  return (
    <NavigationContainer>
      <LogContextProvider>
        <SearchContextProvider>
          <RootStack />
        </SearchContextProvider>
      </LogContextProvider>
    </NavigationContainer>
  );
};

export default App;
