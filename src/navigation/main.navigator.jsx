import React from "react";
import { TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// init route
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// route
import HomeScreen from "../screens/home/HomeScreen";
import ProfileScreen from "../screens/user/ProfileScreen";
import SearchScreen from "../screens/search/SearchScreen";
import MarketScreen from "../screens/Market/MarketScreen";
import AccountScreen from "../screens/user/AccountScreen";
// style
import CustomDrawer from "../components/CustomDrawer";
import AccountEditScreen from "../screens/user/AccountEditScreen";
import SettingScreen from "../screens/user/SettingScreen";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const tabBarOptions = {
  tabBarActiveTintColor: "#00A3FF",
  tabBarInactiveTintColor: "gray",
  // "tabBarShowLabel": false,
  headerTransparent: true,
  tabBarStyle: [
    {
      display: "flex",
      backgroundColor: "#1A1A24",
      //  "backgroundColor": "transparent",
      borderTopWidth: 1,
      borderTopColor: "rgba(0, 0, 0, 0)",
    },
    null,
  ],
};

const MainNavigator = ({ navigation }) => {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={tabBarOptions}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: "#1A1A24",
            borderBottomColor: "rgba(0, 0, 0, 0)",
          },
          headerRight: () => (
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="bell-outline"
                color="white"
                size={26}
                style={{ marginRight: 20 }}
              />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={navigation.openDrawer}>
              <MaterialCommunityIcons
                name="menu"
                color="white"
                size={26}
                style={{ marginLeft: 20 }}
              />
            </TouchableOpacity>
          ),
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={26}
            />
          ),
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
          title: "",
          headerStyle: {
            backgroundColor: "#1A1A24",
            borderBottomColor: "rgba(0, 0, 0, 0)",
          },
        }}
      />
      <Tab.Screen
        name="Market"
        component={MarketScreen}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="shopping-outline"
              color={color}
              size={26}
            />
          ),
          title: "",
          headerStyle: {
            backgroundColor: "#1A1A24",
            borderBottomColor: "rgba(0, 0, 0, 0)",
          },
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "User",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="face-man-profile"
              color={color}
              size={26}
            />
          ),
          title: "",
          headerStyle: {
            backgroundColor: "#1A1A24",
            borderBottomColor: "rgba(0, 0, 0, 0)",
          },
        }}
      />
    </Tab.Navigator>
  );
};

const AccountNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="Account" screenOptions={tabBarOptions}>

<Stack.Screen name="AccountEdit" component={AccountEditScreen}  options={{
          title: "",
          headerStyle: {
            backgroundColor: "#1A1A24",
            borderBottomColor: "rgba(0, 0, 0, 0)",
          },
          headerLeft: () => (
            <TouchableOpacity onPress={navigation.openDrawer}>
              <MaterialCommunityIcons
                name="menu"
                color="white"
                size={26}
                style={{ marginLeft: 20 }}
              />
            </TouchableOpacity>
          ),
        }}/>
<Stack.Screen name="Account" component={AccountScreen} />
     

    </Stack.Navigator>
  );
};

const SettingNavigator = ({ navigation }) => {
  return (
    <Tab.Navigator initialRouteName="Setting" screenOptions={tabBarOptions}>
            <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          title: "",
          headerStyle: {
            backgroundColor: "#1A1A24",
            borderBottomColor: "rgba(0, 0, 0, 0)",
          },
          headerLeft: () => (
            <TouchableOpacity onPress={navigation.openDrawer}>
              <MaterialCommunityIcons
                name="menu"
                color="white"
                size={26}
                style={{ marginLeft: 20 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: "white",
        drawerActiveBackgroundColor: "#242435",
        drawerInactiveTintColor: "white",
        drawerLabelStyle: {
          marginLeft: -25,
        },
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="MainNavigator"
        component={MainNavigator}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={26}
            />
          ),
          drawerLabel: "Home",
        }}
      />
            <Drawer.Screen
        name="AccountNavigator"
        component={AccountNavigator}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-outline"
              color={color}
              size={26}
            />
          ),
          drawerLabel: "Account",
        }}
      />
                  <Drawer.Screen
        name="SettingScreen"
        component={SettingNavigator}
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="cog-outline"
              color={color}
              size={26}
            />
          ),
          drawerLabel: "Setting",
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
