import React from 'react'
import { View, Text, StyleSheet, Dimensions, Animated, TouchableOpacity, Image } from 'react-native'
import Size from '../../constants/Size'
import Colors from '../../constants/Colors'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const ExempleScreen = () => {

 const headerShow = () => {
   return (
     <View style={styles.headerShow}>
     </View>
   )
 }

  return (
    <View style={styles.container}>
        {headerShow()}
        <Text>Exemple</Text>
    </View>
  )
}

export default ExempleScreen

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: "center",
  },
  headerShow: {
      backgroundColor: 'blue',
      width: width * 0.9,
      height: 50
  }
});