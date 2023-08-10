import React, { useState } from 'react'
import { ScrollView, Text, TouchableOpacity, StyleSheet, View, Button, Image } from 'react-native'
import Colors from '../constants/Colors';
import * as ImagePicker from 'expo-image-picker';

const TestScreen = () => {

    // const handleUpdate = async (data) => {
    //     if (selectedImage) {
    //       dispatch(setLoading(true))
    //       let formData = new FormData()
    //       formData.append('image', {
    //         uri: selectedImage.uri,
    //         name: 'photo.jpg',
    //         type: 'image/jpg',
    //       })
    
    //       formData.append('userId', user?.id)
    //       formData.append('main', 1)
    //       await PhotoService.postPhoto(formData)
    //     }

    const [image, setImage] = useState(null);

    let tab = [];
  
    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      tab = result.assets
  
     if (tab) {
        const results = tab.map(item => {
            const { fileSize, fileName } = item;
            return { fileSize, fileName };
          });
          console.log(results);
          console.log(tab);
     }
      
     
     
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };
  
  

    const handleImage =  async() => {
        console.log('test1');
    
          let formData =  {
            uri: 'jjjjjfffff.com',
            name: 'photo.jpg',
            type: 'image/jpg',
          }

         console.log(formData);
    
    //    await login(formData)
    //       .unwrap()
    //       .then((res) => {

    //         console.log(res);
        
    //       })
    //       .catch(() => console.log("pas bon"));
    
      };

  return (
    <View style={styles.container}>
       <Text>Test Screen</Text>
       <Button style={{
        width: 300,
        height: 40,
        backgroundColor: Colors.primary
      }} title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        <TouchableOpacity onPress={() => { handleImage() }} style={{
            backgroundColor: 'blue',
            width: 200,
            height: 60
        }}>
            <Text>Test</Text>
        </TouchableOpacity>
       
    </View>
  )
}

export default TestScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.primary,
      justifyContent: 'center',
      alignItems: 'center'
    },
})