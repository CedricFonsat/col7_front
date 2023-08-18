import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  const [token, setToken] = useState('');


  useEffect(() => {
    
      AsyncStorage.getItem("@token").then((res) => {
        
        console.log("1", res);
        navigation.replace(res ? 'DrawerNavigator' : 'LoginScreen');
      });
    
   
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
      <View style={styles.loading}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green'
  },
  loading:{
    width: 200,
    height: 200,
    backgroundColor: 'yellow'
  }
});

export default SplashScreen;
