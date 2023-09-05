import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import Colors from "../constants/Colors";
import Size from "../constants/Size";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useMeQuery } from "../store/slices/authSlice";
import env from "../data/env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const CustomDrawer = (props) => {
  const navigation = useNavigation();

  const handleLogout = async () => {
   // console.log("boss twap");
    await AsyncStorage.removeItem("@token");
    navigation.replace("SplashScreen");
    console.log('logout reussi');
  };

  const { data: meData, error: meError, isLoading: meIsLoading } = useMeQuery();

  return (
    <View style={{ flex: 1, backgroundColor: "#1A1A24" }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={
          {
            //  backgroundColor: '#242435',
            //    alignItems: 'center'
          }
        }
      >
        <View
          style={{
            width: SCREEN_WIDTH,
            height: 150,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: SCREEN_WIDTH * 0.6,
              height: 80,
              backgroundColor: "#242435",
              marginLeft: 25,
              flexDirection: "row",
              alignItems: "center",
              borderRadius: Size.small,
            }}
          >
            {/* {meData ? ( */}
              <>
                <View
                  style={{
                    width: 65,
                    height: 65,
                    backgroundColor: Colors.secondary,
                    marginHorizontal: 8,
                    borderRadius: Size.xs,
                    overflow: "hidden",
                  }}
                >
                  <Image
                    source={{
                      uri: meData?.imageUrl,
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </View>
                <View
                  style={{
                    marginLeft: 20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: Size.fs20,
                      fontWeight: Size.w600,
                      color: Colors.white,
                    }}
                  >
                    {meError
                      ? "Oh no, there was an error"
                      : meIsLoading
                      ? "Loading..."
                      : meData
                      ? meData.nickname
                      : null}
                  </Text>
                  <Text
                    style={{
                      color: Colors.white,
                    }}
                  >
                    {" "}
                    {meError
                      ? "Oh no, there was an error"
                      : meIsLoading
                      ? "Loading..."
                      : meData
                      ? meData.wallet
                      : null}{" "}
                    C7
                  </Text>
                </View>
              </>
  
              {/* <TouchableOpacity style={styles.buttonLogin} onPress={() => navigation.navigate('LoginScreen')} >
                <MaterialCommunityIcons
                  style={styles.white}
                  name="login"
                  size={40}
                />
              </TouchableOpacity> */}

          </View>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View
        style={{
          padding: 20,
          // borderTopWidth: 1,
          //  borderTopColor: '#ccc'
        }}
      >

          <TouchableOpacity
            style={{ paddingVertical: 20 }}
            onPress={() => {
              handleLogout();
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons
                style={styles.white}
                name="logout"
                size={26}
              />
              <Text style={[styles.white, styles.textLogout]}>
                Se deconnecter
              </Text>
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
    backgroundColor: Colors.white,
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
  white: {
    color: Colors.white,
  },
  textLogout: {
    marginLeft: 8,
  },
  buttonLogin: {
    width: 65,
    height: 65,
    backgroundColor: Colors.tertiary,
    marginHorizontal: 8,
    borderRadius: Size.xs,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomDrawer;
