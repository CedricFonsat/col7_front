import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logo from '../../../assets/logo/logo.png';
import Colors from '../../constants/Colors';
import Size from '../../constants/Size';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    
      AsyncStorage.getItem("@token").then((res) => {
        
        console.log("1", res ? res.code : null, res?.code);

        if(res?.code == "password_too_weak"){
          navigation.navigate("RegisterScreen");
          return
         }
  
         if (res?.code == "existing_email") {
          navigation.navigate("RegisterScreen");
          return
         }

         navigation.replace(res ? 'DrawerNavigator' : 'LoginScreen');
      });
    
  }, [navigation]);

  return (
    <View style={styles.container} >
      <View style={styles.loading}>
        <Image source={logo} style={styles.image} />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary
  },
  loading:{
    width: Size.xxl,
    height: Size.xxl,
  },
  image: {
    width: '100%',
    height: '100%'
  }
});

export default SplashScreen;
