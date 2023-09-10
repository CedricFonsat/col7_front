import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import Animated from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import Size from "../../../constants/Size";
import Colors from "../../../constants/Colors";

const CollectionItem = ({ item }) => {
  const navigation = useNavigation();

  const handleItemPress = () => {
    navigation.navigate("CollectionDetail", { itemId: item.id });
  };

  return (
    <TouchableOpacity onPress={handleItemPress} activeOpacity={1}>
      <Animated.View
        style={styles.collectionItem}
        sharedTransitionTag="sharedTag"
      >
        <View style={styles.cover}>
          <Image
            style={styles.avatar}
            source={{
              uri: item?.imageName,
            }}
          />
        </View>
        <View style={styles.collectionItemFloat}>
          <Image
            style={styles.avatar}
            source={{
              uri: item?.imageName,
            }}
          />
        </View>
        <View
          style={{
            width: width * 0.7,
            height: 40,
            position: "absolute",
            backgroundColor: Colors.tertiary,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: Size.fs20,
              color: Colors.white,
            }}
          >
            {item.name}
          </Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const CollectionList = ({ data }) => {
  return (
    <View style={styles.collectionList}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => <CollectionItem item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default CollectionList;

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  collectionItem: {
    backgroundColor: "green",
    padding: Size.default,
    marginVertical: 8,
    marginRight: Size.default,
    height: 180,
    width: width * 0.7,
    justifyContent: "flex-end",
    position: "relative",
    overflow: "hidden",
    borderRadius: Size.small,
  },
  collectionItemTitle: {
    fontSize: 32,
    color: Colors.white,
    zIndex: 2,
  },
  bestCollection: {
    width: width * 0.9,
    height: 180,
    marginVertical: Size.default,
    borderRadius: Size.small,
    overflow: "hidden",
  },
  collectionList: {
    width: width * 0.9,
    position: "relative",
    marginTop: Size.large,
  },
  collectionItemFloat: {
    width: 150,
    height: 150,
    position: "absolute",
    right: 10,
    top: -80,
  },
});
