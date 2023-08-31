import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Alert,
  Dimensions,
  Switch,
} from "react-native";
import Colors from "../../constants/Colors";
import Size from "../../constants/Size";
import Button from "../auth/components/Button";

export default function SettingScreen({navigation}) {

  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };


  return (
    <View
      style={{ flex: 1, alignItems: "center", backgroundColor: Colors.primary }}
    >
      <View
        style={{
          width: width,
          marginTop: 150,
          alignItems: "center",
        }}
      >
        <Button text="Confidentiliter" backgroundColor={Colors.gray} onPress={() => navigation.navigate('condition')} />
      </View>

      <View
        style={{
          width: width,
          height: 40,
          marginTop: 50,
          alignItems: "center",
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingHorizontal: Size.default
        }}
      >
        <Text style={{
          color: Colors.white,
          fontSize: Size.fs20,
          fontWeight: Size.w600
        }}>Notifications {isEnabled ? 'On' : 'Off'}</Text>
        <Switch
         trackColor={{ false: '#767577', true: '#81b0ff' }}
         thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
         ios_backgroundColor="#3e3e3e"
         onValueChange={toggleSwitch}
         value={isEnabled}
        />
      </View>
    </View>
  );
}

const { height, width } = Dimensions.get("window");
