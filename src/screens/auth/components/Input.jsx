import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Dimensions } from 'react-native';
import Size from '../../../constants/Size';
import Colors from '../../../constants/Colors';

export default function Input({placeholder, secureTextEntry,styleSheets, borderColor, borderWith, onChange, onChangeText, value, placeholderTextColor, autoCapitalize}) {
  return (
      <>
    <TextInput
     style={[styles.container,styleSheets,{
      borderColor: borderColor,
      borderWidth: borderWith
      }]}
     placeholder={placeholder}
     placeholderTextColor={placeholderTextColor}
     secureTextEntry={secureTextEntry}
     value={value}
     onChange={onChange}
     onChangeText={onChangeText}
     autoCapitalize={autoCapitalize}
     />
    </>
  );
}

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.tertiary,
    width: width * 0.88,
    height: height * 0.07,
    color: Colors.white,
    borderRadius: Size.small,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Size.default
  },
});