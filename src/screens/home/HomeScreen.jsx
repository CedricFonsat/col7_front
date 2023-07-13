import React from 'react'
import { View, Text, StyleSheet, Dimensions, FlatList, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'
import Size from '../../constants/Size'
import Colors from '../../constants/Colors'
import { LinearGradient } from 'expo-linear-gradient'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Axie Infinity',
      otherImage: 'https://1734811051.rsc.cdn77.org/data/images/full/389843/axie-infinity-token-1548.png',
      image: 'https://www.business2community.com/it/wp-content/uploads/sites/10/2022/07/axie.jpg',
      description: 'New collection',
      author : 'collect7'
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
      otherImage: 'https://1734811051.rsc.cdn77.org/data/images/full/389837/axie-infinity-token-265.png',
      image: 'https://www.business2community.com/it/wp-content/uploads/sites/10/2022/07/axie.jpg',
      description: 'New collection',
      author : 'collect7'
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
      otherImage: 'https://1734811051.rsc.cdn77.org/data/images/full/389840/axie-infinity-token-1330.png',
      image: 'https://www.business2community.com/it/wp-content/uploads/sites/10/2022/07/axie.jpg',
      description: 'New collection',
      author : 'collect7'
    },
  ];

  const PROMO = 'https://coinmoi.com/wp-content/uploads/2021/07/banner-11.jpg'

  const USER = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Test123',
      avatar: 'https://nfts.wtf/wp-content/uploads/2021/10/1_iS8lhECY5Eul2cBd8CucDQ-9e73e80e93715f32ad3a41cdd2f56e50-1024x1024.jpeg',
      money: 2000
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Collect7',
      avatar: 'https://nfts.wtf/wp-content/uploads/2021/10/1_iS8lhECY5Eul2cBd8CucDQ-9e73e80e93715f32ad3a41cdd2f56e50-1024x1024.jpeg',
      money: 2000
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'TheRock',
      avatar: 'https://nfts.wtf/wp-content/uploads/2021/10/1_iS8lhECY5Eul2cBd8CucDQ-9e73e80e93715f32ad3a41cdd2f56e50-1024x1024.jpeg',
      money: 2000
    },
  ];

const HomeScreen = ({navigation}) => {

 const headerShow = () => {
   return (
     <View style={styles.headerShow}>
       <View>
           <Text style={styles.titleHeaderShow}>Explore the most {'\n'}popular <Text style={styles.itemNFT}>NFT</Text> items</Text>
       </View>
     </View>
   )
 }

 const SearchBar = () => {
    return (
        <TouchableOpacity style={styles.searchBar} onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate('Search');
          // navigation.navigate('Details', {
          //   itemId: 86,
          //   otherParam: 'anything you want here',
          // });
        }}>
            <View style={styles.logoSearchBar}>
              <MaterialCommunityIcons name="magnify" color={Colors.white} size={26} />
            </View>
            <Text style={styles.textSearchBar}>Find Your Product</Text>
        </TouchableOpacity>
      )
 }

 const CollectionItem = ({title, image, logo, onPress}) => {
      return (
        <TouchableOpacity onPress={onPress} activeOpacity={1}>
        <View style={styles.collectionItem}
        onPress={onPress}
       
        //  onPress={() => {
        //    navigation.navigate('Search');
        // }}
        // , {
        //   itemId: 86,
        //   otherParam: 'anything you want here',
        // }
        
          >
            <View style={styles.cover}>
            <Image
        style={styles.avatar}
        source={{
          uri: image,
        }}
      />
            </View>
            <Text style={styles.collectionItemTitle}>{title}</Text>
            <LinearGradient
        // Background Linear Gradient
        colors={['transparent', 'rgba(0,0,0,0.6)']}
        style={styles.background}

        
      />
           <View style={styles.collectionItemFloat}>
           <Image
        style={styles.avatar}
        source={{
          uri: logo,
        }}
      />
           </View>
      </View>
      </TouchableOpacity>
      )
 }

 const CollectionList = () => {

  const handleItemPress = (itemId) => {
    // Naviguez vers la page de détails en utilisant l'ID en paramètre
    navigation.navigate('CollectionDetail', { itemId: itemId });
  };

    return (
    <View style={styles.collectionList}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={DATA}
        renderItem={({item}) => <CollectionItem
         title={item.title}
         image={item.image} 
         logo={item.otherImage} 
         onPress={() => handleItemPress(item.title)}
          />}
        keyExtractor={item => item.id}
      />
    </View>
      )
 }

 const BestCollectorItem = ({title, money, avatar}) => {
    return (
      <View style={styles.bestCollectorItem}>
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
            <Text style={styles.bestCollectorItemTitleSecond}>Floor price: {money} C7</Text>
        </View>
    </View>
    )
}

 const BestCollectorList = () => {
    return (
    <View style={styles.bestCollectorList}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={USER}
        renderItem={({item}) => <BestCollectorItem title={item.title} avatar={item.avatar} money={item.money}/>}
        keyExtractor={item => item.id}
      />
    </View>
      )
 }

  return (
    <View style={styles.container}>
        {headerShow()}
      {SearchBar()}
      {CollectionList()}
       <View style={styles.bestCollectorBlockTitle}>
           <Text style={styles.bestCollectorTitle}>Best collector</Text>
        </View>
        {BestCollectorList()}
    </View>
  )
}

