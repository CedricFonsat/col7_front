import React from 'react'
import { View, Text } from 'react-native'

const Modal = ({route}) => {

  const { data } = route.params

  return (
    <View style={{
      justifyContent: 'center',
      alignItems: 'center'
    }}>
        <Text style={{
            color: 'black',
            fontSize: 24
        }}> Details : {data}</Text>
    </View>
  )
}

export default Modal