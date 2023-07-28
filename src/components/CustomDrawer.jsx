import React from "react";
import { View, StyleSheet, Text, Dimensions, TouchableOpacity } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import Colors from "../constants/Colors";
import Size from "../constants/Size";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const CustomDrawer = (props) => {

  return (
  <View style={{flex:1, backgroundColor: '#1A1A24'}}>
     <DrawerContentScrollView {...props}
     contentContainerStyle={{
     //  backgroundColor: '#242435',
   //    alignItems: 'center'
    
    }}
     >
       <View style={{
         width: SCREEN_WIDTH,
         height: 150,
         justifyContent: 'center',
         
       }}>
         <View style={{
         width: SCREEN_WIDTH * 0.6,
         height: 80,
         backgroundColor: '#242435',
         marginLeft: 25,
         flexDirection: 'row',
         alignItems: 'center',
         borderRadius: Size.small
       }}>
         <View style={{
           width: 65,
           height: 65,
           backgroundColor: Colors.secondary,
           marginHorizontal: 8,
           borderRadius: Size.xs
         }}>

         </View>
         <View style={{
           marginLeft: 20
         }}>
           <Text style={{
             fontSize: Size.fs20,
             fontWeight: Size.w600,
             color: Colors.white
           }}>JhonDoe</Text>
           <Text style={{
             color: Colors.white
           }}>3000 C7</Text>
         </View>



       </View>

       </View>
     <DrawerItemList {...props} />
   </DrawerContentScrollView>
   <View style={{
     padding: 20,
    // borderTopWidth: 1,
   //  borderTopColor: '#ccc'
   }}>
     <TouchableOpacity 
     style={{ paddingVertical: 15 }}
     onPress={() => {}}
     >
    <View style={{
      flexDirection: 'row',
      alignItems: 'center'
    }}>
    <MaterialCommunityIcons style={{
      color: 'white'
    }} name="logout" size={26} />
    <Text style={{
       color: 'white',
       marginLeft: 8
     }}>Se deconnecter</Text>
    </View>
     </TouchableOpacity>
   </View>
  </View>
  );
};

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: SCREEN_HEIGHT,
    width: "100%",
    backgroundColor: "white",
    position: "absolute",
    top: SCREEN_HEIGHT / 1.5,
    borderRadius: 25,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: "grey",
    alignSelf: "center",
    marginVertical: 15,
    borderRadius: 2,
  },
});

export default CustomDrawer

