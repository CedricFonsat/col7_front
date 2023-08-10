import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Link } from "@react-navigation/native";
import Colors from "../../constants/Colors";
import Size from "../../constants/Size";
import Input from "./components/Input";
import Button from "./components/Button";
import { useState } from "react";
import { useRegisterMutation } from "../../store/slices/authSlice";
//import * as WebBrowser from 'expo-web-browser';

export default function RegisterScreen() {
  //const count = useSelector((state) => state.counter.value);

  //  const _handlePressButtonAsync = async () => {
  //   let result = await WebBrowser.openBrowserAsync('https://youtu.be/LG0Wot3wjCA?list=PLyGifCruBi0maFT6oO-Q9ZsK25iigkwRj');
  //   setResult(result);
  // };
  //<Button title="Open WebBrowser" onPress={_handlePressButtonAsync} />

  // const [loginUser] = useLoginUserMutation();
  // const { data: queryData, error} = useMeQuery();

  // console.log(queryData);

  const [register] = useRegisterMutation();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    const formData = {
      nickname: username,
      email: email,
      roles: [],
      password: password,
    };

    console.log(formData);

    register(formData).unwrap()
    .then((res) => {
       console.log('Good Job');
       console.log(res);
        setPassword();
        setEmail('');
        setUsername('');
       // handleLogin()
    })
    .catch(() =>
        console.log('pas bon')
    )
  };

     const handleLogin = async() => {
       //navigation.navigate('profile')

       const formData = {
         "email": email,
         "password": password
       }

     console.log(formData);

      await login(formData).unwrap()
      .then((res) => {
         console.log('Connecter');
         console.log(res);
        AsyncStorage.setItem("@token", res.token)
        navigation.navigate("SplashScreen");
      })
      .catch(() =>
          console.log('Pas Register Login')
      )
      navigation.navigate("SplashScreen");
     }

  //ced97x@gmail.com
  //contact@collect7.fr

  return (
    <View style={styles.container}>
      {/* Navigation */}
      <View style={styles.navigation}>
        <Text>Sign up and icon</Text>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Create New Account</Text>
        <Text style={styles.subtitle}>
          We happy to see you again. Sign Up to {"\n"} your account
        </Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.label}>Username</Text>
        <Input
          placeholder="my_ri_dick"
          placeholderTextColor={Colors.gray}
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <Text style={styles.label}>Email</Text>
        <Input
          placeholder="my_ri_dick@cacabounga.fr"
          placeholderTextColor={Colors.gray}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <Text style={styles.label}>Password</Text>
        <Input
          placeholder="************"
          placeholderTextColor={Colors.gray}
          // secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
        />
        <Link style={styles.caption} to={{ screen: "condition" }}>
          By signing up, you agree to all the
          <Text style={styles.link}> terms & conditions </Text>
        </Link>
        <Button
          text="Create Account"
          backgroundColor={Colors.secondary}
          onPress={handleRegister}
        />
      </View>

      {/* Sign In */}
      <View style={styles.captionSignIn}>
        <Text style={styles.captionSignInText}>
          Have an account?
          <Link style={styles.link} to={{ screen: "LoginScreen" }}>
            {" "}
            Sign In
          </Link>
        </Text>
      </View>
    </View>
  );
}

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: "center",
  },
  header: {
    width: width,
    height: height * 0.1,
    paddingHorizontal: Size.large,
  },
  form: {
    width: width,
    alignItems: "center",
  },
  link: {
    color: Colors.secondary,
    width: width,
  },
  title: {
    fontSize: Size.fs20,
    color: Colors.white,
    fontWeight: Size.bold,
  },
  subtitle: {
    fontSize: Size.fs14,
    color: Colors.gray,
    marginTop: Size.small,
  },
  label: {
    width: width * 0.8,
    marginVertical: Size.small,
    color: Colors.white,
  },
  caption: {
    marginTop: Size.small,
    fontSize: Size.fs14,
    color: Colors.gray,
    width: width * 0.8,
    height: height * 0.08,
    paddingVertical: Size.small,
    alignItems: "center",
  },
  captionSignIn: {
    marginTop: Size.xs,
    width: width,
    height: height * 0.08,
    alignItems: "center",
    justifyContent: "center",
  },
  captionSignInText: {
    fontSize: Size.fs18,
    color: Colors.gray,
  },
  navigation: {
    width: width,
    height: height * 0.15,
    backgroundColor: Colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Size.default,
  },
});
