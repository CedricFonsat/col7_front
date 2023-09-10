import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Size from "../../constants/Size";
import Colors from "../../constants/Colors";
import { useGetHomeQuery } from "../../store/slices/collectionCardSlice";
import { HeaderShow, SearchBar } from "../../components/components";
import CollectionList from "./components/collectionList";
import BestCollectorList from "./components/bestCollectorList";
import BestCollection from "./components/bestCollection";

const HomeScreen = () => {
  const { data: homeData } = useGetHomeQuery();

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {HeaderShow()}
          {SearchBar()}
          {BestCollection()}
          <CollectionList data={homeData?.collection} />
          <View style={styles.bestCollectorBlockTitle}>
            <Text style={styles.bestCollectorTitle}>Best collector</Text>
          </View>
          <BestCollectorList data={homeData?.users} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: "center",
  },
  backgroundStyle: {
    backgroundColor: Colors.primary,
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
});
