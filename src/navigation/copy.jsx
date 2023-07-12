import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
// init route
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

// route
import HomeScreen from '../screens/home/HomeScreen';
// style
import { View, Image, Text, Button } from 'react-native';
import logo from '../../assets/logo.png'


//const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const LogoTitle = () => {
  return (
   <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Image
      style={{ width: 30, height: 30, marginRight: 10 }}
      source={logo}
    />
    <Text>collect7</Text>
   </View>
  );
}

const AppNaviagtor = () => {
  return (
    <NavigationContainer>
       <Tab.Navigator initialRouteName="Home">
        <Tab.Screen
         name="Home"
         component={HomeScreen}
         options={{ headerTitle: (props) => <LogoTitle {...props} />, headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerRight: () => (
          <Button
            onPress={() => alert('This is a button!')}
            title="Info"
            color="#fff"
          />
        ),
        headerLeft: () => (
          <Button
            onPress={() => alert('This is a button!')}
            title="Info"
            color="#fff"
          />
        ),
      }}
          />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default AppNaviagtor
