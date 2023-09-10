import React from 'react'
import Size from '../constants/Size'
import Colors from '../constants/Colors'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const HeaderShow = () => {
  return (
    <View style={styles.headerShow}>
    <View>
      <Text style={styles.titleHeaderShow}>
        Explore the most {"\n"}popular{" "}
        <Text style={styles.secondary}>NFT</Text> items
      </Text>
    </View>
  </View>
  )
};

const SearchBar = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.searchBar}
      onPress={() => {
        navigation.navigate("Search");
      }}
    >
      <View style={styles.logoSearchBar}>
        <MaterialCommunityIcons
          name="magnify"
          color={Colors.white}
          size={26}
        />
      </View>
      <Text style={styles.textSearchBar}>Find Your Product</Text>
    </TouchableOpacity>
  );
};

export {
  HeaderShow,
  SearchBar
};




const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  //headerShow
  headerShow: {
    width: width,
    height: height / 4.5,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    paddingHorizontal: Size.default,
  },
  titleHeaderShow: {
    color: Colors.white,
    fontSize: Size.fs30,
    marginTop: Size.large,
    fontWeight: Size.bold,
  },
  secondary: {
    color: Colors.secondary,
  },
  //SearchBar
  searchBar: {
    backgroundColor: Colors.tertiary,
    height: 60,
    width: width * 0.9,
    marginTop: Size.default,
    borderRadius: Size.xs,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Size.default,
  },
  textSearchBar: {
    color: Colors.white,
    marginLeft: Size.small,
  },
  logoSearchBar: {
    width: Size.default,
    height: Size.default,
  },

})