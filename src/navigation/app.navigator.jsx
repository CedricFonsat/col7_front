import React from "react";
import { View, Image, Text, Button, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// init route
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// route
import HomeScreen from "../screens/home/HomeScreen";
import ProfileScreen from "../screens/user/ProfileScreen";
import CategoryDetail from "../screens/home/Detail/CategoryDetail";
import Modal from "../screens/home/components/Modal";
import CollectionDetail from "../screens/home/Detail/CollectionDetail";
import LoginScreen from "../screens/auth/LoginScreen";
import SplashScreen from "../screens/auth/SplashScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";

// style
import logo from "../../assets/logo.png";

import MainNavigator from "./main.navigator";
import DrawerNavigator from "./main.navigator";
import Detail from "../screens/home/Detail/Detail";
import Detaile from "../screens/home/Detail/Detail";
import GeneralConditionScreen from "../screens/auth/GeneralConditionScreen";
import UserDetailScreen from "../screens/home/Detail/UserDetailScreen";
import TestScreen from "../screens/TestScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* screenOptions={{ presentation: 'modal' }} */}

        <Stack.Screen name="SplashScreen" component={SplashScreen} />

        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />

        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />

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
        
        <Stack.Screen name="CollectionDetail" component={CollectionDetail} />
        <Stack.Screen name="UserDetailScreen" component={UserDetailScreen} />
        <Stack.Screen name="TestScreen" component={TestScreen} />
        

        

        <Stack.Screen name="Detaile" component={Detaile} />

         <Stack.Screen
          name="condition"
          component={GeneralConditionScreen}
          options={{ presentation: "modal" }}
        /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
