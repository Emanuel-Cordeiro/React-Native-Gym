import React from 'react';
import { useTheme } from 'native-base';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeSvg from '../../assets/images/home.svg';
import HistorySvg from '../../assets/images/history.svg';
import ProfileSvg from '../../assets/images/profile.svg';

import { Home } from '../../screens/Home/Home';
import { Profile } from '../../screens/Profile/Profile';
import { History } from '../../screens/History/History';
import { Exercises } from '../../screens/Exercises/Exercises';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
  const { sizes, colors } = useTheme();

  const iconSize = sizes[6];

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.green[500],
        tabBarInactiveTintColor: colors.gray[200],
        tabBarStyle: {
          backgroundColor: colors.gray[600],
          borderTopWidth: 0,
          height: Platform.OS === 'android' ? 'auto' : 96,
          paddingBottom: sizes[10],
          paddingTop: sizes[6],
        },
      }}>
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />

      <Screen
        name="history"
        component={History}
        options={{
          tabBarIcon: ({ color }) => (
            <HistorySvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />

      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <ProfileSvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />

      <Screen
        name="exercises"
        component={Exercises}
        options={{ tabBarButton: () => null }}
      />
    </Navigator>
  );
}
