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

const BestCollectorItem = ({ item }) => {
  const navigation = useNavigation();

  const handleItemPress = () => {
    navigation.navigate("UserDetailScreen", { itemId: item.id });
  };

  return (
    <TouchableOpacity
      style={styles.bestCollectorItem}
      onPress={handleItemPress}
      activeOpacity={0.8}
    >
      <View style={styles.bestCollectorItemAvatar}>
        <Image
          style={styles.avatar}
          source={{
            uri: item.imageUrl,
          }}
        />
      </View>
      <View style={styles.bestCollectorItemBlockTitle}>
        <Text style={styles.bestCollectorItemTitle}>{item.nickname}</Text>
        <Text style={styles.bestCollectorItemTitleSecond}>
          Floor price: {item.wallet} C7
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const BestCollectorList = ({ data }) => {
  return (
    <View style={styles.bestCollectorList}>
      <FlatList
        horizontal
        showsVerticalScrollIndicator={false}
        data={data}
        contentContainerStyle={{
          flexDirection: "column",
        }}
        renderItem={({ item }) => <BestCollectorItem item={item[0]} />}
        keyExtractor={(item) => item[0].id}
      />
    </View>
  );
};

export default BestCollectorList;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  bestCollectorBlockTitle: {
    width: width * 0.9,
  },
  bestCollectorTitle: {
    color: Colors.white,
    fontSize: Size.fs20,
    fontWeight: Size.w600,
    marginTop: Size.large,
  },
  bestCollectorList: {
    width: width * 0.9,
    height: height * 0.5,
  },
  bestCollectorItem: {
    height: 100,
    width: width * 0.9,
    flexDirection: "row",
    paddingHorizontal: Size.small,
    alignItems: "center",
    marginTop: Size.default,
    borderRadius: Size.small,
    backgroundColor: Colors.tertiary,
    overflow: "hidden",
  },
  bestCollectorItemAvatar: {
    width: 80,
    height: 80,
    backgroundColor: Colors.secondary,
    borderRadius: Size.small,
    overflow: "hidden",
  },
  bestCollectorItemBlockTitle: {
    height: 80,
    paddingHorizontal: Size.default,
  },
  bestCollectorItemTitle: {
    fontSize: Size.fs20,
    fontWeight: Size.w600,
    color: Colors.white,
    marginBottom: Size.xs,
  },
  bestCollectorItemTitleSecond: {
    fontWeight: Size.w600,
    color: Colors.white,
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
});
