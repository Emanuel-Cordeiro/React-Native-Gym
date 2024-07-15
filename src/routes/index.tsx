import React from 'react';
import { useTheme, Box } from 'native-base';

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { AuthRoutes } from './Auth/Auth';
import { AppRoutes } from './App/App';
import { useAuth } from '../hooks/useAuth';
import { Loading } from '../components/Loading/Loading';

type AppRoutes = {
  home: undefined;
  exercises: undefined;
  profile: undefined;
  history: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

export function Routes() {
  const { colors } = useTheme();
  const { user, isLoadingUserStorageData } = useAuth();

  const theme = DefaultTheme;

  theme.colors.background = colors.gray['700'];

  if (isLoadingUserStorageData) {
    return <Loading />;
  }

  return (
    <Box flex={1} bg="gray.700">
      <NavigationContainer theme={theme}>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  );
}
