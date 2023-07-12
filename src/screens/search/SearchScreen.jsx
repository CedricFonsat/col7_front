import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'

const SearchScreen = () => {

 const headerShow = () => {
   return (
     <View style={{
       backgroundColor: 'red',
       width: width,
       height: height / 4.5,
       position: 'relative',
       alignItems: 'center'
     }}>
       <View style={{
         backgroundColor: 'green',
         width: "85%",
         height: 100,
         position: 'absolute',
         bottom: -50,
         alignItems: 'center',
         justifyContent: 'center',
         borderRadius: 20,
       }}>
       </View>
     </View>
   )
 }

  return (
    <View style={styles.container}>
      {headerShow()}
        <Text>ggggggg</Text>
    </View>
  )
}

export default SearchScreen

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
   // justifyContent: 'center'
  },
});