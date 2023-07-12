import React from 'react'
import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native'
import Size from '../../constants/Size'
import Colors from '../../constants/Colors'

const HomeScreen = () => {

 const headerShow = () => {
   return (
     <View style={styles.headerShow}>
       <View>
           <Text style={styles.titleHeaderShow}>Explore the most {'\n'}popular <Text style={styles.itemNFT}>NFT</Text> items</Text>
       </View>
     </View>
   )
 }

 const SearchBar = () => {
    return (
        <View style={styles.searchBar}>
            <View style={styles.logoSearchBar}></View>
            <Text style={styles.textSearchBar}>Find Your Product</Text>
        </View>
      )
 }

 const CollectionList = () => {
    return (
        <View style={styles.collectionList}>
            <FlatList/>
        </View>
      )
 }

  return (
    <View style={styles.container}>
      {headerShow()}
      {SearchBar()}
      {CollectionList()}
        <Text style={{
            marginTop: 100
        }}>ggggggg</Text>
    </View>
  )
}

export default HomeScreen

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: "center",
  },
  headerShow: {
    width: width,
    height: height / 4.5,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingHorizontal: Size.default
  },
  titleHeaderShow: {
    color: Colors.white,
    fontSize: Size.fs30,
    marginTop: Size.large,
    fontWeight: Size.bold
  },
  itemNFT: {
    color: Colors.secondary,
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
    backgroundColor: Colors.white
  }
});