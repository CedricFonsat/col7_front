import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from "react-native";
import { Link } from "@react-navigation/native";
import Input from "./components/Input";
import Colors from "../../constants/Colors";
import Size from "../../constants/Size";
import { showMessage } from "react-native-flash-message";
import React, { useState } from "react";
import { useResetPasswordMutation } from "../../store/slices/authSlice";
import Button from "./components/Button";
import arrow from "../../../assets/icon/left.png";

export default function ResetPasswordScreen({navigation}) {

  const [resetPassword] = useResetPasswordMutation();
  const [email, setEmail] = useState('');

  const handleResetPassword =  async() => {

    const formData = {
      email: email
    };

    console.log(formData);

   await resetPassword(formData)
      .unwrap()
      .then((res) => {
        console.log(res);
   
       // setEmail("");
        navigation.navigate("LoginScreen");
        showMessage({
            message: "Success",
            description: "Message to sent",
            type: "success"
          });
      })
      .catch((err) => {
        navigation.navigate("ResetPasswordScreen");
         console.log(err);
          showMessage({
            message: "Error",
            description: "An error occurred during your connection",
            type: "danger"
          });
         
      });
  };

  const leftButton = ({ navigation }) => {
    return (
      <TouchableOpacity
        style={{
          width: 50,
          height: 50,
          borderRadius: Size.xl,
          backgroundColor: Colors.primary,
          justifyContent: "center",
          alignItems: "center",
          borderColor: Colors.borderColor,
          borderWidth: 1,
          overflow: "hidden",
          zIndex: 99999,
        }}
        onPress={() => navigation.goBack()}
        activeOpacity={0.8}
      >
        <Image
          style={{
            width: 20,
            height: 20,
            tintColor: Colors.white,
          }}
          source={arrow}
        />
      </TouchableOpacity>
    );
  };

  const renderHeader = () => {
    return (
      <View
        style={{
          width: width,
          height: 100,
          position: "absolute",
          justifyContent: "flex-end",
          paddingHorizontal: Size.default,
          zIndex: 999,
        }}
      >
        {leftButton({ navigation })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
    {renderHeader()}

<View style={styles.header}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>
        We will send a password to your email
        </Text>
      </View>
      
      <Text style={styles.label}>Email</Text>
      <Input
       placeholder="Enter your email"
       placeholderTextColor={Colors.white}
       borderWidth={1}
       borderColor={Colors.borderColor}
       value={email}
       onChangeText={setEmail}
       autoCapitalize='none'
      />

      <View style={styles.captionPassword}>
      <Link style={styles.captionTextPassword} to={{ screen: "condition" }}> By sending, you agree to the <Text style={styles.link}>Privacy Policy</Text> </Link>
      </View>

      <Button
        text="Send"
        backgroundColor={Colors.secondary}
        onPress={handleResetPassword}
      />
    </View>
  );
}

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: "center",
   // justifyContent: "center",
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
    marginTop: (Size.xxl - Size.default)
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
    height: .5,
    width: width * .3,
    backgroundColor: 'white',
  },
  text: {
    marginHorizontal: 10,
    fontSize: 16,
    color: 'white'
  },
  iconButtonGoogle: {
    marginRight: Size.small
  }
});
