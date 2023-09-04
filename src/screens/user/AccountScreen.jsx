import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert
} from "react-native";
import Colors from "../../constants/Colors";
import Size from "../../constants/Size";
import { useMeQuery } from "../../store/slices/authSlice";
import Button from "../auth/components/Button";
import { useDeleteUserMutation } from "../../store/slices/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";



const AccountEditScreen = ({navigation}) => {

  const { data } = useMeQuery();
  const [deleteUser] = useDeleteUserMutation();

  const handleDeleteAccount = async() => {
    const formData = {
      id: data.id
    };

    console.log(formData);

   await deleteUser(formData).unwrap()
    .then((res) => {
       console.log('Good Job delete your account', res);

       AsyncStorage.removeItem("@token");
       navigation.replace("SplashScreen");
    })
    .catch((er) =>
        console.log('pas bon not delete',er)
    )
  };

  const createTwoButtonAlert = () =>
  Alert.alert('Delete your account', 'Are you sure you want to delete your account', [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'OK', onPress: () => {handleDeleteAccount()}},
  ]);

  //account-edit

  return (
    <View style={styles.backgroundAccount}>

   <Button
        icon={<MaterialCommunityIcons
          name="account-edit"
          color={Colors.white}
          size={26}
          style={{
            marginHorizontal: 20
          }}
        />}
        left
        top={10}
        text="Edit your profile"
         backgroundColor={Colors.tertiary}
         onPress={() => navigation.navigate("AccountEdit")}
         />

     <Button
        icon={<MaterialCommunityIcons
          name="lock"
          color={Colors.white}
          size={26}
          style={{
            marginHorizontal: 20
          }}
        />}
        left
        top={10}
        text="Change your password"
         backgroundColor={Colors.tertiary}
         onPress={() => navigation.navigate("ChangePasswordScreen")}
         />        





       <TouchableOpacity style={styles.deleteButton} 
      // onPress={() => navigation.navigate("CustomModal")}
       onPress={() => createTwoButtonAlert()}
       >
         <Text style={[styles.label, {color: Colors.red}]}>Delete your account</Text>
       </TouchableOpacity>
    </View>
  );
};

export default AccountEditScreen;

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
  deleteButton: {
    position: 'absolute',
    bottom: Size.xl
  }
});
