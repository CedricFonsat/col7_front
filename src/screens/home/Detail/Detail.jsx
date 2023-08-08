import React from 'react'
import { View, Button } from 'react-native'
import Animated from 'react-native-reanimated'

const Detaile = ({navigation}) => {
  return (
    <View style={{ flex: 1 }}>
         <Animated.Image
      source={{
        uri: 'https://www.business2community.com/it/wp-content/uploads/sites/10/2022/07/axie.jpg'
      }}
        style={{ width: '100%', height: 200, backgroundColor: "green" }}
        sharedTransitionTag="sharedTag"
      />
      <Button
      title='GJGhhhj'
      onPress={() => navigation.goBack()}
      />
    </View>
  )
}

export default Detaile