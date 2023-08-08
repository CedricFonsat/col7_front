import React, { useRef, useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import Size from "../../../constants/Size";
import Colors from "../../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Card from "../../../components/Card";
import { BlurView } from "expo-blur";
import Animated from "react-native-reanimated";
import { useGetCollectionCardsByIdQuery } from "../../../store/slices/collectionCardSlice";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { useBuyCardByIdMutation, useGetCardsQuery } from "../../../store/slices/cardSlice";
import { useMeQuery } from "../../../store/slices/authSlice";

const HEADER_HEIGHT = 300;

const CollectionDetail = ({ navigation, route }) => {
  const { itemId } = route.params;
  const { data, refetch: meRefetch } = useMeQuery();
  const [buyCardById] = useBuyCardByIdMutation();



  const buyItem = async(id) => {

    const rest = {
      'id': id,
      'userId': data.id,
    };

    console.log(rest);

    await buyCardById(rest).then((res) => {
     
        console.log(res);
    
      })
      .catch(() => console.log("pas bon"));
    console.log(rest);
    collectionRefetch();
    meRefetch();
  };

  const {
    data: collectionData,
    error: collectionError,
    isLoading: collectionIsLoading,
    refetch: collectionRefetch
  } = useGetCollectionCardsByIdQuery(itemId);

  const leftButton = ({ navigation }) => {
    return (
      <TouchableOpacity
        style={{
          width: 50,
          height: 50,
          borderRadius: Size.xl,
          backgroundColor: Colors.primary,
          justifyContent: "center",
          alignItems: "center",
          borderColor: Colors.borderColor,
          borderWidth: 1,
          overflow: "hidden",
          zIndex: 99999,
        }}
        onPress={() => navigation.goBack()}
        activeOpacity={0.8}
        //onPress pour faire un goBack avec navigation
      >
        {/* <Image style={{
          width: 20,
          height: 20,
          tintColor: Colors.white,
        }} source={arrow} /> */}

        <Text
          style={{
            color: "white",
            fontSize: Size.fs24,
          }}
        >
          GO
        </Text>
      </TouchableOpacity>
    );
  };

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
          <Text style={{ color: "gray" }}>
            {collectionError ? (
              <Text>Oh no, there was an error</Text>
            ) : collectionIsLoading ? (
              <Text>Loading...</Text>
            ) : collectionData ? (
              collectionData.name
            ) : (
              <Text>Null</Text>
            )}
          </Text>
          <Text style={{ color: "white", fontWeight: "bold" }}>
            new collection
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
          // backgroundColor: Colors.secondary,
          position: "absolute",
          justifyContent: "flex-end",
          paddingHorizontal: Size.default,
          zIndex: 999,
        }}
      >
        {leftButton({ navigation })}
      </View>
    );
  };

  const renderItems = ({ item, index }) => {
   if (item.ifAvailable == true) {
    return (
      <>
      <Card
        key={item.id}
        name={item.name}
        price={item.price}
        id={item.id}
        onPress={handlePresentModalPress}
        bid="flex"
        image={{
          uri: `/Users/cedricfonsat/Documents/IOTA/FINAL_PROJECT/col7_bo/public/uploads/cards/${item.imageName}`,
        }}
      />
      <BottomSheetModal
      ref={bottomSheetRef}
      index={0}
      snapPoints={["40%"]}
      backdropComponent={renderBackdrop}
      // onChange={handleSheetChanges}
    >
      <View style={styles.contentContainer}>
        {/* IMPORTANT trouver une solution pour changer l'affichage du bottom si deja acheter IMPORTANT */}
      
          <View>
            <TouchableOpacity
              style={styles.buttonBottomSheet}
              onPress={() => {
                buyItem(item.id);
              }}
            >
              <Text>Buy</Text>
            </TouchableOpacity>
            <Text style={styles.textBottomSheet}>IdNumber: {item.id} 🎉</Text>
          </View>
      </View>
    </BottomSheetModal>
    </>
    );
   }
  };

  const scrollY = useRef(new Animated.Value(0)).current;

  const bottomSheetRef = useRef(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const renderBackdrop = useCallback((props) => {
    return (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    );
  }, []);

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
            uri: `/Users/cedricfonsat/Documents/IOTA/FINAL_PROJECT/col7_bo/public/uploads/collections/${collectionData.imageName}`,
          }}
          sharedTransitionTag="sharedTag"
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

        <BlurView
          intensity={70}
          tint="white"
          style={{
            position: "absolute",
            width: width * 0.9,
            height: 60,
            borderRadius: Size.xs,
            overflow: "hidden",
            //  backgroundColor: Colors.white,
            justifyContent: "center",
            alignItems: "center",
            bottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: Size.fs24,
              fontWeight: Size.w600,
              color: Colors.white,
            }}
          >
            {collectionError ? (
              <Text>Oh no, there was an error</Text>
            ) : collectionIsLoading ? (
              <Text>Loading...</Text>
            ) : collectionData ? (
              collectionData.name
            ) : (
              <Text>Null</Text>
            )}
          </Text>
        </BlurView>
      </View>
    );
  };

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <View style={styles.container}>
          {collectionError ? (
            <Text>Oh no, there was an error</Text>
          ) : collectionIsLoading ? (
            <Text>Loading...</Text>
          ) : collectionData ? (
            <Animated.FlatList
              data={collectionData.cards}
              renderItem={renderItems}
              numColumns={2}
              keyExtractor={(item) => `${item.id}`}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={
                <View>
                  {/* Header */}
                  {/* Probable emplacement de SharedElement */}
                  {renderCollectionHeader()}

                  {/* Title */}
                  <View
                    style={{
                      height: 100,
                      width: width,
                      alignItems: "center",
                    }}
                  ></View>
                </View>
              }
              scrollEventThrottle={16}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: true }
              )}
            />
          ) : null}

          {renderHeader()}

          {/* Header Bar */}
          {renderHeaderBar()}
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default CollectionDetail;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    //  flex: 1,
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
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  buttonBottomSheet: {
    width: 100,
    height: 40,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
  },
  textBottomSheet: {
    fontSize: 40,
    fontWeight: "bold",
  }
});
