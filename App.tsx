import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { StatusBar, View, useColorScheme } from 'react-native';

import { THEME } from './src/theme';
import { Loading } from './src/components/Loading/Loading';
import { Routes } from './src/routes';
import { AuthContextProvider } from './src/contexts/AuthContext';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={'transparent'}
        translucent
      />

      <AuthContextProvider>
        {!isDarkMode ? <Routes /> : <Loading />}
      </AuthContextProvider>

      <View />
    </NativeBaseProvider>
  );
};

export default App;
