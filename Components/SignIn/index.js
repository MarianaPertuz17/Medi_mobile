import React, { useState, useEffect, useContext } from "react";
import { Actions } from "react-native-router-flux";
import UserContext from "../Context/context";
import submit from "./GetUser";
import { useDispatch } from "react-redux";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
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
import {
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
import { AppLoading } from "expo";

function SignIn(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const [token, setToken] = useState("");
  const [fontsLoaded] = useFonts({
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
  });

  const [fontsLoaded2] = useFonts({
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
  });
  const dispatch = useDispatch();
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  if (!fontsLoaded2) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontFamily: "Jost_600SemiBold",
          fontSize: 24,
          color: "#0a4c66",
          alignSelf: "center",
        }}
      >
        BIENVENIDO
      </Text>
      <View style={styles.container2}>
        <Text style={styles.textLabel}>Correo Electrónico</Text>
        <TextInput
          id="displayName"
          name="displayName"
          autoFocus
          style={styles.textInput}
          onChangeText={(e) => setEmail(e)}
        ></TextInput>

        <Text style={styles.textLabel}>Contraseña</Text>
        <TextInput
          name="password"
          type="password"
          id="password"
          textContentType="password"
          secureTextEntry={true}
          style={styles.textInput}
          onChangeText={(e) => setPassword(e)}
        ></TextInput>

        <TouchableOpacity
          style={styles.button2}
          onPress={() => submit(email, password, dispatch)}
        >
          <Text style={styles.register3}>INGRESAR</Text>
        </TouchableOpacity>

        <Text htmlFor="email" style={styles.register}>
          ¿No eres miembro?
          <TouchableOpacity
            style={styles.button}
            onPress={() => Actions.register()}
          >
            <Text style={styles.register2}>Registrate Aquí</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
}

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6a9fb4",
    color: "whitesmoke",
    justifyContent: "center",
    fontFamily: "Jost_400Regular",
  },

  container2: {
    width: 300,
    alignSelf: "center",
    backgroundColor: "#6a9fb4",
    color: "whitesmoke",
    justifyContent: "center",
    fontFamily: "Jost_400Regular",
  },

  textLabel: {
    fontFamily: "Jost_400Regular",
    fontSize: 15,
    color: "whitesmoke",
    textAlign: "left",
    marginTop: 30,

    opacity: 0.7,
  },

  textInput: {
    height: 40,
    width: 300,
    borderRadius: 7,
    borderBottomColor: "whitesmoke",
    borderBottomWidth: 1.5,
    marginHorizontal: 20,
    paddingLeft: 10,
    marginVertical: 5,
    fontFamily: "Jost_400Regular",
    fontSize: 17,
    opacity: 0.7,
    alignItems: "center",
    alignSelf: "center",
  },

  register: {
    fontFamily: "Jost_400Regular",
    fontSize: 14,
    marginTop: 20,
    justifyContent: "center",
  },

  register2: {
    fontFamily: "Jost_600SemiBold",
    fontSize: 14,
    padding: 0,
    marginLeft: 10,
    color: "#044863",
    alignContent: "flex-end",
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
    width: 300,
    marginTop: 30,
    alignSelf: "center",
  },

  button: {
    backgroundColor: "#6a9fb4",
    padding: 0,
    alignSelf: "flex-end",
  },
});
