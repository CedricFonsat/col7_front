import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { useMeQuery } from '../../store/slices/authSlice';
import logo from '../../../assets/logo/logo.png';
import Colors from '../../constants/Colors';
import Size from '../../constants/Size';

const SplashScreen = () => {
  const navigation = useNavigation();
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const { data } = useMeQuery();


  useEffect(() => {
    
      AsyncStorage.getItem("@token").then((res) => {
        
        console.log("1", res);
      //  navigation.replace(res ? 'DrawerNavigator' : 'LoginScreen');
        navigation.replace(res ? 'DrawerNavigator' : 'LoginScreen');
       // dispatch(addData('New Data'));
      });

    //  console.log(await data,'*******************************', user);
    
  }, [navigation]);



  // useEffect(() => {
   

  //   const checkAuthentication = async () => {
  //     try {
  //       // Vérifier si l'utilisateur est authentifié
  //       const token = await AsyncStorage.getItem('@token');

  //       console.log(token, '*****************************');

  //       // Naviguer vers l'écran approprié en fonction de la présence du token
  //       if (token) {
  //         // Utiliser le hook de navigation pour naviguer vers 'DrawerNavigator'
  //         navigation.replace('DrawerNavigator');
  //       } else {
  //         // Utiliser le hook de navigation pour naviguer vers 'LoginScreen'
  //         navigation.replace('LoginScreen');
  //       }
  //     } catch (error) {
  //       // Gérer l'erreur si nécessaire
  //       console.error('Erreur lors de la vérification de l\'authentification:', error);
  //     }
  //   };

  //   checkAuthentication();
  // }, [navigation]);

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
