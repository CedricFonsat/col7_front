import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { PanGestureHandler, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const BottomSheet = () => {
  const gesture = React.createRef();

  return (
    <GestureHandlerRootView>
        <Animated.View style={styles.bottomSheetContainer}>
          <View style={styles.line} />
        </Animated.View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: SCREEN_HEIGHT,
    width: "100%",
    backgroundColor: "white",
    position: "absolute",
    top: SCREEN_HEIGHT / 1.5,
    borderRadius: 25,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: "grey",
    alignSelf: "center",
    marginVertical: 15,
    borderRadius: 2,
  },
});

