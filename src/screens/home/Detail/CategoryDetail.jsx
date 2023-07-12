import React from 'react'
import { View, Text, Button, StyleSheet} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

const CategoryDetail = ({route}) => {
 
  const { data } = route.params
const navigation = useNavigation()
  return (
    <View style={styles.container}>
        <Text style={{
            color: 'black'
        }}>
          Details : {data}
        </Text>
        <Button
        title="GO BACK"
        onPress={() => navigation.goBack()}
        />
    </View>
  )
}

export default CategoryDetail

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: 'center'
  },
});