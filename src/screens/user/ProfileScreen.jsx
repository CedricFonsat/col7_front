import React, { useRef, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import Size from "../../constants/Size";
import Colors from "../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Card from "../../components/Card";
import { BlurView } from "expo-blur";
import Animated from "react-native-reanimated";
import { useGetCollectionCardsByIdQuery } from "../../store/slices/collectionCardSlice";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider, BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useMeQuery } from "../../store/slices/authSlice";
import env from "../../data/env";
import Button from "../auth/components/Button";
import background from '../../../assets/illustration/login.png'
import favoris from "../../../assets/icon/favoris.png";
import logo from "../../../assets/logo/logo.png"

const HEADER_HEIGHT = 300;

const ProfileScreen = ({ navigation }) => {

  const [tabActive, setTabActive] = useState(true);
  const [tabActive2, setTabActive2] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const {
    data: collectionData,
    error: collectionError,
    isLoading: collectionIsLoading,
  } = useGetCollectionCardsByIdQuery(6);

  const {
    data: meData,
    error: meError,
    isLoading: meIsLoading,
    refetch: meRefetch,
  } = useMeQuery();

  const floorPrice = meData?.cards.reduce(
    (total, item) => total + item.price,
    0
  );

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

  // console.log("Prix total :", floorPrice);

  // console.log(meData);

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
            {meError ? (
              <Text>Oh no, there was an error</Text>
            ) : meIsLoading ? (
              <Text>Loading...</Text>
            ) : meData ? (
              meData.nickname
            ) : (
              <Text>Null</Text>
            )}
          </Text>
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {meError ? (
              <Text>Oh no, there was an error</Text>
            ) : meIsLoading ? (
              <Text>Loading...</Text>
            ) : meData ? (
              `@${meData.nickname}`
            ) : (
              <Text>Null</Text>
            )}
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
      ></View>
    );
  };

  const renderItems = ({ item, index }) => {
    //  if (item.ifAvailable == false) {
    return (
      <>
      <Card
        key={item.id}
        name={item.name}
        price={item.price}
        id={item.id}
        bid="flex"
        image={{
          uri: item.imageName,
        }}
        onPress={() => {
          handlePresentModalPress(item);
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
              favoris
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
    // }
  };

  const scrollY = useRef(new Animated.Value(0)).current;

  const midInfos = () => {
    return (
      <View style={styles.midInfos}>
        <View>
          <Text style={styles.midInfosText}>Net Worth NFT</Text>
          <Text style={styles.midInfosTextSecond}>
            Floor price: {floorPrice}
          </Text>
        </View>
        <View style={styles.midInfosBlock}>
          <View>
            <MaterialCommunityIcons
              name="cards-outline"
              color={Colors.white}
              size={26}
            />
          </View>
          <Text style={styles.midInfosBlockText}>{meData.cards.length}</Text>
        </View>
      </View>
    );
  };

  const tabBar = () => {

    return (
      <View style={styles.tabBar}>
        <TouchableOpacity style={[styles.tabBarPanel, tabActive ? styles.tabBarPanelActive : null]}  onPress={() => {
              setTabActive(true)
              setTabActive2(false)
        }}>
          <Text style={styles.tabBarText}>Cards</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabBarPanel, tabActive2 ? styles.tabBarPanelActive : null]}  onPress={() => {
              setTabActive2(true)
              setTabActive(false)
        }}>
          <Text style={styles.tabBarText}>Favoris</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const headerShowInfos = () => {
    return (
      <View style={styles.headerShow}>
        <BlurView intensity={70} tint="white" style={styles.headerShowInfos}>
          <View style={styles.headerShowInfosAvatar}>
            <Image
              style={styles.avatar}
              source={{
                uri: meData.imageUrl,
              }}
            />
          </View>
          <View style={styles.headerShowInfosBlockTitle}>
            <Text style={styles.headerShowInfosTitle}>{meData.nickname}</Text>
            <Text style={styles.headerShowInfosTitleSecond}>
              @{meData.nickname}
            </Text>
          </View>
        </BlurView>
      </View>
    );
  };

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
            uri: meData.imageUrl,
          }}
          sharedTransitionTag="sharedTag"
          // resizeMode="contain"
          style={{
            height: HEADER_HEIGHT,
            backgroundColor: Colors.secondary,
            position: "relative",
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
                })
              },
            ],
          }}
        ></Animated.Image>

        {headerShowInfos()}
      </View>
    );
  };

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        { meData ? (
          <View style={styles.container}>
            {meError ? (
              <Text>Oh no, there was an error</Text>
            ) : meIsLoading ? (
              <Text>Loading...</Text>
            ) : meData ? (
              <Animated.FlatList
                data={tabActive ? meData?.cards :meData.cards_favoris[0]?.cards}
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
                        height: 150,
                        width: width,
                        alignItems: "center",
                      }}
                    >
                      {midInfos()}
                      {tabBar()}
                    </View>
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
        ) : (
          <View style={[styles.container, stylesBis.container]}>
            {/* <View style={stylesBis.headShow}>
              <Image style={stylesBis.image} source={background} />
            </View>  */}
            <View style={stylesBis.navigation}>
        <Image style={{
          width: '130%'
        }} source={background} />
      </View>
      <View style={{
        height: 250,
        marginTop: 50
      }}>
      <Image style={{
          width: 150,
          height: 150
                  }} source={logo} />
      </View>
            <Button
             icon={<MaterialCommunityIcons
              name="login"
              color={Colors.white}
              size={26}
              style={{
                marginHorizontal: 10
              }}
            />}
            text='Sign in' backgroundColor={Colors.secondary} onPress={() => navigation.navigate('LoginScreen')} />
          </View>
        )}
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default ProfileScreen;

