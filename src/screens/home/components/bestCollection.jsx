import React from "react";
import { TouchableOpacity, Image, Dimensions, StyleSheet } from "react-native";
import Size from "../../../constants/Size";

const BestCollection = () => {
  return (
    <TouchableOpacity style={styles.bestCollection} activeOpacity={1}>
      <Image
        style={styles.avatar}
        source={{
          uri: "https://pbs.twimg.com/media/FR1xxoIWUAQiorM.jpg",
        }}
      />
    </TouchableOpacity>
  );
};

export default BestCollection;

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  bestCollection: {
    width: width * 0.9,
    height: 180,
    marginVertical: Size.default,
    borderRadius: Size.small,
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
});
