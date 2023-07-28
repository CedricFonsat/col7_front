import React from "react";
import { View, Image, Text, Button, TouchableOpacity } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// init route
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// route
import HomeScreen from "../screens/home/HomeScreen";
import ProfileScreen from "../screens/user/ProfileScreen";
import CategoryDetail from "../screens/home/Detail/CategoryDetail";
import Modal from '../screens/home/components/Modal'
import CollectionDetail from "../screens/home/Detail/CollectionDetail";
// style
import logo from '../../assets/logo.png'

import MainNavigator from "./main.navigator";
import DrawerNavigator from "./main.navigator";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();



const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="DrawerNaviagtor"
        screenOptions={{
          headerShown:false
        }}
      >
        {/* screenOptions={{ presentation: 'modal' }} */}

        <Stack.Screen
          name="DrawerNavigator"
          component={DrawerNavigator}
        />


         <Stack.Screen
          name="Detail"
          component={CategoryDetail}
          options={{
            tabBarLabel: "Detail",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
        />
                 <Stack.Screen
          name="CollectionDetail"
          component={CollectionDetail}
        />

          <Stack.Screen
          name="Modal"
          component={Modal}
          options={{ presentation: 'modal' }}
        />


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
