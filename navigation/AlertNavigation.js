import * as React from 'react';
// import {
//   createAppContainer,
//   createSwitchNavigator,
// } from 'react-navigation';
import { View, Text, TouchableOpacity, Easing } from 'react-native';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
// import { createDrawerNavigator } from 'react-navigation-drawer';
// import { createStackNavigator } from 'react-navigation-stack';
import { TransitionPresets, CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import {AlertScreen, Alert1, Alert2} from '../screens/AlertScreen';
import { NavigationContainer } from '@react-navigation/native';
const AlertStack = createStackNavigator()

const AlertNavigator = ({ navigation, route }) => {
  const INITIAL_ROUTE_NAME = 'Alert-1'
  return (
    <AlertStack.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={{
        showLabel: false,
        activeTintColor: '#F8F8F8',
        inactiveTintColor: '#586589',
        style: {
          backgroundColor: '#8e2e9c'
        },
        tabStyle: {},
        mode: 'modal',
      }}
      screenOptions={{
        gestureEnabled: true,
        cardStyleInterpolator: CardStyleInterpolators
          .forHorizontalIOS
      }}
      animation="fade"
      headerMode="float"
    >
      <AlertStack.Screen
        name="Alert-1"
        component={Alert1}
      />
      <AlertStack.Screen
        name="Alert-2"
        component={Alert2}
      />
      <AlertStack.Screen
        name="Alert-3"
        component={Alert1}
      />
    </AlertStack.Navigator>
  )
}

export default AlertNavigator