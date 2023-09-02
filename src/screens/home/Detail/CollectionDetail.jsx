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
import Card from "../../../components/Card";
import { BlurView } from "expo-blur";
import Animated from "react-native-reanimated";
import { useGetCollectionCardsByIdQuery } from "../../../store/slices/collectionCardSlice";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import {
  useBuyCardByIdMutation,
  useGetCardsQuery,
} from "../../../store/slices/cardSlice";
import {
  useMeQuery,
  useFavoriteCardMutation,
} from "../../../store/slices/authSlice";
import arrow from "../../../../assets/icon/left.png";

import favoris from "../../../../assets/icon/favoris.png";
import addFavoris from "../../../../assets/icon/add-favoris.png";

import env from "../../../data/env";
import RenderHtml from "react-native-render-html";

const HEADER_HEIGHT = 300;

const CollectionDetail = ({ navigation, route }) => {
  const { itemId } = route.params;
  const { data, refetch: meRefetch } = useMeQuery();
  const [buyCardById] = useBuyCardByIdMutation();
  const [favoriteCard] = useFavoriteCardMutation();
  const [selectedCard, setSelectedCard] = useState(null);
  const [isFavoris, setIsFavoris] = useState(false);

  const [cards, setCards] = useState([]);
  const [favoriteCards, setFavoriteCards] = useState([]);

  const {
    data: collectionData,
    error: collectionError,
    isLoading: collectionIsLoading,
    refetch: collectionRefetch,
  } = useGetCollectionCardsByIdQuery(itemId);

  const availableCards = collectionData?.cards.filter(
    (item) => item.ifAvailable
  );

  const buyItem = async (id) => {
    const rest = {
      id: id,
      userId: data.id,
    };

    await buyCardById(rest)
      .then((res) => {
        console.log(res);
      })
      .catch(() => console.log("pas bon"));
    collectionRefetch();
    meRefetch();
  };

  // const handleCardFavorite = async (id) => {
  //   const favoriteCardById = {
  //     id: data.id,
  //     cardId: id,
  //   };

  //   await favoriteCard(favoriteCardById)
  //     .then((res) => {
  //       console.log(res, "**** carte ajoute en favoris ****");
  //     })
  //     .catch(() => console.log("pas bon"));

  //   collectionRefetch();
  //   meRefetch();
  // };

  // const isCardInFavorites = (cardId) => {
  //   return data.card_favoris.some((card) => card.id === cardId);
  // };

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
      >
        <Image
          style={{
            width: 20,
            height: 20,
            tintColor: Colors.white,
          }}
          source={arrow}
        />
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
              handlePresentModalPress(item);
            }}
            bid="flex"
            // favorite={isCardInFavorites(item.id)}
            image={{
              uri: item?.imageName,
            }}
          />
          <BottomSheetModal
            ref={bottomSheetRef}
            index={0}
            snapPoints={["40%"]}
            backdropComponent={renderBackdrop}
          >
            <View style={styles.contentContainer}>
              <TouchableOpacity
                style={styles.bottomSheetFavoris}
                // onPress={async() => {
                // //  console.log(isCardInFavorites(selectedCard.id))
                //  await handleCardFavorite(selectedCard?.id);
                // }}
              >
                <Image
                  source={
                    //  isCardInFavorites(selectedCard?.id) ? addFavoris : favoris
                    addFavoris
                  }
                  style={styles.iconBottomSheet}
                />
              </TouchableOpacity>

              <View>
                <View style={styles.infosHeadBottomSheet}>
                  <View style={styles.contentAvatarBottomSheet}>
                    <Image
                      style={styles.avatarBottomSheet}
                      source={{
                        uri: "https://media.sketchfab.com/models/7b9a05ad2bfc42eca59141d550a868e2/thumbnails/c0a545aba25e4fc1a27a040429227266/cd1f9baf456146ab948056ff64f83b51.jpeg",
                      }}
                    />
                  </View>
                  <View>
                    <Text style={styles.textMediumBottomSheet}>
                      By Collect7
                    </Text>
                    <Text style={styles.textTitleBottomSheet}>
                      {selectedCard?.name}
                    </Text>
                    <Text style={styles.textMediumBottomSheet}>
                      On sale for{" "}
                      <Text style={styles.colorTertiary}>
                        {selectedCard?.price} C7
                      </Text>
                    </Text>
                  </View>
                </View>
                <View style={styles.descriptionBottomSheet}>
                  <Text style={styles.textSubTitleBottomSheet}>
                    Description
                  </Text>
                  <Text style={styles.textMediumBottomSheet}>
                    {/* Meka from the MekaVerse - A collection of 8,888 unique
                    generative NFTs from an other universe. */}
                    {collectionData?.description}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.buttonBottomSheet}
                  onPress={() => {
                    buyItem(selectedCard?.id);
                  }}
                >
                  <Text style={styles.textButtonBottomSheet}>
                    Buy '{"=>"}' Id: {selectedCard?.id} 🎉
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </BottomSheetModal>
        </>
      );
    }
  };

  const source = {
    html: collectionData?.description,
  };

  const tagsStyles = {
    div: {
      whiteSpace: "normal",
      color: "white",
      fontSize: 16,
    },
  };

  const scrollY = useRef(new Animated.Value(0)).current;

  const bottomSheetRef = useRef(null);
  const handlePresentModalPress = useCallback((item) => {
    setSelectedCard(item);
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
        <Animated.Image
          source={{
            uri: collectionData?.imageName,
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
              data={availableCards}
              renderItem={renderItems}
              numColumns={2}
              keyExtractor={(item) => `${item.id}`}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={
                <View>
                  {renderCollectionHeader()}
                  <View style={styles.renderCollectionDescription}>
                    <View style={styles.renderDescription}>
                      {collectionError ? (
                        <Text style={styles.renderText}>
                          Oh no, there was an error
                        </Text>
                      ) : collectionIsLoading ? (
                        <Text style={styles.renderText}>Loading...</Text>
                      ) : collectionData ? (
                        <>
                          <RenderHtml
                            contentWidth={width}
                            source={source}
                            tagsStyles={tagsStyles}
                          />
                          <View style={styles.renderCategory}>
                            <Text style={styles.renderCategoryText}>
                              {collectionData.category.name}
                            </Text>
                          </View>
                        </>
                      ) : (
                        <Text style={styles.renderText}>Null</Text>
                      )}
                    </View>
                  </View>
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
    marginTop: 10,
    position: "relative",
  },
  buttonBottomSheet: {
    width: width * 0.88,
    height: 60,
    backgroundColor: Colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: Size.default,
    borderRadius: Size.xs,
  },
  infosHeadBottomSheet: {
    flexDirection: "row",
    paddingHorizontal: Size.default,
  },
  contentAvatarBottomSheet: {
    width: 80,
    height: 80,
    backgroundColor: Colors.secondary,
    marginRight: Size.default,
    borderRadius: Size.xl,
    overflow: "hidden",
  },
  avatarBottomSheet: {
    width: "100%",
    height: "100%",
  },
  textTitleBottomSheet: {
    fontSize: Size.fs20,
    fontWeight: Size.bold,
  },
  textMediumBottomSheet: {
    fontSize: Size.fs18,
    color: Colors.gray,
    fontWeight: Size.w600,
  },
  descriptionBottomSheet: {
    paddingHorizontal: Size.default,
    marginVertical: Size.default,
  },
  textButtonBottomSheet: {
    fontSize: Size.fs20,
    fontWeight: Size.bold,
    color: Colors.white,
  },
  textSubTitleBottomSheet: {
    fontSize: Size.fs18,
    fontWeight: Size.bold,
    marginBottom: Size.xs,
  },
  bottomSheetFavoris: {
    position: "absolute",
    right: 30,
    width: 50,
    height: 50,
    borderRadius: Size.xl,
    backgroundColor: "rgba(245,230,222,0.4)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999999,
  },
  iconBottomSheet: {
    width: 20,
    height: 20,
  },
  renderCollectionDescription: {
    width: width,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  renderDescription: {
    width: width * 0.96,
    marginTop: Size.small,
  },
  renderText: {
    color: Colors.white,
    fontSize: Size.fs16,
  },
  renderCategory: {
    width: width * 0.3,
    height: 35,
    backgroundColor: Colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Size.small,
    borderRadius: Size.xl,
  },
});
