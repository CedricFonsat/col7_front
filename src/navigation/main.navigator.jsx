import React from "react";
import { View, Image, Text, Button, TouchableOpacity } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// init route
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// route
import HomeScreen from "../screens/home/HomeScreen";
import ProfileScreen from "../screens/user/ProfileScreen";
import SearchScreen from "../screens/search/SearchScreen";
// style
import logo from '../../assets/logo.png'

const Tab = createBottomTabNavigator();

const tabBarOptions = {
  "tabBarActiveTintColor": "#00A3FF",
  "tabBarInactiveTintColor": "gray",
 // "tabBarShowLabel": false,
  "headerTransparent": true,
  "tabBarStyle": [
    {
      "display": "flex",
      "backgroundColor": "#191923",
    //  "backgroundColor": "transparent",
      "borderTopWidth": 1,
      "borderTopColor": 'rgba(0, 0, 0, 0)',
    },
    null
  ]
};

const MainNaviagtor = () => {
  return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={tabBarOptions}
       
        
        // tabBar={(props) => <TabBar {...props} />}
      >
        {/* screenOptions={{ presentation: 'modal' }} */}
        
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            //  headerTitle: (props) => <LogoTitle {...props} />
              title: '',
              headerStyle: {
            backgroundColor: '#1A1A24',
            borderBottomColor: 'rgba(0, 0, 0, 0)',
          },
          
          // headerTransparent: true,
          headerRight: () => (
            <TouchableOpacity>
            <MaterialCommunityIcons name="bell-outline" color="white" size={26} style={{marginRight: 20}} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => alert('This is a button!')}>
            <MaterialCommunityIcons name="menu" color="white" size={26} style={{marginLeft: 20}} />
            </TouchableOpacity>
          ),
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          )
         }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
            title: '',
            headerStyle: {
          backgroundColor: '#1A1A24',
          borderBottomColor: 'rgba(0, 0, 0, 0)'}
          }}
        />
         <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarLabel: "Search",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="magnify" color={color} size={26} />
            ),
            title: '',
            headerStyle: {
          backgroundColor: '#1A1A24',
          borderBottomColor: 'rgba(0, 0, 0, 0)'}
          }}
        />
     
      </Tab.Navigator>
  );
};

export default MainNaviagtor;
