import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Button,
  Image,
} from "react-native";
import Colors from "../../constants/Colors";
import Size from "../../constants/Size";
import { useUserImageMutation } from "../../store/slices/authSlice";
import * as ImagePicker from "expo-image-picker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useMeQuery } from "../../store/slices/authSlice";

const AccountEditScreen = () => {

  const { data: meData, refetch: meRefetch } = useMeQuery();

  console.log();

  /***************************************************   Add PHOTO  */

  const [userImage] = useUserImageMutation();

   const uploadImage = async (base64,name) => {
    const formData = {
      name: name,
      base64: base64
    }

    console.log(formData);

    await userImage(formData)
    .unwrap()
    .then((res) => {
     // console.log(res);

      console.log('good job');
  
    })
    .catch((err) => console.log("pas bon", err));
   };

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
     // console.log(result.assets);
      setImage(result.assets[0].uri);
      //uploadImage(result.assets[0].uri);

      let uri = result.assets[0].uri;

      // Fonction pour charger une image et la convertir en base64
      const uriToBase64 = async (uri) => {
        try {
          const response = await fetch(uri);
          const blob = await response.blob();
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
              resolve(reader.result.split(",")[1]);
            };
            reader.onerror = (error) => {
              reject(error);
            };
            reader.readAsDataURL(blob);
          });
        } catch (error) {
          console.error(
            "Erreur lors de la conversion de l'image en base64:",
            error
          );
          throw error;
        }
      };

      // Utilisation de la fonction
      uriToBase64(uri)
        .then((base64Data) => {
           if (base64Data) {
            uploadImage(base64Data,'test.jpg')
           }
        })
        .catch((error) => {
          console.error("Une erreur s'est produite:", error);
        });
    }
  };

  /*******************************************************  Add PHOTO */

  return (
    <View style={styles.backgroundAccount}>
        <View style={styles.editBoxImg}>
      <TouchableOpacity style={styles.editImg} onPress={pickImage}>
      <MaterialCommunityIcons
              name="camera"
              size={60}
              style={{ opacity: .4, position: 'absolute', zIndex: 1}}
            />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      </TouchableOpacity>
      </View>
      <View style={styles.editInput}>
        <TextInput
          style={styles.editTextInput}
          placeholder="Username"
          placeholderTextColor="gray"
          value="text9"
        />
      </View>
      <View style={styles.editInput}>
        <TextInput
          style={styles.editTextInput}
          placeholder="Email"
          placeholderTextColor="gray"
          value="hello@helo.dee"
        />
      </View>
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editText}>Mettre a jour</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AccountEditScreen;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  backgroundAccount: {
    backgroundColor: Colors.primary,
    flex: 1,
    paddingTop: 150,
    paddingHorizontal: Size.default,
  },
  editInput: {
    width: width * 0.88,
    height: 45,
    borderRadius: Size.xs,
    backgroundColor: Colors.borderColor,
    justifyContent: "center",
    paddingHorizontal: Size.default,
    marginTop: Size.default,
  },
  editTextInput: {
    fontSize: Size.fs16,
    color: Colors.white,
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
  },
  editImg: {
    width: 120,
    height: 120,
    backgroundColor: Colors.secondary,
    borderRadius: Size.xl,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  editBoxImg: {
      width: width * 0.88,
      height: 150,
      justifyContent: "center",
      alignItems: 'center'
  }
});