const { width, height } = Dimensions.get("window");

const stylesBis = StyleSheet.create({
  container: {
    alignItems: 'center',
    overflow: 'hidden'
  },
  navigation: {
    width: width,
    height: height * 0.2,
    backgroundColor: Colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Size.default,
  },
  image: {
    width: '150%',
    height: '130%',
    position: 'absolute',
    zIndex: 1
  }
})

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
  headerShow: {
    width: width * 0.9,
    height: 100,
    borderRadius: Size.small,
    overflow: "hidden",
    position: "absolute",
    zIndex: 999,
    bottom: 10,
  },
  headerShowInfos: {
    width: width * 0.9,
    height: 100,
    // backgroundColor: Colors.tertiary,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Size.small,
  },
  headerShowInfosAvatar: {
    width: 80,
    height: 80,
    //  backgroundColor: "blue",
    borderRadius: Size.small,
    overflow: "hidden",
  },
  headerShowInfosBlockTitle: {
    marginLeft: Size.default,
  },
  headerShowInfosTitle: {
    marginBottom: Size.xs,
    fontSize: Size.fs20,
    fontWeight: Size.w600,
    color: Colors.white,
  },
  headerShowInfosTitleSecond: {
    color: Colors.gray,
  },
  midInfos: {
    width: width * 0.96,
    height: 60,
    backgroundColor: Colors.tertiary,
    marginTop: 20,
    borderRadius: Size.xs,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: Size.default,
    alignItems: "center",
  },
  midInfosText: {
    fontSize: Size.fs16,
    fontWeight: Size.bold,
    color: Colors.white,
  },
  midInfosTextSecond: {
    color: Colors.gray,
  },
  midInfosBlock: {
    flexDirection: "row",
  },
  midInfosBlockText: {
    fontSize: Size.fs24,
    fontWeight: Size.bold,
    color: Colors.white,
    marginLeft: Size.xs,
  },
  cardList: {
    width: width * 0.9,
    marginTop: Size.large,
  },
  cardItem: {
    width: width * 0.42,
    height: height * 0.28,
    //  backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Size.small,
    borderRadius: Size.small,
    position: "relative",
    overflow: "hidden",
  },
  cardItemTitle: {
    color: Colors.white,
    fontSize: Size.fs20,
    zIndex: 2,
  },
  row: {
    flex: 1,
    justifyContent: "space-around",
  },
  cardItemImage: {
    position: "absolute",
    width: width * 0.42,
    height: height * 0.28,
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  background: {
    position: "absolute",
    width: width * 0.42,
    height: height * 0.28,
    borderRadius: Size.small,
    zIndex: 1,
  },
  cover: {
    position: "absolute",
    width: width,
    height: height / 3.5,
  },
  tabBar: {
    width: width * 0.96,
    height: 50,
    backgroundColor: Colors.tertiary,
    marginTop: 10,
    borderRadius: Size.xs,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: Size.xs,
    alignItems: "center",
  },
  tabBarPanel: {
    width: width * 0.42,
    height: 40,
    borderRadius: Size.xs,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBarPanelActive: {
    backgroundColor: Colors.secondary,
  },
  tabBarText: {
    color: Colors.white,
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
});
