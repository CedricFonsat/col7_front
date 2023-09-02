import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import Size from '../../../constants/Size';
import Colors, { borderColor } from '../../../constants/Colors';

export default function Button({text,icon, backgroundColor, borderColor, borderWith, onPress, left, top, right}) {
  return (
      <>
    <TouchableOpacity style={[styles.container, {
      backgroundColor:backgroundColor,
      borderColor: borderColor,
      borderWidth: borderWith,
      justifyContent: left ? null : 'center',
      marginTop: top ? top : null
      }]}
      
      onPress={onPress}
      >
    {icon && icon}  
    <Text style={styles.text}>{text}</Text>
    {right && right}
    </TouchableOpacity>
    </>
  );
}

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
    width: width * 0.88,
    height: height * 0.07,
    color: Colors.white,
    borderRadius: Size.small,
    alignItems: 'center',
    flexDirection: 'row'
  },
  text: {
    color: Colors.white,
    fontSize: Size.fs18,
    fontWeight: Size.bold
  },
  
});