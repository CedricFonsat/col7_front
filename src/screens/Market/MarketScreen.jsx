import React, { useRef, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
  Image,
  RefreshControl,
} from "react-native";
import Size from "../../constants/Size";
import Colors from "../../constants/Colors";
import { useGetCardsQuery } from "../../store/slices/cardSlice";
import { useGetCollectionCardsComingSoonQuery } from "../../store/slices/collectionCardSlice";
import env from "../../data/env";

const HEADER_HEIGHT = 300;

const MarketScreen = () => {
  const { data, error, isLoading } = useGetCollectionCardsComingSoonQuery();

  const dataMe = {
    email: "hello@collect7.com",
    username: "Market Screen",
   // image: "https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto/gigs/257218235/original/5516cb5c85fbf3a1df3a293f62dbf78a3e78f960.png",
  };

  console.log(data);

  const renderHeaderBar = () => {
    return (
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 90,
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          paddingBottom: 10,
        }}
      >
        {/* Screen Overlay */}
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "black",
            opacity: scrollY.interpolate({
              inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 70],
              outputRange: [0, 1],
            }),
          }}
        />

        {/* Header Bar Title */}
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            alignItems: "center",
            justifyContent: "flex-end",
            paddingBottom: 10,
            opacity: scrollY.interpolate({
              inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 50],
              outputRange: [0, 1],
            }),
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 50],
                  outputRange: [50, 0],
                  extrapolate: "clamp",
                }),
              },
            ],
          }}
        >
          <Text style={{ color: "gray" }}>Collection</Text>
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Coming Soon
          </Text>
        </Animated.View>
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <View
        style={{
          width: width,
          height: 100,
          position: "absolute",
          justifyContent: "flex-end",
          paddingHorizontal: Size.default,
        }}
      ></View>
    );
  };

  const renderItems = ({ item, index }) => {
    return (
      <>
        <TouchableOpacity
          style={{
            width: width,
            alignItems: "center",
            marginTop: Size.default,
            overflow: 'hidden',
            borderRadius: Size.default
          }}
        >
          <View
            style={{
              width: width * 0.88,
              height: height * 0.2,
              position: "relative",
            }}
          >
            <View
              style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                backgroundColor: "rgba(0,0,0,.7)",
                zIndex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: Colors.white, fontSize: Size.fs24 }}>
                Coming Soon
              </Text>
            </View>
            <Image
              style={{
                height: "100%",
              }}
              source={{
                uri: item.imageName,
              }}
            />
          </View>
        </TouchableOpacity>
      </>
    );
  };

  const scrollY = useRef(new Animated.Value(0)).current;

  const renderCollectionHeader = () => {
    return (
      <View
        style={{
          marginTop: -1000,
          paddingTop: 1000,
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {/* Background Image */}
        <Animated.Image
          source={{
            uri: data?.cover,
          }}
          resizeMode="contain"
          style={{
            height: HEADER_HEIGHT,
            width: "200%",
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                  outputRange: [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
                }),
              },
              {
                scale: scrollY.interpolate({
                  inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                  outputRange: [2, 1, 0.75],
                }),
              },
            ],
          }}
        ></Animated.Image>
      </View>
    );
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={data?.data}
        renderItem={renderItems}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={
          <View>
            {/* Header */}
            {/* Probable emplacement de SharedElement */}
            {renderCollectionHeader()}

            {/* Title */}
          </View>
        }
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      />

      {renderHeader()}

      {/* Header Bar */}
      {renderHeaderBar()}
    </View>
  );
};

export default MarketScreen;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 200,
  },
  card: {
    width: width / 2.5,
    height: height / 3.5,
    backgroundColor: Colors.secondary,
    borderRadius: Size.littleMargin,
    justifyContent: "center",
    alignItems: "center",
    margin: Size.defaultMargin,
  },
  imageCard: {
    width: 50,
    height: 50,
  },
});
