import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Dimensions, Animated, Image, ImageBackground, TouchableOpacity } from "react-native";
import { BlurView } from 'expo-blur';
import Colors from "../constants/Colors";
import Size from "../constants/Size";
import { LinearGradient } from "expo-linear-gradient";

export default function Card({name,price,bid,onPress,image}) {

  return (
   <>
    <View style={styles.container}>
      <Image
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
      }}
       source={image}/>
  <View style={{zIndex: 4}}>
  <Text style={styles.cardName}>{name}</Text>
    <View style={styles.cardInfos}>
    <BlurView intensity={40} tint="white" style={styles.cardBlur}>
        <Text style={styles.cardPrice}>Price {price}C7</Text>
      </BlurView>
      <TouchableOpacity onPress={onPress} style={[styles.bidButton,{display: {bid}}]}>
        {/* <Image source={bidButton} /> */}
      </TouchableOpacity>
    </View>
  </View>
    <LinearGradient
        // Background Linear Gradient
        colors={['transparent', Colors.primary]}
        style={styles.background}
      />
 </View>
 </>
  );
}

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    width: width / 2.2,
    height: height * 0.3,
    overflow: 'hidden',
    borderRadius: Size.default,
    justifyContent: 'flex-end',
    margin: 9
  },
  background: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  blurImageStyle: {
    width: width / 2.2,
    height: 60,
    position: 'absolute',
    zIndex: 9,
    bottom: 0,
    justifyContent: 'flex-end'
  },
  cardInfos:{
   // backgroundColor: 'blue',
    flexDirection: 'row',
    justifyContent: 'space-between',
   // paddingHorizontal: Size.default,
   // paddingBottom: Size.default,
    paddingTop: Size.small
  },
  cardBlur:{
    borderRadius: 50,
    height: 40,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Size.default,
    paddingBottom: Size.default,
      
  },
  cardName:{
    paddingHorizontal: Size.default,
    color: Colors.white,
    fontWeight: Size.bold,
    fontSize: Size.fs20
  },
  cardPrice:{
    color: Colors.white
  },
  bidButton:{
    width: 40,
    height: 40,
    backgroundColor: Colors.white,
    borderTopLeftRadius: Size.default,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
