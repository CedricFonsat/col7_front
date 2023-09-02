import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";
import Size from "../../constants/Size";
import Colors from "../../constants/Colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Animated from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGetCollectionCardsQuery, useGetHomeQuery } from "../../store/slices/collectionCardSlice";
import { useUsersListHomeQuery, useMeQuery } from "../../store/slices/authSlice";
import env from "../../data/env";

const HomeScreen = ({ navigation }) => {

  const { data: meData } = useMeQuery();


// useEffect(async() => {
//  await connexion({userId: meData.id})
//  .then((res) => {

//  console.log(res);
// }).catch(() => console.log("pas bon"));

// })

 // console.log(meData,'%%%%%%%%%%');


 const { data: homeData } = useGetHomeQuery();


 console.log(homeData?.collection, '..*****');
 

  const {
    data: collectionData,
    error: collectionError,
    isLoading: collectionIsLoading,
  } = useGetCollectionCardsQuery();


  //const { data: homeData, error: homeError } = useCustomHomeQuery();



  // if (collectionData) {
  //   console.log(`${env.IMAGE_URL_USER}/${collectionData[0].imageName}`);
  // }

  const {
    data: usersData,
    error: usersError,
    isLoading: usersIsLoading,
  } = useUsersListHomeQuery();

  if (usersError) {
    console.log("E------");
  } else if (usersIsLoading) {
    console.log("L---------");
  } else if (usersData) {
    console.log(usersData[0]);
  } else {
    console.log("D---------");
  }

  const headerShow = () => {
    return (
      <View style={styles.headerShow}>
        <View>
          <Text style={styles.titleHeaderShow}>
            Explore the most {"\n"}popular{" "}
            <Text style={styles.itemNFT}>NFT</Text> items
          </Text>
        </View>
      </View>
    );
  };

  const SearchBar = () => {
    return (
      <TouchableOpacity
        style={styles.searchBar}
        onPress={() => {
          navigation.navigate("Search");
          // navigation.navigate('Details', {
          //   itemId: 86,
          //   otherParam: 'anything you want here',
          // });
        }}
      >
        <View style={styles.logoSearchBar}>
          <MaterialCommunityIcons
            name="magnify"
            color={Colors.white}
            size={26}
          />
        </View>
        <Text style={styles.textSearchBar}>Find Your Product</Text>
      </TouchableOpacity>
    );
  };

  const CollectionItem = ({ title, image, logo, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={1}>
        <Animated.View
          style={styles.collectionItem}
          onPress={onPress}
          sharedTransitionTag="sharedTag"
        >
          <View style={styles.cover}>
            <Image
              style={styles.avatar}
              source={{
                uri: image,
              }}
            />
          </View>
          {/* <Text style={styles.collectionItemTitle}>{title}</Text> */}
          {/* <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.6)"]}
            style={styles.background}
          /> */}
          <View style={styles.collectionItemFloat}>
            <Image
              style={styles.avatar}
              source={{
                uri: logo,
              }}
            />
          </View>
          <View
          style={{
           // width: 200,
           width: width * 0.7,
            height: 40,
            position: 'absolute',
            backgroundColor: Colors.tertiary,
           // borderTopRightRadius: Size.small,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          ><Text style={{
            fontSize: Size.fs20,
            color: Colors.white
          }}>{title}</Text></View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const CollectionList = () => {
    const handleItemPress = (itemId) => {
      navigation.navigate("CollectionDetail", { itemId: itemId });
    };

    return (
      <View style={styles.collectionList}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={homeData?.collection}
            renderItem={({ item }) => (
              <CollectionItem
                title={item.name}
                image={item.imageName}
                // logo={item.otherImage}
                onPress={() => handleItemPress(item.id)}
              />
            )}
            keyExtractor={(item) => item.id}
          />
      </View>
    );
  };

  const BestCollectorItem = ({ title, money, avatar, onPress }) => {
    return (
      <TouchableOpacity style={styles.bestCollectorItem} onPress={onPress} activeOpacity={.8}>
        <View style={styles.bestCollectorItemAvatar}>
          <Image
            style={styles.avatar}
            source={{
              uri: avatar,
            }}
          />
        </View>
        <View style={styles.bestCollectorItemBlockTitle}>
          <Text style={styles.bestCollectorItemTitle}>{title}</Text>
          <Text style={styles.bestCollectorItemTitleSecond}>
            Floor price: {money} C7
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const BestCollectorList = () => {

    const handleItemPress = (itemId) => {
      navigation.navigate("UserDetailScreen", { itemId: itemId });
    };

    return (
      <View style={styles.bestCollectorList}>
        {usersError ? (
          <Text>Oh no, there was an error</Text>
        ) : usersIsLoading ? (
          <Text>Loading...</Text>
        ) : usersData ? (
          <FlatList
            horizontal
            showsVerticalScrollIndicator={false}
            data={homeData?.users}
            contentContainerStyle={{
              flexDirection: "column",
            }}
            renderItem={({ item }) => (
              <BestCollectorItem
                title={item[0].nickname}
                avatar={item[0].imageUrl}
                money={item.totalPrice}
                onPress={() => {handleItemPress(item)}}
              />
            )}
            keyExtractor={(item) => item[0].id}
          />
        ) : null}
      </View>
    );
  };

  const BestCollection = () => {
    return (
      <TouchableOpacity style={styles.bestCollection} 
     // onPress={onPress}
      activeOpacity={1}
      >
          <Image
            style={styles.avatar}
            source={{
              uri: 'https://pbs.twimg.com/media/FR1xxoIWUAQiorM.jpg',
            }}
          />
      </TouchableOpacity>
    );
  };



  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic" showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {headerShow()}
          {SearchBar()}
          {BestCollection()}
          {CollectionList()}
          <View style={styles.bestCollectorBlockTitle}>
            <Text style={styles.bestCollectorTitle}>Best collector</Text>
          </View>
          {BestCollectorList()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: "center",
  },
  backgroundStyle: {
    backgroundColor: Colors.primary,
  },
  headerShow: {
    width: width,
    height: height / 4.5,
    alignItems: "flex-start",
    justifyContent: "flex-end",
    paddingHorizontal: Size.default,
  },
  titleHeaderShow: {
    color: Colors.white,
    fontSize: Size.fs30,
    marginTop: Size.large,
    fontWeight: Size.bold,
  },
  itemNFT: {
    color: Colors.secondary,
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
  collectionItem: {
    backgroundColor: "green",
    padding: 20,
    marginVertical: 8,
    marginRight: 20,
    height: 180,
    width: width * 0.7,
  //  marginTop: 60,
    justifyContent: "flex-end",
    position: 'relative',
    overflow: 'hidden',
    borderRadius: Size.small
  },
  collectionItemTitle: {
    fontSize: 32,
    color: Colors.white,
    // fontWeight: Size.w600,
    zIndex: 2,
  },
  bestCollection: {
    width: width * 0.9,
    height: 180,
    marginVertical: Size.default,
    borderRadius: Size.small,
    overflow: 'hidden'
  },
  collectionList: {
    width: width * 0.9,
    position: "relative",
    marginTop: Size.large,
  },
  collectionItemFloat: {
    width: 150,
    height: 150,
    // backgroundColor: Colors.white,
    position: "absolute",
    right: 10,
    top: -80,
  },
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
    overflow: 'hidden',
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
  cover: {
    position: "absolute",
    height: 180,
    width: width * 0.7,
  },
  background: {
    position: "absolute",
    height: 150,
    width: width * 0.7,
    zIndex: 1,
  },
});
