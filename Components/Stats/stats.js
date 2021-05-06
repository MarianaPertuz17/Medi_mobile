import React, { useState, useEffect } from "react";
import { Actions } from "react-native-router-flux";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  BottomNavigation,
  TextInput,
  Button,
  Dimensions,
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

function Stats() {
  const screenWidth = Dimensions.get("window").width;
  const [isPress, setIsPress] = useState(false);

  var touchProps = {
    activeOpacity: 1,
    style: isPress ? styles.boxPressed : styles.boxNormal,
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    onPress: () => console.log("HELLO"),
  };

  return (
    <View style={styles.container}>
      <ScrollView scrollsToTop={true}>
        <Text
          style={{
            color: "#0a4c66",
            fontSize: 30,
            fontFamily: "Roboto_700Bold",
            borderBottomColor: "lightgray",
            borderBottomWidth: 1.3,
            marginTop: 50,
            padding: 10,
            paddingLeft: 15,
          }}
        >
          Estadísticas
        </Text>

        <ImageBackground
          imageStyle={{ borderRadius: 10 }}
          source={require("./statsblue1.jpg")}
          style={{
            width: 390,
            height: 165,
            opacity: 0.85,
            borderRadius: 6,
            marginTop: 10,
            marginRight: 5,
            overflow: "hidden",
            marginLeft: 10,
          }}
        ></ImageBackground>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity {...touchProps} onPress={() => Actions.line1()}>
            <Text
              style={{
                color: "#0a4c66",
                fontSize: 15,
                fontFamily: "Roboto_400Regular",
                padding: 10,
                paddingLeft: 15,
              }}
            >
              Registro histórico de peso
            </Text>
            <Text
              style={{
                color: "gray",
                fontSize: 10,
                fontFamily: "Roboto_400Regular_Italic",
                padding: 10,
                paddingLeft: 15,
                paddingTop: 0,
              }}
            >
              Observe la gráfica de los valores de peso registrados en el último
              mes
            </Text>
          </TouchableOpacity>

          <View style={{ width: 10 }}></View>

          <TouchableOpacity
            {...touchProps}
            onPress={() => Actions.push("line2")}
          >
            <Text
              style={{
                color: "#0a4c66",
                fontSize: 15,
                fontFamily: "Roboto_400Regular",
                padding: 10,
                paddingLeft: 15,
              }}
            >
              Registro histórico de presión arterial
            </Text>
            <Text
              style={{
                color: "gray",
                fontSize: 10,
                fontFamily: "Roboto_400Regular_Italic",
                padding: 10,
                paddingLeft: 15,
                paddingTop: 0,
              }}
            >
              Observe la gráfica de los valores de presión registrados en el
              último mes
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            {...touchProps}
            onPress={() => Actions.push("line3")}
          >
            <Text
              style={{
                color: "#0a4c66",
                fontSize: 15,
                fontFamily: "Roboto_400Regular",
                padding: 10,
                paddingLeft: 15,
              }}
            >
              Registros de frecuencia cardíaca
            </Text>
            <Text
              style={{
                color: "gray",
                fontSize: 10,
                fontFamily: "Roboto_400Regular_Italic",
                padding: 10,
                paddingLeft: 15,
                paddingTop: 0,
              }}
            >
              Controle su frecuencia cardíaca a lo largo del día
            </Text>
          </TouchableOpacity>

          <View style={{ width: 10 }}></View>

          <View style={styles.boxNormal2}>
            <Text
              style={{
                color: "gray",
                fontSize: 12,
                fontFamily: "Roboto_400Regular",
                fontWeight: "bold",
                padding: 10,
                paddingLeft: 15,
              }}
            >
              En los recuadros grises podrá observar las gráficas de sus
              registros históricos.
            </Text>
            <Text
              style={{
                color: "gray",
                fontSize: 10,
                fontFamily: "Roboto_400Regular_Italic",
                padding: 10,
                paddingLeft: 15,
                paddingTop: 0,
              }}
            >
              Seleccione el que desea observar
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default Stats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    textAlign: "center",
    fontSize: 18,
    padding: 16,
    marginTop: 16,
  },

  boxNormal: {
    borderColor: "lightgray",
    borderWidth: 1.3,
    marginTop: 20,
    marginLeft: 10,
    width: 185,
    height: 200,
    borderRadius: 10,
    backgroundColor: "whitesmoke",
  },

  boxPressed: {
    borderColor: "lightgray",
    borderWidth: 1.3,
    marginTop: 20,
    width: 185,
    height: 200,
    borderRadius: 10,
    backgroundColor: "lightgray",
  },

  boxNormal2: {
    borderColor: "#bbd3dd",
    borderWidth: 1.3,
    marginTop: 20,
    marginLeft: 10,
    width: 185,
    height: 200,
    borderRadius: 10,
  },
});
