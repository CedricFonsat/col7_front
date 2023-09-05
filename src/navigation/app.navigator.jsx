import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// init route
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// route
import CategoryDetail from "../screens/home/Detail/CategoryDetail";
import CollectionDetail from "../screens/home/Detail/CollectionDetail";
import LoginScreen from "../screens/auth/LoginScreen";
import SplashScreen from "../screens/auth/SplashScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import DrawerNavigator from "./main.navigator";
import GeneralConditionScreen from "../screens/auth/GeneralConditionScreen";
import UserDetailScreen from "../screens/home/Detail/UserDetailScreen";
import ResetPasswordScreen from "../screens/auth/ResetPassword";

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
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />

        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />

        <Stack.Screen name="CollectionDetail" component={CollectionDetail} />
        <Stack.Screen name="UserDetailScreen" component={UserDetailScreen} />

        <Stack.Screen
          name="condition"
          component={GeneralConditionScreen}
          options={{ presentation: "modal" }}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
