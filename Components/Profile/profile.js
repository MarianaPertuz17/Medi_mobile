import React, { useState, useEffect } from "react";
import axios from "axios";
import { Actions } from "react-native-router-flux";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  BottomNavigation,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

function Profile() {
  const userInfo = useSelector((state) => state);
  const dispatch = useDispatch();

  const setLogout = (payload) => ({ type: "LOGIN_USER", payload });

  const logout = async () => {
    try {
      const config = {
        headers: {
          "content-type": "application/json",
          "x-auth-token": userInfo.userInfo.token,
        },
      };
      const res = await axios.get("http://3.14.73.151/userapps/", config);

      if (res.data) {
        dispatch(setLogout(null));
        Actions.replace("signin");
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <View style={styles.container}>
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
        Mi Perfil
      </Text>

      <ImageBackground
        imageStyle={{ borderRadius: 10 }}
        source={require("./teal.png")}
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

      <TouchableOpacity style={{ position: "absolute" }}>
        <ImageBackground
          imageStyle={{ borderRadius: 0.5 }}
          source={require("./camera2.png")}
          style={{
            width: 80,
            height: 80,
            marginTop: 250,
            marginLeft: 30,
            overflow: "hidden",
            position: "absolute",
          }}
        ></ImageBackground>
      </TouchableOpacity>

      <TextInput style={styles.textInput} placeholder="Sobrenombre"></TextInput>

      <Text style={styles.normalText}>Información de usuario</Text>

      <TouchableOpacity onPress={() => Actions.changePassword()}>
        <Text style={styles.changePasswordText}>Cambiar Contraseña</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={logout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Profile;

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
  textInput: {
    height: 30,
    width: 270,
    marginLeft: 20,
    borderBottomColor: "lightgray",
    borderBottomWidth: 1.5,
    paddingLeft: 10,
    marginVertical: 5,
    backgroundColor: "transparent",
    fontFamily: "Jost_400Regular",
    fontSize: 17,
    marginBottom: 30,
    marginTop: 50,
  },

  normalText: {
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
    marginBottom: 30,
    marginLeft: 20,
    color: "#0a4c66",
  },

  logoutText: {
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
    bottom: 0,
    marginLeft: 20,
    color: "gray",
  },

  changePasswordText: {
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
    marginBottom: 30,
    marginLeft: 20,
    color: "#0a4c66",
  },
});
