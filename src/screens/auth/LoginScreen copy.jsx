import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Size from "../../constants/Size";
import Colors from "../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useLoginMutation } from "../../store/slices/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const PROMO = "https://coinmoi.com/wp-content/uploads/2021/07/banner-11.jpg";

  const [loginUser] = useLoginMutation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin =  async() => {
    //navigation.navigate('profile')

    const formData = {
      email: username,
      password: password,
    };

    console.log(formData);

   await loginUser(formData)
      .unwrap()
      .then((res) => {
      //  console.log("Good Job");
        console.log(res);
      //  setPassword();
      //  setUsername("");
        AsyncStorage.setItem("@token", res.token);
      })
      .catch(() => console.log("pas bon"));
    setPassword("");
    setUsername("");

    navigation.navigate("SplashScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <LinearGradient
          colors={["transparent", Colors.primary]}
          style={styles.background}
        />
        <Image
          style={styles.headerBackground}
          source={{
            uri: PROMO,
          }}
        />
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.viewStyle}>
          <TextInput
            placeholder="Email"
            style={styles.inputStyle}
            placeholderTextColor={Colors.gray}
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>
        <View style={[styles.viewStyle, styles.inputPasswordStyle]}>
          <TextInput
            placeholder="Password"
            style={styles.inputStyle}
            placeholderTextColor={Colors.gray}
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
          />
        </View>
        <TouchableOpacity
          style={styles.buttonLogin}
          onPress={handleLogin}
        >
          <Text style={styles.textButtonLogin}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonNewAccount}
        onPress={() => navigation.navigate("condition")}
        >
          <Text style={styles.textButtonNewAccount}>Create new account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonNewAccount}
        onPress={() => navigation.navigate("RegisterScreen")}
        >
          <Text style={styles.textButtonNewAccount}>Create new account Real</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: "center",
  },
  headerShow: {
    backgroundColor: "blue",
    width: SCREEN_WIDTH * 0.9,
    height: 50,
  },
  headerContainer: {
    height: SCREEN_HEIGHT * 0.4,
    width: SCREEN_WIDTH,
  },
  headerBackground: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.4,
  },
  headerTitle: {
    fontSize: Size.fs24,
    fontWeight: Size.w600,
    color: Colors.white,
    position: "absolute",
    zIndex: 99,
    bottom: 2,
    right: SCREEN_WIDTH / 2 - 30,
  },
  background: {
    position: "absolute",
    zIndex: 1,
    left: 0,
    right: 0,
    top: 0,
    height: SCREEN_HEIGHT * 0.4,
  },
  inputContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.2,
    marginTop: Size.large,
    alignItems: "center",
  },
  viewStyle: {
    width: SCREEN_WIDTH * 0.8,
    height: 65,
    backgroundColor: Colors.tertiary,
    borderRadius: Size.small,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    alignItems: "center",
  },
  inputStyle: {
    color: Colors.white,
    width: SCREEN_WIDTH * 0.8,
    height: 70,
    paddingHorizontal: 20,
    overflow: "hidden",
    fontSize: Size.fs16,
  },
  inputPasswordStyle: {
    marginTop: 20,
  },
  buttonLogin: {
    width: SCREEN_WIDTH * 0.8,
    height: 60,
    backgroundColor: Colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Size.small,
    marginTop: 20,
  },
  textButtonLogin: {
    color: Colors.white,
    fontSize: Size.fs20,
  },
  buttonNewAccount: {
    width: SCREEN_WIDTH * 0.8,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    //backgroundColor: Colors.gray,
    borderRadius: Size.small,
  },
  textButtonNewAccount: {
    color: Colors.white,
    fontSize: Size.fs18
  }
});
