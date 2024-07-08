import React from 'react';
import { useTheme, Box } from 'native-base';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { AuthRoutes } from './Auth/Auth';
import { AppRoutes } from './App/App';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

type AppRoutes = {
  home: undefined;
  exercises: undefined;
  profile: undefined;
  history: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

export function Routes() {
  const { colors } = useTheme();
  const theme = DefaultTheme;

  theme.colors.background = colors.gray['700'];

  return (
    <Box flex={1} bg="gray.700">
      <NavigationContainer theme={theme}>
        <AppRoutes />
      </NavigationContainer>
    </Box>
  );
}
