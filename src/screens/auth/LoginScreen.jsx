import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import { Link } from "@react-navigation/native";
import Input from "./components/Input";
import Colors from "../../constants/Colors";
import Size from "../../constants/Size";
import jwtDecode from "jwt-decode";


import Fontisto from "react-native-vector-icons/Fontisto";
import { showMessage } from "react-native-flash-message";
//import { useMeQuery } from "../../store/slices/authSlice";
import React, { useState, useEffect } from "react";
import * as Google from "expo-auth-session/providers/google";
import { useLoginMutation } from "../../store/slices/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "./components/Button";


export default function LoginScreen({navigation}) {
  //const count = useSelector((state) => state.counter.value);

     // androidClientId: ''

  const [request1 ,response1, promptAsync1] = Google.useAuthRequest({
    expoClientId: "nle_ZycxWdDrYXjVa-q1FNdtA3jzAAIwbXCtpzPa",
    iosClientId: "34155408716-b8vb7q6l9teo0t1opq7l6v67fakoe7q9.apps.googleusercontent.com" 
  });

  useEffect(() => {
    if (response1?.type === "success") {
      const { authentication } = response1;
      const idToken = authentication.idToken;
      const decodedToken = jwtDecode(idToken);

      const data = {
         nickname: decodedToken.name,
         email: decodedToken.email,
         googleId: decodedToken.sub,
         googlePicture: decodedToken.picture,   
       };

       console.log(data);

       handleAuthGoogle(data);
     }else{
      showMessage({
        message: "Error",
        description: "An error occurred during your Google authentication.",
        type: "danger"
      });
     }
   

  }, [response1]);

  const handleAuthGoogle = async(data) => {
    await authenticationGoogle(data)
    .unwrap()
    .then((res) => {
      AsyncStorage.setItem("@token", res.token);  
      navigation.navigate("SplashScreen");
    })
    .catch(() => {
        showMessage({
          message: "Error",
          description: "An error occurred during your Google authentication.",
          type: "danger"
        });
        navigation.navigate("LoginScreen");
    });
  }




  
  const [login] = useLoginMutation();
  // const { data: queryData, error} = useMeQuery();

  // console.log(queryData);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin =  async() => {
    //navigation.navigate('profile')

    const formData = {
      email: username,
      password: password,
    };

    console.log(formData);

   await login(formData)
      .unwrap()
      .then((res) => {
      //  console.log("Good Job");
      //  console.log(res);
      //  setPassword();
      //  setUsername("");
        AsyncStorage.setItem("@token", res.token);
        setPassword("");
        setUsername("");
    
        navigation.navigate("SplashScreen");
      })
      .catch(() => {
          showMessage({
            message: "Error",
            description: "An error occurred during your connection",
            type: "danger"
          });
          navigation.navigate("LoginScreen");
      });
  //  setPassword("");
   // setUsername("");

  //  navigation.navigate("SplashScreen");
  };

//ced97x@gmail.com  
//contact@collect7.fr


  return (
    <View style={styles.container}>
       <View style={styles.header}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>
          We happy to see you again. Sign In to {"\n"} your account
        </Text>
      </View>
      <Button
        icon={<Fontisto name="google" size={20} color="white" style={styles.iconButtonGoogle} />}
        text="Connect with Google"
        backgroundColor={Colors.gray}
        borderWith={1}
        borderColor={Colors.borderColor}
        onPress={() =>  promptAsync1()}
      />
      

      <View style={{
        flexDirection: 'row',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
      }}>
      <View style={styles.line} />
      <Text style={styles.text}>Or</Text>
      <View style={styles.line} />
      </View>
      
      <Text style={styles.label}>Email</Text>
      <Input
       placeholder="Enter your email"
       placeholderTextColor={Colors.white}
       borderWidth={1}
       borderColor={Colors.borderColor}
       value={username}
       onChangeText={setUsername}
       autoCapitalize='none'
      />
      <Text style={styles.label}>Password</Text>
      <Input
        placeholder="Enter your password"
        placeholderTextColor={Colors.white}
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
        autoCapitalize='none'
      />
      <View style={styles.captionPassword}>
      <Link style={styles.captionTextPassword} to={{ screen: "ResetPasswordScreen" }}> Forgot Password? </Link>
      </View>
      <Button
        text="Sign in"
        backgroundColor={Colors.secondary}
        onPress={handleLogin}
      />
      <View style={styles.captionSignUp}>
        <Text style={styles.captionTextSignUp}>
          Don't have an account?
          <Link style={styles.link} to={{ screen: "RegisterScreen" }}> Sign Up </Link>now!
        </Text>
      </View>
    </View>
  );
}

const { height, width } = Dimensions.get("window");

//ced97x@gmail.com
//contact@collect7.fr

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: Size.fs20,
    color: Colors.white,
    fontWeight: Size.bold,
  },
  header: {
    width: width,
    height: height * 0.1,
    paddingHorizontal: Size.large,
  },
  subtitle: {
    fontSize: Size.fs14,
    color: Colors.gray,
    marginTop: Size.small,
  },
  captionPassword: {
    width: width * 0.8,
    height: height * 0.08,
    paddingVertical: Size.small,
    alignItems: "flex-end",
  },
  captionTextPassword: {
    color: Colors.gray,
  },
  captionSignUp: {
    height: height * 0.08,
    justifyContent: "center",
  },
  captionTextSignUp: {
    color: Colors.gray,
  },
  label: {
    width: width * 0.8,
    marginVertical: Size.small,
    color: Colors.white,
  },
  link:{
    color: Colors.secondary,
  },
  line: {
    height: .3,
    width: width * .3,
    backgroundColor: Colors.borderColor,
  },
  text: {
    marginHorizontal: 10,
    fontSize: 16,
    color: Colors.borderColor
  },
  iconButtonGoogle: {
    marginRight: Size.small
  }
});
