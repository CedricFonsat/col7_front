import React, { useRef, useState } from "react";
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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Card from "../../../components/Card";
import { BlurView } from "expo-blur";
import Animated from "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useMeQuery } from "../../../store/slices/authSlice";
import arrow from '../../../../assets/icon/left.png';
import env from "../../../data/env";

const HEADER_HEIGHT = 300;

const UserDetailScreen = ({ navigation, route }) => {


  const [tabActive, setTabActive] = useState(true);
  const [tabActive2, setTabActive2] = useState(false);

    const { itemId } = route.params;
    const user = itemId[0];

  //const { data: meData, error: meError, isLoading: meIsLoading, refetch: meRefetch } = useMeQuery();

  const floorPrice = user.cards.reduce((total, item) => total + item.price, 0);

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
         <Image style={{
          width: 30,
          height: 30,
          tintColor: Colors.white,
        }} source={arrow} /> 
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
          {user.nickname}
          </Text>
          <Text style={{ color: "white", fontWeight: "bold" }}>
              @{user.nickname}
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
 if (item.ifAvailable == false) {
    return (
      <Card
        key={item.id}
        name={item.name}
        price={item.price}
        id={item.id}
        bid="flex"
        image={{
          uri: `${env.IMAGE_URL_CARD}/${item.imageName}`,
        }}
      />
    );
     }
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
          <Text style={styles.midInfosBlockText}>{user.cards.length}</Text>
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
    console.log(user?.imageUrl, 'kkkkkkkk');
    return (
      <View style={styles.headerShow}>
        <BlurView intensity={70} tint="white" style={styles.headerShowInfos}>
          <View style={styles.headerShowInfosAvatar}>
            <Image
              style={styles.avatar}
              source={{
                uri: user?.imageUrl,
              }}
            />
          </View>
          <View style={styles.headerShowInfosBlockTitle}>
            <Text style={styles.headerShowInfosTitle}>{user.nickname}</Text>
            <Text style={styles.headerShowInfosTitleSecond}>
              @{user.nickname}
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
            uri: user.imageUrl,
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
                }),
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
        <View style={styles.container}>
            <Animated.FlatList
              data={tabActive ? user?.cards : user.cards_favoris[0]?.cards}
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

          {renderHeader()}

          {/* Header Bar */}
          {renderHeaderBar()}
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default UserDetailScreen;

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
});
