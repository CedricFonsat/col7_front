import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import Size from "../../constants/Size";
import Colors from "../../constants/Colors";
import Card from "../../components/Card";
import env from "../../data/env";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { useGetCardsQuery } from "../../store/slices/cardSlice";
import { ScrollView } from "react-native-gesture-handler";

const SearchScreen = () => {
  const [filterdData, setfilterdData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [moinCher, setMoinCher] = useState(false);
  const [plusCher, setPlusCher] = useState(false);
  const [autre, setAutre] = useState(false);

  const { data, error, isLoading } = useGetCardsQuery();

  console.log(data, "ttt");

  const headerShow = () => {
    return (
      <View
        style={{
          backgroundColor: Colors.tertiary,
          width: width,
          height: height * 0.2,
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

  const renderNotFound = () => {
    return (
      <View style={{
        width: width,
        height: 50
      }}>
        <Text style={{
          color: Colors.white,
          fontSize: Size.fs24
        }}>no result found.</Text>
      </View>
    )
  }

  const SearchBar = () => {
    return (
      <View style={{ flex: 1, width: width }}>
        <View style={{ position: "relative", justifyContent: "center" }}>
          <MaterialCommunityIcons
            name="magnify"
            color="white"
            size={26}
            style={{
              marginLeft: Size.default,
              position: "absolute",
              zIndex: 1,
            }}
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
              color: Colors.white,
            }}
            placeholder="Search cards"
            placeholderTextColor={Colors.white}
            value={searchTerm}
            onChangeText={(text) => searchFilter(text)}
          />
        </View>
        <ScrollView horizontal={true} contentContainerStyle={styles.categories}>
          <TouchableOpacity style={[styles.category, moinCher ? styles.activeChoiceFiler : null]}
          onPress={() => {
            if (moinCher) {
              setMoinCher(false)
            }else{
              setMoinCher(true)
            }
          }}>
            <MaterialCommunityIcons
              name="align-vertical-bottom"
              color={Colors.white}
              size={16}
              style={styles.iconCategory}
            />
            <Text style={styles.textCategory}>Moins cher</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.category, plusCher ? styles.activeChoiceFiler : null]}
          onPress={() => {
            if (plusCher) {
              setPlusCher(false)
            }else{
              setPlusCher(true)
            }
          }}>
          <MaterialCommunityIcons
            name="align-vertical-top"
            color={Colors.white}
            size={16}
            style={styles.iconCategory}
          />
            <Text style={styles.textCategory}>Plus cher</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.category, autre ? styles.activeChoiceFiler : null]}
          onPress={() => {
            if (autre) {
              setAutre(false)
            }else{
              setAutre(true)
            }
          }}
          >
          <MaterialCommunityIcons
            name="broadcast"
            color={Colors.white}
            size={16}
            style={styles.iconCategory}
          />
            <Text style={styles.textCategory}>Autre</Text>
          </TouchableOpacity>
        </ScrollView>
        <FlatList
          data={filterdData}
          renderItem={renderItems ?? renderNotFound}
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
  categories: {
    height: 50,
    width: width,
    flexDirection: "row",
    alignItems: "center",
  },
  category: {
    width: 120,
    height: 40,
    backgroundColor: Colors.tertiary,
    marginLeft: Size.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Size.xs,
    flexDirection: "row",
  },
  textCategory: {
    color: Colors.white,
  },
  iconCategory: {
    marginRight: Size.xs
  },
  activeChoiceFiler: {
    backgroundColor: Colors.secondary
  }
});
