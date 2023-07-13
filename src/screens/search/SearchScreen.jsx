import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import Size from '../../constants/Size'
import Colors from '../../constants/Colors'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const SearchScreen = () => {

 const headerShow = () => {
   return (
     <View style={{
       backgroundColor: Colors.tertiary,
       width: width,
       height: height / 5.5,
       position: 'relative',
       alignItems: 'center'
     }}>
     </View>
   )
 }

 const SearchBar = () => {
  return (
      <View style={styles.searchBar}>
          <View style={styles.logoSearchBar}>
            <MaterialCommunityIcons name="magnify" color={Colors.white} size={26} />
          </View>
          <Text style={styles.textSearchBar}>Find Your Product</Text>
      </View>
    )
}

  return (
    <View style={styles.container}>
      {headerShow()}
      {SearchBar()}
    </View>
  )
}

export default SearchScreen

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: "center",
  },
  searchBar: {
    backgroundColor: Colors.tertiary,
    height: 60,
    width: width * 0.90,
    marginTop: Size.default,
    borderRadius: Size.xs,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Size.default
},
textSearchBar: {
    color: Colors.white,
    marginLeft: Size.small
},
logoSearchBar: {
  width: 20,
  height: 20,
 // backgroundColor: Colors.white
},
});