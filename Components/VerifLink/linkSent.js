import React, { useState, useEffect, cloneElement } from "react";
import axios from "axios";
import { Actions } from "react-native-router-flux";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
} from "react-native";
import {
  useFonts,
  Jost_100Thin,
  Jost_200ExtraLight,
  Jost_300Light,
  Jost_400Regular,
  Jost_500Medium,
  Jost_600SemiBold,
  Jost_700Bold,
  Jost_800ExtraBold,
  Jost_900Black,
  Jost_100Thin_Italic,
  Jost_200ExtraLight_Italic,
  Jost_300Light_Italic,
  Jost_400Regular_Italic,
  Jost_500Medium_Italic,
  Jost_600SemiBold_Italic,
  Jost_700Bold_Italic,
  Jost_800ExtraBold_Italic,
  Jost_900Black_Italic,
} from "@expo-google-fonts/jost";
import { AppLoading } from "expo";
import { set } from "mongoose";
import { leftarrow } from "../Stats/leftarrow.png";

function LinkSent() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => Actions.pop("verifLink")}>
          <ImageBackground
            source={require("./leftarrow.png")}
            style={{
              width: 25,
              height: 25,
              overflow: "hidden",
            }}
          ></ImageBackground>
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <Image
          source={require("./email-verification.png")}
          style={{
            width: 100,
            height: 100,
            alignSelf: "center",
          }}
        />
        <Text
          style={{
            fontFamily: "Jost_600SemiBold",
            fontSize: 24,
            alignContent: "center",
            alignSelf: "center",
            marginBottom: 30,
            marginTop: 40,
            color: "#0a4c66",
          }}
        >
          Revisa tu correo
        </Text>

        <Text
          style={{
            fontFamily: "Jost_300Light",
            fontSize: 14,
            width: 370,
            textAlign: "center",
            alignSelf: "center",
            alignContent: "center",
          }}
        >
          Se te ha enviado nuevo link al correo.{" "}
        </Text>

        <Text
          style={{
            fontFamily: "Jost_300Light",
            fontSize: 14,
            marginBottom: 30,
            width: 370,
            textAlign: "center",
            alignSelf: "center",
            alignContent: "center",
          }}
        >
          En caso de no observarlo en mensajes recibidos, se recomienda revisar
          spam.
        </Text>
        <Text
          style={{
            fontFamily: "Jost_300Light",
            fontSize: 14,
            marginBottom: 30,
            width: 370,
            textAlign: "center",
            alignSelf: "center",
            alignContent: "center",
          }}
        >
          ¡Gracias por elegirnos para ayudar a cuidarte!
        </Text>
      </View>
    </View>
  );
}

export default LinkSent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    fontFamily: "Jost_400Regular",
  },

  body: {
    flex: 1,
    backgroundColor: "white",
    alignContent: "center",
    alignSelf: "center",
    justifyContent: "center",
    fontFamily: "Jost_400Regular",
  },
  header: {
    textAlign: "center",
    fontSize: 18,
    paddingTop: 30,
    paddingLeft: 15,
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
  },

  textLabel: {
    marginLeft: 40,
    fontFamily: "Jost_400Regular",
    fontSize: 15,
  },

  textInput: {
    height: 30,
    width: 290,
    marginLeft: 40,
    borderBottomColor: "black",
    borderBottomWidth: 1.5,
    paddingLeft: 10,
    marginVertical: 5,
    backgroundColor: "transparent",
    fontFamily: "Jost_400Regular",
    fontSize: 17,
    marginBottom: 30,
  },

  register: {
    fontFamily: "Jost_400Regular",
    fontSize: 14,
    marginTop: 20,
    justifyContent: "center",
  },

  register3: {
    fontFamily: "Jost_600SemiBold",
    fontSize: 18,
    padding: 0,
    color: "whitesmoke",
    alignContent: "flex-end",
    alignSelf: "center",
  },

  button2: {
    backgroundColor: "#0a4c66",
    padding: 10,
    alignSelf: "flex-end",
    width: 420,
    marginTop: 30,
    alignSelf: "center",
  },
});
