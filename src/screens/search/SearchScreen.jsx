import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  FlatList,
  Button,
} from "react-native";
import Size from "../../constants/Size";
import Colors from "../../constants/Colors";
import Card from "../../components/Card";
import env from "../../data/env";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { useGetCardsQuery } from "../../store/slices/cardSlice";

const SearchScreen = () => {
  const [filterdData, setfilterdData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { data, error, isLoading } = useGetCardsQuery();

  console.log(data);

  const headerShow = () => {
    return (
      <View
        style={{
          backgroundColor: Colors.tertiary,
          width: width,
          height: height / 5.5,
          position: "relative",
          alignItems: "center",
        }}
      ></View>
    );
  };

  const searchFilter = (text) => {
    if (text) {
      const newData = data.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();

        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setfilterdData(newData);
      setSearchTerm(text);
    } else {
      setfilterdData(data);
      setSearchTerm(text);
    }
  };

  const renderItems = ({ item, index }) => {
    if (item.ifAvailable == true) {
      if (item.users) {
        const modifiedUsers = item.users.map((user) => {
          if (user?.id == 2) {
            return true;
          }

          return false;
        });
      }

      return (
        <>
          <Card
            key={item.id}
            name={item.name}
            price={item.price}
            id={item.id}
            onPress={() => {
              //  handlePresentModalPress(item);
            }}
            bid="flex"
            // favorite={isCardInFavorites(item.id)}
            image={{
              uri: `${env.IMAGE_URL_CARD}/${item.imageName}`,
            }}
          />
        </>
      );
    }
  };

  const SearchBar = () => {
    return (
      <View style={{ flex: 1, width: width }}>
       <View style={{position: 'relative', justifyContent: 'center'}}>
       <MaterialCommunityIcons
                name="magnify"
                color="white"
                size={26}
                style={{ marginLeft: Size.default, position: 'absolute', zIndex: 1 }}
              />
       <TextInput
          style={{
            height: 50,
            margin: Size.small,
            paddingVertical: Size.small,
            paddingLeft: Size.large,
            paddingRight: Size.small,
            backgroundColor: Colors.tertiary,
            borderRadius: Size.xs,
            fontSize: Size.fs16,
            color: Colors.white
          }}
          placeholder="Search cards"
          placeholderTextColor={Colors.white}
          value={searchTerm}
          onChangeText={(text) => searchFilter(text)}
        />
       </View>
        <FlatList
          data={filterdData}
          renderItem={renderItems}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {headerShow()}
      {SearchBar()}
    </View>
  );
};

export default SearchScreen;

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
    width: 20,
    height: 20,
    // backgroundColor: Colors.white
  },
});
