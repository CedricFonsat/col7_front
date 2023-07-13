import React from 'react'
import { View, Text, StyleSheet, Dimensions, Animated, TouchableOpacity, Image } from 'react-native'
import Size from '../../../constants/Size';
import Colors from '../../../constants/Colors';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const CollectionDetailddd = ({navigation, route}) => {

    const {itemId} = route.params

 const headerShow = () => {
   return (
     <View style={styles.headerShow}>
     </View>
   )
 }

  return (
    <View style={styles.container}>
        {headerShow()}
        <Text style={{
            color: 'white',
            fontSize: 30,
            marginBottom: 50
        }}>Name collection : {itemId}</Text>

        <TouchableOpacity style={{
            width: 100,
            height: 100,
            backgroundColor: 'yellow'
        }} onPress={() => navigation.goBack()} >
           <Text> Go Back</Text>
        </TouchableOpacity>

    </View>
  )
}

export default CollectionDetaildd

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: "center",
  },
  headerShow: {
     // backgroundColor: 'blue',
      width: width * 0.9,
      height: 50,
      marginTop: 100
  }
});