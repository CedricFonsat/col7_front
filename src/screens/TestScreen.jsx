import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Button,
  Image,
} from "react-native";
import Colors from "../constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { useUserImageMutation } from "../store/slices/authSlice";

const TestScreen = () => {

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

  return (
    <View style={styles.container}>
      <Text>Test Screen</Text>
      <Button
        style={{
          width: 300,
          height: 40,
          backgroundColor: Colors.primary,
        }}
        title="Pick an image from camera roll"
      />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      <Text
        style={{
          color: "white",
          fontSize: 39,
        }}
      >
        {image ? "carre" : "super"}
      </Text>
      <TouchableOpacity
        onPress={pickImage}
        style={{
          backgroundColor: "blue",
          width: 200,
          height: 60,
        }}
      >
        <Text>Test</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});
