import React, { useState, useEffect } from "react";
import { Actions } from "react-native-router-flux";
import { useSelector } from "react-redux";
import { Audio } from "expo-av";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  BottomNavigation,
  TextInput,
  Button,
  Vibration,
  TouchableOpacity,
  Image,
} from "react-native";
import Chat from "../Chat/index";
import * as Permissions from "expo-permissions";
import { Notifications as ExpoNotifications } from "expo";

function HomePage() {
  const userToken = useSelector((state) => state.userInfo.token);
  const [userData, setUserData] = useState(null);

  // const handleChatSelection = () => {
  //   // navigation.navigate(routes.chat);
  //   Actions.push("chat");
  // };

  const getUserInfo = async () => {
    try {
      const config = {
        headers: {
          "content-type": "application/json",
          "x-auth-token": userToken,
        },
      };
      const res = await axios.get("http://3.14.73.151/userapps/", config);
      setUserData(res.data);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);
  useEffect(() => {}, [userData]);

  //SEND EXPO TOKEN TO MONGO6
  useEffect(() => {
    console.log("Mounted About");
    register();
    this.listener = ExpoNotifications.addListener(listen);
  }, [userData]);

  async function register() {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    console.log(status);
    if (status !== "granted") {
      alert("You need to enable permissions in settings");
      return;
    }
    let token = await ExpoNotifications.getExpoPushTokenAsync();
    console.log(token, "TOKEN DE EXPO");

    if (token && userData) {
      const updateUser = {
        expoToken: token,
        userID: userData.user._id,
      };

      const config = {
        headers: {
          "content-type": "application/json",
        },
      };

      try {
        const request = axios.post(
          "http://192.168.1.29:3001/userapps/expotoken",
          updateUser,
          config
        );
      } catch (e) {
        console.log(e);
      }
    }
  }

  const listen = async ({ origin, data }) => {
    console.log(
      `Push notification ${origin} with data: ${JSON.stringify(data)}`
    );
    console.log(origin, data);

    Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      shouldDuckAndroid: true,
    });

    if (origin === "received") {
      Vibration.vibrate(10000);
      try {
        const { sound: soundObject, status } = await Audio.Sound.createAsync(
          {
            uri:
              "https://firebasestorage.googleapis.com/v0/b/brigadaun.appspot.com/o/audios%2Falarm.wav?alt=media&token=a2c80767-bae0-47b8-8dae-3b1a7af590df",
          },
          { shouldPlay: true }
        );
        setSound(soundObject);
      } catch (error) {
        console.log(error);
      }
    }
  };

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
      {/* 
      <TouchableOpacity onPress={() => handleChatSelection()}>
        <Image
          style={{
            width: 60,
            height: 60,
            overflow: "hidden",
            bottom: 0,
            right: 0,
          }}
          source={require("./chat.png")}
        />
      </TouchableOpacity> */}
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
