import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  useFonts,
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic,
} from "@expo-google-fonts/roboto";

function Food() {
  return (
    <View>
      <Text
        style={{
          color: "#0a4c66",
          fontSize: 30,
          fontFamily: "Roboto_700Bold",
          borderBottomColor: "lightgray",
          borderBottomWidth: 1.3,
          marginTop: 50,
          padding: 10,
          paddingLeft: 20,
        }}
      >
        Alimentación
      </Text>
    </View>
  );
}

export default Food;
