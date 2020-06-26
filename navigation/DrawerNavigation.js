import * as React from 'react';
import { View, Button } from 'react-native';
import { TabBarIconMenu } from '../components/TabBarIcon';

import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNavigator from './BottomTabNavigator';

import { CustomDrawerContent } from '../components/CustomDrawerContentComponent'
import RegisterScreen from '../screens/RegisterScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Drawer = createDrawerNavigator()

const DrawerNavigator = (props) => {
    const INITIAL_ROUTE_NAME = 'botton'
    props.navigation.setOptions({
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal'
    })
    return (
        <Drawer.Navigator
            initialRouteName={INITIAL_ROUTE_NAME}
            tabBarOptions={{
                showLabel: false,
                activeTintColor: '#F8F8F8',
                inactiveTintColor: '#586589',
                style: {
                    backgroundColor: '#8e2e9c'
                },
                tabStyle: {},
            }}
            drawerContent={CustomDrawerContent}
            drawerStyle={{
                width: 260,
            }}
            drawerContentOptions={{
                activeTintColor: '#e91e63',
            }}
            hideStatusBar={false}
        >
            <Drawer.Screen
                name="botton"
                component={BottomTabNavigator}
                options={{
                    drawerIcon: ({ focused }) => <TabBarIconMenu focused={focused} name="md-book" />,
                }}

            />
             <Drawer.Screen
                name="Registro"
                component={RegisterScreen}
            <Drawer.Screen
                name="Profile"
                component={ProfileScreen}

                options={{
                    drawerIcon: ({ focused }) => <TabBarIconMenu focused={focused} name="md-book" />,
                }}

            />
        </Drawer.Navigator>
    )
}

export default DrawerNavigator