export default HomeScreen

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: "center",
  },
  headerShow: {
    width: width,
    height: height / 4.5,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingHorizontal: Size.default
  },
  titleHeaderShow: {
    color: Colors.white,
    fontSize: Size.fs30,
    marginTop: Size.large,
    fontWeight: Size.bold
  },
  itemNFT: {
    color: Colors.secondary,
  },
  searchBar: {
      backgroundColor: Colors.tertiary,
      height: 60,
      width: width * 0.90,
      marginTop: Size.default,
      borderRadius: Size.xs,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: Size.default
  },
  textSearchBar: {
      color: Colors.white,
      marginLeft: Size.small
  },
  logoSearchBar: {
    width: 20,
    height: 20,
   // backgroundColor: Colors.white
  },
  collectionItem: {
    backgroundColor: 'green',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    height: 150,
    width: width * 0.7,
    marginTop: 60,
    justifyContent: 'flex-end'
  },
  collectionItemTitle: {
    fontSize: 32,
    color: Colors.white,
   // fontWeight: Size.w600,
    zIndex: 2
  },
  collectionList: {
      width: width * 0.9,
      position: 'relative',
      marginTop: Size.large
  },
  collectionItemFloat:{
      width: 150,
      height: 150,
     // backgroundColor: Colors.white,
      position: 'absolute',
      right: 10,
      top: -80
  },
  bestCollectorBlockTitle: {
      width: width * 0.9
  },
  bestCollectorTitle: {
    color: Colors.white,
    fontSize: Size.fs20,
    fontWeight: Size.w600,
    marginTop: Size.large
  },
  bestCollectorList: {
      width: width * 0.9,
      height: height * 0.5
  },
  bestCollectorItem: {
      height: 100,
      width: width * 0.9,
      flexDirection: 'row',
      paddingHorizontal: Size.small,
      alignItems: 'center',
      marginTop: Size.default,
      borderRadius: Size.small,
      backgroundColor: Colors.tertiary,
  },
  bestCollectorItemAvatar: {
      width: 80,
      height: 80,
      backgroundColor: Colors.secondary,
      borderRadius: Size.small,
      overflow: 'hidden'
  },
  bestCollectorItemBlockTitle: {
      height: 80,
      paddingHorizontal: Size.default,
  },
  bestCollectorItemTitle: {
      fontSize: Size.fs20,
      fontWeight: Size.w600,
      color: Colors.white,
      marginBottom: Size.xs
  },
  bestCollectorItemTitleSecond: {
      fontWeight: Size.w600,
      color: Colors.white
  },
  avatar: {
      width: '100%',
      height: '100%',
  },
  cover: {
      position: 'absolute',
      height: 150,
      width: width * 0.7,
  },
  background: {
    position: 'absolute',
    height: 150,
    width: width * 0.7,
    zIndex: 1
  }
  
});