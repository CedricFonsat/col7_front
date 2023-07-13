import React from "react";
import { View, Text, StyleSheet, Dimensions, FlatList, Image, ScrollView } from "react-native";
import Size from "../../constants/Size";
import Colors from "../../constants/Colors";
import { LinearGradient } from 'expo-linear-gradient'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const USER = 
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    username: "Axie",
    avatar:
      "https://nfts.wtf/wp-content/uploads/2021/10/1_iS8lhECY5Eul2cBd8CucDQ-9e73e80e93715f32ad3a41cdd2f56e50-1024x1024.jpeg",
    money: 1900,
  }

const CARD = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Axie",
    image:
      "https://uploads.laborx.com/gig/thumb_cropped_1080x1080_NJY_CgEvC2TVDS7Olu0bRxcXa8aUEQge.jpeg",
    money: 200,
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Infinity",
    image:
      "https://mir-s3-cdn-cf.behance.net/projects/404/7927d8140413249.Y3JvcCwxMDgwLDg0NCwwLDExNw.jpg",
    money: 500,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Green Monte Anna",
    image:
    "https://cdna.artstation.com/p/assets/images/images/054/435/674/large/william-278015005-1045970552798429-910893853573624301-n.jpg?1664531531",
    money: 600,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Golden Boy",
    image:
    "https://cdnb.artstation.com/p/assets/images/images/054/358/829/large/william-273590517-5211123912252505-1546211948916236636-n.jpg?1664360406",
    money: 800,
  },
];

const ProfileScreen = () => {

  const headerShowCover = () => {
    return (
      <View style={styles.cover}>
        <Image style={styles.avatar} source={{
            uri: USER.avatar
          }}
          />
      </View>
    )
  }

  const headerShowInfos = () => {
    return (
      <View style={styles.headerShowInfos}>
        <View style={styles.headerShowInfosAvatar}>
          <Image style={styles.avatar} source={{
            uri: USER.avatar
          }}
          />
        </View>
        <View style={styles.headerShowInfosBlockTitle}>
          <Text style={styles.headerShowInfosTitle}>{ USER.username }</Text>
          <Text style={styles.headerShowInfosTitleSecond}>@{ USER.username }</Text>
        </View>
      </View>
    );
  };

  const headerShow = () => {
    return <View style={styles.headerShow}>{headerShowCover()}{headerShowInfos()}</View>;
  };

  const midInfos = () => {
    return (
      <View style={styles.midInfos}>
        <View>
          <Text style={styles.midInfosText}>Net Worth NFT</Text>
          <Text style={styles.midInfosTextSecond}>Floor price: { USER.money }</Text>
        </View>
        <View style={styles.midInfosBlock}>
          <View>
            <MaterialCommunityIcons
              name="cards-outline"
              color={Colors.white}
              size={26}
            />
          </View>
          <Text style={styles.midInfosBlockText}>12</Text>
        </View>
      </View>
    );
  };

  const tabBar = () => {
    return (
      <View style={styles.tabBar}>
      <View style={[styles.tabBarPanel,styles.tabBarPanelActive]}><Text style={styles.tabBarText}>Cards</Text></View>
      <View style={styles.tabBarPanel}><Text style={styles.tabBarText}>Sell</Text></View>
    </View>
    );
  };

  const CardItem = ({ title, image }) => {
    return (
      <View style={styles.cardItem}>
        <Text style={styles.cardItemTitle}>{title}</Text>
        <LinearGradient
          // Background Linear Gradient
          colors={["transparent", "rgba(0,0,0,0.6)"]}
          style={styles.background}
        />
        <View style={styles.cardItemImage}>
          <Image
            style={styles.avatar}
            source={{
              uri: image,
            }}
          />
        </View>
      </View>
    );
  };

  const CardList = () => {
    return (
      <View style={styles.cardList}>
        <FlatList
          vertical
          showsVeritcalScrollIndicator={false}
          numColumns={2}
          columnWrapperStyle={styles.row}
          data={CARD}
          renderItem={({ item }) => (
            <CardItem title={item.title} image={item.image} />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* <ScrollView 
      contentContainerStyle={{flexGrow : 1, alignItems : 'center'}}
      > */}
      {headerShow()}
      {midInfos()}
      {tabBar()}
      {CardList()}
      {/* </ScrollView> */}
    </View>
  );
};

export default ProfileScreen;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    // justifyContent: 'center',
    // paddingTop: Size.large,
    backgroundColor: Colors.primary,
  },
  headerShow: {
    backgroundColor: "red",
    width: width,
    height: height / 3.5,
    position: "relative",
    alignItems: "center",
    justifyContent: "flex-end",
    // borderRadius: Size.default,
    paddingBottom: Size.default,
  },
  headerShowInfos: {
    width: width * 0.9,
    height: 100,
    backgroundColor: Colors.tertiary,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Size.small,
    borderRadius: Size.small,
  },
  headerShowInfosAvatar: {
    width: 80,
    height: 80,
  //  backgroundColor: "blue",
    borderRadius: Size.small,
    overflow: 'hidden'
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
    width: width * 0.9,
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
    position: 'relative',
    overflow: 'hidden'
  },
  cardItemTitle: {
    color: Colors.white,
    fontSize: Size.fs20,
    zIndex: 2
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
    width: width * 0.9,
    height: 50,
    backgroundColor: Colors.tertiary,
    marginTop: 10,
    borderRadius: Size.xs,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  tabBarPanel: {
    width: width * 0.41,
    height: 30,
    borderRadius: Size.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarPanelActive: {
    backgroundColor: Colors.secondary,
  },
  tabBarText: {
    color: Colors.white
  }
});
