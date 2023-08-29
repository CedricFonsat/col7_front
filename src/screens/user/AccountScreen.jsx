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
import { useDeleteAccountQuery } from "../../store/slices/authSlice";


const AccountEditScreen = ({navigation}) => {

  const { data } = useMeQuery();

  const createTwoButtonAlert = () =>
  Alert.alert('Delete your account', 'Are you sure you want to delete your account', [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'OK', onPress: () => {
      
      useGetCollectionCardsByIdQuery(data.id);
      console.log('OK Pressed', data.id)}},
  ]);


  return (
    <View style={styles.backgroundAccount}>
      <View>
      <Text style={styles.label}>Change your profile</Text>
       <Button
        text="Update your profile"
        backgroundColor={Colors.secondary}
        onPress={() => navigation.navigate("AccountEdit")}
      />
      </View>
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
