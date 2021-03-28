import React, { useState, useEffect } from "react";
import { Actions } from "react-native-router-flux";
import { useSelector } from "react-redux";
import axios from "axios";
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

function HomePage() {
  const userToken = useSelector((state) => state.userInfo.token);
  const [userData, setUserData] = useState(null);
  const getUserInfo = async () => {
    try {
      const config = {
        headers: {
          "content-type": "application/json",
          "x-auth-token": userToken,
        },
      };
      const res = await axios.get("http://192.168.1.29:3001/userapps/", config);
      setUserData(res.data);
    } catch (err) {
      alert(err);
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  useEffect(() => {}, [userData]);

  return (
    <View styles={styles.container}>
      <ImageBackground
        source={require("./blue.png")}
        style={{
          width: 415,
          height: 165,
          alignItems: "center",
          justifyContent: "center",
          padding: 30,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 30,
            fontFamily: "Roboto_500Medium",
          }}
        >
          BIENVENIDO
        </Text>
      </ImageBackground>

      <TouchableOpacity
        style={styles.button3}
        onPress={() => Actions.push("estado")}
      >
        <Text style={styles.text}>MI ESTADO / TRATAMIENTO</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button3} onPress={() => Actions.stats()}>
        <Text style={styles.text}>ESTADÍSTICAS</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button3} onPress={() => Actions.food()}>
        <Text style={styles.text}>ALIMENTACIÓN</Text>
      </TouchableOpacity>
    </View>
  );
}

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignContent: "center",
    alignSelf: "center",
    justifyContent: "center",
    fontFamily: "Jost_400Regular",
  },

  button3: {
    padding: 10,
    alignSelf: "flex-end",
    width: 380,
    height: 70,
    marginTop: 30,
    alignSelf: "center",
    justifyContent: "center",
    borderBottomColor: "lightgray",
    borderBottomWidth: 1.3,
  },

  text: {
    color: "#6a9fb4",
    fontFamily: "Roboto_400Regular",
    fontSize: 20,
  },
});
