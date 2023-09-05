import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Image,
} from "react-native";
import Colors from "../../constants/Colors";
import Size from "../../constants/Size";
import { useMeQuery, useUserImageMutation, useUpdateUserMutation } from "../../store/slices/authSlice";
import * as ImagePicker from "expo-image-picker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Input from "../auth/components/Input";
import Button from "../auth/components/Button";
import env from "../../data/env";
import { showMessage, hideMessage } from "react-native-flash-message";


const ChangePasswordScreen = () => {

  const { data, error, isLoading, refetch: meRefetch } = useMeQuery();

  const [updateUser] = useUpdateUserMutation();

  const [lastPassword, setLastPassword] = useState();
  const [newPassword, setNewPassword] = useState();

  const handleUpdatePassword = () => {
    const formData = {
      id: data.id,
      nickname: username,
      email: email,
    };
    
    console.log(formData);

    updateUser(formData).unwrap()
    .then((res) => {
       console.log('Good Job', res, '%%%*');
       showMessage({
        message: "Saved",
        description: "Password change successfully",
        type: "success"
      });
       meRefetch()
    })
    .catch((er) => {
        console.log('pas bon user',er)

        showMessage({
          message: "Error",
          description: "Error",
          type: "danger"
        });


    }
    )
  };

  return (
    <View style={styles.backgroundAccount}>
      
 
      <Input
       placeholder="Enter your last password"
       placeholderTextColor={Colors.white}
       borderWidth={1}
       borderColor={Colors.borderColor}
       value={lastPassword}
       onChangeText={setLastPassword}
       autoCapitalize='none'
       styleSheets={styles.input}
      />

       <Button
        text="Change your password"
        backgroundColor={Colors.secondary}
        onPress={handleUpdatePassword}
      />
    </View>
  );
};

export default ChangePasswordScreen;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  backgroundAccount: {
    backgroundColor: Colors.primary,
    flex: 1,
    paddingTop: 150,
    paddingHorizontal: Size.default,
    alignItems: 'center'
  },
  input: {
    marginBottom: Size.default,
  },
  label: {
    fontSize: Size.fs16,
    color: Colors.white,
    marginVertical: Size.small,
  },
  editButton: {
    width: width * 0.88,
    height: 45,
    borderRadius: Size.xs,
    backgroundColor: Colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Size.default,
    marginTop: Size.default,
  },
  editText: {
    fontSize: Size.fs16,
  }
});
