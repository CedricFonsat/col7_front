import { StatusBar } from "expo-status-bar";
import React, { useRef, useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { BlurView } from "expo-blur";
import Colors from "../constants/Colors";
import Size from "../constants/Size";
import { LinearGradient } from "expo-linear-gradient";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { useBuyCardByIdMutation, useGetCardsQuery } from "../store/slices/cardSlice";
import { useMeQuery } from "../store/slices/authSlice";
import favoris from '../../assets/icon/favoris.png';
import addFavoris from '../../assets/icon/add-favoris.png'


export default function Card({ name, price, bid, onPress, image, id, favorite }) {

  const { data } = useMeQuery();
  const [buyCardById] = useBuyCardByIdMutation();
  const { refetch } = useGetCardsQuery();

  const rest = {
    'id': id,
    'userId': data.id,
  };

  const buyItem = async() => {

    await buyCardById(rest).then((res) => {
     
        console.log(res);
    
      })
      .catch(() => console.log("pas bon"));
    console.log(rest);
    refetch();
  };

  const sellItem = (id) => {
    console.log(id,'vendre cette NFT');
  }

  



  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.container}
        onPress={onPress}
      >
        <View style={styles.favorite}>
        
       
          {favorite ? (
             <Image source={addFavoris} style={styles.iconFavorite}/> 
          // <View style={{
          //   backgroundColor: 'purple',
          //   width: '100%',
          //   height: '100%'
          // }}></View>
          ) : (
            <Image source={favoris} style={styles.iconFavorite}/> 
            // <View style={{
            //   backgroundColor: 'pink',
            //   width: '100%',
            //   height: '100%'
            // }}></View>
          )
        }

        </View>
        <Image
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
          }}
          source={image}
        />
        <View style={{ zIndex: 4 }}>
          <Text style={styles.cardName}>{name}</Text>
          <View style={styles.cardInfos}>
            <BlurView intensity={40} tint="white" style={styles.cardBlur}>
              <Text style={styles.cardPrice}>Price : {price} C7</Text>
            </BlurView>
            <TouchableOpacity
             // onPress={onPress}
              style={[styles.bidButton, { display: { bid } }]}
            >
              {/* <Image source={bidButton} /> */}
            </TouchableOpacity>
          </View>
        </View>
        <LinearGradient
          // Background Linear Gradient
          colors={["transparent", Colors.primary]}
          style={styles.background}
        />
      </TouchableOpacity>
    </>
  );
}

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    width: width / 2.2,
    height: height * 0.3,
    overflow: "hidden",
    borderRadius: Size.default,
    justifyContent: "flex-end",
    margin: 9,
    opacity: 1,
    position: 'relative'
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
  },
  background: {
    position: "absolute",
    zIndex: 1,
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  blurImageStyle: {
    width: width / 2.2,
    height: 60,
    position: "absolute",
    zIndex: 9,
    bottom: 0,
    justifyContent: "flex-end",
  },
  cardInfos: {
    // backgroundColor: 'blue',
    flexDirection: "row",
    justifyContent: "space-between",
    // paddingHorizontal: Size.default,
    // paddingBottom: Size.default,
    paddingTop: Size.small,
  },
  cardBlur: {
    borderRadius: 50,
    height: 40,
    width: 130,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Size.default,
    paddingBottom: Size.default,
  },
  cardName: {
    paddingHorizontal: Size.default,
    color: Colors.white,
    fontWeight: Size.bold,
    fontSize: Size.fs20,
  },
  cardPrice: {
    color: Colors.white,
  },
  bidButton: {
    width: 40,
    height: 40,
    backgroundColor: Colors.white,
    borderTopLeftRadius: Size.default,
    justifyContent: "center",
    alignItems: "center",
  },
  favorite:{
    position: 'absolute',
    top: 10,
    right: 10,
    width: 40,
    height: 40,
    borderRadius: Size.xl,
    backgroundColor: 'rgba(245,230,222,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999
  },
  iconFavorite:{
    width: 20,
    height: 20,
  }
});
